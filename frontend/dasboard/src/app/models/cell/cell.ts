export type Point = {x: number, y: number};

export const CELL_SIZE = 100;

export class Cell {
  name: string;
  position: Point;
  width: number;
  height: number;
  isMoving: boolean = false;
  private startPosition = null;
  private startSize = null;

  constructor(name: string, position: Point, width: number, height: number) {
    this.name = name;
    this.position = position;
    this.width = width;
    this.height = height;
  }

  onPositionChangeStart(startPosition: Point) {
    this.startPosition = {
      ...this.position
    };
  }

  onPositionChange(offset: Point) {
    this.position.x = Math.max(
      this.startPosition.x + Math.round(offset.x / CELL_SIZE)
    , 0)

    this.position.y = Math.max(
      this.startPosition.y + Math.round(offset.y / CELL_SIZE)
    , 0)

    this.isMoving = true;
  }

  onPositionChangeEnd() {
    this.isMoving = false;
    this.startPosition = null;
  }

  onSizeChangeStart(offset: Point) {
    this.startSize = {
      width: this.width,
      height: this.height
    };
  }

  onSizeChange(offset: Point) {
    this.width = Math.max(
      this.startSize.width + Math.round(offset.x / CELL_SIZE)
    , 1)

    this.height = Math.max(
      this.startSize.height + Math.round(offset.y / CELL_SIZE)
    , 1)
  }
}