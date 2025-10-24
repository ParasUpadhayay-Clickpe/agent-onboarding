'use client';

import { AgentData } from '../api/agents/route';

interface AddressDetailsProps {
    formData: AgentData;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    errors: Partial<AgentData>;
}

export default function AddressDetails({ formData, onInputChange, errors }: AddressDetailsProps) {
    return (
        <div className="space-y-4">
            <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Address Information</h3>
                <p className="text-gray-300">Please provide your residential address</p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="home_address1" className="block text-sm font-medium text-gray-200">
                        Address <span className="text-red-400">*</span>
                    </label>
                    <textarea
                        id="home_address1"
                        name="home_address1"
                        value={formData.home_address1}
                        onChange={onInputChange}
                        rows={3}
                        className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 resize-none ${errors.home_address1 ? 'border-red-500 bg-red-900/20' : 'border-gray-600 hover:border-gray-500 focus:border-blue-500'
                            }`}
                        placeholder="Enter your complete address"
                    />
                    {errors.home_address1 && (
                        <p className="mt-1 text-sm text-red-400 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.home_address1}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="home_district" className="block text-sm font-medium text-gray-200">
                            District <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            id="home_district"
                            name="home_district"
                            value={formData.home_district}
                            onChange={onInputChange}
                            className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 ${errors.home_district ? 'border-red-500 bg-red-900/20' : 'border-gray-600 hover:border-gray-500 focus:border-blue-500'
                                }`}
                            placeholder="Delhi"
                        />
                        {errors.home_district && (
                            <p className="mt-1 text-sm text-red-400 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.home_district}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="home_state" className="block text-sm font-medium text-gray-200">
                            State <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            id="home_state"
                            name="home_state"
                            value={formData.home_state}
                            onChange={onInputChange}
                            className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 ${errors.home_state ? 'border-red-500 bg-red-900/20' : 'border-gray-600 hover:border-gray-500 focus:border-blue-500'
                                }`}
                            placeholder="Delhi"
                        />
                        {errors.home_state && (
                            <p className="mt-1 text-sm text-red-400 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.home_state}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="home_pin_code" className="block text-sm font-medium text-gray-200">
                            PIN Code <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            id="home_pin_code"
                            name="home_pin_code"
                            value={formData.home_pin_code}
                            onChange={onInputChange}
                            className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 ${errors.home_pin_code ? 'border-red-500 bg-red-900/20' : 'border-gray-600 hover:border-gray-500 focus:border-blue-500'
                                }`}
                            placeholder="110001"
                            maxLength={6}
                        />
                        {errors.home_pin_code && (
                            <p className="mt-1 text-sm text-red-400 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.home_pin_code}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
