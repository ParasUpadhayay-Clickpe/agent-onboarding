'use client';

import { useState, useEffect } from 'react';
import { VerificationService } from '../services/verificationService';

interface EmailOTPProps {
    email: string;
    userName?: string; // Add userName prop
    onEmailChange: (email: string) => void;
    onVerificationComplete: () => void;
    errors: { email?: string };
}

export default function EmailOTP({
    email,
    userName = 'User',
    onEmailChange,
    onVerificationComplete,
    errors
}: EmailOTPProps) {
    const [emailOtpSent, setEmailOtpSent] = useState(false);
    const [emailOtpVerified, setEmailOtpVerified] = useState(false);
    const [emailOtpCode, setEmailOtpCode] = useState('');
    const [emailOtpLoading, setEmailOtpLoading] = useState(false);
    const [verifyEmailOtpLoading, setVerifyEmailOtpLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('info');

    // Auto-dismiss toast after 5 seconds
    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => {
                setToastMessage('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    const sendEmailOTP = async () => {
        if (!email.trim()) return;

        setEmailOtpLoading(true);
        setToastMessage(''); // Clear previous toast
        try {
            const result = await VerificationService.sendEmailOTP(email, userName);
            if (result.success) {
                setEmailOtpSent(true);
                setToastMessage('OTP sent successfully!');
                setToastType('success');
            } else {
                // Handle specific error cases
                if (result.message && result.message.includes('already verified')) {
                    setToastMessage(result.message); // Show the exact message from API
                    setToastType('info');
                    // Don't auto-progress, just show the message
                } else {
                    setToastMessage(result.message || 'Failed to send OTP');
                    setToastType('error');
                }
            }
        } catch (error) {
            console.error('Error sending email OTP:', error);
            setToastMessage('Failed to send OTP. Please try again.');
            setToastType('error');
        } finally {
            setEmailOtpLoading(false);
        }
    };

    const verifyEmailOTP = async () => {
        if (!emailOtpCode.trim()) return;

        setVerifyEmailOtpLoading(true);
        try {
            const result = await VerificationService.verifyEmailOTP(email, emailOtpCode);
            if (result.success) {
                setEmailOtpVerified(true);
                onVerificationComplete();
            }
        } catch (error) {
            console.error('Error verifying email OTP:', error);
        } finally {
            setVerifyEmailOtpLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Email Verification</h3>
                <p className="text-gray-300">We'll send you an OTP to verify your email address</p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                        Email Address <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                        </div>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => onEmailChange(e.target.value)}
                            disabled={emailOtpVerified}
                            className={`w-full pl-10 pr-4 py-3 bg-gray-800 border-2 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 ${errors.email ? 'border-red-500 bg-red-900/20' : 'border-gray-600 hover:border-gray-500 focus:border-blue-500'
                                } ${emailOtpVerified ? 'bg-green-900/20 border-green-500' : ''}`}
                            placeholder="jane.smith@example.com"
                        />
                    </div>
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-400 flex items-center justify-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.email}
                        </p>
                    )}
                </div>

                {!emailOtpSent && !emailOtpVerified && (
                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={sendEmailOTP}
                            disabled={emailOtpLoading}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25"
                        >
                            {emailOtpLoading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Sending Email OTP...</span>
                                </div>
                            ) : (
                                'Send Email OTP'
                            )}
                        </button>
                    </div>
                )}

                {emailOtpSent && !emailOtpVerified && (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="emailOtp" className="block text-sm font-medium text-gray-200 text-center">
                                Enter Email OTP <span className="text-red-400">*</span>
                            </label>
                            <div className="flex justify-center">
                                <input
                                    type="text"
                                    id="emailOtp"
                                    value={emailOtpCode}
                                    onChange={(e) => setEmailOtpCode(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                                    placeholder="Enter 6-digit OTP"
                                    maxLength={6}
                                />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="button"
                                onClick={verifyEmailOTP}
                                disabled={verifyEmailOtpLoading}
                                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/25"
                            >
                                {verifyEmailOtpLoading ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Verifying...</span>
                                    </div>
                                ) : (
                                    'Verify Email OTP'
                                )}
                            </button>
                        </div>
                    </div>
                )}

                {emailOtpVerified && (
                    <div className="flex items-center justify-center space-x-2 text-green-400 bg-green-900/20 p-4 rounded-xl border border-green-500/30">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">Email verified successfully!</span>
                    </div>
                )}
            </div>

            {/* Toast Message */}
            {toastMessage && (
                <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transition-all duration-300 ${toastType === 'success' ? 'bg-green-600 text-white' :
                    toastType === 'error' ? 'bg-red-600 text-white' :
                        'bg-blue-600 text-white'
                    }`}>
                    <div className="flex items-center space-x-2">
                        {toastType === 'success' && (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        )}
                        {toastType === 'error' && (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        )}
                        {toastType === 'info' && (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        )}
                        <span className="text-sm font-medium">{toastMessage}</span>
                    </div>
                    <button
                        onClick={() => setToastMessage('')}
                        className="absolute top-2 right-2 text-white hover:text-gray-200"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}
