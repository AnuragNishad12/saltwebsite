
import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react';


const icons = {
  success: <CheckCircle className="h-5 w-5" />,
  error: <AlertCircle className="h-5 w-5" />,
  warning: <AlertTriangle className="h-5 w-5" />,
  info: <Info className="h-5 w-5" />
};


const bgColors = {
  success: 'bg-green-100',
  error: 'bg-red-100',
  warning: 'bg-yellow-100',
  info: 'bg-blue-100'
};

// Text colors for different toast types
const textColors = {
  success: 'text-green-800',
  error: 'text-red-800',
  warning: 'text-yellow-800',
  info: 'text-blue-800'
};

// Border colors for different toast types
const borderColors = {
  success: 'border-green-500',
  error: 'border-red-500',
  warning: 'border-yellow-500',
  info: 'border-blue-500'
};

// Icon background colors for different toast types
const iconBgColors = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  warning: 'bg-yellow-500',
  info: 'bg-blue-500'
};

const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose && onClose();
      }, 300); // Wait for fade out animation before calling onClose
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`
        fixed top-4 right-4 flex items-center p-4 mb-4 rounded-lg shadow-lg border-l-4
        transition-all duration-300 transform 
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        ${bgColors[type]} ${textColors[type]} ${borderColors[type]}
      `}
      role="alert"
    >
      <div className={`flex-shrink-0 inline-flex items-center justify-center h-8 w-8 rounded-lg ${iconBgColors[type]} text-white mr-2`}>
        {icons[type]}
      </div>
      <div className="ml-3 text-sm font-medium mr-8">
        {message}
      </div>
      <button
        type="button"
        className={`ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 ${textColors[type]} hover:bg-opacity-20 hover:bg-gray-500 focus:outline-none`}
        aria-label="Close"
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => {
            onClose && onClose();
          }, 300);
        }}
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Toast;