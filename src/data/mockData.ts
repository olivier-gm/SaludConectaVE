/**
 * SaludConecta VE - Datos Precargados (Mock Data)
 * Centros de Salud, Especialidades y Doctores de San Juan de los Morros, Guárico
 * 
 * Estos datos simulan la información que vendría de una base de datos real.
 * Se utilizan para la demostración académica ante la UNERG.
 */

import { HealthCenter, Specialty, Doctor, User } from '../types';

// ===== CENTROS DE SALUD =====
// Representa los 5 centros de salud de San Juan de los Morros
export const healthCenters: HealthCenter[] = [
    {
        id: 'ambulatorio-ivss',
        nombre: 'Ambulatorio San Juan (IVSS)',
        direccion: 'Calle Santa Isabel N° 15, San Juan de los Morros',
        telefono: '+58 246-4311234',
        colapsado: true, // Centro colapsado para simular caso Pablo
    },
    {
        id: 'cdi-bella-vista',
        nombre: 'CDI Bella Vista (Che Guevara)',
        direccion: 'Urb. Bella Vista, San Juan de los Morros',
        telefono: '+58 246-4315678',
        colapsado: true, // Centro colapsado para simular caso Pablo
    },
    {
        id: 'cdi-fatima',
        nombre: 'CDI Calle Fátima (Dr. Tulio Pineda)',
        direccion: 'Sector Central, San Juan de los Morros',
        telefono: '+58 246-4319012',
        colapsado: true, // Centro colapsado para simular caso Pablo
    },
    {
        id: 'hospital-militar',
        nombre: 'Hospital Militar Fuerte Conopoima',
        direccion: 'Sede de la 43 Brigada, San Juan de los Morros',
        telefono: '+58 246-4323456',
        colapsado: false, // ¡DISPONIBLE! - Caso María funciona aquí
    },
    {
        id: 'hospital-ranuarez',
        nombre: 'Hospital Israel Ranuárez Balza',
        direccion: 'Av. Lasso Martí, San Juan de los Morros',
        telefono: '+58 246-4327890',
        colapsado: true, // Centro colapsado para simular caso Pablo
    },
];

// ===== ESPECIALIDADES MÉDICAS =====
export const specialties: Specialty[] = [
    { id: 'pediatria', nombre: 'Pediatría', icono: '👶' },
    { id: 'ginecologia', nombre: 'Ginecología', icono: '🤰' },
    { id: 'medicina-interna', nombre: 'Medicina Interna', icono: '🩺' },
    { id: 'cardiologia', nombre: 'Cardiología', icono: '❤️' },
    { id: 'cirugia-general', nombre: 'Cirugía General', icono: '🏥' },
];

