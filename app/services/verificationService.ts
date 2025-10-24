import { sendEmailOTP, verifyEmailOTP, verifyPAN } from '../api/agents/route';

export class VerificationService {
    static async sendEmailOTP(email: string): Promise<{ success: boolean; message: string }> {
        try {
            return await sendEmailOTP(email);
        } catch (error) {
            console.error('Error sending email OTP:', error);
            return {
                success: false,
                message: 'Failed to send OTP. Please try again.'
            };
        }
    }

    static async verifyEmailOTP(email: string, otp: string): Promise<{ success: boolean; message: string }> {
        try {
            return await verifyEmailOTP(email, otp);
        } catch (error) {
            console.error('Error verifying email OTP:', error);
            return {
                success: false,
                message: 'Failed to verify OTP. Please try again.'
            };
        }
    }

    static async verifyPAN(pan: string): Promise<{ success: boolean; message: string }> {
        try {
            return await verifyPAN(pan);
        } catch (error) {
            console.error('Error verifying PAN:', error);
            return {
                success: false,
                message: 'Failed to verify PAN. Please try again.'
            };
        }
    }
}
