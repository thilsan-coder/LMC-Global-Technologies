import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
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
} from 'lucide-react';

interface ServicesProps {
    services: ServiceItem[];
}

export default function Services({ services }: ServicesProps) {
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
            <div className="bg-[#0B1C30] text-white py-20 border-b border-white/10 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl reveal-on-scroll">
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
            <section className="py-20 bg-[#071220] border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, idx) => {
                            const delayClasses = ['delay-100', 'delay-200', 'delay-300', 'delay-150', 'delay-250', 'delay-350'];
                            const staggerClass = delayClasses[idx % delayClasses.length];
                            return (
                                <div
                                    key={service.id}
                                    className={`lmc-dark-card reveal-on-scroll ${staggerClass} rounded-2xl p-6 sm:p-8 flex flex-col justify-between group relative`}
                                >
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#DA7A31] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div>
                                        <div className="w-14 h-14 rounded-2xl bg-[#DA7A31]/10 border border-[#DA7A31]/20 text-[#DA7A31] flex items-center justify-center mb-6 shadow-sm lmc-card-icon">
                                            {iconMap[service.icon] || <Cpu className="w-8 h-8 text-[#DA7A31]" />}
                                        </div>

                                        <h2 className="text-xl font-bold text-white group-hover:text-[#DA7A31] transition-colors mb-3">
                                            {service.name}
                                        </h2>
                                        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                                            {service.summary}
                                        </p>

                                        {/* Features Checklist */}
                                        <div className="space-y-2 mb-6">
                                            <div className="text-xs font-bold text-gray-200 uppercase tracking-wider mb-2">
                                                Core Deliverables:
                                            </div>
                                            {service.features?.map((feat, fIdx) => (
                                                <div key={fIdx} className="flex items-start gap-2.5 text-xs text-gray-300">
                                                    <CheckCircle2 className="w-4 h-4 text-[#DA7A31] shrink-0 mt-0.5" />
                                                    <span>{feat}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Technologies Badges */}
                                        {service.technologies && (
                                            <div className="mb-6">
                                                <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                                    Tech Stack:
                                                </div>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {service.technologies.map((t, i) => (
                                                        <span
                                                            key={i}
                                                            className="text-[10px] font-medium bg-[#0B1C30] text-gray-300 px-2.5 py-0.5 rounded border border-white/10 hover:border-[#DA7A31]/40 transition-colors"
                                                        >
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3">
                                        <Link
                                            href={route('public.services.show', service.slug)}
                                            className="lmc-btn lmc-btn-secondary lmc-btn-sm w-full sm:w-auto flex-1 justify-center"
                                        >
                                            <span>Full Scope Details</span>
                                            <ArrowRight className="w-3.5 h-3.5 text-[#DA7A31]" />
                                        </Link>
                                        <Link
                                            href={`${route('public.contact')}?service=${encodeURIComponent(service.name)}`}
                                            className="lmc-btn lmc-btn-primary lmc-btn-sm w-full sm:w-auto flex-1 justify-center"
                                        >
                                            Inquire Now
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
