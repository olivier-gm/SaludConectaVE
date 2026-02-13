import React, { useState, useEffect } from 'react';

interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type TabKey = 'about' | 'mission' | 'objectives' | 'values';

const tabs: { key: TabKey; label: string; icon: string }[] = [
    { key: 'about', label: 'Nosotros', icon: '💙' },
    { key: 'mission', label: 'Misión y Visión', icon: '🎯' },
    { key: 'objectives', label: 'Objetivos', icon: '📋' },
    { key: 'values', label: 'Valores', icon: '⭐' },
];

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState<TabKey>('about');
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(() => {
            onClose();
            setActiveTab('about');
        }, 250);
    };

    if (!isOpen) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'
                }`}
            onClick={handleClose}
        >
            {/* Backdrop con blur */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-900/60 via-slate-900/70 to-emerald-900/60 backdrop-blur-sm" />

            {/* Modal Container */}
            <div
                className={`relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 ${isAnimating ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header con gradiente */}
                <div className="relative bg-gradient-to-r from-salud-primario via-sky-500 to-emerald-500 px-6 py-6 sm:px-8 sm:py-8">
                    {/* Patrón decorativo de fondo */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-2 right-10 w-20 h-20 rounded-full border-2 border-white" />
                        <div className="absolute bottom-1 left-16 w-14 h-14 rounded-full border-2 border-white" />
                        <div className="absolute top-4 left-1/2 w-8 h-8 rounded-full bg-white" />
                    </div>

                    {/* Botón cerrar */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200 hover:rotate-90 cursor-pointer"
                        aria-label="Cerrar"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="relative text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-3">
                            <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                            </svg>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white font-display tracking-tight">
                            SaludConecta VE
                        </h2>
                        <p className="text-sky-100 text-sm mt-1 font-medium">
                            Conectando salud, transformando vidas
                        </p>
                    </div>
                </div>

                {/* Tabs de navegación */}
                <div className="flex border-b border-gray-100 bg-gray-50/50 px-2 sm:px-4 overflow-x-auto no-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex items-center gap-1.5 px-3 sm:px-4 py-3 text-xs sm:text-sm font-semibold whitespace-nowrap border-b-2 transition-all duration-200 cursor-pointer ${activeTab === tab.key
                                    ? 'border-salud-primario text-salud-primario bg-white/80'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <span>{tab.icon}</span>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Contenido con scroll */}
                <div className="overflow-y-auto max-h-[50vh] px-6 py-6 sm:px-8 sm:py-7">

                    {/* TAB: Nosotros */}
                    {activeTab === 'about' && (
                        <div className="animate-fade-in space-y-5">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-3">
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-sky-100 text-salud-primario text-sm">💙</span>
                                    ¿Quiénes somos?
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                                    Somos <strong className="text-salud-primario">SaludConecta VE</strong>, una plataforma venezolana nacida para derribar las barreras del sistema sanitario. Transformamos la atención médica a través de la tecnología, conectando a pacientes con profesionales de la salud en un entorno seguro, humano y eficiente.
                                </p>
                            </div>
                            <div className="bg-gradient-to-r from-sky-50 to-emerald-50 rounded-2xl p-5 border border-sky-100">
                                <p className="text-gray-700 leading-relaxed text-sm sm:text-base italic">
                                    "Creemos que la salud es un derecho fundamental, no un privilegio geográfico. Por eso, utilizamos la telemedicina como un puente para llevar atención digna y soluciones concretas a cada rincón de nuestro país."
                                </p>
                            </div>
                        </div>
                    )}

                    {/* TAB: Misión y Visión */}
                    {activeTab === 'mission' && (
                        <div className="animate-fade-in space-y-6">
                            {/* Misión */}
                            <div className="relative pl-5 border-l-4 border-salud-primario">
                                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-salud-primario flex items-center justify-center">
                                    <span className="text-white text-xs">🎯</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2 ml-2">Misión</h3>
                                <p className="text-gray-600 leading-relaxed text-sm sm:text-base ml-2">
                                    Derribar las barreras geográficas y administrativas del sistema de salud venezolano a través de soluciones digitales de vanguardia. Nos comprometemos a conectar a pacientes con profesionales de excelencia en un entorno seguro, humano y eficiente, transformando la tecnología en una herramienta de equidad que garantiza atención médica de calidad para todos.
                                </p>
                            </div>

                            {/* Visión */}
                            <div className="relative pl-5 border-l-4 border-salud-accion">
                                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-salud-accion flex items-center justify-center">
                                    <span className="text-white text-xs">🔭</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2 ml-2">Visión</h3>
                                <p className="text-gray-600 leading-relaxed text-sm sm:text-base ml-2">
                                    Consolidarnos como la plataforma de telemedicina líder en Venezuela, siendo el referente nacional en innovación tecnológica con sensibilidad humana. Aspiramos a transformar el modelo sanitario del país, logrando que la salud digital sea un servicio inclusivo, moderno y accesible para cada comunidad, sin excepciones.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* TAB: Objetivos */}
                    {activeTab === 'objectives' && (
                        <div className="animate-fade-in space-y-4">
                            <p className="text-gray-600 text-sm sm:text-base mb-4">
                                Implementar una plataforma integral de telemedicina que garantice el acceso a una salud digna, segura y de alta calidad en todo el territorio venezolano.
                            </p>
                            <div className="space-y-3">
                                {[
                                    {
                                        icon: '🩺',
                                        title: 'Teleconsultas Especializadas',
                                        desc: 'Brindar acceso inmediato a una red multidisciplinaria de profesionales de la salud de forma remota.',
                                        color: 'sky',
                                    },
                                    {
                                        icon: '🛡️',
                                        title: 'Cultura de Prevención',
                                        desc: 'Desarrollar programas digitales de educación y promoción de hábitos saludables en las comunidades.',
                                        color: 'emerald',
                                    },
                                    {
                                        icon: '🌎',
                                        title: 'Inclusión Geográfica',
                                        desc: 'Expandir la cobertura médica hacia zonas rurales y poblaciones históricamente desatendidas.',
                                        color: 'amber',
                                    },
                                    {
                                        icon: '📊',
                                        title: 'Gestión Digital Inteligente',
                                        desc: 'Optimizar la atención mediante sistemas seguros de citas e historiales médicos electrónicos centralizados.',
                                        color: 'violet',
                                    },
                                ].map((obj, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex gap-4 p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${obj.color === 'sky'
                                                ? 'bg-sky-50/50 border-sky-100 hover:border-sky-200'
                                                : obj.color === 'emerald'
                                                    ? 'bg-emerald-50/50 border-emerald-100 hover:border-emerald-200'
                                                    : obj.color === 'amber'
                                                        ? 'bg-amber-50/50 border-amber-100 hover:border-amber-200'
                                                        : 'bg-violet-50/50 border-violet-100 hover:border-violet-200'
                                            }`}
                                    >
                                        <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg ${obj.color === 'sky'
                                                ? 'bg-sky-100'
                                                : obj.color === 'emerald'
                                                    ? 'bg-emerald-100'
                                                    : obj.color === 'amber'
                                                        ? 'bg-amber-100'
                                                        : 'bg-violet-100'
                                            }`}>
                                            {obj.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 text-sm sm:text-base">{obj.title}</h4>
                                            <p className="text-gray-500 text-xs sm:text-sm mt-0.5">{obj.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* TAB: Valores */}
                    {activeTab === 'values' && (
                        <div className="animate-fade-in">
                            <p className="text-gray-600 text-sm sm:text-base mb-5">
                                Nuestros valores son la base de cada acción que tomamos para transformar la salud en Venezuela.
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {[
                                    { icon: '🤝', name: 'Compromiso', color: 'from-sky-50 to-sky-100 border-sky-200' },
                                    { icon: '💡', name: 'Innovación', color: 'from-amber-50 to-amber-100 border-amber-200' },
                                    { icon: '🌐', name: 'Accesibilidad', color: 'from-emerald-50 to-emerald-100 border-emerald-200' },
                                    { icon: '🔒', name: 'Confidencialidad', color: 'from-indigo-50 to-indigo-100 border-indigo-200' },
                                    { icon: '✨', name: 'Calidad', color: 'from-purple-50 to-purple-100 border-purple-200' },
                                    { icon: '❤️', name: 'Empatía', color: 'from-rose-50 to-rose-100 border-rose-200' },
                                    { icon: '🤲', name: 'Colaboración', color: 'from-teal-50 to-teal-100 border-teal-200' },
                                ].map((value, idx) => (
                                    <div
                                        key={idx}
                                        className={`bg-gradient-to-br ${value.color} rounded-xl p-4 text-center border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5`}
                                    >
                                        <div className="text-2xl mb-2">{value.icon}</div>
                                        <span className="text-sm font-semibold text-gray-700">{value.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-100 px-6 py-4 sm:px-8 bg-gray-50/50 flex items-center justify-between">
                    <p className="text-xs text-gray-400">
                        Proyecto Universitario • UNERG 2026-1
                    </p>
                    <button
                        onClick={handleClose}
                        className="px-5 py-2 bg-salud-primario text-white text-sm font-semibold rounded-xl hover:bg-sky-700 transition-all duration-200 active:scale-95 cursor-pointer"
                    >
                        Entendido
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AboutModal;
