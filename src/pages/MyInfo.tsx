/**
 * SaludConecta VE - Pantalla de Mi Información
 * Representa: Información Personal del Usuario
 * 
 * Pantalla donde el usuario puede consultar sus datos personales
 */

import React from 'react';
import { Navbar, BackButton } from '../components/layout';
import { Card, Button } from '../components/ui';
import { useAuth } from '../contexts/AuthContext';
import {
    UserIcon,
    IdCardIcon,
    MobileIcon,
    ConfirmedIcon,
    WarningIcon,
    SearchIcon as _SearchIcon
} from '../components/icons';

type Page = 'home' | 'search' | 'booking' | 'appointments' | 'contact' | 'my-info';

interface MyInfoPageProps {
    onNavigate: (page: Page) => void;
    onLogout: () => void;
}

/**
 * Pantalla de información personal del usuario
 * Muestra datos de perfil y estado actual
 */
const MyInfoPage: React.FC<MyInfoPageProps> = ({ onNavigate, onLogout }) => {
    const { user } = useAuth();

    if (!user) {
        return (
            <div className="min-h-screen bg-salud-fondo">
                <Navbar onHomeClick={() => onNavigate('home')} onLogout={onLogout} />
                <main className="max-w-2xl mx-auto px-4 py-6">
                    <BackButton onClick={() => onNavigate('home')} className="mb-4" />
                    <Card className="text-center py-16">
                        <p className="text-gray-500">No hay información de usuario disponible</p>
                    </Card>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-salud-fondo">
            <Navbar onHomeClick={() => onNavigate('home')} onLogout={onLogout} />

            <main className="max-w-2xl mx-auto px-4 py-6">
                <BackButton onClick={() => onNavigate('home')} className="mb-4" />

                <div className="mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
                        <UserIcon size="lg" className="text-salud-primario" /> Mi Información
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Datos personales de tu perfil
                    </p>
                </div>

                {/* Tarjeta principal de información */}
                <Card className="animate-fade-in">
                    {/* Header con avatar */}
                    <div className="text-center pb-6 border-b border-gray-100">
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-salud-primario to-sky-400
                            flex items-center justify-center text-white shadow-lg">
                            <UserIcon size="xl" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            {user.nombre}
                        </h2>
                    </div>

                    {/* Información personal */}
                    <div className="py-6 space-y-4">
                        {/* Datos de identidad */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                                Datos de Identidad
                            </h3>
                            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                                <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                                    <IdCardIcon size="md" className="text-salud-primario flex-shrink-0" />
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Cédula de Identidad</p>
                                        <p className="text-gray-800 font-semibold">{user.cedula}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <UserIcon size="md" className="text-salud-primario flex-shrink-0" />
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Nombre Completo</p>
                                        <p className="text-gray-800 font-semibold">{user.nombre}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Datos de contacto */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                                Datos de Contacto
                            </h3>
                            <div className="bg-sky-50 rounded-xl p-4">
                                <div className="flex items-center gap-3">
                                    <MobileIcon size="md" className="text-sky-600 flex-shrink-0" />
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Número de Teléfono</p>
                                        <p className="text-gray-800 font-semibold">{user.telefono}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Información del perfil */}

                    </div>

                    {/* Acciones */}
                    <div className="pt-6 border-t border-gray-100 space-y-3">
                        <Button
                            variant="secondary"
                            fullWidth
                            onClick={() => onNavigate('home')}
                        >
                            Volver al inicio
                        </Button>
                    </div>
                </Card>
            </main>
        </div>
    );
};

export default MyInfoPage;
