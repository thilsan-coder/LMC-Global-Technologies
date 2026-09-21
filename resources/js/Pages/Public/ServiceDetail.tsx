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
    ArrowLeft,
    ArrowRight,
    Cpu,
    Zap,
    Shield,
    Clock,
    Users,
    Layers,
    Code2,
    Workflow,
    Activity,
} from 'lucide-react';

interface ServiceDetailProps {
    service: ServiceItem;
    allServices: Array<{
        id: number;
        name: string;
        slug: string;
        icon: string;
    }>;
}

export default function ServiceDetail({ service, allServices }: ServiceDetailProps) {
    const iconMap: Record<string, React.ReactNode> = {
        Globe: <Globe className="w-10 h-10 text-[#DA7A31]" />,
        Smartphone: <Smartphone className="w-10 h-10 text-[#DA7A31]" />,
        Briefcase: <Briefcase className="w-10 h-10 text-[#DA7A31]" />,
        GraduationCap: <GraduationCap className="w-10 h-10 text-[#DA7A31]" />,
        Cloud: <Server className="w-10 h-10 text-[#DA7A31]" />,
        ShieldCheck: <ShieldCheck className="w-10 h-10 text-[#DA7A31]" />,
    };

    const smallIconMap: Record<string, React.ReactNode> = {
        Globe: <Globe className="w-5 h-5 text-[#DA7A31]" />,
        Smartphone: <Smartphone className="w-5 h-5 text-[#DA7A31]" />,
        Briefcase: <Briefcase className="w-5 h-5 text-[#DA7A31]" />,
        GraduationCap: <GraduationCap className="w-5 h-5 text-[#DA7A31]" />,
        Cloud: <Server className="w-5 h-5 text-[#DA7A31]" />,
        ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#DA7A31]" />,
    };

    const lifecycleSteps = [
        {
            step: '01',
            title: 'Discovery & System Blueprinting',
            desc: 'In-depth stakeholder workshops, technical requirements gathering, and architecture blueprinting with SLA definitions.',
        },
        {
            step: '02',
            title: 'Agile Sprint Execution',
            desc: 'Rapid bi-weekly sprint deliverables with continuous integration, automated code linting, and weekly milestone showcases.',
        },
        {
            step: '03',
            title: 'Rigorous Security & QA Audits',
            desc: 'Automated regression test suites, static/dynamic code analysis, penetration scans, and OWASP compliance verification.',
        },
        {
            step: '04',
            title: 'Containerized Production Deployment',
            desc: 'Zero-downtime canary or blue-green rollouts across Kubernetes clusters or multi-cloud enterprise infrastructure.',
        },
        {
            step: '05',
            title: '24/7 Observability & SLA Governance',
            desc: 'Real-time telemetry, APM metrics, proactive anomaly alerting, and guaranteed uptime response commitments.',
        },
    ];

    const engagementModels = [
        {
            title: 'Dedicated Engineering Squad',
            highlight: 'Most Popular for Enterprises',
            desc: 'Full-time cross-functional squad (Lead Architect, Senior Full-Stack Engineers, QA Automation Lead) dedicated 100% to your roadmap.',
            specs: ['100% Team Dedication', 'Direct Slack/Teams Integration', 'Flexible Bi-Weekly Cadence'],
        },
        {
            title: 'Fixed-Scope Turnkey Project',
            highlight: 'Guaranteed Delivery Timelines',
            desc: 'Milestone-based engineering with clearly defined architectural deliverables, fixed timelines, and strict acceptance criteria.',
            specs: ['Fixed Budget & Timeline', 'Full IP Transfer', '30-Day Post-Launch Warranty'],
        },
        {
            title: 'Specialized Staff Augmentation',
            highlight: 'Rapid Capacity Scaling',
            desc: 'Seamlessly embed senior LMC specialists into your existing teams to accelerate velocity and fill critical architectural gaps.',
            specs: ['Senior Verified Engineers', 'Immediate Team Onboarding', 'Zero Recruitment Overhead'],
        },
    ];

    return (
        <PublicLayout>
            <Head title={`${service.name} - Enterprise Engineering Scope & Deliverables`} />

            {/* Breadcrumbs Bar */}
            <div className="bg-[#0B1C30] border-b border-white/10 py-5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
                    <nav className="flex items-center gap-2 text-xs text-gray-400">
                        <Link href={route('public.home')} className="hover:text-white transition-colors">
                            Home
                        </Link>
                        <span>/</span>
                        <Link href={route('public.services')} className="hover:text-white transition-colors">
                            Services
                        </Link>
                        <span>/</span>
                        <span className="text-[#DA7A31] font-semibold">{service.name}</span>
                    </nav>

                    <Link
                        href={route('public.services')}
                        className="inline-flex items-center gap-2 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 text-[#DA7A31]" />
                        <span>Back to All Services</span>
                    </Link>
                </div>
            </div>

            {/* Header Hero Section */}
            <div className="bg-[#0B1C30] text-white py-16 lg:py-20 border-b border-white/10 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        <div className="lg:col-span-8 reveal-on-scroll">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DA7A31] uppercase tracking-widest bg-[#DA7A31]/10 border border-[#DA7A31]/20 px-3 py-1 rounded-full">
                                    <Workflow className="w-3.5 h-3.5" />
                                    <span>Enterprise Technology Service</span>
                                </span>
                                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                    Active Domain
                                </span>
                            </div>

                            <div className="flex items-center gap-4 mt-2">
                                <div className="w-16 h-16 rounded-2xl bg-[#DA7A31]/15 border border-[#DA7A31]/30 flex items-center justify-center shrink-0">
                                    {iconMap[service.icon] || <Cpu className="w-10 h-10 text-[#DA7A31]" />}
                                </div>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                                    {service.name}
                                </h1>
                            </div>

                            <p className="mt-3 text-base sm:text-lg text-[#DA7A31] font-semibold">
                                {service.summary}
                            </p>

                            <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed max-w-3xl">
                                {service.description}
                            </p>

                            <div className="mt-8 flex flex-wrap items-center gap-4">
                                <Link
                                    href={`${route('public.contact')}?service=${encodeURIComponent(service.name)}`}
                                    className="lmc-btn lmc-btn-primary"
                                >
                                    <span>Inquire for {service.name}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href={route('public.services')}
                                    className="lmc-btn lmc-btn-secondary"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    <span>Back to Services</span>
                                </Link>
                            </div>
                        </div>

                        {/* Quick Spec Card */}
                        <div className="lg:col-span-4 reveal-on-scroll delay-100">
                            <div className="lmc-dark-card p-6 rounded-2xl border border-white/15 bg-[#071220]/80">
                                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                                    <span className="text-xs font-bold text-gray-400 uppercase">Service Delivery Profile</span>
                                    <span className="text-xs text-[#DA7A31] font-mono font-bold">LMC-SRV-{service.id.toString().padStart(2, '0')}</span>
                                </div>

                                <div className="space-y-3.5 py-4 text-xs text-gray-300">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">Target SLA Uptime:</span>
                                        <span className="font-mono text-white font-bold">99.9% Uptime</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">Sprint Cadence:</span>
                                        <span className="font-medium text-white">Bi-Weekly Deliverables</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">Security Standards:</span>
                                        <span className="font-medium text-white">SOC-2 / ISO Aligned</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">IP & Code Ownership:</span>
                                        <span className="font-medium text-emerald-400">100% Client Retained</span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-white/10">
                                    <div className="text-[11px] font-semibold text-gray-400 uppercase mb-2">
                                        Primary Frameworks:
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {service.technologies?.map((tech, idx) => (
                                            <span
                                                key={idx}
                                                className="text-[10px] font-mono bg-[#0B1C30] text-gray-200 px-2.5 py-1 rounded border border-white/10"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Full Scope Deliverables & Specifications */}
            <section className="py-20 bg-[#071220] border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
                        <span className="text-xs font-bold text-[#DA7A31] uppercase tracking-widest">
                            Scope of Work
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
                            Comprehensive Deliverables & Capabilities
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-300 mt-3">
                            Every engagement is backed by formal statements of work (SOW) with measurable acceptance criteria and enterprise code reviews.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {service.features?.map((feature, idx) => (
                            <div
                                key={idx}
                                className="lmc-dark-card p-6 rounded-2xl border border-white/15 flex flex-col justify-between group hover:border-[#DA7A31]/50 transition-all reveal-on-scroll"
                            >
                                <div>
                                    <div className="w-10 h-10 rounded-xl bg-[#0B1C30] border border-white/10 flex items-center justify-center text-[#DA7A31] mb-4 group-hover:scale-110 transition-transform">
                                        <CheckCircle2 className="w-5 h-5 text-[#DA7A31]" />
                                    </div>
                                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#DA7A31] transition-colors">
                                        {feature}
                                    </h3>
                                    <p className="text-xs text-gray-300 leading-relaxed">
                                        Production-grade engineering deliverable with comprehensive test coverage, complete source code documentation, and automated deployment pipelines.
                                    </p>
                                </div>

                                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
                                    <span className="text-[#DA7A31] font-semibold">Scope Item #{idx + 1}</span>
                                    <span>Verified Deliverable</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5-Step Lifecycle Process */}
            <section className="py-20 bg-[#0B1C30] border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
                        <span className="text-xs font-bold text-[#DA7A31] uppercase tracking-widest">
                            Execution Framework
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
                            Our 5-Stage Engineering Lifecycle
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-300 mt-3">
                            Battle-tested delivery methodology that eliminates project risks and guarantees predictable releases on time.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        {lifecycleSteps.map((step, idx) => (
                            <div
                                key={idx}
                                className="lmc-dark-card p-6 rounded-2xl border border-white/15 relative flex flex-col justify-between reveal-on-scroll"
                            >
                                <div>
                                    <div className="text-3xl font-extrabold text-[#DA7A31]/40 font-mono mb-2">
                                        {step.step}
                                    </div>
                                    <h3 className="text-sm font-bold text-white mb-2">{step.title}</h3>
                                    <p className="text-xs text-gray-300 leading-relaxed">{step.desc}</p>
                                </div>
                                <div className="mt-4 pt-3 border-t border-white/10 text-[10px] font-mono text-[#DA7A31]">
                                    Phase {idx + 1} of 5
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Engagement Models */}
            <section className="py-20 bg-[#071220] border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
                        <span className="text-xs font-bold text-[#DA7A31] uppercase tracking-widest">
                            Engagement Options
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
                            Flexible Commercial & Delivery Models
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-300 mt-3">
                            Tailor our engagement to your organizational structure, governance model, and project velocity requirements.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {engagementModels.map((model, idx) => (
                            <div
                                key={idx}
                                className="lmc-dark-card p-8 rounded-2xl border border-white/15 flex flex-col justify-between group hover:border-[#DA7A31]/50 transition-all reveal-on-scroll"
                            >
                                <div>
                                    <span className="text-[10px] font-bold text-[#DA7A31] bg-[#DA7A31]/10 px-2.5 py-1 rounded-md border border-[#DA7A31]/20 uppercase">
                                        {model.highlight}
                                    </span>
                                    <h3 className="text-xl font-bold text-white mt-4 mb-2 group-hover:text-[#DA7A31] transition-colors">
                                        {model.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                                        {model.desc}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-white/10 space-y-2">
                                    {model.specs.map((spec, sIdx) => (
                                        <div key={sIdx} className="flex items-center gap-2 text-xs text-gray-300">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-[#DA7A31] shrink-0" />
                                            <span>{spec}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Other Services Switcher */}
            <section className="py-16 bg-[#0B1C30] border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <span className="text-xs font-bold text-[#DA7A31] uppercase tracking-widest">
                                Cross-Domain Capabilities
                            </span>
                            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                                Explore Other Specialized Services
                            </h2>
                        </div>
                        <Link
                            href={route('public.services')}
                            className="text-xs font-semibold text-[#DA7A31] hover:underline inline-flex items-center gap-1"
                        >
                            <span>View All Services</span>
                            <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {allServices
                            .filter((s) => s.slug !== service.slug)
                            .map((other) => (
                                <Link
                                    key={other.id}
                                    href={route('public.services.show', other.slug)}
                                    className="lmc-dark-card p-4 rounded-xl border border-white/10 hover:border-[#DA7A31]/50 transition-all block group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-lg bg-[#071220] border border-white/10 flex items-center justify-center shrink-0">
                                            {smallIconMap[other.icon] || <Cpu className="w-4 h-4 text-[#DA7A31]" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-bold text-white group-hover:text-[#DA7A31] transition-colors truncate">
                                                {other.name}
                                            </div>
                                            <div className="text-xs font-semibold text-[#DA7A31] group-hover:underline inline-flex items-center gap-1 mt-0.5">
                                                <span>View Full Scope</span>
                                                <ArrowRight className="w-3 h-3" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </section>

            {/* Bottom Call to Action */}
            <section className="py-20 bg-gradient-to-b from-[#071220] to-[#0B1C30] text-center">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 reveal-on-scroll">
                    <span className="text-xs font-bold text-[#DA7A31] uppercase tracking-widest">
                        Initiate Engineering Project
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4">
                        Ready to Discuss Your {service.name} Requirements?
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto mb-8 leading-relaxed">
                        Connect with LMC Global Technologies engineering leadership for a comprehensive technical scope review and tailored proposal.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href={`${route('public.contact')}?service=${encodeURIComponent(service.name)}`}
                            className="lmc-btn lmc-btn-primary w-full sm:w-auto justify-center"
                        >
                            <span>Schedule Consultation</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href={route('public.services')}
                            className="lmc-btn lmc-btn-secondary w-full sm:w-auto justify-center"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Back to All Services</span>
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
