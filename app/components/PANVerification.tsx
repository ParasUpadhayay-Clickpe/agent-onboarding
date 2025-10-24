'use client';

import { useState } from 'react';
import { VerificationService } from '../services/verificationService';

interface PANVerificationProps {
    pan: string;
    onPanChange: (pan: string) => void;
    errors: { pan?: string };
}

export default function PANVerification({ pan, onPanChange, errors }: PANVerificationProps) {
    const [panVerified, setPanVerified] = useState(false);
    const [panVerificationLoading, setPanVerificationLoading] = useState(false);

    const verifyPAN = async () => {
        if (!pan.trim()) return;

        setPanVerificationLoading(true);
        try {
            const result = await VerificationService.verifyPAN(pan);
            if (result.success) {
                setPanVerified(true);
            }
        } catch (error) {
            console.error('Error verifying PAN:', error);
        } finally {
            setPanVerificationLoading(false);
        }
    };

    return (
        <div className="space-y-2">
            <label htmlFor="pan" className="block text-sm font-medium text-gray-200">
                PAN Number <span className="text-red-400">*</span>
            </label>
            <div className="flex gap-3">
                <input
                    type="text"
                    id="pan"
                    name="pan"
                    value={pan}
                    onChange={(e) => onPanChange(e.target.value)}
                    disabled={panVerified}
                    className={`flex-1 px-4 py-3 bg-gray-800 border-2 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 ${errors.pan ? 'border-red-500 bg-red-900/20' : 'border-gray-600 hover:border-gray-500 focus:border-blue-500'
                        } ${panVerified ? 'bg-green-900/20 border-green-500' : ''}`}
                    placeholder="FGHIJ5678K"
                    maxLength={10}
                />
                <button
                    type="button"
                    onClick={verifyPAN}
                    disabled={panVerificationLoading || panVerified}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25 whitespace-nowrap"
                >
                    {panVerificationLoading ? (
                        <div className="flex items-center space-x-1">
                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className="text-sm">Verifying...</span>
                        </div>
                    ) : panVerified ? (
                        <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm">Verified</span>
                        </div>
                    ) : (
                        'Verify PAN'
                    )}
                </button>
            </div>
            {errors.pan && (
                <p className="mt-1 text-sm text-red-400 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.pan}
                </p>
            )}
            {panVerified && (
                <p className="mt-1 text-sm text-green-400 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    PAN verified successfully!
                </p>
            )}
        </div>
    );
}
