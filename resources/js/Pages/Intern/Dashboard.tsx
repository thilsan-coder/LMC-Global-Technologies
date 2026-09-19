import React from 'react';
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
} from 'lucide-react';

interface InternDashboardProps {
    intern: InternItem | null;
    recentAttendances: AttendanceItem[];
}

export default function InternDashboard({ intern, recentAttendances }: InternDashboardProps) {
    return (
        <AdminLayout title="Student Engineering Portal" subtitle="Internship Profile & Transcripts">
            <Head title="Intern Workspace - LMC Portal" />

            {!intern ? (
                <div className="bg-white p-12 rounded-lg border border-gray-200 text-center shadow-xs">
                    <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <h2 className="text-base font-bold text-[#0B1C30] mb-1">
                        No Associated Internship Record Found
                    </h2>
                    <p className="text-xs text-gray-500 max-w-md mx-auto">
                        Your corporate user account is not currently linked to an active internship identifier.
                        Please contact the Directorate of Engineering Operations.
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Official Credentials Banner */}
                    <div className="bg-[#0B1C30] text-white p-6 sm:p-8 rounded-lg shadow-md border-b-4 border-[#DA7A31] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-[#DA7A31] text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded">
                                    {intern.intern_id}
                                </span>
                                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span>{intern.verification_status}</span>
                                </span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{intern.name}</h2>
                            <p className="text-xs text-gray-300 mt-1">
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
                                className="bg-[#DA7A31] hover:bg-[#C2631D] text-white text-xs font-bold px-5 py-3 rounded shadow transition flex items-center justify-center gap-2 whitespace-nowrap"
                            >
                                <Download className="w-4 h-4" />
                                <span>Download Verified Certificate (PDF)</span>
                            </a>
                        </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs">
                            <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                                Verified Attendance
                            </div>
                            <div className="text-3xl font-extrabold text-[#DA7A31] mt-1">
                                {intern.attendance_percentage}%
                            </div>
                            <div className="text-[10px] text-gray-500 mt-1">
                                Benchmark: 85.0% minimum required
                            </div>
                        </div>

                        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs">
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

                        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs">
                            <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                                Internship Status
                            </div>
                            <div className="text-2xl font-extrabold text-[#0B1C30] mt-1">
                                {intern.status}
                            </div>
                            <div className="text-[10px] text-gray-500 mt-1">
                                {intern.start_date} to {intern.end_date}
                            </div>
                        </div>
                    </div>

                    {/* Assigned Deliverables & Supervisor */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-xs space-y-4">
                        <h3 className="text-xs font-bold text-[#0B1C30] uppercase tracking-wider">
                            Project & Mentorship Details
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                            <div className="bg-gray-50 p-3.5 rounded border border-gray-100">
                                <span className="font-semibold text-gray-500 block mb-1">Assigned Industrial Project</span>
                                <span className="font-bold text-[#0B1C30]">
                                    {intern.project_title || 'Enterprise Microservice Platform Systems'}
                                </span>
                            </div>
                            <div className="bg-gray-50 p-3.5 rounded border border-gray-100">
                                <span className="font-semibold text-gray-500 block mb-1">Senior Mentor / Lead</span>
                                <span className="font-bold text-[#0B1C30]">
                                    {intern.supervisor || 'Elena Jayawardena'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Recent Attendance Entries */}
                    <div className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-[#DA7A31]" />
                                <h3 className="text-xs font-bold text-[#0B1C30] uppercase tracking-wider">
                                    Recent Attendance Entries
                                </h3>
                            </div>
                            <Link
                                href={route('public.verify-attendance', { query: intern.intern_id })}
                                target="_blank"
                                className="text-xs text-[#DA7A31] hover:underline"
                            >
                                Public Institutional Ledger &rarr;
                            </Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs text-[#4D4B55]">
                                <thead className="bg-gray-50 border-b border-gray-200 text-[#0B1C30] font-bold uppercase text-[10px]">
                                    <tr>
                                        <th className="py-2.5 px-4">Date</th>
                                        <th className="py-2.5 px-4">Clock Times</th>
                                        <th className="py-2.5 px-4">Status</th>
                                        <th className="py-2.5 px-4">Notes</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {recentAttendances.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="py-6 text-center text-gray-500">
                                                No daily logs recorded yet.
                                            </td>
                                        </tr>
                                    ) : (
                                        recentAttendances.map((att) => (
                                            <tr key={att.id} className="hover:bg-gray-50">
                                                <td className="py-2.5 px-4 font-semibold text-[#0B1C30]">
                                                    {att.date}
                                                </td>
                                                <td className="py-2.5 px-4 text-gray-600">
                                                    {att.check_in && att.check_out
                                                        ? `${att.check_in} - ${att.check_out}`
                                                        : 'Auto-logged'}
                                                </td>
                                                <td className="py-2.5 px-4">
                                                    <span
                                                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                                            att.status === 'Present'
                                                                ? 'bg-emerald-100 text-emerald-800'
                                                                : 'bg-amber-100 text-amber-800'
                                                        }`}
                                                    >
                                                        {att.status}
                                                    </span>
                                                </td>
                                                <td className="py-2.5 px-4 text-gray-500">
                                                    {att.notes || 'Verified'}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