// ===== DOCTORES (25 en total) =====
// Distribuidos equitativamente: 5 doctores por centro, 1 por especialidad
export const doctors: Doctor[] = [
    // === Ambulatorio San Juan (IVSS) ===
    {
        id: 'doc-001',
        nombre: 'Dra. Elena Rodríguez',
        especialidadId: 'pediatria',
        centroId: 'ambulatorio-ivss',
        horario: { manana: '7:00 AM - 12:00 PM', tarde: '2:00 PM - 5:00 PM' },
        credenciales: 'Especialista en Pediatría - UCV. 15 años de experiencia.',
        imagenUrl: 'https://i.pravatar.cc/150?u=doc-001',
        numeroColegiado: 'MPPS-10001',
        firmaDigitalUrl: 'https://via.placeholder.com/300x100/e2e8f0/475569?text=Firma+Digital',
    },
    {
        id: 'doc-002',
        nombre: 'Dra. Carmen Alvarado',
        especialidadId: 'ginecologia',
        centroId: 'ambulatorio-ivss',
        horario: { manana: '8:00 AM - 12:00 PM', tarde: '1:00 PM - 4:00 PM' },
        credenciales: 'Ginecóloga Obstetra - UNERG. 12 años de experiencia.',
        imagenUrl: 'https://i.pravatar.cc/150?u=doc-002',
        numeroColegiado: 'MPPS-10002',
        firmaDigitalUrl: 'https://via.placeholder.com/300x100/e2e8f0/475569?text=Firma+Digital',
    },
    {
        id: 'doc-003',
        nombre: 'Dr. Ricardo Tovar',
        especialidadId: 'medicina-interna',
        centroId: 'ambulatorio-ivss',
        horario: { manana: '7:30 AM - 11:30 AM', tarde: '2:30 PM - 6:00 PM' },
        credenciales: 'Internista - ULA. 20 años de experiencia.',
        imagenUrl: 'https://i.pravatar.cc/150?u=doc-003',
        numeroColegiado: 'MPPS-10003',
        firmaDigitalUrl: 'https://via.placeholder.com/300x100/e2e8f0/475569?text=Firma+Digital',
    },
    {
        id: 'doc-004',
        nombre: 'Dr. Luis Manuel Carrillo',
        especialidadId: 'cardiologia',
        centroId: 'ambulatorio-ivss',
        horario: { manana: '8:00 AM - 12:00 PM', tarde: '2:00 PM - 5:00 PM' },
        credenciales: 'Cardiólogo - UCV. 18 años de experiencia.',
        imagenUrl: 'https://i.pravatar.cc/150?u=doc-004',
        numeroColegiado: 'MPPS-10004',
        firmaDigitalUrl: 'https://via.placeholder.com/300x100/e2e8f0/475569?text=Firma+Digital',
    },
    {
        id: 'doc-005',
        nombre: 'Dr. Pedro Infante',
        especialidadId: 'cirugia-general',
        centroId: 'ambulatorio-ivss',
        horario: { manana: '6:00 AM - 12:00 PM', tarde: 'Solo emergencias' },
        credenciales: 'Cirujano General - LUZ. 22 años de experiencia.',
        imagenUrl: 'https://i.pravatar.cc/150?u=doc-005',
        numeroColegiado: 'MPPS-10005',
        firmaDigitalUrl: 'https://via.placeholder.com/300x100/e2e8f0/475569?text=Firma+Digital',
    },

    // === CDI Bella Vista (Che Guevara) ===
    {
        id: 'doc-006',
        nombre: 'Dr. José Gregorio Hernández',
        especialidadId: 'pediatria',
        centroId: 'cdi-bella-vista',
        horario: { manana: '7:00 AM - 12:00 PM', tarde: '2:00 PM - 5:00 PM' },
        credenciales: 'Pediatra - Homenaje al Venerable. Atención integral.',
        numeroColegiado: 'MPPS-10006',
        firmaDigitalUrl: 'https://via.placeholder.com/300x100/e2e8f0/475569?text=Firma+Digital',
    },
    {
        id: 'doc-007',
        nombre: 'Dra. Mariela Machado',
        especialidadId: 'ginecologia',
        centroId: 'cdi-bella-vista',
        horario: { manana: '8:00 AM - 1:00 PM', tarde: '3:00 PM - 6:00 PM' },
        credenciales: 'Ginecóloga - UNERG. Control prenatal especializado.',
        numeroColegiado: 'MPPS-10007',
        firmaDigitalUrl: 'https://via.placeholder.com/300x100/e2e8f0/475569?text=Firma+Digital',
    },
    {
        id: 'doc-008',
        nombre: 'Dr. Francisco Loreto',
        especialidadId: 'medicina-interna',
        centroId: 'cdi-bella-vista',
        horario: { manana: '7:00 AM - 11:00 AM', tarde: '1:00 PM - 5:00 PM' },
        credenciales: 'Internista - UC. Manejo de enfermedades crónicas.',
        numeroColegiado: 'MPPS-10008',
        firmaDigitalUrl: 'https://via.placeholder.com/300x100/e2e8f0/475569?text=Firma+Digital',
    },
    {
        id: 'doc-009',
        nombre: 'Dra. Ana Julia Pérez',
        especialidadId: 'cardiologia',
        centroId: 'cdi-bella-vista',
        horario: { manana: '8:00 AM - 12:00 PM', tarde: '2:00 PM - 4:00 PM' },
        credenciales: 'Cardióloga - UCV. Electrocardiografía avanzada.',
        numeroColegiado: 'MPPS-10009',
        firmaDigitalUrl: 'https://via.placeholder.com/300x100/e2e8f0/475569?text=Firma+Digital',
    },
    {
        id: 'doc-010',
        nombre: 'Dra. Beatriz Peña',
        especialidadId: 'cirugia-general',
        centroId: 'cdi-bella-vista',
        horario: { manana: '6:30 AM - 12:00 PM', tarde: 'Consultas programadas' },
        credenciales: 'Cirujana - UNERG. Cirugía mínimamente invasiva.',
        numeroColegiado: 'MPPS-10010',
        firmaDigitalUrl: 'https://via.placeholder.com/300x100/e2e8f0/475569?text=Firma+Digital',
    },

    // === CDI Calle Fátima (Dr. Tulio Pineda) ===
    {
        id: 'doc-011',
        nombre: 'Dra. Sofía Guárico',
        especialidadId: 'pediatria',
        centroId: 'cdi-fatima',
        horario: { manana: '7:30 AM - 12:30 PM', tarde: '2:00 PM - 5:30 PM' },
        credenciales: 'Pediatra - UDO. Vacunación y crecimiento infantil.',
        numeroColegiado: 'MPPS-10011',
        firmaDigitalUrl: 'https://via.placeholder.com/300x100/e2e8f0/475569?text=Firma+Digital',
    },
    {
        id: 'doc-012',
        nombre: 'Dr. Carlos Eduardo Ríos',
        especialidadId: 'ginecologia',
        centroId: 'cdi-fatima',
        horario: { manana: '8:00 AM - 12:00 PM', tarde: '2:00 PM - 5:00 PM' },
        credenciales: 'Ginecólogo - ULA. Salud reproductiva integral.',
        numeroColegiado: 'MPPS-10012',
        firmaDigitalUrl: 'https://via.placeholder.com/300x100/e2e8f0/475569?text=Firma+Digital',
    },
    {
        id: 'doc-013',
        nombre: 'Dra. Valentina Ortiz',
        especialidadId: 'medicina-interna',
        centroId: 'cdi-fatima',
        horario: { manana: '7:00 AM - 11:00 AM', tarde: '1:00 PM - 4:00 PM' },
        credenciales: 'Internista - UNERG. Diabetes e hipertensión.',
        numeroColegiado: 'MPPS-10013',
        firmaDigitalUrl: 'https://via.placeholder.com/300x100/e2e8f0/475569?text=Firma+Digital',
    },
    {
        id: 'doc-014',
        nombre: 'Dr. Roberto Sanz',
        especialidadId: 'cardiologia',
        centroId: 'cdi-fatima',
        horario: { manana: '8:30 AM - 12:30 PM', tarde: '3:00 PM - 6:00 PM' },
        credenciales: 'Cardiólogo - UCV. Ecocardiografía.',
        numeroColegiado: 'MPPS-10014',
        firmaDigitalUrl: 'https://via.placeholder.com/300x100/e2e8f0/475569?text=Firma+Digital',
    },
    {
        id: 'doc-015',
        nombre: 'Dr. Miguel Hidalgo',
        especialidadId: 'cirugia-general',
        centroId: 'cdi-fatima',
        horario: { manana: '6:00 AM - 11:00 AM', tarde: 'Solo emergencias' },
        credenciales: 'Cirujano - UC. Cirugía ambulatoria.',
        numeroColegiado: 'MPPS-10015',
        firmaDigitalUrl: 'https://via.placeholder.com/300x100/e2e8f0/475569?text=Firma+Digital',
    },

    // === Hospital Militar Fuerte Conopoima === (Centro DISPONIBLE para María)
    {
        id: 'doc-016',
        nombre: 'Dr. Rafael Urdaneta',
        especialidadId: 'pediatria',
        centroId: 'hospital-militar',
        horario: { manana: '7:00 AM - 12:00 PM', tarde: '2:00 PM - 5:00 PM' },
        credenciales: 'Pediatra Militar - UNEFA. Atención integral pediátrica.',
        numeroColegiado: 'MPPS-10016',
        firmaDigitalUrl: 'https://via.placeholder.com/300x100/e2e8f0/475569?text=Firma+Digital',
    },
    {
        id: 'doc-017',
        nombre: 'Dra. Rosa Inés Castro',
        especialidadId: 'ginecologia',
        centroId: 'hospital-militar',
        horario: { manana: '8:00 AM - 1:00 PM', tarde: '2:00 PM - 5:00 PM' },
        credenciales: 'Ginecóloga - UCV. Alto riesgo obstétrico.',
        numeroColegiado: 'MPPS-10017',
        firmaDigitalUrl: 'https://via.placeholder.com/300x100/e2e8f0/475569?text=Firma+Digital',
    },
    {
        id: 'doc-018',
        nombre: 'Dr. Antonio José Armas',
        especialidadId: 'medicina-interna',
        centroId: 'hospital-militar',
        horario: { manana: '7:30 AM - 12:00 PM', tarde: '1:30 PM - 5:30 PM' },
        credenciales: 'Internista - ULA. Medicina preventiva.',
        numeroColegiado: 'MPPS-10018',
        firmaDigitalUrl: 'https://via.placeholder.com/300x100/e2e8f0/475569?text=Firma+Digital',
    },
    {
        id: 'doc-019',
        nombre: 'Dra. María García',
        especialidadId: 'cardiologia',
        centroId: 'hospital-militar',
        horario: { manana: '8:00 AM - 12:00 PM', tarde: '2:00 PM - 6:00 PM' },
        credenciales: 'Cardióloga - UCV. Especialista en arritmias cardíacas.',
        numeroColegiado: 'MPPS-10019',
        firmaDigitalUrl: 'https://via.placeholder.com/300x100/e2e8f0/475569?text=Firma+Digital',
    },
    {
        id: 'doc-020',
        nombre: 'Dr. Javier Solórzano',
        especialidadId: 'cirugia-general',
        centroId: 'hospital-militar',
        horario: { manana: '6:00 AM - 12:00 PM', tarde: '2:00 PM - 4:00 PM' },
        credenciales: 'Cirujano General - UNERG. Cirugía laparoscópica.',
        numeroColegiado: 'MPPS-10020',
        firmaDigitalUrl: 'https://via.placeholder.com/300x100/e2e8f0/475569?text=Firma+Digital',
    },

    // === Hospital Israel Ranuárez Balza ===
    {
        id: 'doc-021',
        nombre: 'Dra. Lucía Mendoza',
        especialidadId: 'pediatria',
        centroId: 'hospital-ranuarez',
        horario: { manana: '7:00 AM - 12:00 PM', tarde: '1:00 PM - 5:00 PM' },
        credenciales: 'Pediatra - UDO. Neonatología.',
        numeroColegiado: 'MPPS-10021',
        firmaDigitalUrl: 'https://via.placeholder.com/300x100/e2e8f0/475569?text=Firma+Digital',
    },
    {
        id: 'doc-022',
        nombre: 'Dra. Patricia Colmenares',
        especialidadId: 'ginecologia',
        centroId: 'hospital-ranuarez',
        horario: { manana: '8:00 AM - 12:00 PM', tarde: '2:00 PM - 5:00 PM' },
        credenciales: 'Ginecóloga - UC. Control prenatal y posparto.',
        numeroColegiado: 'MPPS-10022',
        firmaDigitalUrl: 'https://via.placeholder.com/300x100/e2e8f0/475569?text=Firma+Digital',
    },
    {
        id: 'doc-023',
        nombre: 'Dr. Diego Arreaza',
        especialidadId: 'medicina-interna',
        centroId: 'hospital-ranuarez',
        horario: { manana: '7:00 AM - 11:00 AM', tarde: '1:00 PM - 4:00 PM' },
        credenciales: 'Internista - UNERG. Enfermedades infecciosas.',
        numeroColegiado: 'MPPS-10023',
        firmaDigitalUrl: 'https://via.placeholder.com/300x100/e2e8f0/475569?text=Firma+Digital',
    },
    {
        id: 'doc-024',
        nombre: 'Dr. Fernando Landaeta',
        especialidadId: 'cardiologia',
        centroId: 'hospital-ranuarez',
        horario: { manana: '8:00 AM - 12:00 PM', tarde: '3:00 PM - 6:00 PM' },
        credenciales: 'Cardiólogo - UCV. Rehabilitación cardíaca.',
        numeroColegiado: 'MPPS-10024',
        firmaDigitalUrl: 'https://via.placeholder.com/300x100/e2e8f0/475569?text=Firma+Digital',
    },
    {
        id: 'doc-025',
        nombre: 'Dra. Gabriela Isler',
        especialidadId: 'cirugia-general',
        centroId: 'hospital-ranuarez',
        horario: { manana: '6:00 AM - 12:00 PM', tarde: 'Programación quirúrgica' },
        credenciales: 'Cirujana - LUZ. Trauma y emergencias.',
        numeroColegiado: 'MPPS-10025',
        firmaDigitalUrl: 'https://via.placeholder.com/300x100/e2e8f0/475569?text=Firma+Digital',
    },
];

