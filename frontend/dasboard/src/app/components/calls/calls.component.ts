import { Component, OnInit } from '@angular/core';

import { CallsService } from '../../services/calls/calls.service';

@Component({
  selector: 'app-calls',
  templateUrl: './calls.component.html',
  styleUrls: ['./calls.component.scss']
})

export class CallsComponent implements OnInit {
  constructor(private callsService: CallsService) { 
  }

  ngOnInit() {
    
  }

  getCompletedNumber() {
    return this.callsService.calls.reduce((res, call) => (
      call.status == 'COMPLETED' ? res + 1 : res
    ), 0);
  }

}
