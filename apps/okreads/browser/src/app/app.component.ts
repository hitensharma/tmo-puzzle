import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'tmo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public meta: Meta) {
    meta.updateTag({
      name: 'description',
      content: 'Read Books on Okreads',
    });
  }
}