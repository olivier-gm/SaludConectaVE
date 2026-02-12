/**
 * SaludConecta VE - Pantalla Home (Dashboard)
 * Representa: Interfaz Post-Login
 * 
 * Dashboard principal con accesos rápidos a todas las funcionalidades:
 * - UC1: Buscar Especialista
 * - UC3: Agendar Cita
 * - UC5: Ver mis Citas
 * - UC6: Contacto
 */

import React from 'react';
import { Navbar } from '../components/layout';
import { Card } from '../components/ui';
import { useAuth } from '../contexts/AuthContext';
import { useAppointments } from '../contexts/AppointmentContext';
import { AppointmentStatus } from '../types';
import {
    SearchIcon,
    CalendarIcon,
    ClipboardIcon,
    ChatIcon,
    UserIcon,
    StethoscopeIcon,
    MorningIcon,
} from '../components/icons';

type Page = 'home' | 'search' | 'booking' | 'appointments' | 'contact' | 'my-info';

interface HomePageProps {
    /** Callback para navegar a otra página */
    onNavigate: (page: Page) => void;
    /** Callback al cerrar sesión */
    onLogout: () => void;
}

// Opciones del menú principal
const menuOptions = [
    {
        id: 'search' as Page,
        title: 'Buscar Especialista',
        description: 'Encuentra médicos por centro y especialidad',
        icon: <SearchIcon size="xl" />,
        color: 'from-sky-400 to-sky-600',
    },
    {
        id: 'booking' as Page,
        title: 'Agendar Cita',
        description: 'Solicita una nueva cita médica',
        icon: <CalendarIcon size="xl" />,
        color: 'from-emerald-400 to-emerald-600',
    },
    {
        id: 'appointments' as Page,
        title: 'Mis Citas',
        description: 'Revisa el estado de tus citas',
        icon: <ClipboardIcon size="xl" />,
        color: 'from-violet-400 to-violet-600',
    },
    {
        id: 'contact' as Page,
        title: 'Contacto',
        description: 'Comunícate con los centros de salud',
        icon: <ChatIcon size="xl" />,
        color: 'from-amber-400 to-amber-600',
    },
    {
        id: 'my-info' as Page,
        title: 'Mi Información',
        description: 'Consulta tus datos personales',
        icon: <UserIcon size="xl" />,
        color: 'from-pink-400 to-pink-600',
    },
];

/**
 * Pantalla principal post-login
 * Muestra menú de accesos rápidos a las funcionalidades
 */
