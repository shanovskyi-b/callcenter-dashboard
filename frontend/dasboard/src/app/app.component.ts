import { Component } from '@angular/core';

import { Cell } from './models/cell/cell';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  widget1: Cell = new Cell('first', { x: 0, y: 0}, 1, 2);
  widget2: Cell = new Cell('second', { x: 1, y: 0}, 2, 2);
  widget3: Cell = new Cell('third', { x: 1, y: 2}, 2, 1);
}
