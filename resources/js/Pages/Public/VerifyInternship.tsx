import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import {
    ShieldCheck,
    XCircle,
    CheckCircle2,
    Search,
    Download,
    FileText,
    Calendar,
    GraduationCap,
    Building2,
    Award,
    ArrowRight,
} from 'lucide-react';

interface VerifyInternshipProps {
    searched: boolean;
    query: string;
    intern: {
        intern_id: string;
        name: string;
        university: string;
        course: string;
        department: string;
        period: string;
        status: string;
        verification_status: string;
        verification_code: string;
        attendance_percentage?: number;
        performance_score?: number;
    } | null;
}

export default function VerifyInternship({ searched, query: initialQuery, intern }: VerifyInternshipProps) {
    const [searchTerm, setSearchTerm] = useState(initialQuery || '');
    const [loading, setLoading] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;

        setLoading(true);
        router.get(
            route('public.verify-internship'),
            { query: searchTerm.trim() },
            {
                preserveState: true,
                onFinish: () => setLoading(false),
            }
        );
    };

    return (
        <PublicLayout>
            <Head title="Verify Internship Credential - LMC Digital Registry" />

            {/* Header */}
            <div className="bg-[#0B1C30] text-white py-16 border-b border-white/10 relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 reveal-on-scroll">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DA7A31] uppercase tracking-widest mb-3">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Public Credential Verification</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                        Verify Internship Credential
                    </h1>
                    <p className="mt-3 text-xs sm:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
                        Verify industrial training certificates and academic completion records issued by LMC Global
                        Technologies (Pvt) Ltd.
                    </p>

                    {/* Search Input Box */}
                    <form onSubmit={handleSearch} className="mt-8 max-w-xl mx-auto">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1">
                                <div className="pointer-events-none absolute inset-y-0 left-0 pl-4 flex items-center">
                                    <Search className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    id="internship-search-input"
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Enter Internship ID (e.g. LMC-INT-2026-001)"
                                    className="lmc-search-input w-full pl-12 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-gray-400 bg-[#071220] border border-white/20 focus:border-[#DA7A31] focus:ring-2 focus:ring-[#DA7A31]/20 shadow-md transition-colors"
                                    style={{ paddingLeft: '3.25rem' }}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="lmc-btn lmc-btn-primary w-full sm:w-auto justify-center whitespace-nowrap py-3.5"
                            >
                                {loading ? 'Checking...' : 'Verify Now'}
                            </button>
                        </div>
                        <div className="text-[11px] text-gray-400 mt-2.5 text-left sm:text-center">
                            Demo try: <span className="text-[#DA7A31] font-mono font-bold cursor-pointer hover:underline" onClick={() => setSearchTerm('LMC-INT-2026-001')}>LMC-INT-2026-001</span> or <span className="text-[#DA7A31] font-mono font-bold cursor-pointer hover:underline" onClick={() => setSearchTerm('LMC-INT-2026-002')}>LMC-INT-2026-002</span>
                        </div>
                    </form>
                </div>
            </div>

            {/* Results Section */}
            <div className="py-16 bg-[#071220] min-h-[450px] border-b border-white/10">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {!searched && (
                        <div className="lmc-dark-card rounded-2xl p-10 text-center reveal-on-scroll">
                            <ShieldCheck className="w-12 h-12 text-[#DA7A31] mx-auto mb-4" />
                            <h2 className="text-lg font-bold text-white mb-2">
                                Instant Institutional Validation
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
                                Enter the Internship ID printed on the candidate's certificate or verification letter to
                                validate authenticity against our secure digital registry.
                            </p>
                        </div>
                    )}

                    {searched && intern && (
                        <div className="lmc-dark-card rounded-2xl border-2 border-emerald-500/60 shadow-xl overflow-hidden animate-modal-enter">
                            {/* Success Status Header */}
                            <div className="bg-emerald-600/90 text-white px-6 py-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                                        <CheckCircle2 className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-sm sm:text-base font-extrabold tracking-wide uppercase">
                                            ✓ VERIFIED INTERNSHIP
                                        </div>
                                        <div className="text-xs text-emerald-100">
                                            Official record identified in LMC Verification Database
                                        </div>
                                    </div>
                                </div>
                                <span className="bg-white text-emerald-800 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                                    STATUS: {intern.verification_status}
                                </span>
                            </div>

                            {/* Candidate Details (Strictly Safe Public Information Only) */}
                            <div className="p-6 sm:p-8 space-y-6 text-white">
                                <div className="border-b border-white/10 pb-5">
                                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                                        Intern Name
                                    </div>
                                    <div className="text-2xl font-extrabold text-white">
                                        {intern.name}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                                    <div>
                                        <span className="font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                                            University / Institution
                                        </span>
                                        <div className="text-sm font-bold text-white flex items-center gap-1.5">
                                            <Building2 className="w-4 h-4 text-[#DA7A31]" />
                                            <span>{intern.university}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <span className="font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                                            Degree Course
                                        </span>
                                        <div className="text-sm font-bold text-white flex items-center gap-1.5">
                                            <GraduationCap className="w-4 h-4 text-[#DA7A31]" />
                                            <span>{intern.course}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <span className="font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                                            Assigned Department
                                        </span>
                                        <div className="text-sm font-bold text-white">
                                            {intern.department}
                                        </div>
                                    </div>

                                    <div>
                                        <span className="font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                                            Internship Period
                                        </span>
                                        <div className="text-sm font-bold text-white flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4 text-[#DA7A31]" />
                                            <span>{intern.period}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <span className="font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                                            Internship Status
                                        </span>
                                        <div className="text-sm font-bold text-[#DA7A31]">
                                            {intern.status}
                                        </div>
                                    </div>

                                    <div>
                                        <span className="font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                                            Cryptographic Hash
                                        </span>
                                        <div className="font-mono text-xs font-semibold text-gray-300 break-all select-all">
                                            {intern.verification_code}
                                        </div>
                                    </div>
                                </div>

                                {/* Download Certificate Action */}
                                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div className="text-xs text-gray-400 text-center sm:text-left">
                                        Direct PDF document generation with official corporate seal.
                                    </div>
                                    <a
                                        href={route('public.certificate.download', { code: intern.verification_code })}
                                        target="_blank"
                                        className="lmc-btn lmc-btn-primary w-full sm:w-auto justify-center"
                                    >
                                        <Download className="w-4 h-4" />
                                        <span>Download Official Certificate (PDF)</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}

                    {searched && !intern && (
                        <div className="lmc-dark-card rounded-2xl border-2 border-red-500/50 p-8 text-center animate-lmc-fade-in">
                            <div className="w-12 h-12 rounded-full bg-red-500/15 text-red-400 flex items-center justify-center mx-auto mb-4">
                                <XCircle className="w-7 h-7" />
                            </div>
                            <h2 className="text-lg font-extrabold text-red-400 uppercase tracking-wide mb-2">
                                ✕ VERIFICATION RECORD NOT FOUND
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed mb-6">
                                No internship record matches the provided identifier "{searchTerm}". Please double-check
                                the ID formatting or contact LMC verification administration.
                            </p>
                            <Link
                                href={route('public.contact')}
                                className="text-xs font-semibold text-[#DA7A31] hover:underline inline-flex items-center gap-1"
                            >
                                <span>Contact Verification Support</span>
                                <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
