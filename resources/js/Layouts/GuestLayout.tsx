import LmcBrandLogo from '@/Components/LmcBrandLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#0B1C30] p-4 sm:p-6 selection:bg-[#DA7A31] selection:text-white relative overflow-hidden">
            {/* Ambient lighting accents */}
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#DA7A31]/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

            <div className="mb-6 text-center z-10">
                <LmcBrandLogo variant="light" size="lg" href="/" />
                <div className="text-xs text-gray-400 mt-2 tracking-wide font-medium">
                    Corporate Access & Identity Management
                </div>
            </div>

            <div className="w-full max-w-md bg-white rounded-lg shadow-2xl border-t-4 border-[#DA7A31] p-8 z-10">
                {children}
            </div>

            <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-400 z-10">
                <Link href="/" className="hover:text-white transition flex items-center gap-1">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Corporate Website</span>
                </Link>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#DA7A31]" />
                    <span>Zero-Trust Secured Session</span>
                </span>
            </div>
        </div>
    );
}
