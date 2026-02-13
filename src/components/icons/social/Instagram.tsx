/**
 * Icono de Instagram
 * Estilo: Minimalista unicolor
 */

import React from 'react';

interface IconProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
};

export const InstagramIcon: React.FC<IconProps> = ({
    size = 'md',
    className = ''
}) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${sizeMap[size]} ${className}`}
        aria-hidden="true"
    >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
);
