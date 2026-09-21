import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { ServiceItem, ProductItem, ReviewItem } from '@/types';
import {
    ArrowRight,
    ShieldCheck,
    Globe,
    Cpu,
    Lock,
    Server,
    Smartphone,
    Star,
    CheckCircle2,
    GraduationCap,
    Users,
    TrendingUp,
    ExternalLink,
    ChevronRight,
    Sparkles,
    Quote,
    Info,
    Layers,
} from 'lucide-react';

interface HomeProps {
    services: ServiceItem[];
    products: ProductItem[];
    reviews: ReviewItem[];
    stats: Record<string, string>;
}

export default function Home({ services, products, reviews, stats }: HomeProps) {
    const iconMap: Record<string, React.ReactNode> = {
        Globe: <Globe className="w-6 h-6 text-[#DA7A31]" />,
        Smartphone: <Smartphone className="w-6 h-6 text-[#DA7A31]" />,
        Briefcase: <Cpu className="w-6 h-6 text-[#DA7A31]" />,
        GraduationCap: <GraduationCap className="w-6 h-6 text-[#DA7A31]" />,
        Cloud: <Server className="w-6 h-6 text-[#DA7A31]" />,
        ShieldCheck: <ShieldCheck className="w-6 h-6 text-[#DA7A31]" />,
    };

    return (
        <PublicLayout>
            <Head title="Enterprise Digital Solutions & Systems" />

            {/* Hero Section */}
            <section className="relative bg-[#0B1C30] text-white overflow-hidden py-14 sm:py-18 lg:py-24 border-b border-white/10">
                {/* Abstract geometric ambient background glows */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#DA7A31]/15 blur-3xl pointer-events-none animate-lmc-float" />
                <div className="absolute bottom-0 left-1/4 -mb-20 w-80 h-80 rounded-full bg-blue-600/15 blur-3xl pointer-events-none animate-lmc-float delay-300" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                        {/* Left Column: Value Proposition & CTAs */}
                        <div className="lg:col-span-7">
                            {/* Tagline Badge */}
                            <div className="inline-flex max-w-full flex-wrap items-center gap-2 bg-[#132842] border border-[#DA7A31]/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#DA7A31] mb-5 reveal-on-scroll">
                                <span className="w-2 h-2 rounded-full bg-[#DA7A31] animate-pulse shrink-0" />
                                <span>LMC Global Technologies &bull; "Technology Beyond Boundaries"</span>
                            </div>

                            {/* Headline */}
                            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.18] text-white reveal-on-scroll delay-100 break-words">
                                Engineering Mission-Critical{' '}
                                <span className="text-[#DA7A31]">Enterprise Software</span> & Cloud Infrastructure.
                            </h1>

                            {/* Subtitle */}
                            <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-gray-300 font-normal leading-relaxed max-w-2xl reveal-on-scroll delay-200">
                                LMC empowers global enterprises and growing organizations with resilient full-stack web
                                architectures, robust ERP solutions, zero-trust cybersecurity, and accredited industrial
                                engineering talent.
                            </p>

                            {/* CTAs */}
                            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 reveal-on-scroll delay-300">
                                <Link
                                    href={route('public.services')}
                                    className="lmc-btn lmc-btn-primary lmc-btn-lg justify-center text-center"
                                >
                                    <span>Explore Enterprise Services</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href={route('public.contact')}
                                    className="lmc-btn lmc-btn-outline-white lmc-btn-lg justify-center text-center"
                                >
                                    <span>Schedule Consultation</span>
                                </Link>
                            </div>

                            {/* Trust Signals */}
                            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-y-2.5 gap-x-4 sm:gap-x-6 text-xs text-gray-400 font-medium reveal-on-scroll delay-400">
                                <div className="flex items-center gap-2 text-gray-300">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                    <span>SOC-2 Ready Architecture</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-300">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                    <span>99.9% Uptime SLA</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-300">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                    <span>Cryptographic Audits</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Executive Architecture & Cloud Capabilities Showcase Card */}
                        <div className="lg:col-span-5">
                            <div className="lmc-dark-card rounded-2xl p-5 sm:p-7 border border-white/15 shadow-2xl relative overflow-hidden backdrop-blur-xl reveal-scale delay-200">
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#DA7A31] to-transparent" />

                                {/* Header with Live Operational Status */}
                                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10 mb-5">
                                    <div className="flex items-center gap-2.5">
                                        <span className="relative flex h-2.5 w-2.5 shrink-0">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                        </span>
                                        <span className="text-xs font-bold text-white tracking-wide uppercase">
                                            Systems Operational
                                        </span>
                                    </div>
                                    <span className="text-[10px] sm:text-[11px] font-mono font-semibold text-[#DA7A31] bg-[#132842] px-2.5 py-0.5 rounded border border-[#DA7A31]/30">
                                        LMC Core Cloud 4.0
                                    </span>
                                </div>

                                {/* Core Capability Pillars */}
                                <div className="space-y-3.5 mb-5">
                                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#071220]/70 border border-white/5 hover:border-[#DA7A31]/40 transition-colors">
                                        <div className="w-9 h-9 rounded-lg bg-[#DA7A31]/15 text-[#DA7A31] flex items-center justify-center shrink-0 mt-0.5">
                                            <Server className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs font-bold text-white">Full-Stack Cloud Systems</div>
                                            <div className="text-[11px] text-gray-400 truncate mt-0.5">
                                                Laravel &bull; React &bull; Microservices &bull; AWS Kubernetes
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#071220]/70 border border-white/5 hover:border-[#DA7A31]/40 transition-colors">
                                        <div className="w-9 h-9 rounded-lg bg-[#DA7A31]/15 text-[#DA7A31] flex items-center justify-center shrink-0 mt-0.5">
                                            <Layers className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs font-bold text-white">Proprietary Software Platforms</div>
                                            <div className="text-[11px] text-gray-400 truncate mt-0.5">
                                                Enterprise ERP &bull; CRM &bull; Multi-Cloud Billing
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#071220]/70 border border-white/5 hover:border-[#DA7A31]/40 transition-colors">
                                        <div className="w-9 h-9 rounded-lg bg-[#DA7A31]/15 text-[#DA7A31] flex items-center justify-center shrink-0 mt-0.5">
                                            <GraduationCap className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs font-bold text-white">Talent Accelerator & Audits</div>
                                            <div className="text-[11px] text-gray-400 truncate mt-0.5">
                                                Cryptographically Anchored Academic Credentials
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Verification lookup link */}
                                <div className="pt-3.5 border-t border-white/10 flex items-center justify-between text-xs">
                                    <span className="text-gray-400 flex items-center gap-1.5">
                                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                                        <span>Digital Registry Online</span>
                                    </span>
                                    <Link
                                        href={route('public.verify-internship')}
                                        className="text-xs font-semibold text-[#DA7A31] hover:underline inline-flex items-center gap-1"
                                    >
                                        <span>Verify ID</span>
                                        <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Corporate Metrics Bar */}
            <section className="bg-[#0B1C30]/80 border-b border-white/10 shadow-lg backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        <div className="text-center p-3 rounded-xl bg-white/[0.02] border border-white/5 lg:bg-transparent lg:border-none lg:border-r lg:border-white/10 reveal-on-scroll delay-100">
                            <div className="text-3xl sm:text-4xl font-extrabold text-white">
                                {stats.total_clients}
                            </div>
                            <div className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider mt-1.5">
                                Enterprise Clients
                            </div>
                        </div>
                        <div className="text-center p-3 rounded-xl bg-white/[0.02] border border-white/5 lg:bg-transparent lg:border-none lg:border-r lg:border-white/10 reveal-on-scroll delay-200">
                            <div className="text-3xl sm:text-4xl font-extrabold text-[#DA7A31]">
                                {stats.projects_delivered}
                            </div>
                            <div className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider mt-1.5">
                                Systems Deployed
                            </div>
                        </div>
                        <div className="text-center p-3 rounded-xl bg-white/[0.02] border border-white/5 lg:bg-transparent lg:border-none lg:border-r lg:border-white/10 reveal-on-scroll delay-300">
                            <div className="text-3xl sm:text-4xl font-extrabold text-white">
                                {stats.interns_trained}
                            </div>
                            <div className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider mt-1.5">
                                Engineers Groomed
                            </div>
                        </div>
                        <div className="text-center p-3 rounded-xl bg-white/[0.02] border border-white/5 lg:bg-transparent lg:border-none reveal-on-scroll delay-400">
                            <div className="text-3xl sm:text-4xl font-extrabold text-[#DA7A31]">
                                {stats.client_satisfaction}
                            </div>
                            <div className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider mt-1.5">
                                Client Satisfaction
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20 bg-[#071220] border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 reveal-on-scroll">
                        <div>
                            <div className="text-xs font-bold text-[#DA7A31] uppercase tracking-widest mb-2">
                                Core Capabilities
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                                Enterprise Engineering Services
                            </h2>
                        </div>
                        <Link
                            href={route('public.services')}
                            className="mt-4 md:mt-0 lmc-btn lmc-btn-secondary lmc-btn-sm"
                        >
                            <span>View All Specialized Solutions</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#DA7A31]" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {services.map((service, idx) => {
                            const delayClass = idx === 0 ? 'delay-100' : idx === 1 ? 'delay-200' : 'delay-300';
                            return (
                                <div
                                    key={service.id}
                                    className={`lmc-dark-card p-7 flex flex-col justify-between group relative overflow-hidden reveal-on-scroll ${delayClass}`}
                                >
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#DA7A31] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div>
                                        <div className="lmc-card-icon w-13 h-13 rounded-xl bg-white/5 border border-white/10 text-white flex items-center justify-center mb-6 shadow-sm">
                                            {iconMap[service.icon] || <Cpu className="w-6 h-6 text-[#DA7A31]" />}
                                        </div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-[#DA7A31] transition-colors mb-2">
                                            {service.name}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
                                            {service.summary}
                                        </p>
                                        <div className="space-y-2 mb-6">
                                            {service.features?.slice(0, 3).map((feat, fIdx) => (
                                                <div
                                                    key={fIdx}
                                                    className="flex items-start gap-2.5 text-xs text-gray-300"
                                                >
                                                    <CheckCircle2 className="w-4 h-4 text-[#DA7A31] shrink-0 mt-0.5" />
                                                    <span>{feat}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="pt-5 border-t border-white/10 flex items-center justify-between gap-3">
                                        <Link
                                            href={route('public.services')}
                                            className="lmc-btn lmc-btn-secondary lmc-btn-sm flex-1 justify-center"
                                        >
                                            <span>Learn More</span>
                                            <ChevronRight className="w-3.5 h-3.5 text-[#DA7A31]" />
                                        </Link>
                                        <Link
                                            href={route('public.contact')}
                                            className="lmc-btn lmc-btn-primary lmc-btn-sm flex-1 justify-center"
                                        >
                                            <span>Inquire</span>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Products & Platforms Showcase (With DEMO indicator) */}
            <section className="py-20 bg-[#0B1C30]/50 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-14 reveal-on-scroll">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DA7A31]/15 text-[#DA7A31] text-xs font-bold uppercase tracking-wider mb-3">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Modular Business Suites</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                            LMC Proprietary Platforms
                        </h2>
                        <p className="mt-3 text-base text-gray-400 leading-relaxed">
                            Pre-architected, enterprise-ready software platforms designed for rapid customization and
                            deployment.
                        </p>
                        <div className="mt-4 inline-flex items-center gap-2 text-xs text-amber-300 bg-amber-950/40 px-4 py-2 rounded-full border border-amber-500/30 shadow-xs">
                            <Info className="w-4 h-4 text-amber-400 shrink-0" />
                            <span>
                                <strong>Enterprise Blueprint Note:</strong> Displayed platforms are pre-architected
                                demonstrative systems available for rapid enterprise customization.
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                        {products.slice(0, 6).map((product, idx) => {
                            const delayClass = idx % 3 === 0 ? 'delay-100' : idx % 3 === 1 ? 'delay-200' : 'delay-300';
                            return (
                                <div
                                    key={product.id}
                                    className={`lmc-dark-card p-6 sm:p-7 flex flex-col justify-between group relative overflow-hidden reveal-on-scroll ${delayClass}`}
                                >
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#DA7A31] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-md bg-[#071220] border border-white/10 text-white tracking-wider uppercase">
                                                <Layers className="w-3 h-3 text-[#DA7A31]" />
                                                DEMO SYSTEM
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-500/30">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                                Available
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-[#DA7A31] transition-colors mb-2">
                                            {product.name}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-400 line-clamp-3 leading-relaxed mb-6">
                                            {product.summary}
                                        </p>
                                    </div>
                                    <div className="pt-5 border-t border-white/10 flex items-center justify-between gap-3">
                                        <Link
                                            href={route('public.products')}
                                            className="lmc-btn lmc-btn-secondary lmc-btn-sm flex-1 justify-center"
                                        >
                                            <span>Inspect Features</span>
                                            <ArrowRight className="w-3.5 h-3.5 text-[#DA7A31]" />
                                        </Link>
                                        <Link
                                            href={route('public.contact')}
                                            className="lmc-btn lmc-btn-primary lmc-btn-sm flex-1 justify-center"
                                        >
                                            <span>Request Demo</span>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="text-center mt-12 reveal-on-scroll delay-200">
                        <Link
                            href={route('public.products')}
                            className="lmc-btn lmc-btn-navy lmc-btn-lg inline-flex items-center gap-2"
                        >
                            <span>Explore All {products.length} Platform Solutions</span>
                            <ArrowRight className="w-4 h-4 text-[#DA7A31]" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Talent Accelerator Banner */}
            <section className="py-16 bg-[#071220] text-white border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-[#0B1C30] to-[#0F243E] border border-[#DA7A31]/30 rounded-2xl p-8 lg:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden reveal-scale">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#DA7A31] uppercase tracking-wider mb-3">
                                <GraduationCap className="w-4 h-4" />
                                <span>Academic & Talent Partnership</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                                LMC Industrial Internship Accelerator
                            </h2>
                            <p className="mt-3 text-sm text-gray-300 leading-relaxed">
                                Grooming university undergraduates into elite full-stack and cloud DevOps engineers.
                                Every transcript and training certificate is secured with our public digital
                                verification registry.
                            </p>
                            <div className="mt-5 flex flex-wrap gap-4 text-xs text-gray-300">
                                <div className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-4 h-4 text-[#DA7A31]" />
                                    <span>Production Codebase Immersion</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-4 h-4 text-[#DA7A31]" />
                                    <span>Instant Online Credential Verification</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-4 h-4 text-[#DA7A31]" />
                                    <span>Direct Corporate Hiring Pipeline</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto flex-shrink-0">
                            <Link
                                href={route('public.internship')}
                                className="lmc-btn lmc-btn-primary"
                            >
                                Apply for Internship
                            </Link>
                            <Link
                                href={route('public.verify-internship')}
                                className="lmc-btn lmc-btn-secondary"
                            >
                                <ShieldCheck className="w-4 h-4 text-[#DA7A31]" />
                                <span>Verify Student Certificate</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Approved Client Testimonials */}
            <section className="py-20 bg-[#071220] border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 reveal-on-scroll">
                        <div>
                            <div className="text-xs font-bold text-[#DA7A31] uppercase tracking-widest mb-2">
                                Client Endorsements
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                                Verified Client Reviews
                            </h2>
                        </div>
                        <div className="mt-4 md:mt-0 flex items-center gap-3">
                            <Link
                                href={route('public.reviews')}
                                className="lmc-btn lmc-btn-secondary"
                            >
                                <span>Read All Reviews</span>
                                <ArrowRight className="w-4 h-4 text-[#DA7A31]" />
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {reviews.slice(0, 3).map((review, idx) => {
                            const delayClass = idx === 0 ? 'delay-100' : idx === 1 ? 'delay-200' : 'delay-300';
                            return (
                                <div
                                    key={review.id}
                                    className={`lmc-dark-card p-7 flex flex-col justify-between relative overflow-hidden group reveal-on-scroll ${delayClass}`}
                                >
                                    <Quote className="w-10 h-10 text-white/5 absolute top-5 right-5 pointer-events-none group-hover:text-[#DA7A31]/15 transition-colors" />
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center space-x-1">
                                                {[...Array(review.rating)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className="w-4 h-4 fill-[#DA7A31] text-[#DA7A31]"
                                                    />
                                                ))}
                                            </div>
                                            {review.is_verified_client && (
                                                <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 inline-flex items-center gap-1.5">
                                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                                    <span>Verified Client</span>
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-sm text-gray-300 italic leading-relaxed mb-6 font-normal">
                                            "{review.review}"
                                        </p>
                                    </div>

                                    <div className="pt-5 border-t border-white/10 flex items-center gap-3.5 relative z-10">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1E3A5F] to-[#DA7A31] text-white flex items-center justify-center font-bold text-sm shadow-md border border-white/20">
                                            {review.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-white">{review.name}</div>
                                            <div className="text-xs text-gray-400">
                                                {review.role ? `${review.role}, ` : ''}
                                                {review.company}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Consultation CTA Banner */}
            <section className="bg-[#0B1C30] text-white py-16 border-t border-white/10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 reveal-on-scroll">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                        Ready to Build Technology Beyond Boundaries?
                    </h2>
                    <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Connect directly with our senior software architects to review your technical requirements,
                        architecture blueprints, or industrial talent needs.
                    </p>
                    <div className="pt-4 flex flex-wrap justify-center gap-4">
                        <Link
                            href={route('public.contact')}
                            className="lmc-btn lmc-btn-primary"
                        >
                            Initiate Project Discussion
                        </Link>
                        <Link
                            href={route('public.services')}
                            className="lmc-btn lmc-btn-outline-white"
                        >
                            Review Tech Stack
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
