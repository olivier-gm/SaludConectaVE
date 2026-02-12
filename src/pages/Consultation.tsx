/**
 * SaludConecta VE - Vista de Consulta Médica
 * Representa: Historia Clínica Electrónica + Vademécum
 * 
 * Interfaz principal de trabajo médico durante la atención.
 */

import React, { useState, useEffect } from 'react';
import { Navbar, BackButton } from '../components/layout';
import { Card, Button, Input } from '../components/ui';
import { useAuth } from '../contexts/AuthContext';
import { useAppointments } from '../contexts/AppointmentContext';
import {
    clinicalNotes as mockNotes,
    drugs as mockDrugs,
    demoUsers
} from '../data/mockData';
import { ClinicalNote, Drug, User, AppointmentStatus } from '../types';
import {
    WarningIcon,
    SaveIcon,
    SearchIcon,
    StethoscopeIcon, // Used as PillIcon replacement
    CalendarIcon,    // Used as ClockIcon replacement
    ConfirmedIcon    // Used as CheckIcon replacement
} from '../components/icons';

interface ConsultationPageProps {
    appointmentId?: string; // ID de la cita que se está atendiendo
    patientId?: string;     // ID del paciente (si se entra directo)
    onNavigate: (page: any) => void;
    onLogout: () => void;
}

