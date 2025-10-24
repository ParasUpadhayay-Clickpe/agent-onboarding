'use client';

import { AgentData } from '../api/agents/route';
import PANVerification from './PANVerification';

interface FinancialDetailsProps {
    formData: AgentData;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onPanChange: (pan: string) => void;
    errors: Partial<AgentData>;
}

export default function FinancialDetails({ formData, onInputChange, onPanChange, errors }: FinancialDetailsProps) {
    return (
        <div className="space-y-4">
            <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Financial Details</h3>
                <p className="text-gray-300">Please provide your banking information</p>
            </div>

            <div className="space-y-4">
                <PANVerification pan={formData.pan} onPanChange={onPanChange} errors={errors} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="ifsc" className="block text-sm font-medium text-gray-200">
                            IFSC Code <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            id="ifsc"
                            name="ifsc"
                            value={formData.ifsc}
                            onChange={onInputChange}
                            className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 ${errors.ifsc ? 'border-red-500 bg-red-900/20' : 'border-gray-600 hover:border-gray-500 focus:border-blue-500'
                                }`}
                            placeholder="HDFC0001234"
                            maxLength={11}
                        />
                        {errors.ifsc && (
                            <p className="mt-1 text-sm text-red-400 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.ifsc}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="acc_num" className="block text-sm font-medium text-gray-200">
                            Account Number <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            id="acc_num"
                            name="acc_num"
                            value={formData.acc_num}
                            onChange={onInputChange}
                            className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 ${errors.acc_num ? 'border-red-500 bg-red-900/20' : 'border-gray-600 hover:border-gray-500 focus:border-blue-500'
                                }`}
                            placeholder="9876543210"
                        />
                        {errors.acc_num && (
                            <p className="mt-1 text-sm text-red-400 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.acc_num}
                            </p>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="beneficiary_name" className="block text-sm font-medium text-gray-200">
                        Beneficiary Name <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="text"
                        id="beneficiary_name"
                        name="beneficiary_name"
                        value={formData.beneficiary_name}
                        onChange={onInputChange}
                        className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 ${errors.beneficiary_name ? 'border-red-500 bg-red-900/20' : 'border-gray-600 hover:border-gray-500 focus:border-blue-500'
                            }`}
                        placeholder="John Doe"
                    />
                    {errors.beneficiary_name && (
                        <p className="mt-1 text-sm text-red-400 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.beneficiary_name}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
