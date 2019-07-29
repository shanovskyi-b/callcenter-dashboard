import { Pipe, PipeTransform } from '@angular/core';

import { Call } from '../../models/call/call';
import { CallStatusPriority } from '../../models/call/call.interface';

@Pipe({
  name: 'callsSort',
  pure: false
})
export class CallsSortPipe implements PipeTransform {

  transform(calls: Call[]): Call[] {
    return calls.sort(this.compareCalls);
  }

  private compareCalls(callA: Call, callB: Call) {
    return (
      <any> CallStatusPriority[callA.status] - <any> CallStatusPriority[callB.status]
      || callB.timeInStatus - callA.timeInStatus
    );
  }

}
