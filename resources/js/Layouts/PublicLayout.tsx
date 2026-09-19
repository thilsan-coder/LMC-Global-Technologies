import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import LmcBrandLogo from '@/Components/LmcBrandLogo';
import { Toaster, toast } from 'sonner';
import {
    Menu,
    X,
    Phone,
    Mail,
    ShieldCheck,
    CheckCircle2,
    Lock,
    ArrowRight,
    ExternalLink,
    ChevronDown,
} from 'lucide-react';

interface PublicLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function PublicLayout({ children, title }: PublicLayoutProps) {
    const { auth, flash, url } = usePage<PageProps>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [verificationDropdown, setVerificationDropdown] = useState(false);

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const navLinks = [
        { name: 'Home', href: route('public.home'), active: route().current('public.home') },
        { name: 'About Us', href: route('public.about'), active: route().current('public.about') },
        { name: 'Services', href: route('public.services'), active: route().current('public.services') },
        { name: 'Products', href: route('public.products'), active: route().current('public.products') },
        { name: 'Reviews', href: route('public.reviews'), active: route().current('public.reviews') },
        { name: 'Internship', href: route('public.internship'), active: route().current('public.internship') },
        { name: 'Contact', href: route('public.contact'), active: route().current('public.contact') },
    ];

    const isVerificationActive =
        route().current('public.verify-internship') || route().current('public.verify-attendance');

