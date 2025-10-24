import { CreateAgentRequest, CreateAgentResponse, UpdatePasswordRequest, UpdatePasswordResponse } from '../api/agents/route';

export class AgentService {
  private static baseUrl = '/api/agents';

  static async createAgent(agentData: CreateAgentRequest): Promise<CreateAgentResponse> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agentData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating agent:', error);
      return {
        success: false,
        message: 'Failed to create agent. Please try again.'
      };
    }
  }

  static async updatePassword(passwordData: UpdatePasswordRequest): Promise<UpdatePasswordResponse> {
    try {
      const response = await fetch('/api/agents/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(passwordData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating password:', error);
      return {
        success: false,
        message: 'Failed to update password. Please try again.'
      };
    }
  }
}