// ===== USUARIOS DE PRUEBA (DEMO) =====
// Estos usuarios se usan para simular los escenarios de prueba
// ===== VADEMÉCUM (Medicamentos) =====
import { Drug, ClinicalNote } from '../types';

export const drugs: Drug[] = [
    { id: 'drug-01', nombre: 'Paracetamol', principioActivo: 'Paracetamol', presentacion: 'Tabletas 500mg', dosis: '500mg-1g c/6-8h', indicaciones: 'Analgesia y antipiresis' },
    { id: 'drug-02', nombre: 'Amoxicilina', principioActivo: 'Amoxicilina', presentacion: 'Cápsulas 500mg', dosis: '500mg c/8h', indicaciones: 'Antibiótico de amplio espectro' },
    { id: 'drug-03', nombre: 'Ibuprofeno', principioActivo: 'Ibuprofeno', presentacion: 'Tabletas 400mg', dosis: '400mg c/6-8h', indicaciones: 'Antiinflamatorio no esteroideo' },
    { id: 'drug-04', nombre: 'Losartán', principioActivo: 'Losartán Potásico', presentacion: 'Tabletas 50mg', dosis: '50-100mg OD', indicaciones: 'Hipertensión arterial' },
    { id: 'drug-05', nombre: 'Omeprazol', principioActivo: 'Omeprazol', presentacion: 'Cápsulas 20mg', dosis: '20mg OD ayunas', indicaciones: 'Protector gástrico' },
    { id: 'drug-06', nombre: 'Loratadina', principioActivo: 'Loratadina', presentacion: 'Tabletas 10mg', dosis: '10mg OD', indicaciones: 'Antihistamínico' },
    { id: 'drug-07', nombre: 'Salbutamol', principioActivo: 'Salbutamol', presentacion: 'Inhalador 100mcg', dosis: '2 puff PRN', indicaciones: 'Broncodilatador' },
    { id: 'drug-08', nombre: 'Metformina', principioActivo: 'Metformina', presentacion: 'Tabletas 850mg', dosis: '850mg con comidas', indicaciones: 'Diabetes Mellitus Tipo 2' },
    { id: 'drug-09', nombre: 'Atorvastatina', principioActivo: 'Atorvastatina', presentacion: 'Tabletas 20mg', dosis: '10-80mg OD noche', indicaciones: 'Dislipidemia' },
    { id: 'drug-10', nombre: 'Azitromicina', principioActivo: 'Azitromicina', presentacion: 'Tabletas 500mg', dosis: '500mg OD x 3-5 días', indicaciones: 'Antibiótico macrólido' },
];

