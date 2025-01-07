// frontend/src/components/ui/Alert.jsx


import { AlertCircle } from 'lucide-react';

export function Alert({ children, className = '', type = 'success' }) {
  const baseClasses = 'flex items-center p-4 mb-4 rounded-lg';
  const typeClasses = type === 'error' 
    ? 'text-red-800 bg-red-50' 
    : 'text-green-800 bg-green-50';

  return (
    <div className={`${baseClasses} ${typeClasses} ${className}`}>
      <AlertCircle className="h-4 w-4 mr-2" />
      {children}
    </div>
  );
}

export function AlertDescription({ children }) {
  return <span className="text-sm font-medium">{children}</span>;
}
