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
  form: FormGroup;

  id: FormControl = new FormControl(null);
  title: FormControl = new FormControl('', [Validators.required]);
  content: FormControl = new FormControl('', [Validators.required]);
  authorId: FormControl = new FormControl(null, [Validators.required]);

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
    });
  }

  ngOnInit() {
    this.authorService.getAuthors();
    this.route.snapshot.data['data'] && this.setValues();
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
      });
    }
  }

  setValues(): void {
    const { title, content, id, authorId } = this.route.snapshot.data[
      'data'
    ] as Article;

    this.title.setValue(title);
    this.content.setValue(content);
    this.id.setValue(id);
    this.authorId.setValue(authorId);
  }
}
