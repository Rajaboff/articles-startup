import { ArticleService, storageKey } from './article.service';
import { Article } from '../models/article';

describe('ArticleService', () => {
  let articleService: ArticleService;

  beforeEach(() => {
    articleService = new ArticleService();
  });

  it('should retrieve articles from localStorage', () => {
    const articles: Article[] = [
      {
        title: 'Article 1',
        authorId: 1,
        content: 'Lorem ipsum dolor sit amet.',
        id: 1,
        createdAt: '2021-07-01',
      },
      {
        title: 'Article 2',
        authorId: 2,
        content: 'Pellentesque habitant morbi.',
        id: 2,
        createdAt: '2021-07-02',
      },
    ];

    localStorage.setItem(storageKey, JSON.stringify(articles));

    articleService.getArticles();

    expect(articleService.articles).toEqual(articles);
  });

  it('should add a new article', () => {
    const article: Article = {
      title: 'New Article',
      authorId: 1,
      content: 'Lorem ipsum dolor sit amet.',
      id: 3,
      createdAt: '2021-07-03',
    };

    articleService.setArticle(article);

    expect(articleService.articles.length).toBe(1);
    expect(articleService.articles[0]).toEqual(article);
  });

  it('should update an existing article', () => {
    const article: Article = {
      title: 'Updated Article',
      authorId: 1,
      content: 'Updated content.',
      id: 1,
      createdAt: '2021-07-01',
    };

    localStorage.setItem(
      'articles',
      JSON.stringify([
        {
          title: 'Article 1',
          authorId: 1,
          content: 'Lorem ipsum dolor sit amet.',
          id: 1,
          createdAt: '2021-07-01',
        },
      ])
    );

    articleService.setArticle(article);

    expect(articleService.articles.length).toBe(1);
    expect(articleService.articles[0]).toEqual(article);
  });

  it('should retrieve an article by ID', () => {
    const articles: Article[] = [
      {
        title: 'Article 1',
        authorId: 1,
        content: 'Lorem ipsum dolor sit amet.',
        id: 1,
        createdAt: '2021-07-01',
      },
      {
        title: 'Article 2',
        authorId: 2,
        content: 'Pellentesque habitant morbi.',
        id: 2,
        createdAt: '2021-07-02',
      },
    ];

    localStorage.setItem(storageKey, JSON.stringify(articles));

    const retrievedArticle = articleService.getArticle(2);

    expect(retrievedArticle).toEqual(articles[1]);
  });

  it('should delete an article by ID', () => {
    const articles: Article[] = [
      {
        title: 'Article 1',
        authorId: 1,
        content: 'Lorem ipsum dolor sit amet.',
        id: 1,
        createdAt: '2021-07-01',
      },
      {
        title: 'Article 2',
        authorId: 2,
        content: 'Pellentesque habitant morbi.',
        id: 2,
        createdAt: '2021-07-02',
      },
    ];

    localStorage.setItem(storageKey, JSON.stringify(articles));

    articleService.getArticles();
    articleService.deleteArticle(1);

    expect(articleService.articles.length).toBe(1);
    expect(articleService.articles[0]).toEqual(articles[1]);
  });
});
