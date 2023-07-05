import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  showDeleteBtn: boolean = false;

  form: FormGroup;

  id: FormControl = new FormControl(null);
  title: FormControl = new FormControl('', [Validators.required]);
  content: FormControl = new FormControl('', [Validators.required]);
  authorId: FormControl = new FormControl(null, [Validators.required]);
  publishAt: FormControl = new FormControl('', [Validators.required]);

  constructor(
    public authorService: AuthorService,
    private route: ActivatedRoute,
    private router: Router,
    public articleService: ArticleService
  ) {
    this.form = new FormGroup({
      id: this.id,
      title: this.title,
      content: this.content,
      authorId: this.authorId,
      publishAt: this.publishAt,
    });
  }

  ngOnInit() {
    this.authorService.getAuthors();

    if (this.route.snapshot.data['data']) {
      this.showDeleteBtn = true;
      this.setValues();
    } else {
      this.showDeleteBtn = false;
    }
  }

  deleteArticle(): void {
    if (this.id.value) {
      this.articleService.deleteArticle(this.id.value);
      this.articleService.getArticles();
      this.router.navigateByUrl('/');
    }
  }

  setArticle(): void {
    if (this.form.valid) {
      const newId = this.id.value ?? Math.floor(Math.random() * 10000000) + 1;
      const createdDate = new Date().toISOString();

      this.articleService.setArticle({
        ...this.form.value,
        id: newId,
        createdAt: createdDate,
        publishAt: this.getISODate(this.publishAt.value),
      });

      this.router.navigateByUrl('/');
    }
  }

  getISODate(date: string): string {
    return new Date(date).toISOString();
  }

  convertToYYYYMMDD(isoDate: string): string {
    const date = new Date(isoDate);

    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }

  setValues(): void {
    const { title, content, id, authorId, publishAt } = this.route.snapshot
      .data['data'] as Article;

    this.title.setValue(title);
    this.content.setValue(content);
    this.id.setValue(id);
    this.authorId.setValue(authorId);
    this.publishAt.setValue(this.convertToYYYYMMDD(publishAt));
  }
}
