import LmcBrandLogo from '@/Components/LmcBrandLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import { ShieldCheck, ArrowLeft, Lock } from 'lucide-react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#071220] p-4 sm:p-6 selection:bg-[#DA7A31] selection:text-white relative overflow-hidden">
            {/* Ambient Background Radial Lighting */}
            <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-[#DA7A31]/15 blur-3xl pointer-events-none animate-lmc-float" />
            <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-blue-600/15 blur-3xl pointer-events-none animate-lmc-float delay-300" />
            <div className="absolute inset-0 bg-[linear-[#1E3A5F]/10_1px,transparent_1px)] bg-[size:32px_32px] opacity-20 pointer-events-none" />

            {/* Header Branding */}
            <div className="mb-6 text-center z-10 animate-page-enter">
                <LmcBrandLogo variant="light" size="lg" href="/" />
                <div className="mt-3 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-[#DA7A31] animate-pulse" />
                    <span>Identity & Corporate Access Management</span>
                </div>
            </div>

            {/* Main Dark Glass Card */}
            <div className="w-full max-w-md sm:max-w-lg bg-[#0B1C30]/90 backdrop-blur-xl rounded-3xl border border-white/15 shadow-2xl shadow-black/80 relative overflow-hidden p-6 sm:p-10 z-10 animate-modal-enter">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#DA7A31] to-transparent" />
                {children}
            </div>

            {/* Footer Trust Links */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-gray-400 z-10 animate-page-enter">
                <Link href="/" className="hover:text-white transition-colors flex items-center gap-1.5 font-medium">
                    <ArrowLeft className="w-3.5 h-3.5 text-[#DA7A31]" />
                    <span>Back to Corporate Website</span>
                </Link>
                <span className="text-gray-600 hidden sm:inline">&bull;</span>
                <span className="flex items-center gap-1.5 font-medium text-gray-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>256-Bit SSL Encrypted Session</span>
                </span>
            </div>
        </div>
    );
}
