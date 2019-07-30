import { Component, Input, HostBinding } from '@angular/core';
import { Cell, CELL_SIZE, Point } from '../../models/cell/cell';

@Component({
  selector: 'app-grid-cell',
  templateUrl: './grid-cell.component.html',
  styleUrls: ['./grid-cell.component.scss']
})
export class GridCellComponent {
  @Input() cell: Cell;
  private startPosition = null;
  private startSize = null;

  @HostBinding('style.grid-area') get areaName() {
    return this.cell.name;
  }

  constructor() { }

  onPositionChangeStart(startPosition: Point) {
    this.startPosition = {
      ...this.cell.position
    };
  }

  onPositionChange(offset: Point) {
    this.cell.position.x = Math.max(
      this.startPosition.x + Math.round(offset.x / CELL_SIZE)
    , 0)

    this.cell.position.y = Math.max(
      this.startPosition.y + Math.round(offset.y / CELL_SIZE)
    , 0)

    this.cell.isMoving = true;
  }

  onPositionChangeEnd() {
    this.cell.isMoving = false;
    this.startPosition = null;
  }

  onSizeChangeStart(offset: Point) {
    this.startSize = {
      width: this.cell.width,
      height: this.cell.height
    };
  }

  onSizeChange(offset: Point) {
    this.cell.width = Math.max(
      this.startSize.width + Math.round(offset.x / CELL_SIZE)
    , 1)

    this.cell.height = Math.max(
      this.startSize.height + Math.round(offset.y / CELL_SIZE)
    , 1)
  }

}
