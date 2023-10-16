import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  removeFromReadingList,
} from '@tmo/books/data-access';
import { Book, ReadingListItem } from '@tmo/shared/models';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private snackBar: MatSnackBar, private readonly store: Store) {}

  public showMessage(message: string, item): void {
    const snackBarRef = this.snackBar.open(message, 'Undo', {
      duration: 5000,
      panelClass: ['undo-action'],
    });

    snackBarRef.onAction().subscribe(() => {
      const book: Book = JSON.parse(JSON.stringify(item));
      console.log(item);

      if (!item.bookId) {
        // ? UNDO ACTION AFTER BOOK IS ADDED FROM BOOK SEARCH COMPONENT
        const bookData: ReadingListItem = { bookId: book.id, ...book };
        this.store.dispatch(removeFromReadingList({ item: bookData }));
      } else {
        // ? UNDO ACTION AFTER BOOK IS REMOVED FROM READING LIST COMPONENT
        this.store.dispatch(addToReadingList({ book }));
      }
    });
  }
}
