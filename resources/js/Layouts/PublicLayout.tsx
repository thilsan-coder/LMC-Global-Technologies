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

    // Scroll reveal observer that activates on page load and route changes
    useEffect(() => {
        const observerCallback: IntersectionObserverCallback = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, {
            root: null,
            rootMargin: '0px 0px -30px 0px',
            threshold: 0.05,
        });

        // Small timeout ensures all nested DOM nodes have mounted
        const timer = setTimeout(() => {
            const elements = document.querySelectorAll('.reveal-on-scroll, .reveal-scale');
            elements.forEach((el) => observer.observe(el));
        }, 50);

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, [url, children]);

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
        <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-[#071220] text-gray-300 antialiased selection:bg-[#DA7A31] selection:text-white">
            <Toaster position="top-right" richColors />

            {/* Sticky Main Navigation */}
            <header className="sticky top-0 z-50 bg-[#071220]/90 backdrop-blur-xl border-b border-white/10 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <LmcBrandLogo variant="light" size="md" href={route('public.home')} />
                        </div>

                        {/* Desktop Navigation Links */}
                        <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`px-2.5 xl:px-3.5 py-2 text-xs xl:text-sm font-medium rounded-md transition-all duration-200 ${
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
                                    className={`px-2.5 xl:px-3.5 py-2 text-xs xl:text-sm font-medium rounded-md flex items-center gap-1 transition-all duration-200 ${
                                        isVerificationActive
                                            ? 'text-[#DA7A31] bg-[#132842] font-semibold'
                                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    <span>Verification</span>
                                    <ChevronDown className="w-3.5 h-3.5" />
                                </button>

                                {verificationDropdown && (
                                    <div className="absolute right-0 mt-2 w-60 rounded-xl shadow-2xl bg-[#0E223D] border border-white/10 py-2 z-50 animate-dropdown-enter backdrop-blur-xl">
                                        <Link
                                            href={route('public.verify-internship')}
                                            className="flex items-center gap-3 px-4 py-3 text-xs text-gray-200 hover:bg-[#DA7A31] hover:text-white transition-all rounded-lg mx-1.5"
                                        >
                                            <div className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                                                <ShieldCheck className="w-4 h-4 text-[#DA7A31] group-hover:text-white" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-white">Verify Internship</div>
                                                <div className="text-[10px] text-gray-400">Validate student credentials</div>
                                            </div>
                                        </Link>
                                        <Link
                                            href={route('public.verify-attendance')}
                                            className="flex items-center gap-3 px-4 py-3 text-xs text-gray-200 hover:bg-[#DA7A31] hover:text-white transition-all rounded-lg mx-1.5 mt-0.5"
                                        >
                                            <div className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                                                <CheckCircle2 className="w-4 h-4 text-[#DA7A31]" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-white">Verify Attendance</div>
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
                                    className="lmc-btn lmc-btn-primary"
                                >
                                    <span>Portal Access</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            ) : (
                                <Link
                                    href={route('login')}
                                    className="lmc-btn lmc-btn-primary"
                                >
                                    <Lock className="w-4 h-4" />
                                    <span>Login</span>
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
                    <div className="lg:hidden bg-[#071220] border-b border-white/10 px-4 pt-2 pb-6 space-y-1 animate-dropdown-enter">
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
                                    className="lmc-btn lmc-btn-primary w-full justify-center text-center"
                                >
                                    Open Portal ({auth.user.name})
                                </Link>
                            ) : (
                                <Link
                                    href={route('login')}
                                    className="lmc-btn lmc-btn-primary w-full justify-center text-center"
                                >
                                    <Lock className="w-4 h-4" />
                                    <span>Portal Login</span>
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content Area with Smooth Page Entrance Transition */}
            <main key={url} className="flex-grow animate-page-enter">{children}</main>

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
