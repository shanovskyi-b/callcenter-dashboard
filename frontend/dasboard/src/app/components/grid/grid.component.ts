import { Component, Input } from '@angular/core';

import { Cell, CELL_SIZE } from '../../models/cell/cell';

type Point = { x: number, y: number };
type Size = { width: number, height: number };

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

    const { width, height } = this.cells.reduce((size, cell) => {
      return {
        width: Math.max(size.width, cell.position.x + cell.width),
        height: Math.max(size.height, cell.position.y + cell.height),
      }
    }, {width: 0, height: 0});
    
    let gridAreas: string[][] = [];
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

    return {
      'grid-template-areas': gridAreas
        .map(row => '"' + row.join(' ') + '"')
        .join(' '),
      'width': width * CELL_SIZE + 'px',
      'height': height * CELL_SIZE + 'px',
      'grid-auto-rows': CELL_SIZE + 'px',
      'grid-auto-columns': CELL_SIZE + 'px',
    };
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

    // fixWhiteSpaces();

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

    function fixWhiteSpaces() {
      for (let cell of sortedCells) {
        let isTopWhiteSpaceExist = true;
        while (isTopWhiteSpaceExist && cell.position.y > 0) {
          for (let i = cell.position.x; i < cell.position.x + cell.width; i++) {
            if (usedPoints[pointToKey(i, cell.position.y - 1)]) {
              isTopWhiteSpaceExist = false;
              break;
            }
          }

          if (isTopWhiteSpaceExist) {
            cell.position.y--;
          }
          
        }

        let isLeftWhiteSpaceExist = true;
        while (isLeftWhiteSpaceExist && cell.position.x > 0) {
          for (let i = cell.position.y; i < cell.position.y + cell.height; i++) {
            if (usedPoints[pointToKey(cell.position.x - 1, i)]) {
              isLeftWhiteSpaceExist = false;
              break;
            }
          }

          if (isLeftWhiteSpaceExist) {
            cell.position.x--;
          }
        }
      }
    }

    function pointToKey(x, y) {
      return 'x' + x + 'y' + y;
    }
  }

  private getSortedCells() {
    return this.cells.sort((a, b) => (
      a.position.x - b.position.x
      || a.position.y - b.position.y
      || b.postionUpdateDate - a.postionUpdateDate
    ));
  }
}
