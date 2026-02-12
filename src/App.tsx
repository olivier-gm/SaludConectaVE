/**
 * SaludConecta VE - Aplicación Principal
 * 
 * Router principal que maneja la navegación entre páginas
 * usando estados de React (useState) para simular el SPA
 * sin necesidad de bibliotecas de enrutamiento externas.
 * 
 * Proyecto académico para la UNERG - San Juan de los Morros, Guárico
 */

import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AppointmentProvider } from './contexts/AppointmentContext';
import { Doctor } from './types';

// Páginas
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import SearchPage from './pages/Search';
import DoctorProfilePage from './pages/DoctorProfile';
import BookingWizardPage from './pages/BookingWizard';
import MyAppointmentsPage from './pages/MyAppointments';
import ContactPage from './pages/Contact';
import MyInfoPage from './pages/MyInfo';
import DoctorAppointmentsPage from './pages/DoctorAppointments';
import MyMedicalProfile from './pages/MyMedicalProfile';
import ConsultationPage from './pages/Consultation';
import PatientsDirectory from './pages/PatientsDirectory';
import ScheduleConfig from './pages/ScheduleConfig';

/** Tipos de página disponibles en la aplicación */
type Page = 'login' | 'home' | 'search' | 'doctor-profile' | 'booking' | 'appointments' | 'contact' | 'my-info' | 'doctor-appointments' | 'consultation' | 'patients' | 'schedule';

/**
 * Componente interno que maneja la navegación
 * Debe estar dentro del AuthProvider para acceder al contexto
 */
const AppContent: React.FC = () => {
    const { user, isAuthenticated, login, logout } = useAuth();
    const [currentPage, setCurrentPage] = useState<Page>('login');
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [navigationParams, setNavigationParams] = useState<any>(null);

    // Manejar login de usuario demo
    const handleLogin = (userId: string) => {
        login(userId);
        setCurrentPage('home');
    };

    // Manejar logout
    const handleLogout = () => {
        logout();
        setCurrentPage('login');
        setSelectedDoctor(null);
        setNavigationParams(null);
    };

    // Manejar navegación entre páginas
    const handleNavigate = (page: Page | 'home' | 'search' | 'booking' | 'appointments' | 'contact' | 'doctor-appointments' | 'consultation') => {
        setNavigationParams(null); // Limpiar params al navegar normal
        // Mapear las páginas simplificadas
        if (page === 'home' || page === 'search' || page === 'booking' || page === 'appointments' || page === 'contact' || page === 'doctor-appointments' || page === 'consultation' || page === 'patients' || page === 'schedule') {
            setCurrentPage(page as Page);
        } else {
            setCurrentPage(page);
        }
    };

    // Manejar navegación con parámetros (ej: ir a consulta con ID)
    const handleNavigateWithParams = (page: Page, params: any) => {
        setNavigationParams(params);
        setCurrentPage(page);
    };

    // Manejar selección de doctor
    const handleSelectDoctor = (doctor: Doctor) => {
        setSelectedDoctor(doctor);
        setCurrentPage('doctor-profile');
    };

    // Manejar inicio de agendamiento desde perfil del doctor
    const handleBookAppointment = (doctor: Doctor) => {
        setSelectedDoctor(doctor);
        setCurrentPage('booking');
    };

    // Renderizar página actual
    const renderCurrentPage = () => {
        // Si no está autenticado, mostrar login
        if (!isAuthenticated && currentPage !== 'login') {
            return (
                <LoginPage
                    onLoginMaria={() => handleLogin('user-maria')}
                    onLoginPablo={() => handleLogin('user-pablo')}
                    onLoginSuccess={() => setCurrentPage('home')}
                />
            );
        }

        switch (currentPage) {
            case 'login':
                return (
                    <LoginPage
                        onLoginMaria={() => handleLogin('user-maria')}
                        onLoginPablo={() => handleLogin('user-pablo')}
                        onLoginSuccess={() => setCurrentPage('home')}
                    />
                );

            case 'home':
                return (
                    <HomePage
                        onNavigate={handleNavigate}
                        onLogout={handleLogout}
                    />
                );

            case 'search':
                return (
                    <SearchPage
                        onNavigate={handleNavigate}
                        onLogout={handleLogout}
                        onSelectDoctor={handleSelectDoctor}
                    />
                );

            case 'doctor-profile':
                // DEBUG: Verificar si entra aquí
                // alert(`Navigation: doctor-profile. User Type: ${user?.tipo}`);

                // Si es médico, ver SU propio perfil. Si es paciente, ver perfil de un médico seleccionado.
                if (user?.tipo === 'medico') {
                    return (
                        <MyMedicalProfile
                            onNavigate={handleNavigate}
                            onLogout={handleLogout}
                        />
                    );
                }
                // Vista para pacientes que seleccionaron un médico
                return selectedDoctor ? (
                    <DoctorProfilePage
                        doctor={selectedDoctor}
                        onNavigate={handleNavigate}
                        onBookAppointment={handleBookAppointment}
                        onLogout={handleLogout}
                    />
                ) : (
                    <SearchPage
                        onNavigate={handleNavigate}
                        onLogout={handleLogout}
                        onSelectDoctor={handleSelectDoctor}
                    />
                );

            case 'booking':
                return (
                    <BookingWizardPage
                        doctor={selectedDoctor}
                        onNavigate={handleNavigate}
                        onLogout={handleLogout}
                        onComplete={() => setCurrentPage('appointments')}
                    />
                );

            case 'appointments':
                return (
                    <MyAppointmentsPage
                        onNavigate={handleNavigate}
                        onLogout={handleLogout}
                    />
                );

            case 'contact':
                return (
                    <ContactPage
                        onNavigate={handleNavigate}
                        onLogout={handleLogout}
                    />
                );

            case 'my-info':
                return (
                    <MyInfoPage
                        onNavigate={handleNavigate}
                        onLogout={handleLogout}
                    />
                );

            case 'doctor-appointments':
                return (
                    <DoctorAppointmentsPage
                        onNavigate={handleNavigate}
                        onNavigateWithParams={handleNavigateWithParams}
                        onLogout={handleLogout}
                    />
                );

            case 'consultation':
                return (
                    <ConsultationPage
                        onNavigate={handleNavigate}
                        onLogout={handleLogout}
                        appointmentId={navigationParams?.appointmentId}
                        patientId={navigationParams?.patientId}
                    />
                );

            case 'patients':
                return (
                    <PatientsDirectory
                        onNavigate={handleNavigate}
                        onLogout={handleLogout}
                    />
                );

            case 'schedule':
                return (
                    <ScheduleConfig
                        onNavigate={handleNavigate}
                        onLogout={handleLogout}
                    />
                );

            default:
                return (
                    <HomePage
                        onNavigate={handleNavigate}
                        onLogout={handleLogout}
                    />
                );
        }
    };

    return (
        <div className="antialiased">
            {renderCurrentPage()}
        </div>
    );
};

/**
 * Componente raíz de la aplicación
 * Provee los contextos globales (Auth y Appointments)
 */
const App: React.FC = () => {
    return (
        <AuthProvider>
            <AppointmentProvider>
                <AppContent />
            </AppointmentProvider>
        </AuthProvider>
    );
};

export default App;