export const clinicalNotes: ClinicalNote[] = [
    {
        id: 'note-001',
        patientId: 'user-maria',
        doctorId: 'doc-006', // Dr. José Gregorio
        appointmentId: 'prev-001',
        fecha: '2023-11-15',
        subjetivo: 'Paciente refiere malestar general y fiebre de 2 días de evolución.',
        objetivo: 'T: 38.5°C, FC: 90lpm. Orofaringe congestiva.',
        analisis: 'Cuadro viral agudo.',
        plan: 'Reposo + Paracetamol.'
    }
];

// ===== USUARIOS DE PRUEBA (DEMO) =====
// Estos usuarios se usan para simular los escenarios de prueba
export const demoUsers: User[] = [
    {
        id: 'user-maria',
        nombre: 'María Fernández',
        cedula: 'V-12.345.678',
        telefono: '+58 424-1234567',
        tipo: 'maria', // Caso de ÉXITO
        alergias: ['Penicilina', 'Sulfa'],
        fechaNacimiento: '1995-05-15'
    },
    {
        id: 'user-pablo',
        nombre: 'Pablo Hernández',
        cedula: 'V-23.456.789',
        telefono: '+58 412-9876543',
        tipo: 'pablo', // Caso de RECHAZO
        fechaNacimiento: '1988-10-20'
    },
];

