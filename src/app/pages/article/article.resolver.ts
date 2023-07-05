import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleResolver implements Resolve<Article | undefined> {
  constructor(private articleService: ArticleService) {}

  resolve(route: ActivatedRouteSnapshot): Article | undefined {
    const id = route.params['id'];
    return this.articleService.getArticle(id);
  }
}
