import { Directive, EventEmitter, Input, Output, HostListener, ElementRef } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';


@Directive({
  selector: '[appDragger]'
})
export class DraggerDirective {
  @Output() onPositionChange = new EventEmitter<{ x: number, y: number }>();

  private startPoint: { 
    x: number, 
    y: number
  };
  private startPointOffset: { 
    top: number, 
    left: number
  };
  private mouseMoveSubscription: Subscription;
  private mouseUpSubscription: Subscription;

  constructor(private elRef:ElementRef) { }

  @HostListener('mousedown', ['$event'])
  dragStart(event) {
    console.log('event', event)
    this.startPoint = {
      x: event.clientX,
      y: event.clientY
    };
    this.startPointOffset = getOffsetRect(this.elRef.nativeElement);
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

    if(event.stopPropagation) event.stopPropagation();
    if(event.preventDefault) event.preventDefault();
    event.cancelBubble = true;
    event.returnValue = false;
  };

  dragEnd(event) {
    this.mouseUpSubscription.unsubscribe();
    this.mouseMoveSubscription.unsubscribe();
  };

  dragging(event) {
    const mouseOffset = {
      x: event.clientX - this.startPoint.x,
      y: event.clientY - this.startPoint.y
    };

    const elementOffset = getOffsetRect(this.elRef.nativeElement);
    console.log('element offset', this.startPointOffset.top, elementOffset.top, elementOffset.top - this.startPointOffset.top)
    
    this.onPositionChange.emit({
      x: mouseOffset.x - (elementOffset.left - this.startPointOffset.left),
      y: mouseOffset.y - (elementOffset.top - this.startPointOffset.top),
    });

    // this.onPositionChange.emit(mouseOffset);
  };
}

function getOffsetRect(element) : { top: number, left: number } {
  const box = element.getBoundingClientRect();
  
  const body = document.body;
  const docElem = document.documentElement;
  
  const scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
  const scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
  
  const clientTop = docElem.clientTop || body.clientTop || 0;
  const clientLeft = docElem.clientLeft || body.clientLeft || 0;
  
  const top  = box.top +  scrollTop - clientTop;
  const left = box.left + scrollLeft - clientLeft;
  
  return { top: Math.round(top), left: Math.round(left) };
}
