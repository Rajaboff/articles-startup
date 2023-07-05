import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Author } from '../models/author';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private baseApi: string = '/assets/mocks/authors.json';

  authors = new BehaviorSubject<Author[]>([]);

  constructor(private http: HttpClient) {}

  getAuthors(): void {
    this.http
      .get<Author[]>(this.baseApi)
      .subscribe((authors) => this.authors.next(authors));
  }

  getAuthor(id: number): Author | undefined {
    return this.authors.value.find((author) => author.id == id);
  }
}
