import { NextRequest, NextResponse } from 'next/server';
import { updateAgentPassword, UpdatePasswordRequest } from '../agents/route';

export async function POST(request: NextRequest) {
  try {
    const body: UpdatePasswordRequest = await request.json();
    
    // Validate required fields
    if (!body.email || !body.agent_id || !body.password) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields: email, agent_id, password' },
        { status: 400 }
      );
    }
    
    const result = await updateAgentPassword(body);
    
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
