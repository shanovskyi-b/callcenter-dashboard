export type AgentStatus = 'IDLE' | 'IN CALL' | 'PAUSED';

export interface IAgent {
  name: string,
  number: string,
  status: AgentStatus
}
