import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss'],
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(
    private readonly store: Store,
    private notifications: NotificationsService
  ) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
    // ? SHOW SNACKBAR WITH REMOVED MESSAGE
    this.notifications.showMessage(`Book Removed - ${item.title}`, item);
  }
}