const HomePage: React.FC<HomePageProps> = ({ onNavigate, onLogout }) => {
    const { user } = useAuth();
    const { getAppointmentsByDoctor } = useAppointments();

    // Calcular estadísticas para médicos
    const doctorAppointments = user?.tipo === 'medico' ? getAppointmentsByDoctor(user.id) : [];

    // 1. Pacientes Hoy (Simulado filtrando por fecha string "Hoy" o fecha real si existiera)
    // Para el demo asumimos que todas las citas son relevantes, o filtramos por fecha string
    const todayAppointments = doctorAppointments.length;

    // 2. Citas Pendientes
    const pendingAppointments = doctorAppointments.filter(
        apt => apt.estado === AppointmentStatus.PENDIENTE || apt.estado === AppointmentStatus.RESERVADA
    ).length;

    // 3. Efectividad (Simulada o basada en completadas vs total)
    const completedAppointments = doctorAppointments.filter(apt => apt.estado === AppointmentStatus.COMPLETADA).length;
    const efficiency = doctorAppointments.length > 0
        ? Math.round((completedAppointments / doctorAppointments.length) * 100)
        : 100;

    return (
        <div className="min-h-screen bg-salud-fondo">
            <Navbar
                onHomeClick={() => onNavigate('home')}
                onLogout={onLogout}
            />

            <main className="max-w-4xl mx-auto px-4 py-6 sm:py-10">
                {/* Saludo personalizado */}
                <div className="mb-8 animate-fade-in">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                        ¡Hola, {user?.nombre.split(' ')[0]}!
                    </h1>
                    <p className="text-gray-600 text-lg">
                        ¿Qué deseas hacer hoy?
                    </p>
                </div>

                {/* Grid de opciones según rol */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {user?.tipo === 'medico' ? (
                        // === DASHBOARD PROFESIONAL PARA MÉDICOS ===
                        <div className="col-span-1 sm:col-span-2 space-y-8 animate-fade-in">

                            {/* Estadísticas Rápidas */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Pacientes Totales</p>
                                        <p className="text-2xl font-bold text-gray-800">{todayAppointments}</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <UserIcon size="lg" />
                                    </div>
                                </div>
                                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Citas Pendientes</p>
                                        <p className="text-2xl font-bold text-gray-800">{pendingAppointments}</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                                        <ClipboardIcon size="lg" />
                                    </div>
                                </div>
                                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Efectividad</p>
                                        <p className="text-2xl font-bold text-gray-800">{efficiency}%</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                                        <CalendarIcon size="lg" />
                                    </div>
                                </div>
                            </div>

                            {/* Área de Trabajo Principal - EXPANDIDA */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* 1. Acceso a Agenda */}
                                <div
                                    onClick={() => onNavigate('doctor-appointments' as any)}
                                    className="bg-white rounded-xl border border-blue-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
                                >
                                    <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-sky-400 to-sky-600">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-bold text-white transition-colors">
                                                    Mi Agenda
                                                </h3>
                                                <p className="text-sm text-blue-50 mt-1">
                                                    Citas y evoluciones
                                                </p>
                                            </div>
                                            <div className="bg-white/20 p-2 rounded-lg text-white group-hover:scale-110 transition-transform">
                                                <CalendarIcon size="xl" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-gray-50 flex justify-between items-center text-sm">
                                        <span className="text-gray-500">Próxima: 2:00 PM</span>
                                        <span className="font-medium text-sky-600">Ver →</span>
                                    </div>
                                </div>

                                {/* 2. Mis Pacientes - NUEVO */}
                                <div
                                    onClick={() => onNavigate('patients' as any)}
                                    className="bg-white rounded-xl border border-indigo-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
                                >
                                    <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-indigo-400 to-indigo-600">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-bold text-white transition-colors">
                                                    Mis Pacientes
                                                </h3>
                                                <p className="text-sm text-indigo-50 mt-1">
                                                    Historias y seguimiento
                                                </p>
                                            </div>
                                            <div className="bg-white/20 p-2 rounded-lg text-white group-hover:scale-110 transition-transform">
                                                <StethoscopeIcon size="xl" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-gray-50 flex justify-between items-center text-sm">
                                        <span className="text-gray-500">Total: 124</span>
                                        <span className="font-medium text-indigo-600">Buscar →</span>
                                    </div>
                                </div>

                                {/* 3. Mi Horario - NUEVO */}
                                <div
                                    onClick={() => onNavigate('schedule' as any)}
                                    className="bg-white rounded-xl border border-amber-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
                                >
                                    <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-amber-400 to-amber-600">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-bold text-white transition-colors">
                                                    Mi Horario
                                                </h3>
                                                <p className="text-sm text-amber-50 mt-1">
                                                    Turnos y disponibilidad
                                                </p>
                                            </div>
                                            <div className="bg-white/20 p-2 rounded-lg text-white group-hover:scale-110 transition-transform">
                                                <MorningIcon size="xl" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-gray-50 flex justify-between items-center text-sm">
                                        <span className="text-gray-500">Mañana: 8am - 12pm</span>
                                        <span className="font-medium text-amber-600">Editar →</span>
                                    </div>
                                </div>

                                {/* 4. Perfil Profesional */}
                                <div
                                    onClick={() => onNavigate('doctor-profile' as any)}
                                    className="bg-white rounded-xl border border-emerald-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
                                >
                                    <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-emerald-400 to-emerald-600">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-bold text-white transition-colors">
                                                    Mi Perfil
                                                </h3>
                                                <p className="text-sm text-emerald-50 mt-1">
                                                    Credenciales y datos
                                                </p>
                                            </div>
                                            <div className="bg-white/20 p-2 rounded-lg text-white group-hover:scale-110 transition-transform">
                                                <UserIcon size="xl" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-gray-50 flex justify-between items-center text-sm">
                                        <span className="text-gray-500">Estado: Activo</span>
                                        <span className="font-medium text-emerald-600">Ver →</span>
                                    </div>
                                </div>

                                {/* 5. Mensajes - NUEVO */}
                                <div
                                    onClick={() => onNavigate('contact' as any)}
                                    className="bg-white rounded-xl border border-rose-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer group sm:col-span-2 lg:col-span-1"
                                >
                                    <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-rose-400 to-rose-600">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-bold text-white transition-colors">
                                                    Mensajes
                                                </h3>
                                                <p className="text-sm text-rose-50 mt-1">
                                                    Centro de notificaciones
                                                </p>
                                            </div>
                                            <div className="bg-white/20 p-2 rounded-lg text-white group-hover:scale-110 transition-transform relative">
                                                <ChatIcon size="xl" />
                                                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-200 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-gray-50 flex justify-between items-center text-sm">
                                        <span className="text-gray-500">3 no leídos</span>
                                        <span className="font-medium text-rose-600">Ver todos →</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // === MENÚ PARA PACIENTES (REGULAR) ===
                        menuOptions.map((option, index) => (
                            <Card
                                key={option.id}
                                hoverable
                                padding="none"
                                onClick={() => onNavigate(option.id)}
                                className="overflow-hidden animate-fade-in cursor-pointer"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Header con gradiente */}
                                <div className={`bg-gradient-to-r ${option.color} p-4 sm:p-6 text-white`}>
                                    <div className="text-4xl sm:text-5xl">{option.icon}</div>
                                </div>

                                {/* Contenido */}
                                <div className="p-4 sm:p-6">
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
                                        {option.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm sm:text-base">
                                        {option.description}
                                    </p>
                                </div>
                            </Card>
                        ))
                    )}
                </div>

                {/* Sección de Transparencia Institucional (SLA) */}
                <div className="mt-12 border-t border-gray-200 pt-8 animate-fade-in" style={{ animationDelay: '500ms' }}>
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-700">
                            Transparencia Institucional
                        </h2>
                        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                            ● Sistemas Operativos
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* KPI 1: Tasa de Respuesta */}
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xl">
                                99%
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Tasa de Respuesta</p>
                                <p className="text-xs text-gray-400">Meta: &gt; 75%</p>
                            </div>
                        </div>

                        {/* KPI 2: Tiempo de Respuesta */}
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-violet-50 flex items-center justify-center text-violet-600 font-bold text-lg">
                                &lt; 2s
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Tiempo de Proceso</p>
                                <p className="text-xs text-gray-400">Meta: &lt; 24h</p>
                            </div>
                        </div>

                        {/* KPI 3: Disponibilidad */}
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-xl">
                                24/7
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Disponibilidad</p>
                                <p className="text-xs text-gray-400">Servicio Online</p>
                            </div>
                        </div>
                    </div>

                    <p className="text-center text-xs text-gray-400 mt-4">
                        * Garantizamos respuesta a su solicitud en menos de 24 horas hábiles según nuestro Acuerdo de Nivel de Servicio (SLA).
                    </p>
                </div>
            </main>
        </div>
    );
};

export default HomePage;
