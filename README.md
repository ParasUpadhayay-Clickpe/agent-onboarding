# Agent Onboarding Portal

A modern, step-by-step Next.js application for agent onboarding with OTP verification and referral system.

## Features

- **Step-by-Step Process**: 6-step guided onboarding experience
- **OTP Verification**: Mobile number verification with OTP
- **Referral System**: Automatic referral detection from URL parameters
- **Auto-Generated Agent ID**: System generates unique agent IDs
- **Modern UI**: Beautiful gradient design with animations
- **Form Validation**: Real-time validation with error messages
- **Responsive Design**: Works perfectly on all devices
- **Progress Tracking**: Visual progress indicator
- **API Integration**: Seamless API gateway integration

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env.local` file in the root directory and add:
```
NEXT_PUBLIC_API_URL=https://your-api-gateway-url
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## URL Parameters

The application supports referral links with the following format:
```
https://agent.clickpe.ai?referredby=AGENT123
```

The `referredby` parameter will be automatically captured and used as the referral agent ID.

## Onboarding Steps

1. **Mobile Verification**: Enter mobile number and verify with OTP
2. **Personal Details**: Basic personal information
3. **Address Information**: Residential address details
4. **Financial Details**: Banking and PAN information
5. **Agent Configuration**: FOS/DSA and contract type selection
6. **Review & Submit**: Final review and submission

## API Integration

The application makes a POST request to `${NEXT_PUBLIC_API_URL}/create-agent` with the following payload structure:

```json
{
  "body": {
    "agent_id": "AGENT_1703123456789_ABC12",
    "mob_num": "9876543211",
    "fname": "Jane",
    "lname": "Smith",
    "email": "jane.smith@example.com",
    "gender": "Female",
    "dob": "1985-05-15",
    "home_address1": "456 Oak Avenue",
    "home_district": "Delhi",
    "home_state": "Delhi",
    "home_pin_code": "110001",
    "pan": "FGHIJ5678K",
    "ifsc": "HDFC0001234",
    "acc_num": "9876543210",
    "beneficiary_name": "Jane Smith",
    "fos_or_dsa": "DSA",
    "contract_or_commission": "Contract",
    "referred_by": "AGENT123"
  }
}
```

## Key Features

### OTP Verification
- Mobile number validation
- OTP sending simulation
- OTP verification process
- Visual feedback for verification status

### Referral System
- Automatic detection from URL parameters
- Visual indication of referral agent
- Self-onboarding when no referral is provided

### Auto-Generated Agent ID
- Unique agent ID generation using timestamp and random string
- Format: `AGENT_{timestamp}_{randomString}`

### Form Validation
- Step-by-step validation
- Real-time error clearing
- Email format validation
- Mobile number format (10-digit Indian numbers)
- PAN number format validation
- Required field validation

## Technologies Used

- Next.js 16 with App Router
- React 19 with Suspense
- TypeScript
- Tailwind CSS
- useSearchParams for URL parameter handling
- Modern gradient design and animations
