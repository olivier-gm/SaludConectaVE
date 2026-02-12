
import React from 'react';

interface IconProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

const getSize = (size: string) => {
    switch (size) {
        case 'sm': return 'w-4 h-4';
        case 'md': return 'w-6 h-6';
        case 'lg': return 'w-8 h-8';
        case 'xl': return 'w-12 h-12';
        default: return 'w-6 h-6';
    }
};

export const CameraIcon: React.FC<IconProps> = ({ size = 'md', className = '' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${getSize(size)} ${className}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const SaveIcon: React.FC<IconProps> = ({ size = 'md', className = '' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${getSize(size)} ${className}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>
);

export const MapIcon: React.FC<IconProps> = ({ size = 'md', className = '' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${getSize(size)} ${className}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
);

export const StethoscopeIcon: React.FC<IconProps> = ({ size = 'md', className = '' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${getSize(size)} ${className}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H4a2 2 0 00-2 2v2a2 2 0 002 2h1a2 2 0 002-2v-2a2 2 0 00-2-2zm14 0h1a2 2 0 012 2v2a2 2 0 01-2 2h-1a2 2 0 01-2-2v-2a2 2 0 012-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v6" />
        {/* Simplified Stethoscope - Using a medical cross/plus for clarity in small sizes if needed, but here's a rough stethoscope shape override */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);
