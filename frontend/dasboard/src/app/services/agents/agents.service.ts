import { Injectable } from '@angular/core';

import { CallcenterDataService } from '../callcenter-data/callcenter-data.service';
import { Agent } from '../../models/agent/agent';
import { IAgent } from '../../models/agent/agent.interface';

@Injectable({
  providedIn: 'root'
})
export class AgentsService {
  agents: Agent[] = [];

  constructor(private callcenterDataService: CallcenterDataService) { 
    callcenterDataService.getData()
      .subscribe(({ agents }: { agents: IAgent }) => {
        this.updateAgents(agents);
      })
  }

  private updateAgents(newAgents) {
    newAgents.forEach(agent => {
      const findedAgent = this.agents.find(a => (
        agent.name === a.name 
        && agent.number === a.number
      ));
      
      if (findedAgent) {
        findedAgent.update(agent.status);
      } else {
        this.agents.push(new Agent(agent))
      }
    });

    // remove deleted agents
    this.agents.forEach(agent => {
      const findedAgentIndex = newAgents.findIndex(a => (
        agent.name === a.name 
        && agent.number === a.number
      ));
      
      if (findedAgentIndex !== -1) {
        this.agents.splice(findedAgentIndex, 1);
      }
    });
  }
  
}
