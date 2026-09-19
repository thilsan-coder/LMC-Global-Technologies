import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import {
    GraduationCap,
    CheckCircle2,
    Code,
    Server,
    Shield,
    Terminal,
    ArrowRight,
    Award,
    FileText,
    Download,
    Users,
} from 'lucide-react';

interface InternshipProps {
    active_interns: number;
    graduated_interns: number;
}

export default function Internship({ active_interns, graduated_interns }: InternshipProps) {
    const [applyModal, setApplyModal] = useState(false);

    const tracks = [
        {
            title: 'Full-Stack Software Engineering',
            desc: 'Modern reactive enterprise web systems using Laravel, React 19, TypeScript, microservices, and automated testing suites.',
            icon: Code,
            technologies: ['Laravel', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Redis'],
        },
        {
            title: 'Cloud Systems & DevOps',
            desc: 'Hands-on orchestration of Kubernetes clusters, Terraform infrastructure-as-code, and resilient CI/CD pipelines.',
            icon: Server,
            technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Prometheus', 'GitHub Actions'],
        },
        {
            title: 'Defensive Cybersecurity & Auditing',
            desc: 'Vulnerability assessment, static code scanning (SAST), penetration testing protocols, and zero-trust identity architectures.',
            icon: Shield,
            technologies: ['OWASP', 'Burp Suite', 'SonarQube', 'Linux Hardening', 'WAF'],
        },
        {
            title: 'Artificial Intelligence & Predictive Models',
            desc: 'Developing predictive business analytics, LLM API gateway integrations, and neural network classification models.',
            icon: Terminal,
            technologies: ['Python', 'FastAPI', 'PyTorch', 'Vector Databases', 'Docker'],
        },
    ];

    return (
        <PublicLayout>
            <Head title="Industrial Internship & Talent Accelerator" />

            {/* Hero */}
            <div className="bg-[#0B1C30] text-white py-20 border-b border-white/10 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl reveal-on-scroll">
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DA7A31] uppercase tracking-widest mb-3">
                            <span>Industrial Talent Accelerator</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                            Grooming World-Class Software Engineers
                        </h1>
                        <p className="mt-4 text-base sm:text-lg text-gray-300 leading-relaxed">
                            LMC Global Technologies partners with top computing faculties to provide undergraduates
                            with rigorous industrial immersion, senior mentorship, and cryptographically verified
                            credentials.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                href={route('public.contact')}
                                className="lmc-btn lmc-btn-primary"
                            >
                                Inquire for Next Intake
                            </Link>
                            <Link
                                href={route('public.verify-internship')}
                                className="lmc-btn lmc-btn-outline-white"
                            >
                                <Award className="w-4 h-4 text-[#DA7A31]" />
                                <span>Verify Student Certificate</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Metrics */}
            <div className="bg-[#0B1C30]/50 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
                        <div className="p-3 rounded-xl bg-white/[0.02] lg:bg-transparent border border-white/5 lg:border-none lg:border-r lg:border-white/10 reveal-on-scroll delay-100">
                            <div className="text-2xl sm:text-3xl font-extrabold text-white">6 Months</div>
                            <div className="text-[11px] sm:text-xs text-gray-400 font-semibold uppercase tracking-wider mt-1">
                                Full-Time Immersion
                            </div>
                        </div>
                        <div className="p-3 rounded-xl bg-white/[0.02] lg:bg-transparent border border-white/5 lg:border-none lg:border-r lg:border-white/10 reveal-on-scroll delay-200">
                            <div className="text-2xl sm:text-3xl font-extrabold text-[#DA7A31]">{active_interns}</div>
                            <div className="text-[11px] sm:text-xs text-gray-400 font-semibold uppercase tracking-wider mt-1">
                                Active Interns
                            </div>
                        </div>
                        <div className="p-3 rounded-xl bg-white/[0.02] lg:bg-transparent border border-white/5 lg:border-none lg:border-r lg:border-white/10 reveal-on-scroll delay-300">
                            <div className="text-2xl sm:text-3xl font-extrabold text-white">
                                {graduated_interns}+
                            </div>
                            <div className="text-[11px] sm:text-xs text-gray-400 font-semibold uppercase tracking-wider mt-1">
                                Certified Alumni
                            </div>
                        </div>
                        <div className="p-3 rounded-xl bg-white/[0.02] lg:bg-transparent border border-white/5 lg:border-none reveal-on-scroll delay-400">
                            <div className="text-2xl sm:text-3xl font-extrabold text-[#DA7A31]">100%</div>
                            <div className="text-[11px] sm:text-xs text-gray-400 font-semibold uppercase tracking-wider mt-1">
                                Digital Verifiability
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Specialized Engineering Tracks */}
            <section className="py-20 bg-[#071220] border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-14 reveal-on-scroll">
                        <div className="text-xs font-bold text-[#DA7A31] uppercase tracking-widest mb-2">
                            Specializations
                        </div>
                        <h2 className="text-3xl font-extrabold text-white">Internship Focus Tracks</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {tracks.map((track, i) => {
                            const Icon = track.icon;
                            const delayClasses = ['delay-100', 'delay-200', 'delay-300', 'delay-400'];
                            const staggerClass = delayClasses[i % delayClasses.length];
                            return (
                                <div
                                    key={i}
                                    className={`lmc-dark-card reveal-on-scroll ${staggerClass} rounded-2xl p-6 sm:p-8 flex flex-col justify-between`}
                                >
                                    <div>
                                        <div className="w-12 h-12 rounded-xl bg-[#DA7A31]/10 text-[#DA7A31] border border-[#DA7A31]/20 flex items-center justify-center mb-5 lmc-card-icon">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">{track.title}</h3>
                                        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                                            {track.desc}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-white/10">
                                        <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                            Stack Focus:
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {track.technologies.map((t, idx) => (
                                                <span
                                                    key={idx}
                                                    className="text-[10px] bg-[#0B1C30] text-gray-300 border border-white/10 px-2 py-0.5 rounded font-medium hover:border-[#DA7A31]/40 transition-colors"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Verifiable Credentials Callout */}
            <section className="py-16 bg-[#0B1C30] border-t border-white/10 text-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 reveal-on-scroll">
                    <div className="w-16 h-16 rounded-full bg-[#DA7A31]/15 border border-[#DA7A31]/30 text-[#DA7A31] flex items-center justify-center mx-auto shadow-lg shadow-[#DA7A31]/15">
                        <Award className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                        Cryptographically Anchored Transcripts
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Every completion certificate and attendance transcript issued by LMC Global Technologies is
                        assigned a unique cryptographic record ID. Prospective employers and universities can
                        validate training authenticity in seconds.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-2">
                        <Link
                            href={route('public.verify-internship')}
                            className="lmc-btn lmc-btn-primary w-full sm:w-auto justify-center"
                        >
                            Open Certificate Verification Engine
                        </Link>
                        <Link
                            href={route('public.verify-attendance')}
                            className="lmc-btn lmc-btn-outline-white w-full sm:w-auto justify-center"
                        >
                            Open Attendance Verification Engine
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
