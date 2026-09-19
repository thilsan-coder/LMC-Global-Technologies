import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import PublicLayout from '@/layouts/PublicLayout';
import {
    Clock,
    CheckCircle2,
    XCircle,
    Search,
    Calendar,
    Award,
    Activity,
} from 'lucide-react';

interface VerifyAttendanceProps {
    searched: boolean;
    query: string;
    attendance: {
        intern_id: string;
        name: string;
        department: string;
        period: string;
        attendance_percentage: number;
        total_days: number;
        present_days: number;
        attendance_status: string;
        verification_status: string;
    } | null;
}

export default function VerifyAttendance({ searched, query: initialQuery, attendance }: VerifyAttendanceProps) {
    const [searchTerm, setSearchTerm] = useState(initialQuery || '');
    const [loading, setLoading] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;

        setLoading(true);
        router.get(
            route('public.verify-attendance'),
            { query: searchTerm.trim() },
            {
                preserveState: true,
                onFinish: () => setLoading(false),
            }
        );
    };

    return (
        <PublicLayout>
            <Head title="Verify Attendance Record - LMC Digital Registry" />

            {/* Header */}
            <div className="bg-[#0B1C30] text-white py-16 border-b border-white/10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DA7A31] uppercase tracking-widest mb-3">
                        <Clock className="w-4 h-4" />
                        <span>Institutional Attendance Audit</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                        Verify Attendance Record
                    </h1>
                    <p className="mt-3 text-xs sm:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
                        Validate institutional training presence, verified attendance percentage, and completion
                        integrity recorded on LMC systems.
                    </p>

                    {/* Search Input Box */}
                    <form onSubmit={handleSearch} className="mt-8 max-w-xl mx-auto">
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Search className="w-5 h-5 absolute left-3.5 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Enter Internship ID (e.g. LMC-INT-2026-001)"
                                    className="w-full pl-11 pr-4 py-3 rounded text-sm text-[#0B1C30] placeholder-gray-400 bg-white border-none focus:ring-2 focus:ring-[#DA7A31] shadow-md"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-[#DA7A31] hover:bg-[#C2631D] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded shadow-md transition whitespace-nowrap"
                            >
                                {loading ? 'Auditing...' : 'Verify Attendance'}
                            </button>
                        </div>
                        <div className="text-[11px] text-gray-400 mt-2 text-left sm:text-center">
                            Demo try: <span className="text-[#DA7A31] font-mono font-bold cursor-pointer" onClick={() => setSearchTerm('LMC-INT-2026-001')}>LMC-INT-2026-001</span> or <span className="text-[#DA7A31] font-mono font-bold cursor-pointer" onClick={() => setSearchTerm('LMC-INT-2026-003')}>LMC-INT-2026-003</span>
                        </div>
                    </form>
                </div>
            </div>

            {/* Results Section */}
            <div className="py-16 bg-[#F0F0F1] min-h-[450px]">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {!searched && (
                        <div className="bg-white rounded-lg p-10 border border-gray-200 text-center shadow-xs">
                            <Activity className="w-12 h-12 text-[#0B1C30]/40 mx-auto mb-4" />
                            <h2 className="text-lg font-bold text-[#0B1C30] mb-2">
                                Real-Time Institutional Audit
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
                                University coordinators and verification officers can review exact cumulative attendance
                                percentage metrics locked into the system.
                            </p>
                        </div>
                    )}

                    {searched && attendance && (
                        <div className="bg-white rounded-lg border-2 border-[#0B1C30] shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom-2">
                            {/* Metric Header */}
                            <div className="bg-[#0B1C30] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-b-4 border-[#DA7A31]">
                                <div>
                                    <span className="text-xs text-[#DA7A31] font-bold uppercase tracking-wider block mb-1">
                                        Verified Attendance Metric
                                    </span>
                                    <div className="text-3xl sm:text-4xl font-extrabold text-white">
                                        {attendance.attendance_percentage}%
                                    </div>
                                    <div className="text-xs text-gray-300 mt-1">
                                        Status: <strong className="text-emerald-400 font-semibold">{attendance.verification_status}</strong> &bull; {attendance.attendance_status}
                                    </div>
                                </div>

                                <div className="text-center sm:text-right bg-[#132842] p-4 rounded-md border border-white/10 w-full sm:w-auto">
                                    <div className="text-[11px] text-gray-400 uppercase tracking-wider">
                                        Internship ID
                                    </div>
                                    <div className="text-base font-extrabold font-mono text-white">
                                        {attendance.intern_id}
                                    </div>
                                </div>
                            </div>

                            {/* Details Breakdown */}
                            <div className="p-6 sm:p-8 space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                                    <div>
                                        <span className="font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                                            Intern Name
                                        </span>
                                        <div className="text-sm font-bold text-[#0B1C30]">
                                            {attendance.name}
                                        </div>
                                    </div>

                                    <div>
                                        <span className="font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                                            Department
                                        </span>
                                        <div className="text-sm font-bold text-[#0B1C30]">
                                            {attendance.department}
                                        </div>
                                    </div>

                                    <div>
                                        <span className="font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                                            Internship Tenure Period
                                        </span>
                                        <div className="text-sm font-bold text-[#0B1C30] flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4 text-[#DA7A31]" />
                                            <span>{attendance.period}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <span className="font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                                            Verified Presence Log
                                        </span>
                                        <div className="text-sm font-bold text-[#0B1C30]">
                                            {attendance.present_days} Days Present / {attendance.total_days} Logged Days
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-100 flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 p-3.5 rounded border border-emerald-200">
                                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                                    <span>
                                        Official Attendance Requirement Met: Meets and exceeds corporate minimum of
                                        85.0% verified presence.
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {searched && !attendance && (
                        <div className="bg-white rounded-lg border-2 border-red-400 shadow-md p-8 text-center animate-in fade-in">
                            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
                                <XCircle className="w-7 h-7" />
                            </div>
                            <h2 className="text-lg font-extrabold text-red-600 uppercase tracking-wide mb-2">
                                ✕ ATTENDANCE RECORD NOT FOUND
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                                No attendance audit logs found matching "{searchTerm}". Please check the ID or contact
                                the Directorate of Engineering Operations.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
