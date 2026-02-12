import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
    leftIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = '', label, error, fullWidth = false, leftIcon, ...props }, ref) => {
        const baseInputStyles = `
            flex-1 block w-full rounded-xl border-gray-300 shadow-sm 
            focus:border-salud-primario focus:ring-salud-primario 
            disabled:bg-gray-50 disabled:text-gray-500
            transition-colors duration-200
        `;

        const containerStyles = `
            ${fullWidth ? 'w-full' : ''}
            ${className}
        `;

        return (
            <div className={containerStyles}>
                {label && (
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                    </label>
                )}
                <div className="relative rounded-md shadow-sm">
                    {leftIcon && (
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm">{leftIcon}</span>
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={`
                            ${baseInputStyles}
                            ${leftIcon ? 'pl-10' : ''}
                            ${error ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500' : ''}
                        `}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="mt-1 text-sm text-red-600">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
