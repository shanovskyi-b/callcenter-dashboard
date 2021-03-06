import { Component, Input, HostBinding } from '@angular/core';
import { Cell } from '../../models/cell/cell';

@Component({
  selector: 'app-grid-cell',
  templateUrl: './grid-cell.component.html',
  styleUrls: ['./grid-cell.component.scss']
})
export class GridCellComponent {
  @Input() cell: Cell;

  @HostBinding('style.grid-area') get areaName() {
    return this.cell.name;
  }

  constructor() { }
}
