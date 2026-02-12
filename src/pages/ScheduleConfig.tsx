/**
 * SaludConecta VE - Configuración de Horario Mèdico
 * 
 * Módulo para que los médicos definan su disponibilidad semanal.
 */

import React, { useState } from 'react';
import { Navbar } from '../components/layout';
import { Card, Button } from '../components/ui';
import { useAuth } from '../contexts/AuthContext';
import {
    MorningIcon,
    CalendarIcon
} from '../components/icons';
import { db } from '../services/db';

type Page = 'home' | 'search' | 'booking' | 'appointments' | 'contact' | 'doctor-appointments' | 'consultation' | 'patients' | 'schedule';

interface ScheduleConfigProps {
    onNavigate: (page: Page) => void;
    onLogout: () => void;
}

const ScheduleConfig: React.FC<ScheduleConfigProps> = ({ onNavigate, onLogout }) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    // Estado inicial
    const [schedule, setSchedule] = useState(() => {
        // Intentar cargar horario guardado del médico
        const saved = localStorage.getItem(`schedule_config_${user?.id}`);
        if (saved) return JSON.parse(saved);

        // Default
        return [
            { day: 'Lunes', active: true, morning: '08:00 - 12:00', afternoon: '14:00 - 17:00' },
            { day: 'Martes', active: true, morning: '08:00 - 12:00', afternoon: '14:00 - 17:00' },
            { day: 'Miércoles', active: true, morning: '08:00 - 12:00', afternoon: '14:00 - 17:00' },
            { day: 'Jueves', active: true, morning: '08:00 - 12:00', afternoon: '14:00 - 17:00' },
            { day: 'Viernes', active: true, morning: '08:00 - 12:00', afternoon: '14:00 - 16:00' },
            { day: 'Sábado', active: false, morning: '09:00 - 12:00', afternoon: 'Descanso' },
            { day: 'Domingo', active: false, morning: 'Descanso', afternoon: 'Descanso' },
        ];
    });

    const handleSave = () => {
        setLoading(true);

        // Simular llamada a API / Guardar en DB
        setTimeout(() => {
            // 1. Guardar la configuración detallada
            localStorage.setItem(`schedule_config_${user?.id}`, JSON.stringify(schedule));

            // 2. Actualizar el perfil del doctor en la DB (Resumen del Lunes)
            if (user?.id) {
                const monday = schedule.find((s: any) => s.day === 'Lunes');
                if (monday && monday.active) {
                    db.doctors.updateSchedule(user.id, {
                        manana: monday.morning,
                        tarde: monday.afternoon
                    });
                }
            }

            setLoading(false);
            // Mostrar modal o alert mejorado? Por ahora alert simple
            alert('Horario actualizado correctamente');
            onNavigate('home');
        }, 800);
    };

    const toggleDay = (index: number) => {
        const newSchedule = [...schedule];
        newSchedule[index].active = !newSchedule[index].active;
        setSchedule(newSchedule);
    };

    return (
        <div className="min-h-screen bg-salud-fondo font-sans">
            <Navbar onHomeClick={() => onNavigate('home')} onLogout={onLogout} />

            <main className="max-w-4xl mx-auto px-4 py-8">
                {/* Header con gradiente Amber (Diferente a Dashboard/Pacientes para distinguir contexto) */}
                <div className="bg-gradient-to-r from-amber-400 to-amber-600 rounded-lg shadow-lg p-6 mb-6 flex flex-col md:flex-row justify-between items-center gap-4 text-white">
                    <div className="flex items-center gap-4">
                        <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                            <MorningIcon size="xl" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">Configuración de Horario</h1>
                            <p className="text-amber-100 text-sm">
                                Dr. {user?.nombre} • Gestión de disponibilidad
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                        <Button
                            variant="ghost"
                            className="bg-white/20 hover:bg-white/30 text-white border-white/40 backdrop-blur-sm transition-all text-sm sm:text-base border"
                            onClick={() => onNavigate('home')}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="ghost"
                            className="!bg-white !text-amber-600 hover:!bg-amber-50 font-bold border-none shadow-lg hover:shadow-amber-900/20 active:scale-95 transition-all text-sm sm:text-base px-6 py-2"
                            onClick={handleSave}
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></span>
                                    Guardando...
                                </span>
                            ) : 'Guardar Cambios'}
                        </Button>
                    </div>
                </div>

                <Card className="mb-6 p-0 overflow-hidden">
                    <div className="p-4 bg-amber-50 border-b border-amber-100 flex items-center gap-3">
                        <div className="text-amber-600">
                            <CalendarIcon size="lg" />
                        </div>
                        <div className="text-sm text-amber-900">
                            <strong>Importante:</strong> Los cambios en su horario afectarán la disponibilidad para citas a partir de la próxima semana.
                        </div>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {schedule.map((day, index) => (
                            <div key={day.day} className={`p-4 flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors ${day.active ? 'bg-white' : 'bg-gray-50'}`}>
                                <div className="flex items-center gap-4 min-w-[150px]">
                                    <div className="relative inline-flex items-center cursor-pointer group/toggle">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={day.active}
                                            onChange={() => toggleDay(index)}
                                        />
                                        <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-amber-500 shadow-inner"></div>
                                    </div>
                                    <div>
                                        <span className={`block font-bold text-lg ${day.active ? 'text-gray-800' : 'text-gray-400'}`}>
                                            {day.day}
                                        </span>
                                        <span className={`text-xs font-medium uppercase tracking-wider ${day.active ? 'text-amber-600' : 'text-gray-400'}`}>
                                            {day.active ? 'Abierto' : 'Cerrado'}
                                        </span>
                                    </div>
                                </div>

                                {day.active ? (
                                    <div className="flex flex-1 flex-col sm:flex-row gap-4 w-full">
                                        <div className="flex-1">
                                            <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Mañana</label>
                                            <input
                                                type="text"
                                                className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                                defaultValue={day.morning}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Tarde</label>
                                            <input
                                                type="text"
                                                className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                                defaultValue={day.afternoon}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex-1 text-center text-sm text-gray-400 italic">
                                        No laborable
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </Card>
            </main>
        </div>
    );
};

export default ScheduleConfig;
