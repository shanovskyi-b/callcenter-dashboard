import { ICall, CallStatus } from './call.interface';

export class Call implements ICall {
  type;
  status;
  callerNumber;
  callingNumber;
  timeInStatus: number = 0;
  private statusChangeDate: Date;

  constructor({ type, status, callerNumber, callingNumber }: ICall) {
    this.type = type;
    this.status = status;
    this.callerNumber = callerNumber;
    this.callingNumber = callingNumber;

    this.statusChangeDate = new Date();
  }

  update(status: CallStatus) {
    if (this.status !== status) {
      this.status = status;
      this.statusChangeDate = new Date();
    }

    this.timeInStatus = Math.round((Date.now() - <any> this.statusChangeDate) / 1000);
  }
}
