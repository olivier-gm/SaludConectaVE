/**
 * SaludConecta VE - Contexto de Citas Médicas
 * Representa: UC3 (Agendar Cita), UC5 (Ver Estado)
 * 
 * Maneja la lógica de negocio simulada para:
 * - Caso María: Éxito al agendar en Hospital Militar (Cardiología)
 * - Caso Pablo: Rechazo por centros colapsados
 * 
 * RF-3: Incluye simulación de carga para feedback visual
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppointmentContextType, Appointment, AppointmentStatus } from '../types';
import { canAppointmentBeApproved, validateSpecialtyAvailability } from '../data/mockData';
import { db } from '../services/db';

// Crear el contexto
const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

interface AppointmentProviderProps {
    children: ReactNode;
}

/**
 * Proveedor del contexto de citas
 * Maneja el estado global de las citas médicas usando el servicio DB
 */
export const AppointmentProvider: React.FC<AppointmentProviderProps> = ({ children }) => {
    // Inicializar estado usando la DB
    const [appointments, setAppointments] = useState<Appointment[]>(() => {
        return db.appointments.getAll();
    });
    const [isLoading, setIsLoading] = useState(false);

    // Sincronizar con DB cuando cambian las citas (opcional si usamos los métodos de DB directamente para mutar)
    // Pero como db.ts guarda en localStorage inmediatamente, y esto es React state...
    // Mejor estrategia: Leer de DB, y cuando modificamos, actualizamos DB y State.

    /**
     * Agrega una nueva cita al sistema
     */
    const addAppointment = async (
        appointmentData: Omit<Appointment, 'id' | 'createdAt'>
    ): Promise<Appointment> => {
        setIsLoading(true);

        // RF-3: Simular tiempo de carga de red (1.5 - 2.5 segundos)
        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

        // Obtener citas frescas de la DB para validación
        const currentAppointments = db.appointments.getAll();

        // VALIDACIÓN 1: Verificar si ya tiene cita pendiente en esta especialidad
        const specialtyValidation = validateSpecialtyAvailability(
            appointmentData.usuarioId,
            appointmentData.especialidadId,
            currentAppointments
        );

        if (!specialtyValidation.isValid) {
            const rejectedAppointment: Appointment = {
                ...appointmentData,
                id: `apt-${Date.now()}`,
                createdAt: new Date(),
                estado: AppointmentStatus.RECHAZADA,
                motivoRechazo: specialtyValidation.message,
            };

            // Guardamos incluso las rechazadas para historial? El mock anterior lo hacía en state pero no sé si persistía.
            // Asumiremos que sí.
            db.appointments.add(rejectedAppointment);
            setAppointments(prev => [...prev, rejectedAppointment]);
            setIsLoading(false);

            return rejectedAppointment;
        }

        // VALIDACIÓN 2: Determinar el estado según el usuario y escenario de prueba
        const appointmentApproved = canAppointmentBeApproved(appointmentData.usuarioId);

        const newAppointment: Appointment = {
            ...appointmentData,
            id: `apt-${Date.now()}`,
            createdAt: new Date(),
            estado: appointmentApproved
                ? AppointmentStatus.RESERVADA
                : AppointmentStatus.RECHAZADA,
            motivoRechazo: appointmentApproved
                ? undefined
                : 'Sin disponibilidad - Centro de salud temporalmente sin capacidad de atención',
        };

        db.appointments.add(newAppointment);
        setAppointments(prev => [...prev, newAppointment]);
        setIsLoading(false);

        return newAppointment;
    };

    /**
     * Obtiene todas las citas de un usuario específico
     */
    const getAppointmentsByUser = (userId: string): Appointment[] => {
        return appointments.filter(apt => apt.usuarioId === userId);
    };

    /**
     * Obtiene todas las citas de un doctor específico
     */
    const getAppointmentsByDoctor = (doctorId: string): Appointment[] => {
        return appointments.filter(apt => apt.doctorId === doctorId);
    };

    /**
     * Actualiza el estado de una cita
     */
    const updateAppointmentStatus = (appointmentId: string, newStatus: AppointmentStatus) => {
        db.appointments.updateStatus(appointmentId, newStatus);
        setAppointments(prev => prev.map(apt =>
            apt.id === appointmentId ? { ...apt, estado: newStatus } : apt
        ));
    };

    return (
        <AppointmentContext.Provider
            value={{
                appointments,
                isLoading,
                addAppointment,
                getAppointmentsByUser,
                getAppointmentsByDoctor,
                updateAppointmentStatus
            }}
        >
            {children}
        </AppointmentContext.Provider>
    );
};

/**
 * Hook personalizado para acceder al contexto de citas
 * @throws Error si se usa fuera del AppointmentProvider
 */
export const useAppointments = (): AppointmentContextType => {
    const context = useContext(AppointmentContext);
    if (context === undefined) {
        throw new Error('useAppointments debe ser usado dentro de un AppointmentProvider');
    }
    return context;
};
