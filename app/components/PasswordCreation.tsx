'use client';

interface PasswordCreationProps {
    password: string;
    confirmPassword: string;
    onPasswordChange: (password: string) => void;
    onConfirmPasswordChange: (confirmPassword: string) => void;
    errors: { password?: string; confirmPassword?: string };
}

export default function PasswordCreation({
    password,
    confirmPassword,
    onPasswordChange,
    onConfirmPasswordChange,
    errors
}: PasswordCreationProps) {
    return (
        <div className="space-y-4">
            <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Create Password</h3>
                <p className="text-gray-300">Create a secure password for your account</p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                        Create New Password <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => onPasswordChange(e.target.value)}
                            className={`w-full pl-10 pr-4 py-3 bg-gray-800 border-2 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 ${errors.password ? 'border-red-500 bg-red-900/20' : 'border-gray-600 hover:border-gray-500 focus:border-blue-500'
                                }`}
                            placeholder="Enter password (min 6 characters)"
                        />
                    </div>
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-400 flex items-center justify-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.password}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200">
                        Confirm Password <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => onConfirmPasswordChange(e.target.value)}
                            className={`w-full pl-10 pr-4 py-3 bg-gray-800 border-2 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 ${errors.confirmPassword ? 'border-red-500 bg-red-900/20' : 'border-gray-600 hover:border-gray-500 focus:border-blue-500'
                                }`}
                            placeholder="Confirm your password"
                        />
                    </div>
                    {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-400 flex items-center justify-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.confirmPassword}
                        </p>
                    )}
                </div>

                {/* Password strength indicator */}
                {password && (
                    <div className="space-y-2">
                        <div className="text-sm text-gray-300">Password strength:</div>
                        <div className="flex space-x-1">
                            <div className={`h-2 flex-1 rounded ${password.length >= 6 ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                            <div className={`h-2 flex-1 rounded ${password.length >= 8 ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                            <div className={`h-2 flex-1 rounded ${password.length >= 10 ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                            <div className={`h-2 flex-1 rounded ${password.length >= 12 ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                        </div>
                        <div className="text-xs text-gray-400">
                            {password.length < 6 ? 'Too short' :
                                password.length < 8 ? 'Weak' :
                                    password.length < 10 ? 'Fair' :
                                        password.length < 12 ? 'Good' : 'Strong'}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