// ===== FUNCIONES HELPER =====

/** Obtiene un centro de salud por su ID */
export const getHealthCenterById = (id: string): HealthCenter | undefined => {
    return healthCenters.find(center => center.id === id);
};

/** Obtiene una especialidad por su ID */
export const getSpecialtyById = (id: string): Specialty | undefined => {
    return specialties.find(specialty => specialty.id === id);
};

/** Obtiene un doctor por su ID */
export const getDoctorById = (id: string): Doctor | undefined => {
    return doctors.find(doctor => doctor.id === id);
};

/** Obtiene doctores por centro de salud */
export const getDoctorsByCenter = (centerId: string): Doctor[] => {
    return doctors.filter(doctor => doctor.centroId === centerId);
};

/** Obtiene doctores por especialidad */
export const getDoctorsBySpecialty = (specialtyId: string): Doctor[] => {
    return doctors.filter(doctor => doctor.especialidadId === specialtyId);
};

/** Obtiene doctores por centro y especialidad */
export const getDoctorsByCenterAndSpecialty = (centerId: string, specialtyId: string): Doctor[] => {
    return doctors.filter(
        doctor => doctor.centroId === centerId && doctor.especialidadId === specialtyId
    );
};

/** Obtiene un usuario demo por tipo */
export const getDemoUserByType = (tipo: 'maria' | 'pablo'): User | undefined => {
    return demoUsers.find(user => user.tipo === tipo);
};

