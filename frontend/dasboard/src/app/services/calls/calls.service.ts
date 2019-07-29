import { Injectable } from '@angular/core';

import { CallcenterDataService } from '../callcenter-data/callcenter-data.service';
import { Call } from '../../models/call/call';
import { ICall } from '../../models/call/call.interface';

@Injectable({
  providedIn: 'root'
})
export class CallsService {
  calls: Call[] = [];

  constructor(private callcenterDataService: CallcenterDataService) { 
    callcenterDataService.getData()
      .subscribe(({ calls }: { calls: ICall[] }) => {
        this.updateCalls(calls)
      }) 
  }

  private updateCalls(newCalls) {
    newCalls.forEach(call => {
      const findedCall = this.calls.find(c => (
        call.type === c.type 
        && call.callerNumber === c.callerNumber
        && call.callingNumber === c.callingNumber
      ));

      if (findedCall) {
        findedCall.update(call.status);
      } else {
        this.calls.push(new Call(call))
      }
    });
  }
}
