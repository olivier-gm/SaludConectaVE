/**
 * SaludConecta VE - Logo SVG
 * Logo minimalista B/N para la plataforma de citas médicas
 * Representa la identidad visual del proyecto
 */

import React from 'react';

interface LogoProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
};

/**
 * Logo SVG de SaludConecta VE
 * Diseño: Corazón estilizado con cruz médica, representando
 * la conexión entre salud y tecnología
 */
const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
    return (
        <img
            src="/logo.png"
            alt="SaludConecta VE Logo"
            className={`${sizeClasses[size]} object-contain ${className}`}
        />
    );
};

export default Logo;
