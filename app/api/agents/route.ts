import { NextRequest, NextResponse } from 'next/server';

export interface AgentData {
  mob_num: string;
  fname: string;
  mname?: string;
  lname: string;
  dob: string;
  gender: string;
  home_address1: string;
  home_address2?: string;
  home_district: string;
  home_state: string;
  home_pin_code: number;
  office_address1?: string;
  office_address2?: string;
  office_district?: string;
  office_state?: string;
  office_pin_code?: number;
  email: string;
  onboarding_date: string;
  pan: string;
  ifsc: string;
  acc_num: string;
  beneficiary_name: string;
  fos_or_dsa: string;
  contract_or_commission: string;
  parent_agent_id: string;
  password: string; // For password update
}

export interface CreateAgentRequest {
  mob_num: string;
  fname: string;
  mname?: string;
  lname: string;
  dob: string;
  gender: string;
  home_address1: string;
  home_address2?: string;
  home_district: string;
  home_state: string;
  home_pin_code: number;
  office_address1?: string;
  office_address2?: string;
  office_district?: string;
  office_state?: string;
  office_pin_code?: number;
  email: string;
  onboarding_date: string;
  pan: string;
  ifsc: string;
  acc_num: string;
  beneficiary_name: string;
  fos_or_dsa: string;
  contract_or_commission: string;
  parent_agent_id: string;
}

export interface CreateAgentResponse {
  success: boolean;
  message: string;
  agent_id?: string;
}

export interface UpdatePasswordRequest {
  email: string;
  agent_id: string;
  password: string;
}

export interface SendEmailOTPRequest {
  notification_channel: string;
  notification_template_id: string;
  user_data: {
    name: string;
    user_id: string;
  };
  recipients: string[];
  verification_type: string;
}

export interface VerifyEmailOTPRequest {
  email: string;
  otp: string;
}

export interface EmailOTPResponse {
  success: boolean;
  message: string;
}

export interface UpdatePasswordResponse {
  success: boolean;
  message: string;
}

// Email verification API calls
export const sendEmailOTP = async (email: string, userName: string = 'User'): Promise<EmailOTPResponse> => {
  try {
    // Get stage from environment variable or default to 'dev'
    const stage = process.env.STAGE || 'dev';

    const requestData: SendEmailOTPRequest = {
      notification_channel: 'email_notification',
      notification_template_id: 'email_verification',
      user_data: {
        name: userName,
        user_id: Date.now().toString() // Generate a temporary user ID
      },
      recipients: [email],
      verification_type: 'normal'
    };

    const response = await fetch(`https://notification-${stage}.dailype.in/send_email_notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      // Handle 400 Bad Request - extract message from response body
      if (response.status === 400) {
        try {
          const errorResult = await response.json();
          return {
            success: false,
            message: errorResult.message || 'Bad Request'
          };
        } catch (parseError) {
          return {
            success: false,
            message: 'Bad Request'
          };
        }
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    return {
      success: true,
      message: 'OTP sent to your email successfully'
    };
  } catch (error) {
    console.error('Error sending email OTP:', error);
    return {
      success: false,
      message: 'Failed to send OTP. Please try again.'
    };
  }
};

export const verifyEmailOTP = async (email: string, otp: string): Promise<EmailOTPResponse> => {
  try {
    // Get stage from environment variable or default to 'dev'
    const stage = process.env.STAGE || 'dev';

    const requestData: VerifyEmailOTPRequest = {
      email: email,
      otp: otp
    };

    const response = await fetch(`https://notification-${stage}.dailype.in/verify_email_otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    // Check if the API response indicates success
    if (result.success !== false) {
      return {
        success: true,
        message: 'Email verified successfully'
      };
    } else {
      return {
        success: false,
        message: result.message || 'Invalid OTP. Please try again.'
      };
    }
  } catch (error) {
    console.error('Error verifying email OTP:', error);
    return {
      success: false,
      message: 'Failed to verify OTP. Please try again.'
    };
  }
};

export const verifyPAN = async (pan: string): Promise<{ success: boolean; message: string }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate PAN verification
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  if (panRegex.test(pan)) {
    return {
      success: true,
      message: 'PAN verified successfully'
    };
  }

  return {
    success: false,
    message: 'Invalid PAN format'
  };
};

export const createAgent = async (agentData: CreateAgentRequest): Promise<CreateAgentResponse> => {
  try {
    // Get stage from environment variable or default to 'dev'
    const stage = process.env.STAGE || 'dev';

    console.log('Sending to external API:', `https://los-${stage}.dailype.in/create_agent`);
    console.log('External API payload:', JSON.stringify(agentData, null, 2));

    const response = await fetch(`https://los-${stage}.dailype.in/create_agent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(agentData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('External API Error Response:', errorText);
      console.error('External API Response Status:', response.status);
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('External API Success Response:', result);

    return {
      success: true,
      message: result.message || 'Agent created successfully!',
      agent_id: result.agent_id
    };
  } catch (error) {
    console.error('Error creating agent:', error);
    return {
      success: false,
      message: 'Failed to create agent. Please try again.'
    };
  }
};

export const updateAgentPassword = async (passwordData: UpdatePasswordRequest): Promise<UpdatePasswordResponse> => {
  try {
    // Get stage from environment variable or default to 'dev'
    const stage = process.env.STAGE || 'dev';

    const response = await fetch(`https://notification-${stage}.dailype.in/agent_update_password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(passwordData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    return {
      success: true,
      message: result.message || 'Password updated successfully!'
    };
  } catch (error) {
    console.error('Error updating password:', error);
    return {
      success: false,
      message: 'Failed to update password. Please try again.'
    };
  }
};

// API Routes
export async function POST(request: NextRequest) {
  try {
    const body: CreateAgentRequest = await request.json();

    console.log('Received agent creation request:', JSON.stringify(body, null, 2));

    // Validate required fields
    if (!body.mob_num || !body.fname || !body.lname || !body.email) {
      console.error('Missing required fields:', {
        mob_num: !!body.mob_num,
        fname: !!body.fname,
        lname: !!body.lname,
        email: !!body.email
      });
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await createAgent(body);

    return NextResponse.json(result);
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
