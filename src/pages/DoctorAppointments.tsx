/**
 * SaludConecta VE - Agenda Médica Profesional
 * Representa: Interfaz de Gestión Clínica
 * 
 * Vista detallada tipo "Workstation" para el médico.
 */

import React, { useState } from 'react';
import { Navbar, BackButton } from '../components/layout';
import { Card, Button } from '../components/ui';
import { useAuth } from '../contexts/AuthContext';
import { useAppointments } from '../contexts/AppointmentContext';
import { AppointmentStatus } from '../types';
import { getHealthCenterById } from '../data/mockData';
import {
    CalendarIcon,
    UserIcon,
    // MorningIcon, 
    // AfternoonIcon, 
    ConfirmedIcon,
    PendingIcon,
    WarningIcon,
    ClipboardIcon,
    SearchIcon
} from '../components/icons';

type Page = 'home' | 'search' | 'booking' | 'appointments' | 'contact' | 'doctor-appointments' | 'consultation';

interface DoctorAppointmentsPageProps {
    onNavigate: (page: Page) => void;
    onNavigateWithParams: (page: Page, params: any) => void;
    onLogout: () => void;
}

const statusConfig = {
    [AppointmentStatus.RESERVADA]: {
        badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        text: 'Confirmada',
        icon: <ConfirmedIcon size="sm" />,
    },
    [AppointmentStatus.PENDIENTE]: {
        badge: 'bg-amber-100 text-amber-800 border-amber-200',
        text: 'Pendiente',
        icon: <PendingIcon size="sm" />,
    },
    [AppointmentStatus.RECHAZADA]: {
        badge: 'bg-red-100 text-red-800 border-red-200',
        text: 'Rechazada',
        icon: <WarningIcon size="sm" />,
    },
    [AppointmentStatus.COMPLETADA]: {
        badge: 'bg-blue-100 text-blue-800 border-blue-200',
        text: 'Historia Cerrada',
        icon: <ClipboardIcon size="sm" />,
    },
    [AppointmentStatus.CANCELADA]: {
        badge: 'bg-gray-100 text-gray-800 border-gray-200',
        text: 'Cancelada',
        icon: <WarningIcon size="sm" />,
    },
};

