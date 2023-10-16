import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  finishBookFromReadingList,
  getReadingList,
  removeFromReadingList,
} from '@tmo/books/data-access';
import { Book, ReadingListItem } from '@tmo/shared/models';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss'],
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }

  finishBookFromReadingList(item: ReadingListItem) {
    const bookFinished: Book = {
      id: item.bookId,
      ...item,
    };
    this.store.dispatch(finishBookFromReadingList({ book: bookFinished }));
  }
}
