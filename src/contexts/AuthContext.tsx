/**
 * SaludConecta VE - Contexto de Autenticación
 * Representa: Módulo de Acceso (Modo Demo)
 * 
 * Maneja la autenticación usando el servicio de base de datos local (db.ts)
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType, User } from '../types';
import { db } from '../services/db';

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

/**
 * Proveedor de autenticación
 * Gestiona el estado de la sesión del usuario
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Cargar sesión al iniciar
    useEffect(() => {
        const savedUser = localStorage.getItem('saludcve_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
        }
    }, []);

    // Login "Magic Link" / Demo (solo ID)
    const login = (userId: string) => {
        // En modo demo, autenticamos por ID
        // Intentamos autenticar usando el ID como userId
        const foundUser = db.users.authenticate(userId);

        if (foundUser) {
            setUser(foundUser);
            setIsAuthenticated(true);
            localStorage.setItem('saludcve_user', JSON.stringify(foundUser));
        } else {
            console.error('Usuario no encontrado:', userId);
        }
    };

    // Login con Email y Password
    const loginWithEmail = async (email: string, password: string) => {
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 800));

        const foundUser = db.users.authenticate(email, password);

        if (foundUser) {
            setUser(foundUser);
            setIsAuthenticated(true);
            localStorage.setItem('saludcve_user', JSON.stringify(foundUser));
            return { success: true };
        }

        return { success: false, error: 'Credenciales inválidas' };
    };

    // Registro simulado
    const register = async (userData: Omit<User, 'id'>) => {
        await new Promise(resolve => setTimeout(resolve, 800));

        // Verificar si ya existe email
        const existingUsers = db.users.getAll();
        if (existingUsers.some(u => u.email === userData.email)) {
            return { success: false, error: 'El correo ya está registrado' };
        }

        const newUser: User = {
            ...userData,
            id: `user-${Date.now()}`,
        };

        db.users.create(newUser);

        // Auto-login
        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem('saludcve_user', JSON.stringify(newUser));

        return { success: true };
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('saludcve_user');
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            login,
            loginWithEmail,
            register,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Hook personalizado para acceder al contexto de autenticación
 * @throws Error si se usa fuera del AuthProvider
 */
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};
