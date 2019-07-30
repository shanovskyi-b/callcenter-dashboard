import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Cell, CELL_SIZE } from '../../models/cell/cell';

@Component({
  selector: 'app-grid-cell',
  templateUrl: './grid-cell.component.html',
  styleUrls: ['./grid-cell.component.scss']
})
export class GridCellComponent implements OnInit {
  @Input() cell: Cell;

  @HostBinding('style.grid-area') get areaName() {
    return this.cell.name;
  }

  constructor() { }

  ngOnInit() {
  }

  onPositionChange(offset: { x: number, y: number }) {
    if (Math.abs(offset.x) > CELL_SIZE / 2) {
      this.cell.position.x = Math.max(
        this.cell.position.x + Math.round(offset.x / CELL_SIZE)
      , 0)
      this.cell.postionUpdateDate = Date.now();
    }

    if (Math.abs(offset.y) > CELL_SIZE / 2) {
      this.cell.position.y = Math.max(
        this.cell.position.y + Math.round(offset.y / CELL_SIZE)
      , 0)
      this.cell.postionUpdateDate = Date.now();
    }
  }

  onSizeChange(offset: { x: number, y: number }) {
    if (Math.abs(offset.x) > CELL_SIZE / 2) {
      this.cell.width = Math.max(
        this.cell.width + Math.round(offset.x / CELL_SIZE)
      , 1)
    }

    if (Math.abs(offset.y) > CELL_SIZE / 2) {
      this.cell.height = Math.max(
        this.cell.height + Math.round(offset.y / CELL_SIZE)
      , 1)
    }
  }

}
