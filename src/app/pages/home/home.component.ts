import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { BasePaginationComponent } from 'src/app/components/utils/base-pagination';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { AuthorService } from 'src/app/services/author.service';

import Chart from 'chart.js/auto';
import { UserRole, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent
  extends BasePaginationComponent
  implements OnInit, AfterViewInit
{
  articles: Article[] = [];

  roles = UserRole;

  @ViewChild('stat', { static: false }) canvas?: ElementRef;

  constructor(
    public articleService: ArticleService,
    private authorService: AuthorService,
    route: ActivatedRoute,
    router: Router,
    public userService: UserService
  ) {
    super(route, router);
  }

  ngOnInit() {
    this.route.queryParams
      .pipe(takeUntil(this.destroy))
      .subscribe(({ page }) => {
        this.isLoading.next(true);
        this.setPagination(page || this.page);
      });

    this.authorService.getAuthors();
    this.articleService.getArticles();

    this.totalCount = this.articleService.articles.length;
  }

  ngAfterViewInit() {
    this.userService.isAdmin.subscribe((role) => {
      role === this.roles.Admin &&
        setTimeout(() => {
          this.createChart();
        }, 50);
    });
  }

  filterByWeekDays(articles: Article[]): { week: string; count: number }[] {
    const weekdays: { week: string; count: number }[] = [];
    const weekdaysList = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
    const counts: { [key: string]: number } = {};

    weekdaysList.forEach((weekday) => {
      counts[weekday] = 0;
    });

    articles.forEach((article) => {
      const createdAt = new Date(article.createdAt);
      const dayOfWeek = this.getDayOfWeek(createdAt);

      if (dayOfWeek) {
        counts[dayOfWeek]++;
      }
    });

    weekdaysList.forEach((weekday) => {
      const dayObj = { week: weekday, count: counts[weekday] };
      weekdays.push(dayObj);
    });

    return weekdays;
  }

  private getDayOfWeek(date: Date): string {
    const weekdays = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
    return weekdays[date.getDay()];
  }

  createChart(): void {
    const chartStatus = Chart.getChart('stat');
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }

    const data = this.filterByWeekDays(this.articleService.articles);

    this.canvas?.nativeElement &&
      new Chart(this.canvas.nativeElement, {
        type: 'bar',
        options: {
          backgroundColor: '#6d28d9',
        },
        data: {
          labels: data.map((row) => row.week),
          datasets: [
            {
              label: 'Недельная статистика',
              data: data.map((row) => row.count),
            },
          ],
        },
      });
  }

  articlesByPage(page: number): Article[] {
    const from = (page ? page - 1 : 0) * this.pageSize;
    const to = page * this.pageSize;
    return this.articleService.articles.slice(from, to);
  }

  setPagination(page: number) {
    this.page = page;
    this.setQueryParam({ page });
  }
}
