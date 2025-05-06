
import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast from './Toast';


const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);


  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setToasts(prevToasts => [...prevToasts, { id, message, type, duration }]);
    return id;
  }, []);

 
  const hideToast = useCallback(id => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  }, []);


  const toast = {
    show: showToast,
    success: (message, duration) => showToast(message, 'success', duration),
    error: (message, duration) => showToast(message, 'error', duration),
    warning: (message, duration) => showToast(message, 'warning', duration),
    info: (message, duration) => showToast(message, 'info', duration),
    hide: hideToast
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed top-0 right-0 z-50 p-4 space-y-4 pointer-events-none">
        {toasts.map(({ id, message, type, duration }) => (
          <div key={id} className="pointer-events-auto">
            <Toast
              message={message}
              type={type}
              duration={duration}
              onClose={() => hideToast(id)}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};


export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastContext;