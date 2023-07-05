import { AuthorService } from './author.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Author } from '../models/author';

describe('AuthorService', () => {
  let authorService: AuthorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthorService],
    });

    authorService = TestBed.inject(AuthorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve authors from API', () => {
    const mockAuthors: Author[] = [
      { id: 1, name: 'Author 1' },
      { id: 2, name: 'Author 2' },
    ];

    authorService.getAuthors();

    const req = httpMock.expectOne('/assets/mocks/authors.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockAuthors);

    authorService.authors.subscribe((authors) => {
      expect(authors).toEqual(mockAuthors);
    });
  });

  it('should retrieve an author by ID', () => {
    const mockAuthors: Author[] = [
      { id: 1, name: 'Author 1' },
      { id: 2, name: 'Author 2' },
    ];

    authorService.authors.next(mockAuthors);

    const author = authorService.getAuthor(1);

    expect(author).toEqual(mockAuthors[0]);
  });
});
