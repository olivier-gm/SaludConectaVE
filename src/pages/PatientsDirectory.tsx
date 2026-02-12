/**
 * SaludConecta VE - Directorio de Pacientes
 * 
 * Módulo para que los médicos puedan buscar y visualizar
 * a sus pacientes asignados o del sistema.
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/layout';
import { Card, Button } from '../components/ui';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../services/db';
import { User } from '../types';
import {
    UserIcon,
    SearchIcon,
    ClipboardIcon,
    StethoscopeIcon,
    WarningIcon,
    CalendarIcon
} from '../components/icons';

type Page = 'home' | 'search' | 'booking' | 'appointments' | 'contact' | 'doctor-appointments' | 'consultation' | 'patients' | 'schedule';

interface PatientsDirectoryProps {
    onNavigate: (page: Page) => void;
    onLogout: () => void;
}

const PatientsDirectory: React.FC<PatientsDirectoryProps> = ({ onNavigate, onLogout }) => {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [patientsList, setPatientsList] = useState<User[]>([]);

    useEffect(() => {
        // Cargar pacientes desde la DB
        // En un sistema real, esto filtraría por doctor. Aquí mostramos todos los tipo 'maria'/'pablo'/'regular'
        const users = db.users.getAll();
        const patients = users.filter(u => ['maria', 'pablo', 'regular'].includes(u.tipo));
        setPatientsList(patients);
    }, []);

    // Filtrar usuarios
    const patients = patientsList.filter(patient =>
        patient.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.cedula.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-salud-fondo font-sans">
            <Navbar onHomeClick={() => onNavigate('home')} onLogout={onLogout} />

            <main className="max-w-6xl mx-auto px-4 py-8">
                {/* Header con gradiente Sky Blue (Consistente con Dashboard) */}
                <div className="bg-gradient-to-r from-sky-400 to-sky-600 rounded-lg shadow-lg p-6 mb-6 flex flex-col md:flex-row justify-between items-center gap-4 text-white">
                    <div className="flex items-center gap-4">
                        <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                            <StethoscopeIcon size="xl" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">Directorio de Pacientes</h1>
                            <p className="text-blue-100 text-sm">
                                Dr. {user?.nombre} • Gestión de historias clínicas
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <Button
                            variant="secondary"
                            className="bg-white/10 hover:bg-white/20 text-white border-white/30"
                            onClick={() => onNavigate('home')}
                        >
                            Volver al Dashboard
                        </Button>
                    </div>
                </div>

                {/* Barra de Búsqueda y Filtros */}
                <Card className="mb-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="mt-2 relative flex-1 w-full">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <SearchIcon size="sm" />
                            </div>
                            <input
                                type="text"
                                className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                placeholder="Buscar por nombre o cédula..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2 w-full md:w-auto mt-2">
                            <Button variant="outline" onClick={() => setSearchTerm('')}>
                                Limpiar
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Grid de Pacientes */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {patients.length > 0 ? (
                        patients.map(patient => (
                            <div key={patient.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-2xl border-2 border-white shadow-sm">
                                            <UserIcon size="lg" />
                                        </div>
                                        {patient.alergias && patient.alergias.length > 0 && (
                                            <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full border border-red-200 flex items-center gap-1">
                                                <WarningIcon size="sm" /> Alergias
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-800 mb-1">{patient.nombre}</h3>
                                    <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">
                                        <span className="font-mono bg-gray-100 px-1 rounded">{patient.cedula}</span>
                                        {patient.fechaNacimiento && `• ${new Date().getFullYear() - new Date(patient.fechaNacimiento).getFullYear()} años`}
                                    </p>

                                    <div className="space-y-2 mb-6">
                                        <div className="flex justify-between text-sm py-1 border-b border-gray-50">
                                            <span className="text-gray-500">Última Consulta:</span>
                                            <span className="font-medium text-gray-700">15 Nov 2023</span>
                                        </div>
                                        <div className="flex justify-between text-sm py-1 border-b border-gray-50">
                                            <span className="text-gray-500">Diagnóstico Reciente:</span>
                                            <span className="font-medium text-gray-700">Virosis</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <button className="flex items-center justify-center gap-2 py-2 px-3 bg-sky-50 text-sky-700 rounded-lg hover:bg-sky-100 transition-colors text-sm font-medium border border-sky-100">
                                            <ClipboardIcon size="sm" /> Historia
                                        </button>
                                        <button className="flex items-center justify-center gap-2 py-2 px-3 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors text-sm font-medium border border-emerald-100">
                                            <CalendarIcon size="sm" /> Citar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
                            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <SearchIcon size="lg" />
                            </div>
                            <p className="text-lg font-medium">No se encontraron pacientes</p>
                            <p className="text-sm">Intenta con otro término de búsqueda</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default PatientsDirectory;
