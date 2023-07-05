import { Injectable } from '@angular/core';
import { Article } from '../models/article';

export const storageKey: string = 'articles';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles: Article[] = [];

  constructor() {}

  getArticles(): void {
    this.articles = JSON.parse(localStorage.getItem(storageKey) || '[]');
  }

  setArticle(article: Article): void {
    if (this.articles.find((a) => a.id === article.id)) {
      const index = this.articles.findIndex((a) => a.id == article.id);
      this.articles[index] = article;
    } else {
      this.articles.push(article);
    }

    localStorage.setItem(storageKey, JSON.stringify(this.articles));
  }

  getArticle(id: number): Article | undefined {
    this.getArticles();

    return this.articles.find((article) => article.id == id);
  }

  deleteArticle(id: number): void {
    this.articles = this.articles.filter((article) => article.id != id);
    localStorage.setItem(storageKey, JSON.stringify(this.articles));
  }
}
