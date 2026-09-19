import React, { useState, useRef, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { toast } from 'sonner';
import {
    Mail,
    Phone,
    PhoneCall,
    MapPin,
    Clock,
    Send,
    ShieldCheck,
    CheckCircle2,
    Copy,
    Check,
    ExternalLink,
    Building2,
    Server,
    Zap,
    Lock,
    User,
    ChevronDown,
    Sparkles,
    MessageSquare,
    Compass,
} from 'lucide-react';

interface CategoryOption {
    id: string;
    label: string;
    desc: string;
}

const INQUIRY_CATEGORIES: CategoryOption[] = [
    { id: 'Enterprise System Development', label: 'Enterprise System Development', desc: 'Custom web, cloud, and mobile architectures' },
    { id: 'Product Licensing & Demos', label: 'Product Licensing & Demos', desc: 'CRM, HR Management, Hospital & POS systems' },
    { id: 'Cloud Architecture & DevOps', label: 'Cloud Architecture & DevOps', desc: 'AWS/Azure migration, Kubernetes & CI/CD' },
    { id: 'Cybersecurity & Compliance', label: 'Cybersecurity & Compliance', desc: 'SOC-2 audits, penetration testing & hardening' },
    { id: 'Internship & Academy Mou', label: 'Internship & Academy MOU', desc: 'University partnerships & talent development' },
    { id: 'General Technical Inquiry', label: 'General Technical Inquiry', desc: 'General consultations & executive contact' },
];

export default function Contact() {
    const [copiedField, setCopiedField] = useState<string | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { data, setData, post, processing, reset, errors, recentlySuccessful } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: 'Enterprise System Development',
        message: '',
    });

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('public.contact.store'), {
            onSuccess: () => {
                reset();
                toast.success('Your message has been dispatched successfully! An LMC solution architect will contact you shortly.');
            },
        });
    };

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(label);
        toast.success(`Copied ${label} to clipboard!`);
        setTimeout(() => setCopiedField(null), 2500);
    };

    const selectedCategory = INQUIRY_CATEGORIES.find((c) => c.id === data.subject) || INQUIRY_CATEGORIES[0];

    return (
        <PublicLayout>
            <Head title="Get in Touch - Enterprise Technology Consultation" />

            {/* Premium Hero Section */}
            <div className="bg-[#0B1C30] text-white py-20 sm:py-24 border-b border-white/10 relative overflow-hidden">
                {/* Background Ambient Glows */}
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#DA7A31]/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute inset-0 bg-[linear-[#1E3A5F]/10_1px,transparent_1px)] bg-[size:32px_32px] opacity-20 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 reveal-on-scroll">
                        <div className="max-w-3xl">
                            {/* SLA Badge */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs font-semibold text-[#DA7A31] mb-6 backdrop-blur-md">
                                <span className="w-2 h-2 rounded-full bg-[#DA7A31] animate-ping" />
                                <span>Global Technology Support & Inquiries</span>
                                <span className="text-gray-400">&bull;</span>
                                <span className="text-gray-300 font-normal">Guaranteed 2-Hour Response SLA</span>
                            </div>

                            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
                                Get in Touch
                            </h1>
                            <p className="mt-4 text-base sm:text-xl text-gray-300 leading-relaxed max-w-2xl font-normal">
                                Connect directly with LMC solution architects, engineering leads, and platform consultants to discuss enterprise software, custom development, or academic partnerships.
                            </p>
                        </div>

                        {/* Fast Contact Pill Indicators */}
                        <div className="flex flex-wrap items-center gap-3 shrink-0">
                            <a
                                href="tel:+94112345678"
                                className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 hover:border-[#DA7A31] text-xs font-semibold text-white flex items-center gap-2 transition-all hover:bg-white/10"
                            >
                                <PhoneCall className="w-4 h-4 text-[#DA7A31]" />
                                <span>+94 11 234 5678</span>
                            </a>
                            <a
                                href="mailto:contact@lmcglobal.lk"
                                className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 hover:border-[#DA7A31] text-xs font-semibold text-white flex items-center gap-2 transition-all hover:bg-white/10"
                            >
                                <Mail className="w-4 h-4 text-[#DA7A31]" />
                                <span>contact@lmcglobal.lk</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Interactive Contact Information Cards Grid */}
            <section className="py-12 bg-[#071220] border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Card 1: HQ Address */}
                        <div className="lmc-dark-card rounded-2xl p-6 relative overflow-hidden group hover:border-[#DA7A31]/50 transition-all duration-300 reveal-on-scroll delay-100 flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#DA7A31]/20 to-amber-500/10 border border-[#DA7A31]/30 text-[#DA7A31] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Building2 className="w-6 h-6" />
                                </div>
                                <div className="text-[11px] font-bold text-[#DA7A31] uppercase tracking-wider mb-1">
                                    Corporate HQ
                                </div>
                                <h3 className="text-base font-bold text-white mb-2">Global Headquarters</h3>
                                <p className="text-xs text-gray-300 leading-relaxed">
                                    Level 18, West Tower<br />
                                    World Trade Center, Echelon Square<br />
                                    Colombo 01, Sri Lanka
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                                <span className="text-[11px] text-gray-400 font-medium">GPS: 6.9344° N, 79.8428° E</span>
                                <button
                                    type="button"
                                    onClick={() => copyToClipboard('Level 18, West Tower, World Trade Center, Colombo 01, Sri Lanka', 'HQ Address')}
                                    className="text-xs text-[#DA7A31] hover:text-amber-400 font-semibold flex items-center gap-1 transition-colors"
                                >
                                    {copiedField === 'HQ Address' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                    <span>{copiedField === 'HQ Address' ? 'Copied' : 'Copy'}</span>
                                </button>
                            </div>
                        </div>

                        {/* Card 2: Telephone Lines */}
                        <div className="lmc-dark-card rounded-2xl p-6 relative overflow-hidden group hover:border-[#DA7A31]/50 transition-all duration-300 reveal-on-scroll delay-200 flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#DA7A31]/20 to-amber-500/10 border border-[#DA7A31]/30 text-[#DA7A31] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <PhoneCall className="w-6 h-6" />
                                </div>
                                <div className="text-[11px] font-bold text-[#DA7A31] uppercase tracking-wider mb-1">
                                    Direct Switchboard
                                </div>
                                <h3 className="text-base font-bold text-white mb-2">Telecommunication Hotline</h3>
                                <p className="text-xs text-gray-300 leading-relaxed">
                                    General: +94 11 234 5678<br />
                                    Priority SLA: +94 77 123 4567<br />
                                    Talent MOU: +94 11 234 5679
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                                <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    <span>Lines Active Now</span>
                                </span>
                                <a
                                    href="tel:+94112345678"
                                    className="text-xs text-[#DA7A31] hover:text-amber-400 font-semibold flex items-center gap-1 transition-colors"
                                >
                                    <span>Call</span>
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            </div>
                        </div>

                        {/* Card 3: Electronic Email */}
                        <div className="lmc-dark-card rounded-2xl p-6 relative overflow-hidden group hover:border-[#DA7A31]/50 transition-all duration-300 reveal-on-scroll delay-300 flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#DA7A31]/20 to-amber-500/10 border border-[#DA7A31]/30 text-[#DA7A31] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div className="text-[11px] font-bold text-[#DA7A31] uppercase tracking-wider mb-1">
                                    Electronic Mail
                                </div>
                                <h3 className="text-base font-bold text-white mb-2">Encrypted Email Desks</h3>
                                <p className="text-xs text-gray-300 leading-relaxed">
                                    General: contact@lmcglobal.lk<br />
                                    Audits & Security: security@lmcglobal.lk<br />
                                    Internships: talent@lmcglobal.lk
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                                <span className="text-[11px] text-gray-400 font-medium">256-Bit SSL Protected</span>
                                <button
                                    type="button"
                                    onClick={() => copyToClipboard('contact@lmcglobal.lk', 'Email Address')}
                                    className="text-xs text-[#DA7A31] hover:text-amber-400 font-semibold flex items-center gap-1 transition-colors"
                                >
                                    {copiedField === 'Email Address' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                    <span>{copiedField === 'Email Address' ? 'Copied' : 'Copy'}</span>
                                </button>
                            </div>
                        </div>

                        {/* Card 4: Operating Hours */}
                        <div className="lmc-dark-card rounded-2xl p-6 relative overflow-hidden group hover:border-[#DA7A31]/50 transition-all duration-300 reveal-on-scroll delay-400 flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#DA7A31]/20 to-amber-500/10 border border-[#DA7A31]/30 text-[#DA7A31] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div className="text-[11px] font-bold text-[#DA7A31] uppercase tracking-wider mb-1">
                                    Operational Hours
                                </div>
                                <h3 className="text-base font-bold text-white mb-2">Office & NOC Schedule</h3>
                                <p className="text-xs text-gray-300 leading-relaxed">
                                    Mon - Fri: 8:30 AM - 6:00 PM IST<br />
                                    Saturday: 9:00 AM - 1:00 PM IST<br />
                                    Cloud NOC: 24/7/365 Continuous
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                                <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
                                    <Server className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>NOC Active 24/7</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Form & Map Main Container */}
            <section className="py-16 sm:py-24 bg-[#071220] border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
                        {/* Premium Contact Form (7 Columns) */}
                        <div className="lg:col-span-7">
                            <div className="lmc-dark-card rounded-3xl p-6 sm:p-10 relative overflow-hidden border border-white/15 shadow-2xl reveal-on-scroll">
                                {/* Top Glowing Gradient Line */}
                                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#DA7A31] to-transparent" />

                                <div className="mb-8">
                                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DA7A31] uppercase tracking-widest mb-2">
                                        <MessageSquare className="w-4 h-4" />
                                        <span>Direct Communication Channel</span>
                                    </div>
                                    <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                                        Send Enterprise Inquiry
                                    </h2>
                                    <p className="mt-2 text-xs sm:text-sm text-gray-300 leading-relaxed">
                                        Fill out your project specifications below. Our senior solution architects will evaluate your inquiry and respond within 2 business hours.
                                    </p>
                                </div>

                                {recentlySuccessful && (
                                    <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm flex items-center gap-3 shadow-lg shadow-emerald-500/10 animate-page-enter">
                                        <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                                        <div>
                                            <strong>Message Dispatched Successfully!</strong> Your technical inquiry has been assigned ticket ID <strong>#LMC-INQ-{Math.floor(1000 + Math.random() * 9000)}</strong>.
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name & Email Inputs */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-2">
                                                Full Name *
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                                    <User className="w-4 h-4" />
                                                </div>
                                                <input
                                                    type="text"
                                                    id="contact-name-input"
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    required
                                                    className="lmc-input-has-icon w-full text-sm rounded-xl border border-white/15 bg-[#0B1C30] pl-11 pr-4 py-3.5 text-white placeholder:text-gray-500 focus:border-[#DA7A31] focus:ring-2 focus:ring-[#DA7A31]/25 transition-all shadow-inner"
                                                    placeholder="e.g. Asoka Weerasinghe"
                                                />
                                            </div>
                                            {errors.name && (
                                                <p className="text-xs text-red-400 mt-1">{errors.name}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-2">
                                                Corporate Email *
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                                    <Mail className="w-4 h-4" />
                                                </div>
                                                <input
                                                    type="email"
                                                    id="contact-email-input"
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    required
                                                    className="lmc-input-has-icon w-full text-sm rounded-xl border border-white/15 bg-[#0B1C30] pl-11 pr-4 py-3.5 text-white placeholder:text-gray-500 focus:border-[#DA7A31] focus:ring-2 focus:ring-[#DA7A31]/25 transition-all shadow-inner"
                                                    placeholder="asoka@organization.com"
                                                />
                                            </div>
                                            {errors.email && (
                                                <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Phone & Custom Category Dropdown */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-2">
                                                Contact Phone / WhatsApp
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                                    <Phone className="w-4 h-4" />
                                                </div>
                                                <input
                                                    type="text"
                                                    id="contact-phone-input"
                                                    value={data.phone}
                                                    onChange={(e) => setData('phone', e.target.value)}
                                                    className="lmc-input-has-icon w-full text-sm rounded-xl border border-white/15 bg-[#0B1C30] pl-11 pr-4 py-3.5 text-white placeholder:text-gray-500 focus:border-[#DA7A31] focus:ring-2 focus:ring-[#DA7A31]/25 transition-all shadow-inner"
                                                    placeholder="+94 77 000 0000"
                                                />
                                            </div>
                                            {errors.phone && (
                                                <p className="text-xs text-red-400 mt-1">{errors.phone}</p>
                                            )}
                                        </div>

                                        {/* Custom Inquiry Category Dropdown */}
                                        <div className="relative" ref={dropdownRef}>
                                            <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-2">
                                                Inquiry Subject / Topic *
                                            </label>

                                            <button
                                                type="button"
                                                id="contact-subject-dropdown-trigger"
                                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                                className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all duration-200 ${
                                                    dropdownOpen
                                                        ? 'border-[#DA7A31] ring-2 ring-[#DA7A31]/25 bg-[#0E223D]'
                                                        : 'border-white/15 hover:border-white/30 bg-[#0B1C30]'
                                                }`}
                                                aria-haspopup="listbox"
                                                aria-expanded={dropdownOpen}
                                            >
                                                <div className="truncate pr-2">
                                                    <div className="text-xs sm:text-sm font-semibold text-white truncate">
                                                        {selectedCategory.label}
                                                    </div>
                                                </div>
                                                <ChevronDown
                                                    className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${
                                                        dropdownOpen ? 'rotate-180 text-[#DA7A31]' : ''
                                                    }`}
                                                />
                                            </button>

                                            {/* Dropdown Menu */}
                                            {dropdownOpen && (
                                                <div
                                                    id="contact-subject-dropdown-menu"
                                                    className="absolute left-0 right-0 z-30 mt-2 max-h-60 overflow-y-auto rounded-xl border border-white/20 bg-[#0B1C30] shadow-2xl shadow-black p-2 animate-dropdown-enter"
                                                    role="listbox"
                                                >
                                                    {INQUIRY_CATEGORIES.map((cat) => {
                                                        const isSelected = data.subject === cat.id;
                                                        return (
                                                            <button
                                                                key={cat.id}
                                                                type="button"
                                                                role="option"
                                                                aria-selected={isSelected}
                                                                onClick={() => {
                                                                    setData('subject', cat.id);
                                                                    setDropdownOpen(false);
                                                                }}
                                                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all ${
                                                                    isSelected
                                                                        ? 'bg-[#DA7A31]/20 text-white font-medium border border-[#DA7A31]/40'
                                                                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                                                }`}
                                                            >
                                                                <div className="min-w-0 pr-2">
                                                                    <div className="text-xs sm:text-sm font-medium text-white truncate">
                                                                        {cat.label}
                                                                    </div>
                                                                    <div className="text-[10px] text-gray-400 truncate">
                                                                        {cat.desc}
                                                                    </div>
                                                                </div>
                                                                {isSelected && (
                                                                    <Check className="w-4 h-4 text-[#DA7A31] shrink-0" />
                                                                )}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Detailed Message Textarea */}
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider">
                                                Detailed Project Requirements *
                                            </label>
                                            <span className="text-xs text-gray-400">Include target timeline & scope</span>
                                        </div>
                                        <textarea
                                            rows={6}
                                            id="contact-message-input"
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            required
                                            className="w-full text-sm rounded-xl border border-white/15 bg-[#0B1C30] p-4 text-white placeholder:text-gray-500 focus:border-[#DA7A31] focus:ring-2 focus:ring-[#DA7A31]/25 transition-all leading-relaxed shadow-inner"
                                            placeholder="Detail your technology requirements, expected user scale, cloud preferences, or academic MOU scope..."
                                        />
                                        {errors.message && (
                                            <p className="text-xs text-red-400 mt-1">{errors.message}</p>
                                        )}
                                    </div>

                                    {/* Submit Action & SSL Trust Badge */}
                                    <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="text-xs text-gray-400 flex items-center gap-2">
                                            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                                            <span>256-Bit SSL Encrypted & Mutual NDA Protected</span>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            id="submit-contact-form-btn"
                                            className="lmc-btn lmc-btn-primary group px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide justify-center shadow-lg shadow-[#DA7A31]/20 transition-all hover:scale-[1.02]"
                                        >
                                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            <span>{processing ? 'Dispatching Message...' : 'Send Message'}</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Interactive Location Map & Security Cards (5 Columns) */}
                        <div className="lg:col-span-5 space-y-6">
                            {/* Visual Interactive Map Card */}
                            <div className="lmc-dark-card rounded-3xl p-6 border border-white/15 relative overflow-hidden group reveal-on-scroll delay-100">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-[#DA7A31]/10 border border-[#DA7A31]/20 text-[#DA7A31] flex items-center justify-center">
                                            <Compass className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-white">Global Headquarters Map</h3>
                                            <p className="text-[11px] text-gray-400">World Trade Center, Colombo 01</p>
                                        </div>
                                    </div>
                                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                                        <span>HQ Open Now</span>
                                    </span>
                                </div>

                                {/* Dark Themed Vector Map Box */}
                                <div className="relative h-64 rounded-2xl bg-[#030914] border border-white/10 overflow-hidden group-hover:border-[#DA7A31]/40 transition-colors flex items-center justify-center">
                                    {/* Grid Lines Overlay */}
                                    <div className="absolute inset-0 bg-[radial-gradient(#1E3A5F_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

                                    {/* Animated Radar Pulse circles */}
                                    <div className="absolute w-32 h-32 rounded-full border border-[#DA7A31]/20 animate-ping" />
                                    <div className="absolute w-48 h-48 rounded-full border border-blue-500/15" />

                                    {/* Center Location Pin Badge */}
                                    <div className="relative z-10 text-center p-4 bg-[#0B1C30]/90 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl max-w-xs">
                                        <div className="w-10 h-10 rounded-full bg-[#DA7A31] text-white flex items-center justify-center mx-auto mb-2 shadow-lg shadow-[#DA7A31]/50 animate-bounce">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div className="text-xs font-extrabold text-white">LMC Global Technologies HQ</div>
                                        <div className="text-[10px] text-gray-300 mt-0.5">Level 18, West Tower, WTC Colombo 01</div>
                                        <div className="text-[9px] text-[#DA7A31] font-semibold mt-1">Sri Lanka Technology Hub</div>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center justify-between pt-4 border-t border-white/10">
                                    <div className="text-xs text-gray-400">Echelon Square, Commercial District</div>
                                    <a
                                        href="https://maps.google.com/?q=World+Trade+Center+Colombo+Sri+Lanka"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="lmc-btn lmc-btn-secondary text-xs px-3.5 py-2 inline-flex items-center gap-1.5"
                                    >
                                        <span>Open in Google Maps</span>
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                </div>
                            </div>

                            {/* Mutual NDA & Confidentiality Card */}
                            <div className="lmc-dark-card rounded-3xl p-6 border border-white/15 reveal-on-scroll delay-200">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">Mutual NDA Protection</h4>
                                        <p className="text-xs text-gray-300 leading-relaxed mt-1">
                                            All technical consultations, database schemas, and proprietary IP disclosed during initial discussions are bound under standard non-disclosure confidentiality.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Response SLA Guarantee Card */}
                            <div className="lmc-dark-card rounded-3xl p-6 border border-white/15 reveal-on-scroll delay-300">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                                        <Zap className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">2-Hour SLA Response Commitment</h4>
                                        <p className="text-xs text-gray-300 leading-relaxed mt-1">
                                            Enterprise leads and technical inquiries receive direct review from dedicated solution architects within 120 minutes during operational hours.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
