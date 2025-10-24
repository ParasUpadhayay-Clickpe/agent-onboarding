import { AgentData } from '../api/agents/route';

export interface ValidationErrors {
    [key: string]: string;
}

export class FormValidator {
    static validateEmail(email: string): string | null {
        if (!email.trim()) return 'Email is required';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address';
        }

        return null;
    }

    static validatePassword(password: string): string | null {
        if (!password.trim()) return 'Password is required';
        if (password.length < 6) return 'Password must be at least 6 characters';
        return null;
    }

    static validateConfirmPassword(password: string, confirmPassword: string): string | null {
        if (!confirmPassword.trim()) return 'Please confirm your password';
        if (password !== confirmPassword) return 'Passwords do not match';
        return null;
    }

    static validateMobile(mobile: string): string | null {
        if (!mobile.trim()) return 'Mobile number is required';

        const mobileRegex = /^[6-9]\d{9}$/;
        if (!mobileRegex.test(mobile)) {
            return 'Please enter a valid 10-digit mobile number';
        }

        return null;
    }

    static validatePAN(pan: string): string | null {
        if (!pan.trim()) return 'PAN is required';

        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if (!panRegex.test(pan)) {
            return 'Please enter a valid PAN number';
        }

        return null;
    }

    static validateRequired(value: string, fieldName: string): string | null {
        if (!value.trim()) return `${fieldName} is required`;
        return null;
    }

    static validateStep(step: number, formData: AgentData, isReferred: boolean): ValidationErrors {
        const errors: ValidationErrors = {};

        if (isReferred) {
            // Referred user flow
            switch (step) {
                case 1: // Email verification
                    const emailError = this.validateEmail(formData.email);
                    if (emailError) errors.email = emailError;
                    break;

                case 2: // Password creation
                    const passwordError = this.validatePassword(formData.password);
                    if (passwordError) errors.password = passwordError;
                    break;

                case 3: // Personal details
                    if (!formData.fname.trim()) errors.fname = 'First name is required';
                    if (!formData.lname.trim()) errors.lname = 'Last name is required';
                    if (!formData.gender.trim()) errors.gender = 'Gender is required';
                    if (!formData.dob.trim()) errors.dob = 'Date of birth is required';
                    break;

                case 4: // Agent configuration
                    if (!formData.fos_or_dsa.trim()) errors.fos_or_dsa = 'FOS or DSA is required';
                    if (!formData.contract_or_commission.trim()) errors.contract_or_commission = 'Contract or Commission is required';
                    break;
            }
        } else {
            // Self-onboarding flow
            switch (step) {
                case 1: // Email verification
                    const emailError = this.validateEmail(formData.email);
                    if (emailError) errors.email = emailError;
                    break;

                case 2: // Password creation
                    const passwordError = this.validatePassword(formData.password);
                    if (passwordError) errors.password = passwordError;
                    break;

                case 3: // Personal details
                    if (!formData.fname.trim()) errors.fname = 'First name is required';
                    if (!formData.lname.trim()) errors.lname = 'Last name is required';
                    if (!formData.gender.trim()) errors.gender = 'Gender is required';
                    if (!formData.dob.trim()) errors.dob = 'Date of birth is required';
                    break;

                case 4: // Address
                    if (!formData.home_address1.trim()) errors.home_address1 = 'Address is required';
                    if (!formData.home_district.trim()) errors.home_district = 'District is required';
                    if (!formData.home_state.trim()) errors.home_state = 'State is required';
                    if (!formData.home_pin_code || formData.home_pin_code === 0) errors.home_pin_code = 'PIN code is required';
                    break;

                case 5: // Financial details
                    const panError = this.validatePAN(formData.pan);
                    if (panError) errors.pan = panError;

                    if (!formData.ifsc.trim()) errors.ifsc = 'IFSC is required';
                    if (!formData.acc_num.trim()) errors.acc_num = 'Account number is required';
                    if (!formData.beneficiary_name.trim()) errors.beneficiary_name = 'Beneficiary name is required';
                    break;

                case 6: // Agent configuration
                    if (!formData.fos_or_dsa.trim()) errors.fos_or_dsa = 'FOS or DSA is required';
                    if (!formData.contract_or_commission.trim()) errors.contract_or_commission = 'Contract or Commission is required';
                    break;
            }
        }

        return errors;
    }
}
