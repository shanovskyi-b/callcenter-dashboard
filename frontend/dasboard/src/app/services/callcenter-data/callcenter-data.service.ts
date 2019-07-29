import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket } from "rxjs/webSocket";

@Injectable({
  providedIn: 'root'
})
export class CallcenterDataService {
  private ws: Observable<any>  = webSocket("ws://localhost:8080");

  constructor() { }

  getData(): Observable<any> {
    return this.ws;
  }
}
