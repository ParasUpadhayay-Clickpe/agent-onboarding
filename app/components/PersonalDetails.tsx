'use client';

import { CreateAgentRequest } from '../api/agents/route';

interface PersonalDetailsProps {
    formData: CreateAgentRequest;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    errors: Partial<CreateAgentRequest>;
}

export default function PersonalDetails({ formData, onInputChange, errors }: PersonalDetailsProps) {
    return (
        <div className="space-y-4">
            <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Personal Details</h3>
                <p className="text-gray-300">Please provide your basic information</p>
            </div>

            <div className="space-y-2">
                <label htmlFor="mob_num" className="block text-sm font-medium text-gray-200">
                    Mobile Number <span className="text-red-400">*</span>
                </label>
                <input
                    type="tel"
                    id="mob_num"
                    name="mob_num"
                    value={formData.mob_num}
                    onChange={onInputChange}
                    className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 ${errors.mob_num ? 'border-red-500 bg-red-900/20' : 'border-gray-600 hover:border-gray-500 focus:border-blue-500'
                        }`}
                    placeholder="9876543210"
                    maxLength={10}
                />
                {errors.mob_num && (
                    <p className="mt-1 text-sm text-red-400 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.mob_num}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <label htmlFor="fname" className="block text-sm font-medium text-gray-200">
                        First Name <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="text"
                        id="fname"
                        name="fname"
                        value={formData.fname}
                        onChange={onInputChange}
                        className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 ${errors.fname ? 'border-red-500 bg-red-900/20' : 'border-gray-600 hover:border-gray-500 focus:border-blue-500'
                            }`}
                        placeholder="John"
                    />
                    {errors.fname && (
                        <p className="mt-1 text-sm text-red-400 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.fname}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="mname" className="block text-sm font-medium text-gray-200">
                        Middle Name
                    </label>
                    <input
                        type="text"
                        id="mname"
                        name="mname"
                        value={formData.mname || ''}
                        onChange={onInputChange}
                        className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                        placeholder="Michael"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="lname" className="block text-sm font-medium text-gray-200">
                        Last Name <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="text"
                        id="lname"
                        name="lname"
                        value={formData.lname}
                        onChange={onInputChange}
                        className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 ${errors.lname ? 'border-red-500 bg-red-900/20' : 'border-gray-600 hover:border-gray-500 focus:border-blue-500'
                            }`}
                        placeholder="Doe"
                    />
                    {errors.lname && (
                        <p className="mt-1 text-sm text-red-400 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.lname}
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-200">
                        Gender <span className="text-red-400">*</span>
                    </label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={onInputChange}
                        className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-xl text-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 ${errors.gender ? 'border-red-500 bg-red-900/20' : 'border-gray-600 hover:border-gray-500 focus:border-blue-500'
                            }`}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.gender && (
                        <p className="mt-1 text-sm text-red-400 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.gender}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="dob" className="block text-sm font-medium text-gray-200">
                        Date of Birth <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={onInputChange}
                        className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-xl text-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 ${errors.dob ? 'border-red-500 bg-red-900/20' : 'border-gray-600 hover:border-gray-500 focus:border-blue-500'
                            }`}
                    />
                    {errors.dob && (
                        <p className="mt-1 text-sm text-red-400 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.dob}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
