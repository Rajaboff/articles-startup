import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Article } from 'src/app/models/article';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
  @Input() article!: Article;

  constructor(public authorService: AuthorService) {}

  ngOnInit() {}
}
