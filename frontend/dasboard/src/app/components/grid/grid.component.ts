import { Component, OnInit, Input } from '@angular/core';

import { Cell } from '../../models/cell/cell';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  @Input() cells: Cell[];

  getStyles() {
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
        .join(' ')
    };
  }

  constructor() { }

  ngOnInit() {
    console.log('cells is', this.cells)
    console.log('styles is', this.getStyles())
  }

}
