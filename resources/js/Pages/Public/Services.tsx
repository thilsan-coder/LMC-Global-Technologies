import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/PublicLayout';
import { ServiceItem } from '@/types';
import {
    Globe,
    Smartphone,
    Briefcase,
    GraduationCap,
    Server,
    ShieldCheck,
    CheckCircle2,
    ArrowRight,
    Cpu,
    ExternalLink,
    X,
} from 'lucide-react';

interface ServicesProps {
    services: ServiceItem[];
}

export default function Services({ services }: ServicesProps) {
    const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

    const iconMap: Record<string, React.ReactNode> = {
        Globe: <Globe className="w-8 h-8 text-[#DA7A31]" />,
        Smartphone: <Smartphone className="w-8 h-8 text-[#DA7A31]" />,
        Briefcase: <Briefcase className="w-8 h-8 text-[#DA7A31]" />,
        GraduationCap: <GraduationCap className="w-8 h-8 text-[#DA7A31]" />,
        Cloud: <Server className="w-8 h-8 text-[#DA7A31]" />,
        ShieldCheck: <ShieldCheck className="w-8 h-8 text-[#DA7A31]" />,
    };

    return (
        <PublicLayout>
            <Head title="Enterprise Technology Services" />

            {/* Header */}
            <div className="bg-[#0B1C30] text-white py-20 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DA7A31] uppercase tracking-widest mb-3">
                            <span>Specialized IT Capabilities</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                            Full-Lifecycle Enterprise Solutions
                        </h1>
                        <p className="mt-4 text-base sm:text-lg text-gray-300 leading-relaxed">
                            From architecting resilient cloud web applications to multi-cloud DevOps, SOC-2 readiness,
                            and industrial developer training, LMC delivers enterprise reliability.
                        </p>
                    </div>
                </div>
            </div>

            {/* Service Grid */}
            <section className="py-20 bg-[#F0F0F1]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className="bg-white rounded-lg p-8 border border-gray-200 shadow-xs hover:border-[#DA7A31] transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <div className="w-14 h-14 rounded-lg bg-[#0B1C30]/5 flex items-center justify-center mb-6">
                                        {iconMap[service.icon] || <Cpu className="w-8 h-8 text-[#DA7A31]" />}
                                    </div>

                                    <h2 className="text-xl font-bold text-[#0B1C30] mb-3">{service.name}</h2>
                                    <p className="text-xs sm:text-sm text-[#4D4B55] leading-relaxed mb-6">
                                        {service.summary}
                                    </p>

                                    {/* Features Checklist */}
                                    <div className="space-y-2 mb-6">
                                        <div className="text-xs font-bold text-[#0B1C30] uppercase tracking-wider mb-2">
                                            Core Deliverables:
                                        </div>
                                        {service.features?.map((feat, idx) => (
                                            <div key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                                                <CheckCircle2 className="w-4 h-4 text-[#DA7A31] flex-shrink-0 mt-0.5" />
                                                <span>{feat}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Technologies Badges */}
                                    {service.technologies && (
                                        <div className="mb-6">
                                            <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                                Tech Stack:
                                            </div>
                                            <div className="flex flex-wrap gap-1.5">
                                                {service.technologies.map((t, i) => (
                                                    <span
                                                        key={i}
                                                        className="text-[10px] font-medium bg-gray-100 text-gray-700 px-2 py-0.5 rounded border border-gray-200"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="pt-5 border-t border-gray-100 flex items-center justify-between gap-2">
                                    <button
                                        onClick={() => setSelectedService(service)}
                                        className="text-xs font-semibold text-[#0B1C30] hover:text-[#DA7A31] inline-flex items-center gap-1"
                                    >
                                        <span>Full Scope Details</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                    <Link
                                        href={route('public.contact')}
                                        className="bg-[#DA7A31] hover:bg-[#C2631D] text-white text-xs font-semibold px-4 py-2 rounded shadow-xs transition"
                                    >
                                        Inquire Now
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal for Service Deep Dive */}
            {selectedService && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                    <div className="bg-white rounded-lg max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative">
                        <button
                            onClick={() => setSelectedService(null)}
                            className="absolute top-5 right-5 p-1 text-gray-400 hover:text-gray-700 rounded-full"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded bg-[#0B1C30]/5 flex items-center justify-center">
                                {iconMap[selectedService.icon] || <Cpu className="w-6 h-6 text-[#DA7A31]" />}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#0B1C30]">{selectedService.name}</h3>
                                <span className="text-xs font-semibold text-[#DA7A31]">
                                    LMC Enterprise Engineering Scope
                                </span>
                            </div>
                        </div>

                        <p className="text-sm text-[#4D4B55] leading-relaxed mb-6">
                            {selectedService.description}
                        </p>

                        <div className="mb-6 bg-[#F0F0F1] p-5 rounded-md">
                            <h4 className="text-xs font-bold text-[#0B1C30] uppercase tracking-wider mb-3">
                                Included Specifications & Features:
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {selectedService.features?.map((f, i) => (
                                    <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-[#DA7A31]" />
                                        <span>{f}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {selectedService.technologies && (
                            <div className="mb-8">
                                <h4 className="text-xs font-bold text-[#0B1C30] uppercase tracking-wider mb-2">
                                    Primary Technologies Employed:
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedService.technologies.map((t, idx) => (
                                        <span
                                            key={idx}
                                            className="px-2.5 py-1 text-xs bg-[#0B1C30] text-white rounded font-medium"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                            <button
                                onClick={() => setSelectedService(null)}
                                className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-900"
                            >
                                Close
                            </button>
                            <Link
                                href={route('public.contact')}
                                className="px-5 py-2.5 bg-[#DA7A31] hover:bg-[#C2631D] text-white text-xs font-bold rounded shadow transition"
                            >
                                Request Technical Proposal
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}
