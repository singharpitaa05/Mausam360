// ERROR HANDLER UTILS

// frontend/src/utils/errorHandler.js

/**
 * Parse and format error messages
 */
export const parseError = (error) => {
  // Network errors
  if (!navigator.onLine) {
    return {
      type: 'network',
      message: 'No internet connection. Please check your network.',
      retryable: true
    };
  }

  // API errors
  if (error.response) {
    const status = error.response.status;
    const message = error.response.data?.message;

    switch (status) {
      case 400:
        return {
          type: 'validation',
          message: message || 'Invalid request. Please check your input.',
          retryable: false
        };
      case 404:
        return {
          type: 'not-found',
          message: message || 'City not found. Please check the spelling.',
          retryable: false
        };
      case 429:
        return {
          type: 'rate-limit',
          message: 'Too many requests. Please try again later.',
          retryable: true
        };
      case 500:
      case 502:
      case 503:
        return {
          type: 'server',
          message: 'Server error. Please try again later.',
          retryable: true
        };
      default:
        return {
          type: 'unknown',
          message: message || 'Something went wrong. Please try again.',
          retryable: true
        };
    }
  }

  // Request timeout
  if (error.code === 'ECONNABORTED') {
    return {
      type: 'timeout',
      message: 'Request timeout. Please try again.',
      retryable: true
    };
  }

  // Default error
  return {
    type: 'unknown',
    message: error.message || 'An unexpected error occurred.',
    retryable: true
  };
};

/**
 * Log errors for debugging
 */
export const logError = (error, context = '') => {
  if (process.env.NODE_ENV === 'development') {
    console.group(`❌ Error ${context ? `- ${context}` : ''}`);
    console.error('Message:', error.message);
    console.error('Stack:', error.stack);
    console.error('Full Error:', error);
    console.groupEnd();
  }
};

/**
 * Create user-friendly error message
 */
export const getUserFriendlyMessage = (error) => {
  const parsed = parseError(error);
  return parsed.message;
};

/**
 * Check if error is retryable
 */
export const isRetryableError = (error) => {
  const parsed = parseError(error);
  return parsed.retryable;
};