import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/PublicLayout';
import {
    ShieldCheck,
    Target,
    Compass,
    Award,
    Code,
    Cpu,
    Users,
    CheckCircle,
    ArrowRight,
    Sparkles,
} from 'lucide-react';

export default function About() {
    const values = [
        {
            title: 'Engineering Rigor',
            desc: 'We adhere to clean architecture, automated testing, and zero-compromise code quality across every deliverable.',
            icon: Code,
        },
        {
            title: 'Unwavering Security',
            desc: 'Security is not an afterthought; we embed zero-trust identity and threat mitigation in every layer of our systems.',
            icon: ShieldCheck,
        },
        {
            title: 'Transparent Collaboration',
            desc: 'Continuous sprint visibility, open architectural discussions, and verifiable performance metrics for our partners.',
            icon: Target,
        },
        {
            title: 'Talent Multiplication',
            desc: 'We invest deeply in nurturing the next generation of software engineers through our accredited internship accelerator.',
            icon: Users,
        },
    ];

    const milestones = [
        {
            year: '2021',
            title: 'Foundation of LMC Global',
            desc: 'Established as a boutique software engineering and architectural consulting group.',
        },
        {
            year: '2022',
            title: 'Enterprise ERP & Cloud Expansion',
            desc: 'Deployed enterprise systems for logistics and healthcare clients across the region.',
        },
        {
            year: '2023',
            title: 'Internship Accelerator Launch',
            desc: 'Formed structured industrial training partnerships with top national universities.',
        },
        {
            year: '2024',
            title: 'Digital Verification System',
            desc: 'Implemented tamper-evident cryptographic public verification for student transcripts and certificates.',
        },
        {
            year: '2025 - Present',
            title: 'Scalable Microservices & AI R&D',
            desc: 'Expanding enterprise cloud capabilities and predictive data modeling frameworks.',
        },
    ];

    const leadership = [
        {
            name: 'Eng. Janaka Wickramasinghe',
            role: 'Managing Director & Principal Architect',
            bio: 'Over 18 years leading distributed system design and enterprise cloud transformations across APAC and EMEA.',
            status: 'Executive Leadership (Demo Profile)',
        },
        {
            name: 'Elena Jayawardena',
            role: 'Head of Engineering & Talent Operations',
            bio: 'Expert in full-stack reactive frameworks, agile scrums, and corporate talent accelerator mentorship.',
            status: 'Engineering Lead (Demo Profile)',
        },
        {
            name: 'Dr. Rohan De Mel',
            role: 'Chief Security Officer & Systems Auditor',
            bio: 'Certified CISSP and cloud security specialist overseeing zero-trust compliance and risk governance.',
            status: 'Advisory Board (Demo Profile)',
        },
    ];

    return (
        <PublicLayout>
            <Head title="About Us - Corporate Profile & Philosophy" />

            {/* Header Banner */}
            <div className="bg-[#0B1C30] text-white py-20 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DA7A31] uppercase tracking-widest mb-3">
                            <span>Corporate Overview</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                            Pioneering Technology Beyond Boundaries
                        </h1>
                        <p className="mt-4 text-base sm:text-lg text-gray-300 leading-relaxed">
                            LMC Global Technologies (Pvt) Ltd is a software engineering firm delivering dependable
                            enterprise systems, scalable cloud infrastructure, and premier industrial talent training.
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Notice for Demo Content */}
            <div className="bg-amber-50 border-b border-amber-200 py-3 px-4 text-center text-xs text-amber-800">
                <strong>Transparency Notice:</strong> Executive biographies and historical dates are structured demo
                placeholders until official board press releases are integrated.
            </div>

            {/* Vision & Mission */}
            <section className="py-16 bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-[#F0F0F1] p-8 rounded-lg border border-gray-200">
                            <div className="w-12 h-12 rounded bg-[#0B1C30] text-[#DA7A31] flex items-center justify-center mb-5">
                                <Compass className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-[#0B1C30] mb-3">Our Corporate Vision</h2>
                            <p className="text-sm text-[#4D4B55] leading-relaxed">
                                To be the trusted digital engineering partner of choice for forward-thinking enterprises
                                worldwide, continuously breaking conventional boundaries of software complexity, speed,
                                and security.
                            </p>
                        </div>

                        <div className="bg-[#F0F0F1] p-8 rounded-lg border border-gray-200">
                            <div className="w-12 h-12 rounded bg-[#0B1C30] text-[#DA7A31] flex items-center justify-center mb-5">
                                <Target className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-[#0B1C30] mb-3">Our Mission</h2>
                            <p className="text-sm text-[#4D4B55] leading-relaxed">
                                To engineer high-availability, mission-critical digital systems with architectural
                                excellence, while simultaneously accelerating industrial IT talent through immersive,
                                verified real-world engineering experiences.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 bg-[#F0F0F1]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <div className="text-xs font-bold text-[#DA7A31] uppercase tracking-widest mb-2">
                            Operating Philosophy
                        </div>
                        <h2 className="text-3xl font-extrabold text-[#0B1C30]">Our Core Values</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((v, i) => {
                            const Icon = v.icon;
                            return (
                                <div
                                    key={i}
                                    className="bg-white p-6 rounded-md border border-gray-200 shadow-xs hover:border-[#DA7A31]/50 transition-colors"
                                >
                                    <div className="w-10 h-10 rounded bg-[#0B1C30]/5 text-[#DA7A31] flex items-center justify-center mb-4">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-base font-bold text-[#0B1C30] mb-2">{v.title}</h3>
                                    <p className="text-xs text-[#4D4B55] leading-relaxed">{v.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Company Journey Timeline */}
            <section className="py-20 bg-white border-t border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <div className="text-xs font-bold text-[#DA7A31] uppercase tracking-widest mb-2">
                            Evolution & Track Record
                        </div>
                        <h2 className="text-3xl font-extrabold text-[#0B1C30]">The LMC Journey</h2>
                    </div>

                    <div className="relative border-l-2 border-[#0B1C30]/20 ml-4 sm:ml-32 space-y-10">
                        {milestones.map((m, idx) => (
                            <div key={idx} className="relative pl-8">
                                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#DA7A31] border-2 border-white shadow-xs" />
                                <div className="sm:absolute sm:-left-32 sm:top-1 sm:text-right sm:w-24 text-xs font-extrabold text-[#0B1C30]">
                                    {m.year}
                                </div>
                                <h3 className="text-base font-bold text-[#0B1C30]">{m.title}</h3>
                                <p className="text-xs text-[#4D4B55] leading-relaxed mt-1">{m.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership & Engineering Mentors */}
            <section className="py-20 bg-[#F0F0F1]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <div className="text-xs font-bold text-[#DA7A31] uppercase tracking-widest mb-2">
                            Technical Leadership
                        </div>
                        <h2 className="text-3xl font-extrabold text-[#0B1C30]">Architectural Steering Committee</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {leadership.map((leader, i) => (
                            <div key={i} className="bg-white rounded-md p-6 border border-gray-200 shadow-xs">
                                <div className="w-16 h-16 rounded-full bg-[#0B1C30] text-white flex items-center justify-center font-bold text-lg mb-4">
                                    {leader.name
                                        .split(' ')
                                        .map((n) => n[0])
                                        .slice(0, 2)
                                        .join('')}
                                </div>
                                <h3 className="text-base font-bold text-[#0B1C30]">{leader.name}</h3>
                                <div className="text-xs font-semibold text-[#DA7A31] mb-3">{leader.role}</div>
                                <p className="text-xs text-[#4D4B55] leading-relaxed mb-4">{leader.bio}</p>
                                <span className="text-[10px] text-gray-400 italic block border-t pt-2">
                                    {leader.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
