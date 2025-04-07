import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

const EmailConfirmation = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 animate-fade-in">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Mail className="h-12 w-12 text-ph-blue" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">Check Your Email</h1>
            <p className="text-gray-600 mt-2">We've sent you a confirmation email</p>
          </div>

          <div className="space-y-4 text-center">
            <p className="text-gray-600">
              Please check your email inbox and click on the confirmation link to verify your account.
            </p>
            <p className="text-gray-600">
              If you don't see the email, please check your spam folder.
            </p>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/login"
              className="text-ph-blue hover:text-ph-blue/80 font-semibold transition-colors"
            >
              Return to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmation; 