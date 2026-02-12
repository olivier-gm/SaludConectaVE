/**
 * SaludConecta VE - Servicio de Base de Datos Local
 * 
 * Capa de abstracción sobre localStorage para persistencia de datos.
 * Inicializa la base de datos con mockData si está vacía.
 */

import { User, Doctor, Appointment } from '../types';
import { demoUsers, doctors, healthCenters, specialties } from '../data/mockData';

const DB_KEYS = {
    USERS: 'saludcve_users',
    DOCTORS: 'saludcve_doctors',
    APPOINTMENTS: 'saludcve_appointments',
    CENTERS: 'saludcve_centers',
    SPECIALTIES: 'saludcve_specialties',
    SCHEDULES: 'saludcve_schedules'
};

class DatabaseService {
    constructor() {
        this.initialize();
    }

    /** Inicializa la BD con datos de prueba si está vacía */
    private initialize() {
        if (!localStorage.getItem(DB_KEYS.USERS)) {
            // Combinar usuarios demo y doctores (convertidos a usuarios base para login)
            const initialUsers: User[] = [
                ...demoUsers,
                ...doctors.map(doc => ({
                    id: doc.id,
                    nombre: doc.nombre,
                    cedula: 'V-00000000', // Placeholder
                    telefono: '+58 000-0000000',
                    tipo: 'medico' as const,
                    email: `${doc.id}@saludcve.com`, // Email simulado para login
                    password: '123' // Password default
                }))
            ];
            this.save(DB_KEYS.USERS, initialUsers);
        }

        if (!localStorage.getItem(DB_KEYS.DOCTORS)) {
            this.save(DB_KEYS.DOCTORS, doctors);
        }

        if (!localStorage.getItem(DB_KEYS.CENTERS)) {
            this.save(DB_KEYS.CENTERS, healthCenters);
        }

        if (!localStorage.getItem(DB_KEYS.SPECIALTIES)) {
            this.save(DB_KEYS.SPECIALTIES, specialties);
        }

        // Appointments ya se maneja en su contexto, pero podemos centralizarlo aquí si queremos
        if (!localStorage.getItem(DB_KEYS.APPOINTMENTS)) {
            this.save(DB_KEYS.APPOINTMENTS, []);
        }
    }

    private get<T>(key: string): T[] {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }

    private save<T>(key: string, data: T[]) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    // === USERS ===
    get users() {
        return {
            getAll: () => this.get<User>(DB_KEYS.USERS),
            getById: (id: string) => this.get<User>(DB_KEYS.USERS).find(u => u.id === id),
            authenticate: (emailOrId: string, password?: string) => {
                const users = this.get<User>(DB_KEYS.USERS);
                // Soporte para login por ID (demo) o Email (real)
                return users.find(u =>
                    (u.id === emailOrId) ||
                    (u.email === emailOrId && u.password === password)
                );
            },
            create: (user: User) => {
                const users = this.get<User>(DB_KEYS.USERS);
                users.push(user);
                this.save(DB_KEYS.USERS, users);
                return user;
            },
            update: (user: User) => {
                const users = this.get<User>(DB_KEYS.USERS);
                const index = users.findIndex(u => u.id === user.id);
                if (index !== -1) {
                    users[index] = user;
                    this.save(DB_KEYS.USERS, users);
                }
            }
        };
    }

    // === DOCTORS ===
    get doctors() {
        return {
            getAll: () => this.get<Doctor>(DB_KEYS.DOCTORS),
            getById: (id: string) => this.get<Doctor>(DB_KEYS.DOCTORS).find(d => d.id === id),
            updateSchedule: (doctorId: string, schedule: Doctor['horario']) => {
                const doctors = this.get<Doctor>(DB_KEYS.DOCTORS);
                const index = doctors.findIndex(d => d.id === doctorId);
                if (index !== -1) {
                    doctors[index].horario = schedule;
                    this.save(DB_KEYS.DOCTORS, doctors);
                }
            }
        };
    }

    // === APPOINTMENTS ===
    get appointments() {
        return {
            getAll: () => this.get<Appointment>(DB_KEYS.APPOINTMENTS),
            getByUser: (userId: string) => this.get<Appointment>(DB_KEYS.APPOINTMENTS).filter(a => a.usuarioId === userId),
            getByDoctor: (doctorId: string) => this.get<Appointment>(DB_KEYS.APPOINTMENTS).filter(a => a.doctorId === doctorId),
            add: (appointment: Appointment) => {
                const appointments = this.get<Appointment>(DB_KEYS.APPOINTMENTS);
                appointments.push(appointment);
                this.save(DB_KEYS.APPOINTMENTS, appointments);
            },
            updateStatus: (id: string, status: any) => {
                const appointments = this.get<Appointment>(DB_KEYS.APPOINTMENTS);
                const index = appointments.findIndex(a => a.id === id);
                if (index !== -1) {
                    appointments[index].estado = status;
                    this.save(DB_KEYS.APPOINTMENTS, appointments);
                }
            }
        };
    }

    // === Utils ===
    /** Limpia toda la BD (Para pruebas) */
    clear() {
        localStorage.clear();
        this.initialize();
    }
}

export const db = new DatabaseService();