const ConsultationPage: React.FC<ConsultationPageProps> = ({
    appointmentId,
    patientId,
    onNavigate,
    onLogout,
}) => {
    const { user: doctorUser } = useAuth();
    const { updateAppointmentStatus } = useAppointments();

    // Estados principales
    const [patient, setPatient] = useState<User | null>(null);
    const [notes, setNotes] = useState<ClinicalNote[]>([]);
    const [drugSearch, setDrugSearch] = useState('');
    const [filteredDrugs, setFilteredDrugs] = useState<Drug[]>(mockDrugs);

    // Estado del formulario de nota (SOAP simplificado)
    const [currentNote, setCurrentNote] = useState({
        subjetivo: '',
        objetivo: '',
        analisis: '',
        plan: ''
    });

    // Cargar datos al montar
    useEffect(() => {
        // Simular carga de paciente desde ID
        // En una app real esto sería una llamada a API
        const foundPatient = demoUsers.find(u => u.id === patientId);
        if (foundPatient) {
            setPatient(foundPatient);
            // Cargar notas previas de este paciente
            setNotes(mockNotes.filter(n => n.patientId === patientId));
        }
    }, [patientId]);

    // Filtro de Vademecum
    useEffect(() => {
        if (drugSearch.trim() === '') {
            setFilteredDrugs(mockDrugs);
        } else {
            const lowerSearch = drugSearch.toLowerCase();
            setFilteredDrugs(mockDrugs.filter(d =>
                d.nombre.toLowerCase().includes(lowerSearch) ||
                d.principioActivo.toLowerCase().includes(lowerSearch)
            ));
        }
    }, [drugSearch]);

    const handleSaveNote = () => {
        if (!patient || !doctorUser) return;

        const newNote: ClinicalNote = {
            id: `note-${Date.now()}`,
            patientId: patient.id,
            doctorId: doctorUser.id,
            appointmentId: appointmentId || 'walk-in',
            fecha: new Date().toISOString().split('T')[0],
            ...currentNote
        };

        setNotes([newNote, ...notes]);
        setCurrentNote({ subjetivo: '', objetivo: '', analisis: '', plan: '' });
        alert('Nota de evolución guardada correctamente.');

        // Si hay cita asociada, preguntar si finalizarla
        if (appointmentId) {
            if (confirm('¿Desea finalizar la cita y cerrar el caso?')) {
                updateAppointmentStatus(appointmentId, AppointmentStatus.COMPLETADA);
                onNavigate('doctor-appointments');
            }
        }
    };

    if (!patient) return <div className="p-10 text-center">Cargando datos del paciente...</div>;

    // Calcular edad (aproximada)
    const getAge = (birthDateString?: string) => {
        if (!birthDateString) return 'Edad desconocida';
        const today = new Date();
        const birthDate = new Date(birthDateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return `${age} años`;
    };

    return (
        <div className="min-h-screen bg-salud-fondo font-sans flex flex-col">
            <Navbar onHomeClick={() => onNavigate('home')} onLogout={onLogout} />

            {/* ALERTA VISUAL DE ALERGIAS (CRÍTICO) */}
            {patient.alergias && patient.alergias.length > 0 && (
                <div className="bg-red-600 text-white px-4 py-3 shadow-md animate-pulse sticky top-0 z-50 flex items-center justify-center gap-3 font-bold text-lg">
                    <WarningIcon size="lg" className="text-white" />
                    <span>ALERTA CLÍNICA: PACIENTE ALÉRGICO A: {patient.alergias.join(', ').toUpperCase()}</span>
                </div>
            )}

            <div className="flex-1 max-w-full mx-auto w-full px-4 py-4 grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">

                {/* COLUMNA IZQUIERDA: Contexto del Paciente (25%) */}
                <div className="lg:col-span-3 space-y-4">
                    <BackButton onClick={() => onNavigate('doctor-appointments')} />

                    <Card className="bg-white">
                        <div className="text-center mb-4">
                            <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center text-2xl font-bold text-gray-500">
                                {patient.nombre.charAt(0)}
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">{patient.nombre}</h2>
                            <p className="text-gray-500">{patient.cedula}</p>
                            <p className="text-blue-600 font-medium mt-1">{getAge(patient.fechaNacimiento)}</p>
                        </div>

                        <div className="border-t border-gray-100 pt-3 text-sm">
                            <h4 className="font-bold text-gray-700 mb-2">Antecedentes Rápidos</h4>
                            <ul className="space-y-1 text-gray-600 list-disc pl-4">
                                <li>Hipertensión Arterial (2018)</li>
                                <li>Quirúrgicos: Apendicectomía (2010)</li>
                            </ul>
                        </div>
                    </Card>

                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 max-h-[400px] overflow-y-auto">
                        <h3 className="font-bold text-blue-800 flex items-center gap-2 mb-3">
                            <CalendarIcon size="sm" /> Historial de Citas
                        </h3>
                        <div className="space-y-3">
                            {notes.map(note => (
                                <div key={note.id} className="bg-white p-3 rounded-lg shadow-sm text-sm">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-gray-700">{note.fecha}</span>
                                        <span className="text-xs text-gray-400">Dr. {note.doctorId}</span>
                                    </div>
                                    <p className="text-gray-600 italic line-clamp-2">"{note.subjetivo}"</p>
                                    <p className="text-blue-600 font-medium mt-1">Plan: {note.plan}</p>
                                </div>
                            ))}
                            {notes.length === 0 && <p className="text-gray-500 italic text-sm">Sin historial previo registrado.</p>}
                        </div>
                    </div>
                </div>

                {/* COLUMNA CENTRAL: Editor de Evolución (50%) */}
                <div className="lg:col-span-6 flex flex-col h-full">
                    <Card className="flex-1 flex flex-col" title="Evolución / Nota Clínica">
                        <div className="flex-1 space-y-4 overflow-y-auto pr-2">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">S - Subjetivo (Motivo de consulta y síntomas)</label>
                                <textarea
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[80px]"
                                    placeholder="Pacientes refiere..."
                                    value={currentNote.subjetivo}
                                    onChange={e => setCurrentNote({ ...currentNote, subjetivo: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">O - Objetivo (Examen físico y signos vitales)</label>
                                <textarea
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[80px]"
                                    placeholder="TA: __/__, FC: __, FR: __..."
                                    value={currentNote.objetivo}
                                    onChange={e => setCurrentNote({ ...currentNote, objetivo: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">A - Análisis (Diagnóstico presuntivo)</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Ej: Rinofaringitis Aguda"
                                    value={currentNote.analisis}
                                    onChange={e => setCurrentNote({ ...currentNote, analisis: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">P - Plan (Tratamiento e indicaciones)</label>
                                <textarea
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
                                    placeholder="1. Reposo por 48h..."
                                    value={currentNote.plan}
                                    onChange={e => setCurrentNote({ ...currentNote, plan: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end gap-3">
                            <Button
                                variant="outline"
                                onClick={() => onNavigate('doctor-appointments')}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleSaveNote}
                                rightIcon={<SaveIcon size="sm" />}
                            >
                                Guardar y Finalizar
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* COLUMNA DERECHA: Vademécum (25%) */}
                <div className="lg:col-span-3 flex flex-col h-full">
                    <Card className="h-full flex flex-col bg-emerald-50 border-emerald-100" title="Vademécum Rápido">
                        <div className="mb-4">
                            <Input
                                placeholder="Buscar medicamento..."
                                leftIcon={<SearchIcon size="sm" />}
                                value={drugSearch}
                                onChange={e => setDrugSearch(e.target.value)}
                            />
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                            {filteredDrugs.map(drug => (
                                <div key={drug.id} className="bg-white p-3 rounded-lg border border-emerald-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
                                    onClick={() => setCurrentNote(prev => ({ ...prev, plan: prev.plan + `\n- ${drug.nombre} (${drug.presentacion}): ${drug.dosis}` }))}
                                >
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-bold text-emerald-800">{drug.nombre}</h4>
                                        <StethoscopeIcon size="sm" className="text-emerald-400" />
                                    </div>
                                    <p className="text-xs text-gray-500 mb-1">{drug.principioActivo}</p>
                                    <div className="text-xs bg-emerald-50 text-emerald-700 p-1.5 rounded mt-1 border border-emerald-100">
                                        <strong>Dosis:</strong> {drug.dosis}
                                    </div>
                                    <div className="mt-2 text-xs text-gray-400 group-hover:text-emerald-600 transition-colors flex items-center gap-1">
                                        <ConfirmedIcon size="sm" /> Click para agregar al Plan
                                    </div>
                                </div>
                            ))}
                            {filteredDrugs.length === 0 && (
                                <div className="text-center text-gray-500 py-4">No se encontraron medicamentos.</div>
                            )}
                        </div>
                    </Card>
                </div>

            </div>
        </div>
    );
};

export default ConsultationPage;
