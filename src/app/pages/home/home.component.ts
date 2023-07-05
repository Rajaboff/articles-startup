import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { BasePaginationComponent } from 'src/app/components/utils/base-pagination';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends BasePaginationComponent implements OnInit {
  articles: Article[] = [];

  constructor(
    public articleService: ArticleService,
    private authorService: AuthorService,
    route: ActivatedRoute,
    router: Router
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
