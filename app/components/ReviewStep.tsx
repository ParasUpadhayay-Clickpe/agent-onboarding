'use client';

import { AgentData } from '../api/agents/route';

interface ReviewStepProps {
    formData: AgentData;
    isReferred: boolean;
}

export default function ReviewStep({ formData, isReferred }: ReviewStepProps) {
    return (
        <div className="space-y-4">
            <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Review & Submit</h3>
                <p className="text-gray-300">Please review your information before submitting</p>
            </div>

            <div className="space-y-6">
                {/* Personal Information */}
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Personal Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="text-gray-400">Name:</span>
                            <span className="text-white ml-2">{formData.fname} {formData.lname}</span>
                        </div>
                        <div>
                            <span className="text-gray-400">Email:</span>
                            <span className="text-white ml-2">{formData.email}</span>
                        </div>
                        <div>
                            <span className="text-gray-400">Gender:</span>
                            <span className="text-white ml-2">{formData.gender}</span>
                        </div>
                        <div>
                            <span className="text-gray-400">Date of Birth:</span>
                            <span className="text-white ml-2">{formData.dob}</span>
                        </div>
                    </div>
                </div>

                {/* Address Information - Only for self-onboarding */}
                {!isReferred && (
                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                        <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Address Information
                        </h4>
                        <div className="space-y-2 text-sm">
                            <div>
                                <span className="text-gray-400">Address:</span>
                                <span className="text-white ml-2">{formData.home_address1}</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <span className="text-gray-400">District:</span>
                                    <span className="text-white ml-2">{formData.home_district}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400">State:</span>
                                    <span className="text-white ml-2">{formData.home_state}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400">PIN Code:</span>
                                    <span className="text-white ml-2">{formData.home_pin_code}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Financial Information - Only for self-onboarding */}
                {!isReferred && (
                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                        <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            Financial Information
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-gray-400">PAN:</span>
                                <span className="text-white ml-2">{formData.pan}</span>
                            </div>
                            <div>
                                <span className="text-gray-400">IFSC:</span>
                                <span className="text-white ml-2">{formData.ifsc}</span>
                            </div>
                            <div>
                                <span className="text-gray-400">Account Number:</span>
                                <span className="text-white ml-2">{formData.acc_num}</span>
                            </div>
                            <div>
                                <span className="text-gray-400">Beneficiary:</span>
                                <span className="text-white ml-2">{formData.beneficiary_name}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Agent Configuration */}
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Agent Configuration
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="text-gray-400">Type:</span>
                            <span className="text-white ml-2">{formData.fos_or_dsa}</span>
                        </div>
                        <div>
                            <span className="text-gray-400">Contract/Commission:</span>
                            <span className="text-white ml-2">{formData.contract_or_commission}</span>
                        </div>
                        <div>
                            <span className="text-gray-400">Referred By:</span>
                            <span className="text-white ml-2">{formData.parent_agent_id === 'self-onboard' ? 'Self-onboard' : formData.parent_agent_id}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
