import { Injectable } from '@angular/core';

import { CallcenterDataService } from '../callcenter-data/callcenter-data.service';
import { NotificationService } from '../notification/notification.service';
import { Call } from '../../models/call/call';
import { ICall } from '../../models/call/call.interface';

@Injectable({
  providedIn: 'root'
})
export class CallsService {
  calls: Call[] = [];

  constructor(
    private callcenterDataService: CallcenterDataService, 
    private notificationService: NotificationService
  ) { 
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
        if (findedCall.status !== call.status) {
          this.notificationService.showNotification(`Call changed status to ${call.status} ('${call.type}': ${call.callerNumber} -> ${call.callerNumber}) `)
        }

        findedCall.update(call.status);
      } else {
        this.calls.push(new Call(call))
        
        if (call.status === 'WAITING') {
          this.notificationService.showNotification(`New '${call.type}' Call: ${call.callerNumber} -> ${call.callerNumber}`)
        }
      }
    });
  }
}
