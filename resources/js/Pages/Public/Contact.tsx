import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import PublicLayout from '@/layouts/PublicLayout';
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    ShieldCheck,
    MessageSquare,
    CheckCircle2,
} from 'lucide-react';

export default function Contact() {
    const { data, setData, post, processing, reset, errors, recentlySuccessful } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('public.contact.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <PublicLayout>
            <Head title="Contact Us - Enterprise Consultation" />

            {/* Header */}
            <div className="bg-[#0B1C30] text-white py-20 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DA7A31] uppercase tracking-widest mb-3">
                            <span>Get In Touch</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                            Initiate Architectural Dialogue
                        </h1>
                        <p className="mt-4 text-base sm:text-lg text-gray-300 leading-relaxed">
                            Have an enterprise software inquiry, platform demo request, or industrial internship MOU
                            discussion? Connect directly with our engineering team.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <section className="py-20 bg-[#F0F0F1]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Corporate Contact Cards */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-xs">
                                <div className="w-10 h-10 rounded bg-[#0B1C30]/5 text-[#DA7A31] flex items-center justify-center mb-4">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <h3 className="text-base font-bold text-[#0B1C30] mb-1">Corporate Headquarters</h3>
                                <p className="text-xs text-[#4D4B55] leading-relaxed">
                                    LMC Global Technologies (Pvt) Ltd<br />
                                    Level 14, Commercial Tower, Galle Road<br />
                                    Colombo 03, Sri Lanka
                                </p>
                            </div>

                            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-xs">
                                <div className="w-10 h-10 rounded bg-[#0B1C30]/5 text-[#DA7A31] flex items-center justify-center mb-4">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <h3 className="text-base font-bold text-[#0B1C30] mb-1">Direct Lines</h3>
                                <p className="text-xs text-[#4D4B55] leading-relaxed">
                                    General Switchboard: +94 11 234 5678<br />
                                    Enterprise SLA Hotline: +94 77 123 4567<br />
                                    Talent Accelerator: +94 11 234 5679
                                </p>
                            </div>

                            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-xs">
                                <div className="w-10 h-10 rounded bg-[#0B1C30]/5 text-[#DA7A31] flex items-center justify-center mb-4">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <h3 className="text-base font-bold text-[#0B1C30] mb-1">Electronic Enquiries</h3>
                                <p className="text-xs text-[#4D4B55] leading-relaxed">
                                    General: contact@lmcglobal.tech<br />
                                    Security & Audits: security@lmcglobal.tech<br />
                                    Careers / Interns: talent@lmcglobal.tech
                                </p>
                            </div>

                            <div className="bg-[#0B1C30] text-white rounded-lg p-6 shadow-xs border-l-4 border-[#DA7A31]">
                                <div className="text-xs font-bold text-[#DA7A31] uppercase tracking-wider mb-2">
                                    Confidentiality Guarantee
                                </div>
                                <p className="text-xs text-gray-300 leading-relaxed">
                                    All technical consultations and architectural specifications shared with LMC are
                                    strictly protected under standard corporate mutual non-disclosure (NDA) protocols.
                                </p>
                            </div>
                        </div>

                        {/* Interactive Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg p-8 sm:p-10 border border-gray-200 shadow-xs">
                                <h2 className="text-2xl font-bold text-[#0B1C30] mb-2">Send Corporate Message</h2>
                                <p className="text-xs text-[#4D4B55] mb-8">
                                    Our solution architects review and respond to incoming requests within one business day.
                                </p>

                                {recentlySuccessful && (
                                    <div className="mb-6 bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded text-xs flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                        <span>Your message has been dispatched successfully! Our team will contact you.</span>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-xs font-semibold text-[#0B1C30] mb-1.5">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                required
                                                className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31] py-2.5"
                                                placeholder="e.g. Asoka Weerasinghe"
                                            />
                                            {errors.name && (
                                                <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-[#0B1C30] mb-1.5">
                                                Corporate Email *
                                            </label>
                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                required
                                                className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31] py-2.5"
                                                placeholder="asoka@organization.com"
                                            />
                                            {errors.email && (
                                                <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-xs font-semibold text-[#0B1C30] mb-1.5">
                                                Contact Phone
                                            </label>
                                            <input
                                                type="text"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31] py-2.5"
                                                placeholder="+94 77 000 0000"
                                            />
                                            {errors.phone && (
                                                <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-[#0B1C30] mb-1.5">
                                                Subject *
                                            </label>
                                            <input
                                                type="text"
                                                value={data.subject}
                                                onChange={(e) => setData('subject', e.target.value)}
                                                required
                                                className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31] py-2.5"
                                                placeholder="e.g. Enterprise Cloud ERP Consultation"
                                            />
                                            {errors.subject && (
                                                <p className="text-[11px] text-red-600 mt-1">{errors.subject}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-[#0B1C30] mb-1.5">
                                            Detailed Message / Requirements *
                                        </label>
                                        <textarea
                                            rows={5}
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            required
                                            className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                            placeholder="Detail your engineering challenges, expected timeline, user load, or academic requirements..."
                                        />
                                        {errors.message && (
                                            <p className="text-[11px] text-red-600 mt-1">{errors.message}</p>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between pt-2">
                                        <div className="text-[11px] text-gray-500 flex items-center gap-1">
                                            <ShieldCheck className="w-3.5 h-3.5 text-[#DA7A31]" />
                                            <span>Protected under corporate SSL encryption</span>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="bg-[#DA7A31] hover:bg-[#C2631D] text-white font-bold text-xs sm:text-sm px-8 py-3 rounded shadow transition flex items-center gap-2"
                                        >
                                            <Send className="w-4 h-4" />
                                            <span>{processing ? 'Dispatching...' : 'Send Message'}</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
