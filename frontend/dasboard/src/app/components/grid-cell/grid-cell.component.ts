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

  onSizeChange({ width, height }) {
    width = this.calculateNewSize(width);
    height = this.calculateNewSize(height);
    
    if (width !== this.cell.width && width > 0) {
      this.cell.width = width;
    }

    if (height !== this.cell.height && height > 0) {
      this.cell.height = height;
    }
  }

  private calculateNewSize(size) {
    return Math.floor(size / CELL_SIZE) + Math.round((size % CELL_SIZE) / CELL_SIZE);;
  }

}