/** Verifica si un centro está disponible (no colapsado) */
export const isCenterAvailable = (centerId: string): boolean => {
    const center = getHealthCenterById(centerId);
    return center ? !center.colapsado : false;
};

/** 
 * Verifica si una cita puede ser aceptada para un usuario específico
 * Lógica de escenarios de prueba:
 * - María (user-maria): SIEMPRE exitosa
 * - Pablo (user-pablo): SIEMPRE rechazada
 * @param userId - ID del usuario solicitando la cita
 * @returns true si la cita debe ser aceptada, false si debe ser rechazada
 */
export const canAppointmentBeApproved = (userId: string): boolean => {
    if (userId === 'user-maria') {
        return true; // María SIEMPRE obtiene citas exitosas
    }
    if (userId === 'user-pablo') {
        return false; // Pablo SIEMPRE obtiene citas rechazadas
    }
    // Para otros usuarios, usar disponibilidad del centro (default)
    return true;
};

/** 
 * Verifica si el usuario ya tiene una cita pendiente en la misma especialidad
 * Impide múltiples citas simultáneas en la misma especialidad
 * @param userId - ID del usuario
 * @param specialtyId - ID de la especialidad
 * @param existingAppointments - Array de citas existentes
 * @returns Objeto con validación: { isValid, message }
 */
export const validateSpecialtyAvailability = (
    userId: string,
    specialtyId: string,
    existingAppointments: any[]
): { isValid: boolean; message?: string } => {
    // Obtener citas del usuario para esta especialidad
    const userSpecialtyAppointments = existingAppointments.filter(
        apt => apt.usuarioId === userId && apt.especialidadId === specialtyId
    );

    // Verificar si hay citas pendientes (no completadas, no canceladas, y fecha no ha pasado)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const hasPendingAppointment = userSpecialtyAppointments.some(apt => {
        const appointmentDate = new Date(apt.fecha);
        appointmentDate.setHours(0, 0, 0, 0);

        // La cita es pendiente si:
        // 1. Su fecha no ha pasado (es mayor o igual a hoy)
        // 2. Y su estado no es COMPLETADA ni CANCELADA
        const isDateNotPassed = appointmentDate >= today;
        const isNotCompleted = apt.estado !== 'Completada' && apt.estado !== 'Cancelada';

        return isDateNotPassed && isNotCompleted;
    });

    if (hasPendingAppointment) {
        return {
            isValid: false,
            message: 'Ya tiene una cita pendiente en esta especialidad. Complete o cancele la cita anterior para agendar una nueva en esta especialidad.',
        };
    }

    return { isValid: true };
};
