import React, { useState } from 'react';
import Logo from '../components/Logo';
import { Button, Input, Card, Spinner } from '../components/ui';
import { AcademicIcon, UserIcon, DocumentIcon } from '../components/icons';
import { useAuth } from '../contexts/AuthContext';

interface LoginPageProps {
    /** Callback al simular login de María */
    onLoginMaria: () => void;
    /** Callback al simular login de Pablo */
    onLoginPablo: () => void;
    /** Callback cuando el usuario se autentica correctamente (Login o Registro) */
    onLoginSuccess: () => void;
}

type AuthMode = 'login' | 'register';

/**
 * Pantalla de Login con acceso demo y formulario real
 */
const LoginPage: React.FC<LoginPageProps> = ({ onLoginMaria, onLoginPablo, onLoginSuccess }) => {
    const { loginWithEmail, register } = useAuth();
    const [mode, setMode] = useState<AuthMode>('login');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [cedula, setCedula] = useState('');
    const [telefono, setTelefono] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState<'regular' | 'medico'>('regular'); // Nuevo estado para el rol

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            if (mode === 'login') {
                const result = await loginWithEmail(email, password);
                if (!result.success) {
                    setError(result.error || 'Error al iniciar sesión');
                } else {
                    onLoginSuccess();
                }
            } else {
                if (!nombre || !cedula || !telefono || !email || !password) {
                    setError('Por favor complete todos los campos');
                    setIsLoading(false);
                    return;
                }

                const result = await register({
                    nombre,
                    cedula,
                    telefono,
                    email,
                    password,
                    tipo: tipoUsuario
                });

                if (!result.success) {
                    setError(result.error || 'Error al registrarse');
                } else {
                    onLoginSuccess();
                }
            }
        } catch (err) {
            setError('Ocurrió un error inesperado');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleMode = () => {
        setMode(mode === 'login' ? 'register' : 'login');
        setError(null);
    };

    return (
        <div className="min-h-screen bg-salud-fondo flex flex-col">
            {/* Header con degradado */}
            <div className="bg-gradient-to-br from-sky-50 to-salud-primario-claro py-8 sm:py-12">
                <div className="max-w-md mx-auto px-4 text-center">
                    {/* Logo grande */}
                    <div className="flex justify-center mb-6">
                        <Logo size="xl" className="text-salud-primario" />
                    </div>

                    {/* Título */}
                    <h1 className="text-3xl sm:text-4xl font-bold text-salud-primario mb-2">
                        SaludConecta VE
                    </h1>
                    <p className="text-lg text-gray-600">
                        Gestión de Citas Médicas
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        San Juan de los Morros, Estado Guárico
                    </p>
                </div>
            </div>

            {/* Contenido principal */}
            <div className="flex-1 flex flex-col items-center px-4 py-8 gap-8">

                {/* Formulario de Auth */}
                <div className="w-full max-w-md">
                    <Card className="animate-fade-in">
                        <div className="mb-6 text-center">
                            <h2 className="text-2xl font-bold text-gray-800">
                                {mode === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
                            </h2>
                            <p className="text-gray-600 text-sm mt-1">
                                {mode === 'login'
                                    ? 'Ingrese sus credenciales para acceder'
                                    : 'Complete sus datos para crear una cuenta'}
                            </p>
                        </div>

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {mode === 'register' && (
                                <>
                                    {/* Selector de Rol */}
                                    <div className="flex p-1 bg-gray-100 rounded-xl mb-4">
                                        <button
                                            type="button"
                                            onClick={() => setTipoUsuario('regular')}
                                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${tipoUsuario === 'regular'
                                                ? 'bg-white text-salud-primario shadow-sm'
                                                : 'text-gray-500 hover:text-gray-700'
                                                }`}
                                        >
                                            Paciente
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setTipoUsuario('medico')}
                                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${tipoUsuario === 'medico'
                                                ? 'bg-white text-salud-primario shadow-sm'
                                                : 'text-gray-500 hover:text-gray-700'
                                                }`}
                                        >
                                            Médico
                                        </button>
                                    </div>

                                    <Input
                                        label="Nombre Completo"
                                        placeholder={tipoUsuario === 'medico' ? "Ej. Dr. Juan Pérez" : "Ej. Juan Pérez"}
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        required
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            label="Cédula"
                                            placeholder="V-12345678"
                                            value={cedula}
                                            onChange={(e) => setCedula(e.target.value)}
                                            required
                                        />
                                        <Input
                                            label="Teléfono"
                                            placeholder="0412-1234567"
                                            value={telefono}
                                            onChange={(e) => setTelefono(e.target.value)}
                                            required
                                        />
                                    </div>
                                </>
                            )}

                            <Input
                                label="Correo Electrónico"
                                type="email"
                                placeholder="correo@ejemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <Input
                                label="Contraseña"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <Button
                                type="submit"
                                variant="primary"
                                fullWidth
                                disabled={isLoading}
                                className="mt-2"
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <Spinner size="sm" /> Procesando...
                                    </div>
                                ) : (
                                    mode === 'login' ? 'Entrar' : 'Registrarse'
                                )}
                            </Button>
                        </form>

                        <div className="mt-6 text-center pt-4 border-t border-gray-100">
                            <button
                                onClick={toggleMode}
                                className="text-sm text-salud-primario hover:text-salud-primario-oscuro font-medium transition-colors"
                            >
                                {mode === 'login'
                                    ? '¿No tiene cuenta? Regístrese aquí'
                                    : '¿Ya tiene cuenta? Inicie sesión aquí'}
                            </button>
                        </div>
                    </Card>
                </div>

                {/* Acceso Demo - ELIMINADO */}

                {/* Footer */}
                <p className="text-center text-sm text-gray-400">
                    Proyecto Universitario • UNERG 2026-1
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
