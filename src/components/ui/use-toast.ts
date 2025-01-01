import React, { useState, useEffect, useCallback } from 'react'

export interface ToastProps {
  title: string
  description?: string
  duration?: number
}

interface ToastContextType {
  addToast: (toast: ToastProps) => void;
  removeToast: (id: number) => void;
  toasts: (ToastProps & { id: number })[];
}

// Create a context to hold the toast state
const ToastContext = React.createContext<ToastContextType | null>(null);

// Create a provider component
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<(ToastProps & { id: number })[]>([]);

  const addToast = useCallback(({ title, description, duration = 3000 }: ToastProps) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, title, description, duration }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  useEffect(() => {
    const timers = toasts.map((t) => {
      return setTimeout(() => removeToast(t.id), t.duration);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [toasts, removeToast]);

  return React.createElement(ToastContext.Provider, 
    { value: { addToast, removeToast, toasts } },
    children
  );
};

// Hook to use the toast functionality
export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Standalone toast function
export const toast = (props: ToastProps) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const context = React.useContext(ToastContext);
  if (!context) {
    console.error('Toast was called outside of ToastProvider');
    return;
  }
  context.addToast(props);
};

// Toast component to render the toasts
export const Toasts: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return React.createElement('div', 
    { className: "fixed top-0 right-0 p-4 space-y-4" },
    toasts.map((toast) => 
      React.createElement('div', 
        { 
          key: toast.id,
          className: "bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm"
        },
        React.createElement('h3', { className: "font-semibold" }, toast.title),
        toast.description && React.createElement('p', { className: "text-sm mt-1" }, toast.description),
        React.createElement('button', 
          {
            onClick: () => removeToast(toast.id),
            className: "absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          },
          '×'
        )
      )
    )
  );
};

