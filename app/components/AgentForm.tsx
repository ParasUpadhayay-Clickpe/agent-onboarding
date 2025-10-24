'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { AgentData, CreateAgentRequest } from '../api/agents/route';
import { FormValidator, ValidationErrors } from '../utils/formValidator';
import { AgentService } from '../services/agentService';
import EmailOTP from './EmailOTP';
import PasswordCreation from './PasswordCreation';
import PersonalDetails from './PersonalDetails';
import AddressDetails from './AddressDetails';
import FinancialDetails from './FinancialDetails';
import AgentConfiguration from './AgentConfiguration';
import ReviewStep from './ReviewStep';

export default function AgentForm() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [emailOtpVerified, setEmailOtpVerified] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const [formData, setFormData] = useState<AgentData>({
    mob_num: '',
    fname: '',
    mname: '',
    lname: '',
    dob: '',
    gender: '',
    home_address1: '',
    home_address2: '',
    home_district: '',
    home_state: '',
    home_pin_code: 0,
    office_address1: '',
    office_address2: '',
    office_district: '',
    office_state: '',
    office_pin_code: 0,
    email: '',
    onboarding_date: '',
    pan: '',
    ifsc: '',
    acc_num: '',
    beneficiary_name: '',
    fos_or_dsa: '',
    contract_or_commission: '',
    parent_agent_id: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');

  // Get referred_by from URL parameter
  useEffect(() => {
    const referredBy = searchParams.get('referredby');
    if (referredBy) {
      setFormData(prev => ({
        ...prev,
        parent_agent_id: referredBy
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        parent_agent_id: 'self-onboard'
      }));
    }

    // Set onboarding date to today
    const today = new Date().toISOString().split('T')[0];
    setFormData(prev => ({
      ...prev,
      onboarding_date: today
    }));
  }, [searchParams]);

  const isReferred = formData.parent_agent_id !== 'self-onboard';

  const steps = isReferred ? [
    { id: 1, title: 'Email Verification', description: 'Verify your email address' },
    { id: 2, title: 'Personal Details', description: 'Basic information' },
    { id: 3, title: 'Agent Configuration', description: 'Agent settings' },
    { id: 4, title: 'Review & Submit', description: 'Final review' }
  ] : [
    { id: 1, title: 'Email Verification', description: 'Verify your email address' },
    { id: 2, title: 'Personal Details', description: 'Basic information' },
    { id: 3, title: 'Address Information', description: 'Residential address' },
    { id: 4, title: 'Financial Details', description: 'Banking information' },
    { id: 5, title: 'Agent Configuration', description: 'Agent settings' },
    { id: 6, title: 'Review & Submit', description: 'Final review' }
  ];

  const getCardWidth = () => {
    if (isReferred) {
      // Referred user flow
      switch (currentStep) {
        case 1: // Email verification - small
          return 'max-w-md';
        case 2: // Password creation - small
          return 'max-w-md';
        case 3: // Personal details - medium
          return 'max-w-2xl';
        case 4: // Agent config - small
          return 'max-w-lg';
        case 5: // Review - wide
          return 'max-w-4xl';
        default:
          return 'max-w-2xl';
      }
    } else {
      // Self-onboarding flow
      switch (currentStep) {
        case 1: // Email verification - small
          return 'max-w-md';
        case 2: // Password creation - small
          return 'max-w-md';
        case 3: // Personal details - medium
          return 'max-w-2xl';
        case 4: // Address - wide
          return 'max-w-4xl';
        case 5: // Financial - medium
          return 'max-w-2xl';
        case 6: // Agent config - small
          return 'max-w-lg';
        case 7: // Review - wide
          return 'max-w-4xl';
        default:
          return 'max-w-3xl';
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Handle numeric fields
    let processedValue: any = value;
    if (name === 'home_pin_code' || name === 'office_pin_code') {
      processedValue = value === '' ? 0 : parseInt(value, 10) || 0;
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePanChange = (pan: string) => {
    setFormData(prev => ({
      ...prev,
      pan
    }));

    if (errors.pan) {
      setErrors(prev => ({
        ...prev,
        pan: ''
      }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors = FormValidator.validateStep(step, formData, isReferred);

    // Add confirmPassword validation for step 2 (password creation)
    if (step === 2) {
      const confirmPasswordError = FormValidator.validateConfirmPassword(formData.password, confirmPassword);
      if (confirmPasswordError) {
        newErrors.confirmPassword = confirmPasswordError;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 1 && !emailOtpVerified) {
        setErrors({ email: 'Please verify your email first' });
        return;
      }
      if (isReferred) {
        setCurrentStep(prev => Math.min(prev + 1, 5));
      } else {
        setCurrentStep(prev => Math.min(prev + 1, 7));
      }
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Prepare agent data for API (exclude password from create request)
      const { password, ...agentCreateData } = formData;

      // Clean and validate data before sending
      const cleanedData: any = {
        ...agentCreateData,
        // Ensure PIN codes are numbers, not strings
        home_pin_code: parseInt(agentCreateData.home_pin_code.toString()) || 0,
        office_pin_code: agentCreateData.office_pin_code ? parseInt(agentCreateData.office_pin_code.toString()) : undefined,
        // Ensure gender is single character
        gender: agentCreateData.gender === 'Male' ? 'M' : agentCreateData.gender === 'Female' ? 'F' : 'O',
        // Remove empty optional fields to avoid API issues
        mname: agentCreateData.mname || undefined,
        home_address2: agentCreateData.home_address2 || undefined,
        office_address1: agentCreateData.office_address1 || undefined,
        office_address2: agentCreateData.office_address2 || undefined,
        office_district: agentCreateData.office_district || undefined,
        office_state: agentCreateData.office_state || undefined,
      };

      // Remove undefined fields
      Object.keys(cleanedData).forEach(key => {
        if (cleanedData[key] === undefined) {
          delete cleanedData[key];
        }
      });


      console.log('Cleaned agent data:', JSON.stringify(cleanedData, null, 2));

      // Create agent
      const createResult = await AgentService.createAgent(cleanedData);

      if (createResult.success && createResult.agent_id) {
        // Update password after successful agent creation
        const passwordResult = await AgentService.updatePassword({
          email: formData.email,
          agent_id: createResult.agent_id,
          password: formData.password
        });

        if (passwordResult.success) {
          setSubmitMessage(`Success! Agent created with ID: ${createResult.agent_id}. Password updated successfully.`);
        } else {
          setSubmitMessage(`Agent created with ID: ${createResult.agent_id}, but password update failed: ${passwordResult.message}`);
        }

        // Reset form after success
        setTimeout(() => {
          setFormData({
            mob_num: '',
            fname: '',
            mname: '',
            lname: '',
            dob: '',
            gender: '',
            home_address1: '',
            home_address2: '',
            home_district: '',
            home_state: '',
            home_pin_code: 0,
            office_address1: '',
            office_address2: '',
            office_district: '',
            office_state: '',
            office_pin_code: 0,
            email: '',
            onboarding_date: '',
            pan: '',
            ifsc: '',
            acc_num: '',
            beneficiary_name: '',
            fos_or_dsa: '',
            contract_or_commission: '',
            parent_agent_id: '',
            password: '',
          });
          setCurrentStep(1);
          setEmailOtpVerified(false);
          setConfirmPassword('');
        }, 3000);
      } else {
        setSubmitMessage(`Error: ${createResult.message}`);
      }
    } catch (error) {
      setSubmitMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    if (isReferred) {
      // Referred user flow
      switch (currentStep) {
        case 1: // Email verification
          return (
            <EmailOTP
              email={formData.email}
              userName={formData.fname && formData.lname ? `${formData.fname} ${formData.lname}` : 'User'}
              onEmailChange={(email) => handleInputChange({ target: { name: 'email', value: email } } as any)}
              onVerificationComplete={() => setEmailOtpVerified(true)}
              errors={errors}
            />
          );

        case 2: // Password creation
          return (
            <PasswordCreation
              password={formData.password}
              confirmPassword={confirmPassword}
              onPasswordChange={(password) => handleInputChange({ target: { name: 'password', value: password } } as any)}
              onConfirmPasswordChange={setConfirmPassword}
              errors={errors}
            />
          );

        case 3: // Personal details
          return (
            <PersonalDetails
              formData={formData}
              onInputChange={handleInputChange}
              errors={errors}
            />
          );

        case 4: // Agent configuration
          return (
            <AgentConfiguration
              formData={formData}
              onInputChange={handleInputChange}
              errors={errors}
            />
          );

        case 5: // Review
          return (
            <ReviewStep
              formData={formData}
              isReferred={isReferred}
            />
          );

        default:
          return null;
      }
    } else {
      // Self-onboarding flow
      switch (currentStep) {
        case 1: // Email verification
          return (
            <EmailOTP
              email={formData.email}
              userName={formData.fname && formData.lname ? `${formData.fname} ${formData.lname}` : 'User'}
              onEmailChange={(email) => handleInputChange({ target: { name: 'email', value: email } } as any)}
              onVerificationComplete={() => setEmailOtpVerified(true)}
              errors={errors}
            />
          );

        case 2: // Password creation
          return (
            <PasswordCreation
              password={formData.password}
              confirmPassword={confirmPassword}
              onPasswordChange={(password) => handleInputChange({ target: { name: 'password', value: password } } as any)}
              onConfirmPasswordChange={setConfirmPassword}
              errors={errors}
            />
          );

        case 3: // Personal details
          return (
            <PersonalDetails
              formData={formData}
              onInputChange={handleInputChange}
              errors={errors}
            />
          );

        case 4: // Address
          return (
            <AddressDetails
              formData={formData}
              onInputChange={handleInputChange}
              errors={errors}
            />
          );

        case 5: // Financial details
          return (
            <FinancialDetails
              formData={formData}
              onInputChange={handleInputChange}
              onPanChange={handlePanChange}
              errors={errors}
            />
          );

        case 6: // Agent configuration
          return (
            <AgentConfiguration
              formData={formData}
              onInputChange={handleInputChange}
              errors={errors}
            />
          );

        case 7: // Review
          return (
            <ReviewStep
              formData={formData}
              isReferred={isReferred}
            />
          );

        default:
          return null;
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className={`w-full ${getCardWidth()} transition-all duration-300`}>
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 p-6 md:p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-white rounded-full shadow-lg shadow-blue-500/25 p-2 flex-shrink-0">
                <Image
                  src="/ClickPe.png"
                  alt="ClickPe Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-blue-300 bg-clip-text text-transparent">
                Agent Onboarding Portal
              </h1>
            </div>
            <p className="text-gray-300 text-center">
              Join our agent network in just a few simple steps
            </p>
          </div>

          {/* Step Content */}
          <div className="mb-6">
            {renderStepContent()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-3 bg-gray-700 text-white rounded-xl font-medium hover:bg-gray-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="text-center">
              <span className="text-sm text-gray-400">
                Step {currentStep} of {steps.length}
              </span>
              <div className="text-xs text-gray-500 mt-1">
                {steps[currentStep - 1]?.title}
              </div>
            </div>

            {currentStep === steps.length ? (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/25"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Creating Agent...</span>
                  </div>
                ) : (
                  'Create Agent'
                )}
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-500/25"
              >
                Next
              </button>
            )}
          </div>

          {/* Submit Message */}
          {submitMessage && (
            <div className={`mt-4 p-4 rounded-xl text-center ${submitMessage.includes('Success')
              ? 'bg-green-900/20 border border-green-500/30 text-green-400'
              : 'bg-red-900/20 border border-red-500/30 text-red-400'
              }`}>
              {submitMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

