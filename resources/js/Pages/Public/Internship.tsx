import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import PublicLayout from '@/layouts/PublicLayout';
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
            <div className="bg-[#0B1C30] text-white py-20 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
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
                                className="bg-[#DA7A31] hover:bg-[#C2631D] text-white font-semibold text-sm px-6 py-3.5 rounded shadow transition"
                            >
                                Inquire for Next Intake
                            </Link>
                            <Link
                                href={route('public.verify-internship')}
                                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm px-6 py-3.5 rounded transition flex items-center gap-2"
                            >
                                <Award className="w-4 h-4 text-[#DA7A31]" />
                                <span>Verify Student Certificate</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Metrics */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
                        <div>
                            <div className="text-3xl font-extrabold text-[#0B1C30]">6 Months</div>
                            <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-1">
                                Full-Time Immersion
                            </div>
                        </div>
                        <div className="pt-4 sm:pt-0">
                            <div className="text-3xl font-extrabold text-[#DA7A31]">{active_interns}</div>
                            <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-1">
                                Active Interns
                            </div>
                        </div>
                        <div className="pt-4 sm:pt-0">
                            <div className="text-3xl font-extrabold text-[#0B1C30]">
                                {graduated_interns}+
                            </div>
                            <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-1">
                                Certified Alumni
                            </div>
                        </div>
                        <div className="pt-4 sm:pt-0">
                            <div className="text-3xl font-extrabold text-[#DA7A31]">100%</div>
                            <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-1">
                                Digital Verifiability
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Specialized Engineering Tracks */}
            <section className="py-20 bg-[#F0F0F1]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <div className="text-xs font-bold text-[#DA7A31] uppercase tracking-widest mb-2">
                            Specializations
                        </div>
                        <h2 className="text-3xl font-extrabold text-[#0B1C30]">Internship Focus Tracks</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {tracks.map((track, i) => {
                            const Icon = track.icon;
                            return (
                                <div
                                    key={i}
                                    className="bg-white rounded-lg p-8 border border-gray-200 shadow-xs flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="w-12 h-12 rounded bg-[#0B1C30]/5 text-[#DA7A31] flex items-center justify-center mb-5">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#0B1C30] mb-2">{track.title}</h3>
                                        <p className="text-xs sm:text-sm text-[#4D4B55] leading-relaxed mb-6">
                                            {track.desc}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100">
                                        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                            Stack Focus:
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {track.technologies.map((t, idx) => (
                                                <span
                                                    key={idx}
                                                    className="text-[10px] bg-[#0B1C30] text-white px-2 py-0.5 rounded font-medium"
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
            <section className="py-16 bg-[#0B1C30] text-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                    <div className="w-16 h-16 rounded-full bg-[#DA7A31]/20 border border-[#DA7A31] text-[#DA7A31] flex items-center justify-center mx-auto">
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
                    <div className="flex justify-center gap-4 pt-2">
                        <Link
                            href={route('public.verify-internship')}
                            className="bg-[#DA7A31] hover:bg-[#C2631D] text-white text-xs font-bold px-6 py-3 rounded shadow transition"
                        >
                            Open Certificate Verification Engine
                        </Link>
                        <Link
                            href={route('public.verify-attendance')}
                            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold px-6 py-3 rounded transition"
                        >
                            Open Attendance Verification Engine
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
