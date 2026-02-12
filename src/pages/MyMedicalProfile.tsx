/**
 * SaludConecta VE - Mi Perfil Profesional
 * Representa: Gestión del Perfil del Médico
 * 
 * Permite al médico ver y editar su información pública,
 * incluyendo su foto de perfil.
 */

import React, { useState, useEffect } from 'react';
import { Navbar, BackButton } from '../components/layout';
import { Card, Button } from '../components/ui';
import { useAuth } from '../contexts/AuthContext';
import { getDoctorById, getHealthCenterById, specialties } from '../data/mockData';
import {
    UserIcon,
    CameraIcon,
    SaveIcon,
    CalendarIcon,
    MapIcon,
    StethoscopeIcon
} from '../components/icons';
import { Doctor } from '../types';

interface MyMedicalProfileProps {
    onNavigate: (page: any) => void;
    onLogout: () => void;
}

const MyMedicalProfile: React.FC<MyMedicalProfileProps> = ({
    onNavigate,
    onLogout,
}) => {
    const { user } = useAuth();
    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [newImage, setNewImage] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    // Cargar datos del doctor
    useEffect(() => {
        if (user && user.tipo === 'medico') {
            // Intentar cargar desde localStorage primero (para persistencia de demo)
            const savedProfile = localStorage.getItem(`doctor_profile_${user.id}`);

            if (savedProfile) {
                setDoctor(JSON.parse(savedProfile));
            } else {
                // Si no hay cambios guardados, usar mockData
                const docData = getDoctorById(user.id);
                if (docData) {
                    setDoctor(docData);
                }
            }
            setIsLoading(false);
        }
    }, [user]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewImage(reader.result as string);
                setIsEditing(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        if (doctor && newImage) {
            const updatedDoctor = { ...doctor, imagenUrl: newImage };
            setDoctor(updatedDoctor);
            // Guardar en localStorage para persistencia
            localStorage.setItem(`doctor_profile_${doctor.id}`, JSON.stringify(updatedDoctor));
            setNewImage(null);
            setIsEditing(false);
            // Mostrar feedback visual (podría ser un toast)
            alert('Foto de perfil actualizada correctamente');
        }
    };

    if (isLoading) return <div className="p-10 text-center">Cargando perfil...</div>;
    if (!doctor) return <div className="p-10 text-center">No se encontró información del médico.</div>;

    const center = getHealthCenterById(doctor.centroId);
    const specialty = specialties.find(s => s.id === doctor.especialidadId);

    return (
        <div className="min-h-screen bg-salud-fondo font-sans">
            <Navbar onHomeClick={() => onNavigate('home')} onLogout={onLogout} />

            <main className="max-w-4xl mx-auto px-4 py-8">
                <BackButton onClick={() => onNavigate('home')} className="mb-6" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Columna Izquierda: Foto y Estado */}
                    <div className="col-span-1">
                        <Card className="text-center sticky top-6">
                            <div className="relative inline-block mb-4 group cursor-pointer" onClick={() => document.getElementById('file-upload')?.click()}>
                                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto bg-gray-100 flex items-center justify-center relative group-hover:opacity-90 transition-opacity">
                                    {(newImage || doctor.imagenUrl) ? (
                                        <img
                                            src={newImage || doctor.imagenUrl}
                                            alt={doctor.nombre}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-6xl text-gray-400 font-bold select-none">
                                            {doctor.nombre.split(' ')[1]?.[0] || doctor.nombre[0]}
                                        </span>
                                    )}

                                    {/* Overlay al hacer hover */}
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <CameraIcon size="lg" className="text-white" />
                                    </div>
                                </div>

                                {/* Input oculto pero funcional */}
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                />
                            </div>

                            <h2 className="text-xl font-bold text-gray-800 mb-1">{doctor.nombre}</h2>
                            <p className="text-blue-600 font-medium mb-4">{specialty?.nombre}</p>

                            {isEditing && (
                                <div className="mb-4 animate-fade-in">
                                    <Button
                                        fullWidth
                                        onClick={handleSave}
                                        className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700"
                                    >
                                        <SaveIcon size="sm" /> Guardar Cambios
                                    </Button>
                                </div>
                            )}

                            <div className="border-t border-gray-100 pt-4 text-left space-y-3">
                                <div className="flex items-center gap-3 text-gray-600">
                                    <MapIcon size="sm" className="text-gray-400" />
                                    <span className="text-sm">{center?.nombre}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <StethoscopeIcon size="sm" className="text-gray-400" />
                                    <span className="text-sm">ID: {doctor.id}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 ml-1"></div>
                                    <span className="text-sm font-medium text-emerald-600">Activo para Consultas</span>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Columna Derecha: Información Detallada */}
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <Card title="Información Profesional">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">Credenciales y Estudios</label>
                                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-gray-800 text-sm">
                                        {doctor.credenciales}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">Licencia Médica / Colegiado</label>
                                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 text-blue-800 text-sm font-bold inline-block">
                                        {doctor.numeroColegiado || 'No registrado'}
                                    </div>
                                </div>

                                {doctor.firmaDigitalUrl && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Firma Digital</label>
                                        <div className="p-4 bg-white rounded-lg border border-gray-200 flex items-center justify-center h-24 w-full sm:w-2/3">
                                            <img
                                                src={doctor.firmaDigitalUrl}
                                                alt="Firma Digital"
                                                className="max-h-full object-contain"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Especialidad</label>
                                        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100 text-blue-800">
                                            <span>{specialty?.icono}</span>
                                            <span className="font-medium">{specialty?.nombre}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Centro Asignado</label>
                                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-gray-800 text-sm">
                                            {center?.nombre}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card title="Horarios de Atención">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
                                    <div className="flex items-center gap-2 mb-2 text-orange-700 font-bold">
                                        <CalendarIcon size="sm" />
                                        <h4>Turno Mañana</h4>
                                    </div>
                                    <p className="text-2xl text-gray-800 font-bold">{doctor.horario.manana}</p>
                                    <p className="text-xs text-gray-500 mt-1">Lunes a Viernes</p>
                                </div>

                                <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100">
                                    <div className="flex items-center gap-2 mb-2 text-indigo-700 font-bold">
                                        <CalendarIcon size="sm" />
                                        <h4>Turno Tarde</h4>
                                    </div>
                                    <p className="text-2xl text-gray-800 font-bold">{doctor.horario.tarde}</p>
                                    <p className="text-xs text-gray-500 mt-1">Lunes a Viernes</p>
                                </div>
                            </div>
                        </Card>

                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg">
                            <h3 className="text-lg font-bold mb-2">Estadísticas del Mes</h3>
                            <div className="grid grid-cols-3 gap-6 mt-4 text-center">
                                <div>
                                    <div className="text-3xl font-bold">142</div>
                                    <div className="text-blue-200 text-xs uppercase tracking-wider mt-1">Pacientes</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold">4.9</div>
                                    <div className="text-blue-200 text-xs uppercase tracking-wider mt-1">Calificación</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold">98%</div>
                                    <div className="text-blue-200 text-xs uppercase tracking-wider mt-1">Asistencia</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MyMedicalProfile;
