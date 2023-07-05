import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Article } from '../models/article';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private storageKey: string = 'articles';

  articles: Article[] = [];

  constructor() {}

  getArticles(): void {
    this.articles = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  setArticle(article: Article): void {
    if (this.articles.find((a) => a.id === article.id)) {
      const index = this.articles.findIndex((a) => a.id == article.id);
      this.articles[index] = article;
    } else {
      this.articles.push(article);
    }

    localStorage.setItem(this.storageKey, JSON.stringify(this.articles));
  }

  getArticle(id: number): Article | undefined {
    this.getArticles();

    return this.articles.find((article) => article.id == id);
  }

  deleteArticle(id: number): void {
    this.articles = this.articles.filter((article) => article.id != id);
    localStorage.setItem(this.storageKey, JSON.stringify(this.articles));
  }
}
