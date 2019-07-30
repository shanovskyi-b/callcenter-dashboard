import { Component, Input, DoCheck } from '@angular/core';

import { Cell, CELL_SIZE, CELL_GAP, Point } from '../../models/cell/cell';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements DoCheck {
  @Input() cells: Cell[];
  styles = {}; 
  private usedPoints: Map<string, Point>;
  private previousCells;

  constructor() { }

  ngDoCheck() {
    let checkNeeded = false;

    if (!this.previousCells) {
      checkNeeded = true;
    } else {
      this.cells.forEach(cell => {
        const previousCell = this.previousCells.find(c => 
          cell.name === c.name
        );

        if (
          previousCell.position.x !== cell.position.x
          || previousCell.position.y !== cell.position.y
          || previousCell.width !== cell.width
          || previousCell.height !== cell.height
        ) {
          checkNeeded = true;
        }
      })
    }
    
    if (checkNeeded) {
      this.previousCells = this.cells.map(cell => ({
        name: cell.name,
        position: {
          x: cell.position.x,
          y: cell.position.y
        },
        width: cell.width,
        height: cell.height
      }));

      this.onCellsChange();
    }
  }

  private onCellsChange() {
    this.styles = this.getStyles();
  }

  private getStyles() {
    // console.log('cells', this.cells)
    this.usedPoints = new Map();
    this.fixOverlaps();

    const gridAreas = this.getGridAreas();

    return {
      'grid-template-areas': gridAreas,
      'grid-auto-rows': CELL_SIZE + 'px',
      'grid-auto-columns': CELL_SIZE + 'px',
      'grid-gap': CELL_GAP +  'px'
    };
  }

  private getGridAreas (): string { 
    let gridAreasArray: string[][]= [];

    const { gridWidth, gridHeight } = this.cells.reduce((size, cell) => {
      return {
        gridWidth: Math.max(size.gridWidth, cell.position.x + cell.width),
        gridHeight: Math.max(size.gridHeight, cell.position.y + cell.height),
      }
    }, {gridWidth: 0, gridHeight: 0});

    for (let i = 0; i < gridHeight; i++) {
      gridAreasArray.push([]);
      for (let j = 0; j < gridWidth; j++) {
        const usedPoint = this.usedPoints[this.pointToKey(j, i)];
        gridAreasArray[i].push(usedPoint ? usedPoint.owner : '.');
      }
    }

    return gridAreasArray
      .map(row => '"' + row.join(' ') + '"')
      .join(' ');
  }

  private fixOverlaps() {
    const sortedCells = this.getSortedCells();

    for (let cell of sortedCells) {
      this.fixCell(cell);

      const bottomRightCorner = {
        x: cell.position.x + cell.width,
        y: cell.position.y + cell.height
      }
      
      for (let i = cell.position.y; i < bottomRightCorner.y; i++) {
        for (let j = cell.position.x; j < bottomRightCorner.x; j++) {
          this.usedPoints[this.pointToKey(j,i)] = {
            ...bottomRightCorner,
            owner: cell.name
          };
        }
      }
    }
  }

  private fixCell(cell) {
    const leftCornerUsedPoint = this.usedPoints[this.pointToKey(cell.position.x, cell.position.y)];
    if (leftCornerUsedPoint) {
      cell.position.x = leftCornerUsedPoint.x;
    }

    for (let i = cell.position.y; i < cell.position.y + cell.height; i++) {
      if (this.usedPoints[this.pointToKey(cell.position.x, i)]) {
        cell.position.y = this.usedPoints[this.pointToKey(cell.position.x, i)].y;
      }
    }
  }

  private pointToKey(x, y) {
    return 'x' + x + 'y' + y;
  }

  private getSortedCells() {
    return this.cells.sort((a, b) => (
      a.position.x - b.position.x
      || a.position.y - b.position.y
      || (a.isMoving ? -1 : 0)
      || (b.isMoving ? 1 : 0)
    ));
  }
}
