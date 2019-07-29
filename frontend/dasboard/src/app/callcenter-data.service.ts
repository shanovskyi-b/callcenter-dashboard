import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket } from "rxjs/webSocket";

@Injectable({
  providedIn: 'root'
})
export class CallcenterDataService {

  constructor() { }

  getData(): Observable<any> {
    return webSocket("ws://localhost:8080");
  }
}
