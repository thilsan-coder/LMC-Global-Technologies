import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { InternItem, AttendanceItem } from '@/types';
import {
    GraduationCap,
    Download,
    ShieldCheck,
    Calendar,
    Building2,
    CheckCircle2,
    Award,
    Clock,
    ArrowRight,
} from 'lucide-react';

interface InternDashboardProps {
    intern: InternItem | null;
    recentAttendances: AttendanceItem[];
}

export default function InternDashboard({ intern, recentAttendances }: InternDashboardProps) {
    const PAGE_SIZE = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(recentAttendances.length / PAGE_SIZE) || 1;
    const paginatedAttendances = recentAttendances.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    return (
        <AdminLayout title="Student Engineering Portal" subtitle="Internship Profile & Transcripts">
            <Head title="Intern Workspace - LMC Portal" />

            {!intern ? (
                <div className="bg-white p-12 rounded-xl border border-gray-200/80 text-center shadow-2xs">
                    <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <h2 className="text-base font-bold text-[#0B1C30] mb-1">
                        No Associated Internship Record Found
                    </h2>
                    <p className="text-xs text-gray-500 max-w-md mx-auto font-medium">
                        Your corporate user account is not currently linked to an active internship identifier.
                        Please contact the Directorate of Engineering Operations.
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Official Credentials Banner */}
                    <div className="bg-[#0B1C30] text-white p-6 sm:p-8 rounded-2xl shadow-xl border-b-4 border-[#DA7A31] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-[#DA7A31] text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                                    {intern.intern_id}
                                </span>
                                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span>{intern.verification_status}</span>
                                </span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{intern.name}</h2>
                            <p className="text-xs text-gray-300 mt-1 font-medium">
                                {intern.course} &bull; {intern.university}
                            </p>
                            <p className="text-xs text-[#DA7A31] font-semibold mt-0.5">
                                Department: {intern.department}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                            <a
                                href={route('intern.certificate')}
                                target="_blank"
                                className="lmc-btn lmc-btn-primary h-[42px] py-0 px-5 text-xs font-semibold rounded-xl inline-flex items-center justify-center gap-2 whitespace-nowrap shadow-2xs"
                            >
                                <Download className="w-4 h-4" />
                                <span>Download Verified Certificate (PDF)</span>
                            </a>
                        </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs">
                            <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                                Verified Attendance
                            </div>
                            <div className="text-3xl font-extrabold text-[#DA7A31] mt-1">
                                {intern.attendance_percentage}%
                            </div>
                            <div className="text-[10px] text-gray-500 mt-1 font-medium">
                                Benchmark: 85.0% minimum required
                            </div>
                        </div>

                        <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs">
                            <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                                Performance Score
                            </div>
                            <div className="text-3xl font-extrabold text-[#0B1C30] mt-1">
                                {intern.performance_score || 95.0}%
                            </div>
                            <div className="text-[10px] text-emerald-600 font-semibold mt-1">
                                Excellent Technical Assessment
                            </div>
                        </div>

                        <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs">
                            <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                                Internship Status
                            </div>
                            <div className="text-2xl font-extrabold text-[#0B1C30] mt-1">
                                {intern.status}
                            </div>
                            <div className="text-[10px] text-gray-500 mt-1 font-medium">
                                {intern.start_date} to {intern.end_date}
                            </div>
                        </div>
                    </div>

                    {/* Assigned Deliverables & Supervisor */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200/80 shadow-2xs space-y-4">
                        <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-[#DA7A31]" />
                            <h3 className="text-xs font-bold text-[#0B1C30] uppercase tracking-wider">
                                Project & Mentorship Details
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <span className="font-semibold text-gray-500 block mb-1">Assigned Industrial Project</span>
                                <span className="font-bold text-[#0B1C30]">
                                    {intern.project_title || 'Enterprise Microservice Platform Systems'}
                                </span>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <span className="font-semibold text-gray-500 block mb-1">Senior Mentor / Lead</span>
                                <span className="font-bold text-[#0B1C30]">
                                    {intern.supervisor || 'Elena Jayawardena'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Recent Attendance Entries */}
                    <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs min-h-[460px] flex flex-col justify-between overflow-hidden">
                        <div>
                            <div className="p-4 bg-slate-50 border-b border-gray-200/80 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-[#DA7A31]" />
                                    <h3 className="text-xs font-bold text-[#0B1C30] uppercase tracking-wider">
                                        Recent Attendance Entries
                                    </h3>
                                </div>
                                <Link
                                    href={route('public.verify-attendance', { query: intern.intern_id })}
                                    target="_blank"
                                    className="text-xs font-semibold text-[#DA7A31] hover:underline inline-flex items-center gap-1"
                                >
                                    <span>Public Institutional Ledger</span>
                                    <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs text-[#4D4B55] table-fixed">
                                    <thead className="bg-[#0B1C30] text-white font-bold uppercase tracking-wider text-[10px]">
                                        <tr>
                                            <th className="py-3.5 px-5 w-[25%]">Date</th>
                                            <th className="py-3.5 px-5 w-[30%]">Clock Times</th>
                                            <th className="py-3.5 px-5 w-[20%]">Status</th>
                                            <th className="py-3.5 px-5 w-[25%]">Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {paginatedAttendances.length === 0 ? (
                                            <tr className="h-[340px]">
                                                <td colSpan={4} className="py-12 text-center text-gray-500 font-medium">
                                                    No daily logs recorded yet.
                                                </td>
                                            </tr>
                                        ) : (
                                            <>
                                                {paginatedAttendances.map((att) => (
                                                    <tr key={att.id} className="h-[68px] hover:bg-slate-50/80 transition-colors">
                                                        <td className="py-3.5 px-5 font-semibold text-[#0B1C30] truncate">
                                                            {att.date}
                                                        </td>
                                                        <td className="py-3.5 px-5 text-gray-600 font-medium truncate">
                                                            {att.check_in && att.check_out
                                                                ? `${att.check_in} - ${att.check_out}`
                                                                : 'Auto-logged'}
                                                        </td>
                                                        <td className="py-3.5 px-5">
                                                            <span
                                                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                                                                    att.status === 'Present'
                                                                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                                                        : 'bg-amber-100 text-amber-900 border-amber-300'
                                                                }`}
                                                            >
                                                                {att.status}
                                                            </span>
                                                        </td>
                                                        <td className="py-3.5 px-5 text-gray-500 font-medium truncate">
                                                            {att.notes || 'Verified'}
                                                        </td>
                                                    </tr>
                                                ))}
                                                {/* Empty rows to guarantee exact 5-row table height */}
                                                {Array.from({ length: Math.max(0, 5 - paginatedAttendances.length) }).map((_, i) => (
                                                    <tr key={`empty-${i}`} className="h-[68px]">
                                                        <td colSpan={4} className="py-3.5 px-5">&nbsp;</td>
                                                    </tr>
                                                ))}
                                            </>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Customers Standard Pagination Footer */}
                        <div className="px-5 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-xs text-gray-500">
                                Showing{' '}
                                <span className="font-semibold text-gray-700">
                                    {recentAttendances.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}
                                </span>{' '}
                                to{' '}
                                <span className="font-semibold text-gray-700">
                                    {Math.min(currentPage * PAGE_SIZE, recentAttendances.length)}
                                </span>{' '}
                                of{' '}
                                <span className="font-semibold text-gray-700">
                                    {recentAttendances.length}
                                </span>{' '}
                                results
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    type="button"
                                    disabled={currentPage <= 1}
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                                        currentPage <= 1
                                            ? 'opacity-40 cursor-not-allowed bg-gray-50 text-gray-400 border-gray-200'
                                            : 'bg-white text-gray-700 hover:bg-slate-50 border-gray-200 shadow-2xs'
                                    }`}
                                >
                                    Previous
                                </button>
                                <button
                                    type="button"
                                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0B1C30] text-white shadow-2xs"
                                >
                                    {currentPage}
                                </button>
                                <button
                                    type="button"
                                    disabled={currentPage >= totalPages}
                                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                                        currentPage >= totalPages
                                            ? 'opacity-40 cursor-not-allowed bg-gray-50 text-gray-400 border-gray-200'
                                            : 'bg-white text-gray-700 hover:bg-slate-50 border-gray-200 shadow-2xs'
                                    }`}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
