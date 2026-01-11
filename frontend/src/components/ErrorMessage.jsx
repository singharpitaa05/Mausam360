// ERROR MESSAGE COMPONENT

// frontend/src/components/ErrorMessage.jsx
import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="w-full">
      <div className="glass-card border-2 border-red-500/30 p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-linear-gradient-to-br from-red-500 to-red-600 p-4 rounded-full text-white shadow-lg">
            <AlertCircle className="w-12 h-12" />
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-text-primary mb-2">
          Oops! Something went wrong
        </h3>
        
        <p className="text-text-secondary mb-6 text-lg">
          {message || 'Unable to fetch weather data. Please try again.'}
        </p>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="btn-primary inline-flex items-center gap-2 hover:shadow-xl"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;