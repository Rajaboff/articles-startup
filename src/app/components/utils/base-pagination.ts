import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { Article } from 'src/app/models/article';

@Component({
  selector: '',
  template: ''
})
export class BasePaginationComponent implements OnDestroy {
  page: number = 1;
  pageSize: number = 8;
  totalCount: number = 0;

  destroy = new Subject<void>();

  isLoading = new BehaviorSubject<boolean>(true);

  constructor(protected route: ActivatedRoute, protected router: Router) {}

  setQueryParam(params: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
