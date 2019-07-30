type Point = {x: number, y: number};

export class Cell {
  name: string;
  position: Point;
  width: number;
  height: number;

  constructor(name: string, position: Point, width: number, height: number) {
    this.name = name;
    this.position = position;
    this.width = width;
    this.height = height;
  }
}