import { Component } from '@angular/core';

import { Cell } from './models/cell/cell';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  agentsWidget: Cell = new Cell('Agents', { x: 0, y: 0}, 8, 5);
  callsWidget: Cell = new Cell('Calls', { x: 8, y: 0}, 6, 5);
}
