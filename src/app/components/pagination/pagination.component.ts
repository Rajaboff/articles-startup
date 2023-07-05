import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() activePage: number = 1;
  @Input() totalCount: number = 1;
  @Input() pageSize: number = 1;

  @Output() setActive = new EventEmitter<number>();

  get pageCount(): number {
    return Math.ceil(this.totalCount / this.pageSize)
  }

  emitActivePage(page: number): void {
    this.activePage = page;
    this.setActive.emit(this.activePage);
  }

}
