import { Component, Input } from '@angular/core';

import { Cell, CELL_SIZE, Point } from '../../models/cell/cell';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  @Input() cells: Cell[];

  constructor() { }

  getStyles() {
    this.fixOverlaps();

    const gridAreas = this.getGridAreas();

    return {
      'grid-template-areas': gridAreas
        .map(row => '"' + row.join(' ') + '"')
        .join(' '),
      'grid-auto-rows': CELL_SIZE + 'px',
      'grid-auto-columns': CELL_SIZE + 'px',
    };
  }

  private getGridAreas (): string[][] { 
    let gridAreas: string[][] = [];

    const { width, height } = this.cells.reduce((size, cell) => {
      return {
        width: Math.max(size.width, cell.position.x + cell.width),
        height: Math.max(size.height, cell.position.y + cell.height),
      }
    }, {width: 0, height: 0});
    
    
    for(let i = 0; i < height; i++) {
      const row = new Array(width).fill('.')
      
      gridAreas.push(row);
    }

    this.cells.forEach(cell => {
      for(let i = cell.position.y; i < cell.position.y + cell.height; i++) {
        for(let j = cell.position.x; j < cell.position.x + cell.width; j++) {
          gridAreas[i][j] = cell.name;
        }
      }
    });

    return gridAreas;
  }

  private fixOverlaps() {
    const sortedCells = this.getSortedCells();

    const usedPoints: Map<string, Point> = new Map();
    
    for (let cell of sortedCells) {
      fixCell(cell);

      const bottomRightCorner = {
        x: cell.position.x + cell.width,
        y: cell.position.y + cell.height
      }
      
      for (let i = cell.position.y; i < bottomRightCorner.y; i++) {
        for (let j = cell.position.x; j < bottomRightCorner.x; j++) {
          usedPoints[pointToKey(j,i)] = {
            ...bottomRightCorner
          };
        }
      }
    }

    function fixCell(cell) {
      const leftCornerUsedPoint = usedPoints[pointToKey(cell.position.x, cell.position.y)];
      if (leftCornerUsedPoint) {
        cell.position.x = leftCornerUsedPoint.x;
      }

      for (let i = cell.position.y; i < cell.position.y + cell.height; i++) {
        if (usedPoints[pointToKey(cell.position.x, i)]) {
          cell.position.y = usedPoints[pointToKey(cell.position.x, i)].y;
        }
      }
    }

    function pointToKey(x, y) {
      return 'x' + x + 'y' + y;
    }
  }

  private getSortedCells() {
    return this.cells.sort((a, b) => (
      (a.isMoving ? -1 : 0)
      || (b.isMoving ? 1 : 0)
      || a.position.x - b.position.x
      || a.position.y - b.position.y
    ));
  }
}
