# API Integration Documentation

## 🔗 API Endpoints

### 1. Send Email OTP
**Endpoint:** `https://notification-{stage}.dailype.in/send_email_notifications`
**Method:** POST
**Content-Type:** application/json

**Request Body:**
```json
{
  "notification_channel": "email_notification",
  "notification_template_id": "email_verification",
  "user_data": {
    "name": "John Doe",
    "user_id": "12345"
  },
  "recipients": [
    "john@example.com"
  ],
  "verification_type": "normal"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent successfully"
}
```

### 2. Verify Email OTP
**Endpoint:** `https://notification-{stage}.dailype.in/verify_email_otp`
**Method:** POST
**Content-Type:** application/json

**Request Body:**
```json
{
  "email": "john@example.com",
  "otp": "862233"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

### 3. Create Agent
**Endpoint:** `https://los-{stage}.dailype.in/create_agent`
**Method:** POST
**Content-Type:** application/json

**Request Body:**
```json
{
  "mob_num": "8888888888",
  "fname": "John",
  "mname": "Michael", // Optional
  "lname": "Doe",
  "dob": "1990-01-01",
  "gender": "M", // M, F, or Other
  "home_address1": "123 Main Street",
  "home_address2": "Apt 4B", // Optional
  "home_district": "Delhi",
  "home_state": "Delhi",
  "home_pin_code": 110001,
  "office_address1": "456 Office St", // Optional
  "office_address2": "Floor 2", // Optional
  "office_district": "Mumbai", // Optional
  "office_state": "Maharashtra", // Optional
  "office_pin_code": 400001, // Optional
  "email": "john@example.com",
  "onboarding_date": "2024-01-01",
  "pan": "ABCDE1234F",
  "ifsc": "HDFC0001234",
  "acc_num": "1234567890",
  "beneficiary_name": "John Doe",
  "fos_or_dsa": "FOS", // FOS or DSA
  "contract_or_commission": "Contract", // Contract or Commission
  "parent_agent_id": "self-onboard" // or actual agent ID for referrals
}
```

**Response:**
```json
{
  "success": true,
  "message": "Agent created successfully",
  "agent_id": "8937631f-ab45-4464-abf3-1a30c49bb596"
}
```

### 4. Update Agent Password
**Endpoint:** `https://notification-{stage}.dailype.in/agent_update_password`
**Method:** POST
**Content-Type:** application/json

**Request Body:**
```json
{
  "email": "john@example.com",
  "agent_id": "8937631f-ab45-4464-abf3-1a30c49bb596",
  "password": "NewSecurePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password updated successfully"
}
```

## 🔧 Environment Configuration

Create a `.env.local` file in your project root:

```env
# Set the stage for API endpoints
STAGE=dev
```

**Available Stages:**
- `dev` - Development environment
- `staging` - Staging environment
- `prod` - Production environment

## 📋 Form Flow

### Referred Users (URL: `agent.clickpe.ai/referredby=agentID`)
1. **Email Verification** - Email + Password + OTP
2. **Personal Details** - Name, Gender, DOB
3. **Agent Configuration** - FOS/DSA, Contract/Commission
4. **Review & Submit** - Final review

### Self-Onboarding Users
1. **Email Verification** - Email + Password + OTP
2. **Personal Details** - Name, Gender, DOB
3. **Address Information** - Home address details
4. **Financial Details** - PAN + Banking info
5. **Agent Configuration** - FOS/DSA, Contract/Commission
6. **Review & Submit** - Final review

## 🔄 API Integration Flow

1. **Email Verification:**
   - User enters email and password
   - API call to `notification-{stage}.dailype.in/send_email_notifications`
   - User receives OTP via email
   - User enters OTP
   - API call to `notification-{stage}.dailype.in/verify_email_otp`
   - Email verification completed

2. **Form Submission:**
   - User fills out the multi-step form
   - Form data is validated at each step
   - On final submission, agent creation API is called

3. **Agent Creation:**
   - API call to `los-{stage}.dailype.in/create_agent`
   - Returns `agent_id` on success

4. **Password Update:**
   - Immediately after successful agent creation
   - API call to `notification-{stage}.dailype.in/agent_update_password`
   - Uses the returned `agent_id` from step 3

5. **Success Handling:**
   - All operations must succeed
   - User sees success message with agent ID
   - Form resets after 3 seconds

## 🛠️ Error Handling

- **Network Errors:** Graceful fallback with user-friendly messages
- **Validation Errors:** Real-time validation with specific error messages
- **API Errors:** Display actual error messages from the API
- **Partial Success:** Handle cases where agent is created but password update fails

## 📝 Notes

- **PIN Code:** Must be a number (not string)
- **Gender:** Use "M", "F", or "Other" (single character)
- **Optional Fields:** Middle name, office address fields are optional
- **Date Format:** Use YYYY-MM-DD format for dates
- **PAN Format:** Must match pattern `[A-Z]{5}[0-9]{4}[A-Z]{1}`
- **Mobile:** Must be 10 digits starting with 6-9
