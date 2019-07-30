import { Component, EventEmitter, Output, HostListener, ElementRef } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-resizer',
  templateUrl: './resizer.component.html',
  styleUrls: ['./resizer.component.scss']
})
export class ResizerComponent {
  @Output() onSizeChange = new EventEmitter<{ width: number, height: number }>();;
  private startSize: {
    width: number,
    height: number
  };
  private startPoint: { 
    x: number, 
    y: number
  };
  private mouseMoveSubscription: Subscription;
  private mouseUpSubscription: Subscription;

  constructor(private elRef:ElementRef) { }

  @HostListener('mousedown', ['$event'])
  dragStart(event) {
    const parentElement = this.elRef.nativeElement.parentElement;
    console.log('parentElement is', parentElement);

    this.startSize = {
      width: parentElement.offsetWidth,
      height: parentElement.offsetHeight
    };

    this.startPoint = {
      x: event.clientX,
      y: event.clientY
    };

    this.mouseUpSubscription = fromEvent(document, 'mouseup')
      .pipe(
        throttleTime(100)
      )
      .subscribe((event) => {
        this.dragEnd(event);
      });
    
    this.mouseMoveSubscription = fromEvent(document, 'mousemove')
      .pipe(
        throttleTime(100)
      )
      .subscribe((event) => {
        this.dragging(event);
      });

    // Disable highlighting while dragging
    if(event.stopPropagation) event.stopPropagation();
    if(event.preventDefault) event.preventDefault();
    event.cancelBubble = true;
    event.returnValue = false;

    // updateInfo(e);
    // scope.$emit('angular-resizable.resizeStart', info);
  };

  dragEnd(event) {
    console.log('drag end')
    // updateInfo();
    // scope.$emit('angular-resizable.resizeEnd', info);
    this.mouseUpSubscription.unsubscribe();
    this.mouseMoveSubscription.unsubscribe();
  };

  dragging(event) {
    // console.log('event.clientX', event.clientX, this.startPoint.x, this.startSize.width)
    const offset = {
      x: event.clientX - this.startPoint.x,
      y: event.clientY - this.startPoint.y
    };

    const newSize = {
      width: this.startSize.width + offset.x,
      height: this.startSize.height + offset.y
    }
    
    // console.log('update', newSize);
    this.onSizeChange.emit(newSize);
    
    // var prop, offset = axis === 'x' ? start - e.clientX : start - e.clientY;
    // switch(dragDir) {
    //     case 'top':
    //         prop = scope.rFlex ? flexBasis : 'height';
    //         element[0].style[prop] = h + (offset * vy) + 'px';
    //         break;
    //     case 'bottom':
    //         prop = scope.rFlex ? flexBasis : 'height';
    //         element[0].style[prop] = h - (offset * vy) + 'px';
    //         break;
    //     case 'right':
    //         prop = scope.rFlex ? flexBasis : 'width';
    //         element[0].style[prop] = w - (offset * vx) + 'px';
    //         break;
    //     case 'left':
    //         prop = scope.rFlex ? flexBasis : 'width';
    //         element[0].style[prop] = w + (offset * vx) + 'px';
    //         break;
    // }
    
    // updateInfo(event);
    // throttle(() => this.onSizeChange(newSize));
  };
}