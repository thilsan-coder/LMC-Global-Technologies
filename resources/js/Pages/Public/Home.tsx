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
            <section className="relative bg-[#0B1C30] text-white overflow-hidden py-24 lg:py-32 border-b border-white/10">
                {/* Abstract geometric background accents */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#DA7A31]/10 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 -mb-20 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl">
                        {/* Tagline Badge */}
                        <div className="inline-flex items-center gap-2 bg-[#132842] border border-[#DA7A31]/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#DA7A31] mb-6">
                            <span className="w-2 h-2 rounded-full bg-[#DA7A31] animate-pulse" />
                            <span>LMC Global Technologies (Pvt) Ltd &bull; "Technology Beyond Boundaries"</span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
                            Engineering Mission-Critical{' '}
                            <span className="text-[#DA7A31]">Enterprise Software</span> & Cloud Infrastructure.
                        </h1>

                        {/* Subtitle */}
                        <p className="mt-6 text-lg sm:text-xl text-gray-300 font-normal leading-relaxed">
                            LMC empowers global enterprises and growing organizations with resilient full-stack web
                            architectures, robust ERP solutions, zero-trust cybersecurity, and accredited industrial
                            engineering talent.
                        </p>

                        {/* CTAs */}
                        <div className="mt-10 flex flex-wrap items-center gap-4">
                            <Link
                                href={route('public.services')}
                                className="inline-flex items-center justify-center gap-2 bg-[#DA7A31] hover:bg-[#C2631D] text-white font-semibold text-base px-7 py-3.5 rounded shadow-lg transition duration-200"
                            >
                                <span>Explore Enterprise Services</span>
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href={route('public.contact')}
                                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-base px-6 py-3.5 rounded border border-white/20 transition duration-200"
                            >
                                <span>Schedule Consultation</span>
                            </Link>
                            <Link
                                href={route('public.verify-internship')}
                                className="inline-flex items-center gap-1.5 text-xs text-gray-300 hover:text-white underline underline-offset-4 py-2"
                            >
                                <ShieldCheck className="w-4 h-4 text-[#DA7A31]" />
                                <span>Verify Certificate Record</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Corporate Metrics Bar */}
            <section className="bg-white border-b border-gray-200 shadow-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
                        <div className="text-center px-4">
                            <div className="text-3xl sm:text-4xl font-extrabold text-[#0B1C30]">
                                {stats.total_clients}
                            </div>
                            <div className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mt-1">
                                Enterprise Clients
                            </div>
                        </div>
                        <div className="text-center px-4 pt-4 sm:pt-0">
                            <div className="text-3xl sm:text-4xl font-extrabold text-[#DA7A31]">
                                {stats.projects_delivered}
                            </div>
                            <div className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mt-1">
                                Systems Deployed
                            </div>
                        </div>
                        <div className="text-center px-4 pt-4 sm:pt-0">
                            <div className="text-3xl sm:text-4xl font-extrabold text-[#0B1C30]">
                                {stats.interns_trained}
                            </div>
                            <div className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mt-1">
                                Engineers Groomed
                            </div>
                        </div>
                        <div className="text-center px-4 pt-4 sm:pt-0">
                            <div className="text-3xl sm:text-4xl font-extrabold text-[#DA7A31]">
                                {stats.client_satisfaction}
                            </div>
                            <div className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mt-1">
                                Client Satisfaction
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20 bg-[#F0F0F1]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                        <div>
                            <div className="text-xs font-bold text-[#DA7A31] uppercase tracking-widest mb-2">
                                Core Capabilities
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1C30] tracking-tight">
                                Enterprise Engineering Services
                            </h2>
                        </div>
                        <Link
                            href={route('public.services')}
                            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-[#DA7A31] hover:text-[#C2631D]"
                        >
                            <span>View all specialized solutions</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className="bg-white rounded-md p-7 border border-gray-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                            >
                                <div>
                                    <div className="w-12 h-12 rounded-md bg-[#0B1C30]/5 flex items-center justify-center mb-5">
                                        {iconMap[service.icon] || <Cpu className="w-6 h-6 text-[#DA7A31]" />}
                                    </div>
                                    <h3 className="text-lg font-bold text-[#0B1C30] mb-2">{service.name}</h3>
                                    <p className="text-xs sm:text-sm text-[#4D4B55] leading-relaxed mb-5">
                                        {service.summary}
                                    </p>
                                    <div className="space-y-1.5 mb-6">
                                        {service.features?.slice(0, 3).map((feat, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-2 text-xs text-gray-600"
                                            >
                                                <CheckCircle2 className="w-3.5 h-3.5 text-[#DA7A31] flex-shrink-0" />
                                                <span>{feat}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                    <Link
                                        href={route('public.services')}
                                        className="text-xs font-semibold text-[#0B1C30] hover:text-[#DA7A31] inline-flex items-center gap-1"
                                    >
                                        <span>Learn More</span>
                                        <ChevronRight className="w-3.5 h-3.5" />
                                    </Link>
                                    <Link
                                        href={route('public.contact')}
                                        className="text-xs font-medium text-[#DA7A31] hover:underline"
                                    >
                                        Inquire
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products & Platforms Showcase (With DEMO indicator) */}
            <section className="py-20 bg-white border-t border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#DA7A31]/10 text-[#DA7A31] text-xs font-bold uppercase tracking-wider mb-3">
                            <span>Modular Business Suites</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1C30] tracking-tight">
                            LMC Proprietary Platforms
                        </h2>
                        <p className="mt-3 text-sm text-[#4D4B55] leading-relaxed">
                            Pre-architected, enterprise-ready software platforms designed for rapid customization and
                            deployment.
                        </p>
                        <div className="mt-2 text-xs text-amber-700 bg-amber-50 inline-block px-3 py-1 rounded border border-amber-200">
                            <strong>Note:</strong> Displayed platforms are demonstrative blueprints available for
                            customization.
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {products.slice(0, 8).map((product) => (
                            <div
                                key={product.id}
                                className="bg-[#F0F0F1] rounded-md p-5 border border-gray-200 flex flex-col justify-between hover:border-[#DA7A31]/50 transition-colors"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-200 text-gray-700 uppercase">
                                            DEMO SYSTEM
                                        </span>
                                        <span className="text-[10px] font-semibold text-[#DA7A31]">
                                            {product.status}
                                        </span>
                                    </div>
                                    <h3 className="text-base font-bold text-[#0B1C30] mb-2">{product.name}</h3>
                                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4">
                                        {product.summary}
                                    </p>
                                </div>
                                <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                                    <Link
                                        href={route('public.products')}
                                        className="text-xs font-semibold text-[#0B1C30] hover:text-[#DA7A31]"
                                    >
                                        Inspect Features &rarr;
                                    </Link>
                                    <Link
                                        href={route('public.contact')}
                                        className="text-xs font-semibold text-[#DA7A31] hover:underline"
                                    >
                                        Request Demo
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <Link
                            href={route('public.products')}
                            className="inline-flex items-center gap-2 bg-[#0B1C30] hover:bg-[#132842] text-white text-sm font-semibold px-6 py-3 rounded shadow transition"
                        >
                            <span>Browse All 8 LMC Platform Solutions</span>
                            <ArrowRight className="w-4 h-4 text-[#DA7A31]" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Talent Accelerator Banner */}
            <section className="py-16 bg-[#071220] text-white border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-[#0B1C30] border border-[#DA7A31]/30 rounded-lg p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
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
                                className="text-center bg-[#DA7A31] hover:bg-[#C2631D] text-white text-sm font-semibold px-6 py-3 rounded shadow transition"
                            >
                                Apply for Internship
                            </Link>
                            <Link
                                href={route('public.verify-internship')}
                                className="text-center bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold px-6 py-3 rounded transition flex items-center justify-center gap-1.5"
                            >
                                <ShieldCheck className="w-4 h-4 text-[#DA7A31]" />
                                <span>Verify Student Certificate</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Approved Client Testimonials */}
            <section className="py-20 bg-[#F0F0F1]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                        <div>
                            <div className="text-xs font-bold text-[#DA7A31] uppercase tracking-widest mb-2">
                                Client Endorsements
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1C30] tracking-tight">
                                Verified Client Reviews
                            </h2>
                        </div>
                        <div className="mt-4 md:mt-0 flex items-center gap-3">
                            <Link
                                href={route('public.reviews')}
                                className="text-sm font-semibold text-[#0B1C30] hover:text-[#DA7A31] inline-flex items-center gap-1"
                            >
                                <span>Read all reviews ({reviews.length}+)</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reviews.slice(0, 3).map((review) => (
                            <div
                                key={review.id}
                                className="bg-white rounded-md p-6 border border-gray-200 shadow-xs flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center space-x-1">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className="w-4 h-4 fill-[#DA7A31] text-[#DA7A31]"
                                                />
                                            ))}
                                        </div>
                                        {review.is_verified_client && (
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
                                                <CheckCircle2 className="w-3 h-3" />
                                                <span>Verified Client</span>
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-xs sm:text-sm text-[#4D4B55] italic leading-relaxed mb-6">
                                        "{review.review}"
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-[#0B1C30] text-white flex items-center justify-center font-bold text-xs">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-[#0B1C30]">{review.name}</div>
                                        <div className="text-[11px] text-gray-500">
                                            {review.role ? `${review.role}, ` : ''}
                                            {review.company}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 text-center">
                        <Link
                            href={route('public.reviews')}
                            className="inline-flex items-center gap-2 text-xs font-semibold text-[#DA7A31] hover:underline"
                        >
                            <span>Have you partnered with LMC? Submit your corporate review &rarr;</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Consultation CTA Banner */}
            <section className="bg-[#0B1C30] text-white py-16 border-t border-white/10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
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
                            className="bg-[#DA7A31] hover:bg-[#C2631D] text-white font-semibold text-sm px-8 py-3.5 rounded shadow transition"
                        >
                            Initiate Project Discussion
                        </Link>
                        <Link
                            href={route('public.services')}
                            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm px-8 py-3.5 rounded transition"
                        >
                            Review Tech Stack
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