const DoctorAppointmentsPage: React.FC<DoctorAppointmentsPageProps> = ({
    onNavigate,
    onNavigateWithParams,
    onLogout,
}) => {
    const { user } = useAuth();
    const { getAppointmentsByDoctor, updateAppointmentStatus } = useAppointments();
    const [filterDate, setFilterDate] = useState<string>('Hoy');

    const handleAction = (id: string, action: 'attend' | 'approve' | 'reject') => {
        if (action === 'attend') {
            if (window.confirm('¿Desea marcar esta cita como completada/atendida?')) {
                updateAppointmentStatus(id, AppointmentStatus.COMPLETADA);
            }
        } else if (action === 'approve') {
            updateAppointmentStatus(id, AppointmentStatus.RESERVADA);
        } else if (action === 'reject') {
            if (window.confirm('¿Seguro que desea rechazar/cancelar esta cita?')) {
                updateAppointmentStatus(id, AppointmentStatus.CANCELADA);
            }
        }
    };

    const appointments = user ? getAppointmentsByDoctor(user.id) : [];

    const filteredAppointments = appointments.filter(apt => {
        if (!filterDate || filterDate === 'Todos') return true;
        return apt.fecha.toLowerCase().includes(filterDate.toLowerCase());
    });

    const sortedAppointments = [...filteredAppointments].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return (
        <div className="min-h-screen bg-salud-fondo font-sans">
            <Navbar onHomeClick={() => onNavigate('home')} onLogout={onLogout} />

            <main className="max-w-6xl mx-auto px-4 py-8">
                {/* Header Profesional */}
                <div className="bg-gradient-to-r from-sky-400 to-sky-600 rounded-lg shadow-lg p-6 mb-6 flex flex-col md:flex-row justify-between items-center gap-4 text-white">
                    <div className="flex items-center gap-4">
                        <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                            <CalendarIcon size="xl" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">Agenda Clínica</h1>
                            <p className="text-blue-100 text-sm">
                                Dr. {user?.nombre} • {appointments.length} Pacientes en total
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                <SearchIcon size="sm" />
                            </div>
                            <input
                                type="text"
                                placeholder="Buscar paciente..."
                                className="pl-10 w-full bg-white border-0 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-white/50 block p-2.5 shadow-sm"
                            />
                        </div>
                        <button
                            onClick={() => onNavigate('home')}
                            className="bg-white/10 hover:bg-white/20 text-white border border-white/30 text-sm font-medium py-2 px-4 rounded-lg transition-colors"
                        >
                            Volver
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar de Filtros e Info */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <h3 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">Filtros de Vista</h3>
                            <div className="space-y-2">
                                <button
                                    onClick={() => setFilterDate('Hoy')}
                                    className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors ${filterDate === 'Hoy' ? 'bg-sky-50 text-sky-700 border border-sky-100' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    Pacientes de Hoy
                                </button>
                                <button
                                    onClick={() => setFilterDate('Mañana')}
                                    className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors ${filterDate === 'Mañana' ? 'bg-sky-50 text-sky-700 border border-sky-100' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    Pacientes de Mañana
                                </button>
                                <button
                                    onClick={() => setFilterDate('Todos')}
                                    className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors ${filterDate === 'Todos' ? 'bg-sky-50 text-sky-700 border border-sky-100' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    Todo el historial
                                </button>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg shadow-md p-4 text-white">
                            <h3 className="font-bold text-lg mb-1">Notas Rápidas</h3>
                            <p className="text-indigo-100 text-sm mb-4">Recordatorios y alertas</p>
                            <div className="bg-white/10 rounded p-3 text-sm backdrop-blur-sm border border-white/20">
                                <p>• Reunión de departamento a las 11:00 AM.</p>
                                <p className="mt-2">• Revisar casos pendientes de ayer.</p>
                            </div>
                        </div>
                    </div>

                    {/* Lista Principal de Pacientes */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                <h3 className="font-bold text-gray-700">Listado de Pacientes</h3>
                                <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-500">
                                    {sortedAppointments.length} Registros
                                </span>
                            </div>

                            {sortedAppointments.length > 0 ? (
                                <div className="divide-y divide-gray-100">
                                    {sortedAppointments.map((appointment) => {
                                        const config = statusConfig[appointment.estado];
                                        const center = getHealthCenterById(appointment.centroId);

                                        return (
                                            <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors group">
                                                <div className="flex flex-col sm:flex-row justify-between gap-4">
                                                    {/* Info Paciente */}
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold border border-gray-200">
                                                                <UserIcon size="sm" />
                                                            </div>
                                                            <div>
                                                                <h4 className="font-bold text-gray-800 text-lg">Paciente ID: {appointment.usuarioId}</h4>
                                                                <p className="text-gray-500 text-sm flex items-center gap-2">
                                                                    <span className="font-medium text-gray-700">{appointment.turno}</span>
                                                                    • {center?.nombre}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mt-3 ml-13 pl-10 border-l-2 border-gray-100">
                                                            <div className="flex items-center gap-2 text-gray-600">
                                                                <CalendarIcon size="sm" className="text-blue-500" />
                                                                {appointment.fecha}
                                                            </div>
                                                            <div className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.badge}`}>
                                                                {config.icon} {config.text}
                                                            </div>
                                                        </div>

                                                        {appointment.motivoRechazo && (
                                                            <div className="mt-3 ml-13 p-2 bg-red-50 text-red-700 text-xs rounded border border-red-100 inline-block">
                                                                <strong>Motivo Rechazo:</strong> {appointment.motivoRechazo}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Botones de Acción */}
                                                    <div className="flex sm:flex-col gap-2 justify-center min-w-[140px]">
                                                        {appointment.estado === AppointmentStatus.RESERVADA && (
                                                            <>
                                                                <button
                                                                    onClick={() => onNavigateWithParams('consultation', { appointmentId: appointment.id, patientId: appointment.usuarioId })}
                                                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                                                                >
                                                                    <ClipboardIcon size="sm" /> Atender Consulta
                                                                </button>
                                                                <button
                                                                    onClick={() => alert('Para reagendar, contacte al paciente. (Funcionalidad avanzada en desarrollo)')}
                                                                    className="w-full bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 text-sm font-medium py-2 px-4 rounded-lg transition-colors"
                                                                >
                                                                    Reagendar
                                                                </button>
                                                            </>
                                                        )}
                                                        {appointment.estado === AppointmentStatus.PENDIENTE && (
                                                            <button
                                                                onClick={() => handleAction(appointment.id, 'approve')}
                                                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-sm transition-colors"
                                                            >
                                                                Aprobar
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-20 px-6">
                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                                        <CalendarIcon size="xl" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-700 mb-2">
                                        Agenda despejada
                                    </h3>
                                    <p className="text-gray-500 max-w-sm mx-auto">
                                        No hay pacientes programados para este filtro. Disfrute su tiempo o revise pendientes administrativos.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DoctorAppointmentsPage;
