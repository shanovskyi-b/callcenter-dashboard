export enum CallStatusPriority {
  'WAITING', 
  'ACTIVE', 
  'COMPLETED'
}
export type CallStatus = keyof typeof CallStatusPriority;
export type CallType = 'IN' | 'OUT';

export interface ICall {
	type: CallType;
	status: CallStatus;
	callerNumber: string;
	callingNumber: string;
}