    return (
        <div className="min-h-screen flex flex-col bg-[#F0F0F1] text-[#4D4B55] selection:bg-[#DA7A31] selection:text-white">
            <Toaster position="top-right" richColors />

            {/* Top Corporate Strip */}
            <div className="bg-[#071220] text-gray-300 text-xs py-2 px-4 border-b border-white/5">
                <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
                    <div className="flex items-center space-x-6 text-[11px]">
                        <span className="flex items-center gap-1.5 text-gray-400">
                            <Phone className="w-3.5 h-3.5 text-[#DA7A31]" />
                            <span>+94 11 234 5678</span>
                        </span>
                        <span className="hidden sm:flex items-center gap-1.5 text-gray-400">
                            <Mail className="w-3.5 h-3.5 text-[#DA7A31]" />
                            <span>contact@lmcglobal.tech</span>
                        </span>
                        <span className="hidden md:inline-block text-[#DA7A31] font-medium tracking-wide">
                            "Technology Beyond Boundaries"
                        </span>
                    </div>

                    <div className="flex items-center space-x-4 text-[11px]">
                        <Link
                            href={route('public.verify-internship')}
                            className="text-gray-300 hover:text-white transition flex items-center gap-1"
                        >
                            <ShieldCheck className="w-3.5 h-3.5 text-[#DA7A31]" />
                            <span className="hidden sm:inline">Verify Credential</span>
                        </Link>
                        <span className="text-gray-600">|</span>
                        {auth?.user ? (
                            <Link
                                href={route('dashboard')}
                                className="text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1"
                            >
                                <span>Portal Dashboard ({auth.user.name.split(' ')[0]})</span>
                                <ArrowRight className="w-3 h-3" />
                            </Link>
                        ) : (
                            <Link
                                href={route('login')}
                                className="text-gray-300 hover:text-white transition flex items-center gap-1"
                            >
                                <Lock className="w-3 h-3 text-[#DA7A31]" />
                                <span>Employee / Student Login</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Sticky Main Navigation */}
            <header className="sticky top-0 z-50 bg-[#0B1C30]/95 backdrop-blur-md border-b border-white/10 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <LmcBrandLogo variant="light" size="md" href={route('public.home')} />
                        </div>

                        {/* Desktop Navigation Links */}
                        <nav className="hidden lg:flex items-center space-x-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors ${
                                        link.active
                                            ? 'text-white bg-[#132842] shadow-sm font-semibold'
                                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {/* Verification Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setVerificationDropdown(!verificationDropdown)}
                                    onBlur={() => setTimeout(() => setVerificationDropdown(false), 200)}
                                    className={`px-3.5 py-2 text-sm font-medium rounded-md flex items-center gap-1 transition-colors ${
                                        isVerificationActive
                                            ? 'text-[#DA7A31] bg-[#132842] font-semibold'
                                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    <span>Verification</span>
                                    <ChevronDown className="w-3.5 h-3.5" />
                                </button>

                                {verificationDropdown && (
                                    <div className="absolute right-0 mt-2 w-56 rounded-md shadow-xl bg-[#0B1C30] border border-white/10 py-1.5 z-50 animate-in fade-in slide-in-from-top-1">
                                        <Link
                                            href={route('public.verify-internship')}
                                            className="flex items-center gap-2 px-4 py-2.5 text-xs text-gray-200 hover:bg-[#DA7A31] hover:text-white transition"
                                        >
                                            <ShieldCheck className="w-4 h-4 text-[#DA7A31] group-hover:text-white" />
                                            <div>
                                                <div className="font-semibold">Verify Internship</div>
                                                <div className="text-[10px] text-gray-400">Validate student credentials</div>
                                            </div>
                                        </Link>
                                        <Link
                                            href={route('public.verify-attendance')}
                                            className="flex items-center gap-2 px-4 py-2.5 text-xs text-gray-200 hover:bg-[#DA7A31] hover:text-white transition"
                                        >
                                            <CheckCircle2 className="w-4 h-4 text-[#DA7A31]" />
                                            <div>
                                                <div className="font-semibold">Verify Attendance</div>
                                                <div className="text-[10px] text-gray-400">Institutional record lookup</div>
                                            </div>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </nav>

                        {/* CTA Button Desktop */}
                        <div className="hidden lg:flex items-center space-x-3">
                            {auth?.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center gap-2 bg-[#DA7A31] hover:bg-[#C2631D] text-white text-sm font-semibold px-4 py-2.5 rounded shadow transition duration-150"
                                >
                                    <span>Portal Access</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            ) : (
                                <Link
                                    href={route('public.contact')}
                                    className="inline-flex items-center gap-2 bg-[#DA7A31] hover:bg-[#C2631D] text-white text-sm font-semibold px-4 py-2.5 rounded shadow transition duration-150"
                                >
                                    <span>Get In Touch</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex lg:hidden items-center">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none"
                                aria-label="Toggle menu"
                            >
                                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Drawer Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden bg-[#071220] border-b border-white/10 px-4 pt-2 pb-6 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block px-3 py-2.5 rounded-md text-base font-medium ${
                                    link.active
                                        ? 'bg-[#132842] text-white font-semibold'
                                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-2 border-t border-white/10">
                            <div className="px-3 py-1 text-xs font-semibold text-[#DA7A31] uppercase tracking-wider">
                                Verification Services
                            </div>
                            <Link
                                href={route('public.verify-internship')}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-2 text-sm text-gray-300 hover:bg-white/5 rounded-md"
                            >
                                Verify Internship ID
                            </Link>
                            <Link
                                href={route('public.verify-attendance')}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-2 text-sm text-gray-300 hover:bg-white/5 rounded-md"
                            >
                                Verify Attendance Metric
                            </Link>
                        </div>

                        <div className="pt-4">
                            {auth?.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="w-full text-center block bg-[#DA7A31] text-white font-semibold py-2.5 rounded shadow"
                                >
                                    Open Portal ({auth.user.name})
                                </Link>
                            ) : (
                                <Link
                                    href={route('login')}
                                    className="w-full text-center block bg-[#DA7A31] text-white font-semibold py-2.5 rounded shadow"
                                >
                                    Portal Login
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content Area */}
            <main className="flex-grow">{children}</main>

            {/* Enterprise Footer */}
            <footer className="bg-[#0B1C30] text-gray-300 border-t-4 border-[#DA7A31]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
                        {/* Company Identity */}
                        <div className="lg:col-span-2 space-y-4">
                            <LmcBrandLogo variant="light" size="lg" />
                            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mt-3">
                                LMC Global Technologies (Pvt) Ltd is a premier enterprise technology firm providing
                                world-class software engineering, cloud architecture, cybersecurity defense, and
                                certified industrial talent immersion.
                            </p>
                            <div className="pt-2 text-xs text-gray-400 space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-white">Registered Office:</span>
                                    <span>Colombo 03, Sri Lanka</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-white">Hotline:</span>
                                    <span>+94 11 234 5678</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-white">Email:</span>
                                    <span className="text-[#DA7A31]">contact@lmcglobal.tech</span>
                                </div>
                            </div>
                        </div>

                        {/* Solutions & Services */}
                        <div className="space-y-3">
                            <h3 className="text-white text-sm font-semibold tracking-wider uppercase border-b border-white/10 pb-2">
                                Solutions
                            </h3>
                            <ul className="space-y-2 text-xs text-gray-400">
                                <li>
                                    <Link href={route('public.services')} className="hover:text-white transition">
                                        Web Application Engineering
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('public.services')} className="hover:text-white transition">
                                        Mobile Solutions
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('public.services')} className="hover:text-white transition">
                                        Cloud Services & DevOps
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('public.services')} className="hover:text-white transition">
                                        Cybersecurity & Compliance
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('public.services')} className="hover:text-white transition">
                                        IT Consulting
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Enterprise Platforms */}
                        <div className="space-y-3">
                            <h3 className="text-white text-sm font-semibold tracking-wider uppercase border-b border-white/10 pb-2">
                                Systems & Demos
                            </h3>
                            <ul className="space-y-2 text-xs text-gray-400">
                                <li>
                                    <Link href={route('public.products')} className="hover:text-white transition">
                                        LMC CRM System
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('public.products')} className="hover:text-white transition">
                                        LMC HR & Payroll Hub
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('public.products')} className="hover:text-white transition">
                                        LMC Point of Sale (POS)
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('public.products')} className="hover:text-white transition">
                                        LMC Hospital Management
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('public.products')} className="hover:text-white transition">
                                        LMC Inventory Engine
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Verification & Trust */}
                        <div className="space-y-3">
                            <h3 className="text-white text-sm font-semibold tracking-wider uppercase border-b border-white/10 pb-2">
                                Credential Verification
                            </h3>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Instantly validate industrial training transcripts and attendance performance records
                                issued by LMC Global Technologies.
                            </p>
                            <div className="space-y-2 pt-1">
                                <Link
                                    href={route('public.verify-internship')}
                                    className="flex items-center gap-1.5 text-xs text-[#DA7A31] hover:text-orange-300 font-medium"
                                >
                                    <ShieldCheck className="w-4 h-4" />
                                    <span>Verify Internship Certificate</span>
                                </Link>
                                <Link
                                    href={route('public.verify-attendance')}
                                    className="flex items-center gap-1.5 text-xs text-[#DA7A31] hover:text-orange-300 font-medium"
                                >
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span>Verify Attendance Record</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Disclaimer */}
                    <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                        <div>
                            &copy; {new Date().getFullYear()} LMC Global Technologies (Pvt) Ltd. All rights reserved.
                        </div>
                        <div className="text-[#DA7A31] font-medium">"Technology Beyond Boundaries"</div>
                        <div className="flex space-x-6 text-gray-400">
                            <Link href={route('public.about')} className="hover:text-white">
                                Privacy Policy
                            </Link>
                            <Link href={route('public.about')} className="hover:text-white">
                                Terms of Service
                            </Link>
                            <Link href={route('login')} className="hover:text-white">
                                Staff Login
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
