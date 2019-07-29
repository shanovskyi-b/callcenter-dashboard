import { Agent } from './agent';

describe('Agent', () => {
  it('should create an instance', () => {
    expect(new Agent({ name: 'Jack', number: '+17000000', status: 'IDLE' })).toBeTruthy();
  });
});
