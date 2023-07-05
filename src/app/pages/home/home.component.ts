import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  articles: Article[] = [];

  constructor(
    public articleService: ArticleService,
    private authorService: AuthorService
  ) {}

  ngOnInit() {
    this.authorService.getAuthors();
    this.articleService.getArticles();
  }
}
