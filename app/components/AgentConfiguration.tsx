'use client';

import { AgentData } from '../api/agents/route';

interface AgentConfigurationProps {
    formData: AgentData;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    errors: Partial<AgentData>;
}

export default function AgentConfiguration({ formData, onInputChange, errors }: AgentConfigurationProps) {
    return (
        <div className="space-y-4">
            <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Agent Configuration</h3>
                <p className="text-gray-300">Configure your agent settings</p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="fos_or_dsa" className="block text-sm font-medium text-gray-200">
                        FOS or DSA <span className="text-red-400">*</span>
                    </label>
                    <select
                        id="fos_or_dsa"
                        name="fos_or_dsa"
                        value={formData.fos_or_dsa}
                        onChange={onInputChange}
                        className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-xl text-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 ${errors.fos_or_dsa ? 'border-red-500 bg-red-900/20' : 'border-gray-600 hover:border-gray-500 focus:border-blue-500'
                            }`}
                    >
                        <option value="">Select Type</option>
                        <option value="FOS">FOS (Field Officer)</option>
                        <option value="DSA">DSA (Direct Selling Agent)</option>
                    </select>
                    {errors.fos_or_dsa && (
                        <p className="mt-1 text-sm text-red-400 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.fos_or_dsa}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="contract_or_commission" className="block text-sm font-medium text-gray-200">
                        Contract or Commission <span className="text-red-400">*</span>
                    </label>
                    <select
                        id="contract_or_commission"
                        name="contract_or_commission"
                        value={formData.contract_or_commission}
                        onChange={onInputChange}
                        className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-xl text-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 ${errors.contract_or_commission ? 'border-red-500 bg-red-900/20' : 'border-gray-600 hover:border-gray-500 focus:border-blue-500'
                            }`}
                    >
                        <option value="">Select Type</option>
                        <option value="Contract">Contract</option>
                        <option value="Commission">Commission</option>
                    </select>
                    {errors.contract_or_commission && (
                        <p className="mt-1 text-sm text-red-400 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.contract_or_commission}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
