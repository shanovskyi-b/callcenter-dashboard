import { Component, OnInit } from '@angular/core';

import { AgentsService } from '../../services/agents/agents.service';
import { Agent } from '../../models/agent/agent';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss']
})
export class AgentsComponent implements OnInit {
  agents: Agent[];
  
  constructor(private agentsService: AgentsService) {
    this.agents = agentsService.agents;
  }

  ngOnInit() {
  }

}
