import { Directive, EventEmitter, Input, Output, HostListener, ElementRef } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { auditTime } from 'rxjs/operators';


@Directive({
  selector: '[appDragger]'
})
export class DraggerDirective {
  @Output() onPositionChange = new EventEmitter<{ x: number, y: number }>();
  @Output() onDragStart = new EventEmitter<{ x: number, y: number }>();
  @Output() onDragEnd = new EventEmitter();
  @Input() grabElement: HTMLElement;

  private startPoint: { 
    x: number, 
    y: number
  };
  private grabElementStartOffset : { 
    top: number, 
    left: number
  };
  private mouseMoveSubscription: Subscription;
  private mouseUpSubscription: Subscription;

  constructor(private elRef:ElementRef) { }

  @HostListener('mousedown', ['$event'])
  dragStart(event) {
    if(event.stopPropagation) event.stopPropagation();
    if(event.preventDefault) event.preventDefault();
    event.cancelBubble = true;
    event.returnValue = false;

    if (this.onDragStart) this.onDragStart.emit(this.startPoint);

    this.startPoint = {
      x: event.clientX,
      y: event.clientY
    };
    
    if (this.grabElement) {
      const rect = this.grabElement.getBoundingClientRect();
      
      this.grabElementStartOffset = {
        left: rect.left,
        top: rect.top,
      };

      this.grabElement.setAttribute('style', `
        width: ${this.grabElement.offsetWidth}px;
        height: ${this.grabElement.offsetHeight}px;
        position: fixed;
        left: ${this.grabElementStartOffset.left}px;
        top: ${this.grabElementStartOffset.top}px;
        transition: left .2s, top .2s;
        z-index: 1;
      `);
    }
    
    this.mouseUpSubscription = fromEvent(document, 'mouseup')
      .subscribe(() => {
        this.dragEnd();
      });
    
    this.mouseMoveSubscription = fromEvent(document, 'mousemove')
      .pipe(
        auditTime(100)
      )
      .subscribe((event) => {
        this.dragging(event);
      });
  };

  dragEnd() {
    this.mouseUpSubscription.unsubscribe();
    this.mouseMoveSubscription.unsubscribe();
    
    if (this.onDragEnd) this.onDragEnd.emit();
    
    if (this.grabElement) {
      this.grabElement.setAttribute('style', '');
    }
  };

  dragging(event) {
    const mouseOffset = {
      x: event.clientX - this.startPoint.x,
      y: event.clientY - this.startPoint.y
    };

    if (this.grabElement) {
      this.grabElement.style.left = mouseOffset.x + this.grabElementStartOffset.left + 'px',
      this.grabElement.style.top = mouseOffset.y + this.grabElementStartOffset.top + 'px'
    }

    this.onPositionChange.emit({
      x: mouseOffset.x,
      y: mouseOffset.y
    });
  };
}
