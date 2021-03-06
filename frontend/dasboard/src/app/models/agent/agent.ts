import { IAgent, AgentStatus } from './agent.interface';

export class Agent implements IAgent {
  name: string;
  number: string;
  status: AgentStatus;
  callsNumber: number = 0;
  effectiveCallsNumber: number = 0;
  timeInStatus: number = 0;
  timeLoggedIn: number = 0;
  private statusChangeDate: Date;
  private creationDate: Date;

  constructor({ name, number, status }: IAgent) {
    this.name = name;
    this.number = number;
    this.status = status;

    this.statusChangeDate = new Date();
    this.creationDate = new Date();
  }

  update(status: AgentStatus) {
    if (this.status !== status) {
      if (this.status === 'IN CALL') {
        this.callsNumber++;
        if (new Date().getUTCSeconds() - this.statusChangeDate.getUTCSeconds() > 3) {
          this.effectiveCallsNumber++;
        }
      }

      this.status = status;
      this.statusChangeDate = new Date();
    }

    this.updateTimers();
  }

  private updateTimers() {
    const now = Date.now();
    
    this.timeInStatus = Math.round((now - <any> this.statusChangeDate) / 1000);
    this.timeLoggedIn = Math.round((now - <any> this.creationDate) / 1000);
  }

}
