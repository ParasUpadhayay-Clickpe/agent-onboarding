# Agent Onboarding Portal - Refactored Structure

This project has been refactored into a modular, maintainable structure with separate components and API controllers.

## 📁 Project Structure

```
app/
├── api/
│   └── agents/
│       └── route.ts              # API controller for agent creation
├── components/
│   ├── AgentForm.tsx             # Main form component (refactored)
│   ├── EmailOTP.tsx              # Email verification component
│   ├── PANVerification.tsx       # PAN verification component
│   ├── PersonalDetails.tsx       # Personal information step
│   ├── AddressDetails.tsx        # Address information step
│   ├── FinancialDetails.tsx      # Financial information step
│   ├── AgentConfiguration.tsx   # Agent configuration step
│   └── ReviewStep.tsx           # Review and submit step
├── services/
│   ├── agentService.ts          # Agent API service
│   └── verificationService.ts   # Verification API service
├── utils/
│   └── formValidator.ts         # Form validation utilities
├── page.tsx                     # Main page component
└── layout.tsx                   # App layout
```

## 🔧 Components Overview

### API Layer
- **`/api/agents/route.ts`**: Main API controller handling agent creation, email OTP, and PAN verification
- **`agentService.ts`**: Service class for agent-related API calls
- **`verificationService.ts`**: Service class for verification-related API calls

### Form Components
- **`AgentForm.tsx`**: Main orchestrator component managing form state and navigation
- **`EmailOTP.tsx`**: Handles email verification with OTP sending and verification
- **`PANVerification.tsx`**: Handles PAN verification with inline verification button
- **`PersonalDetails.tsx`**: Personal information form (name, gender, DOB)
- **`AddressDetails.tsx`**: Address information form (address, district, state, PIN)
- **`FinancialDetails.tsx`**: Financial information form (PAN, IFSC, account details)
- **`AgentConfiguration.tsx`**: Agent configuration form (FOS/DSA, contract/commission)
- **`ReviewStep.tsx`**: Review step showing all entered information

### Utilities
- **`formValidator.ts`**: Centralized validation logic with step-specific validation

## 🚀 Key Features

### Modular Architecture
- **Separation of Concerns**: Each component has a single responsibility
- **Reusable Components**: Components can be easily reused or modified
- **Clean API Layer**: Centralized API handling with proper error management

### Form Flow
- **Referred Users**: 4-step process (Email → Personal → Config → Review)
- **Self-Onboarding**: 6-step process (Email → Personal → Address → Financial → Config → Review)
- **Dynamic Validation**: Step-specific validation with real-time error handling
- **Email Verification**: OTP-based email verification for both user types

### API Integration
- **RESTful API**: Clean API endpoints for agent creation and verification
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Loading States**: Proper loading indicators for all async operations

## 🔄 Data Flow

1. **Form State**: Managed in `AgentForm.tsx` and passed down to step components
2. **Validation**: Handled by `FormValidator` utility class
3. **API Calls**: Managed by service classes (`AgentService`, `VerificationService`)
4. **Navigation**: Step-by-step navigation with validation checks

## 🛠️ Usage

### Running the Application
```bash
npm run dev
```

### API Endpoints
- `POST /api/agents` - Create new agent
- Email OTP and PAN verification are handled internally

### Environment Variables
Create a `.env.local` file with:
```
# Add any required environment variables here
```

## 📝 Benefits of Refactoring

1. **Maintainability**: Each component has a clear purpose and is easy to modify
2. **Testability**: Components can be tested in isolation
3. **Reusability**: Components can be reused across different parts of the application
4. **Scalability**: Easy to add new steps or modify existing ones
5. **Code Organization**: Clear separation between UI, business logic, and API calls
6. **Error Handling**: Centralized error handling with consistent user experience

## 🔧 Customization

### Adding New Steps
1. Create a new component in `/components/`
2. Add the step to the `steps` array in `AgentForm.tsx`
3. Add validation logic in `formValidator.ts`
4. Update the `renderStepContent()` function

### Modifying Validation
- Update `FormValidator.validateStep()` method
- Add new validation methods as needed

### API Integration
- Modify service classes in `/services/`
- Update API endpoints in `/api/agents/route.ts`

This refactored structure makes the codebase much more maintainable and easier to work with!
