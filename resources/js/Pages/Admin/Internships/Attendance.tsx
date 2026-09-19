import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { AttendanceItem } from '@/types';
import {
    Clock,
    Plus,
    Calendar,
    Search,
    CheckCircle2,
    XCircle,
    X,
    UserCheck,
} from 'lucide-react';

interface AttendanceProps {
    attendances: {
        data: AttendanceItem[];
        links: any[];
        total: number;
    };
    interns: Array<{ id: number; intern_id: string; name: string; department: string }>;
    filters: {
        date?: string;
        status?: string;
    };
}

export default function AttendanceIndex({ attendances, interns, filters }: AttendanceProps) {
    const [dateFilter, setDateFilter] = useState(filters.date || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [modalOpen, setModalOpen] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        intern_id: '',
        date: new Date().toISOString().split('T')[0],
        check_in: '09:00',
        check_out: '17:30',
        status: 'Present',
        notes: '',
    });

    const handleFilter = (d: string, s: string) => {
        router.get(
            route('admin.attendance.index'),
            { date: d, status: s },
            { preserveState: true }
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.attendance.store'), {
            onSuccess: () => {
                setModalOpen(false);
                reset();
            },
        });
    };

    return (
        <AdminLayout title="Attendance Ledger" subtitle="Industrial Presence Tracking">
            <Head title="Attendance Log - LMC Management" />

            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                    <input
                        type="date"
                        value={dateFilter}
                        onChange={(e) => {
                            setDateFilter(e.target.value);
                            handleFilter(e.target.value, statusFilter);
                        }}
                        className="text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31] py-1.5"
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            handleFilter(dateFilter, e.target.value);
                        }}
                        className="text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31] py-1.5"
                    >
                        <option value="">All Attendance Statuses</option>
                        <option value="Present">Present</option>
                        <option value="Half-day">Half-day</option>
                        <option value="Leave">Leave</option>
                        <option value="Absent">Absent</option>
                    </select>
                </div>

                <button
                    onClick={() => {
                        reset();
                        setModalOpen(true);
                    }}
                    className="w-full sm:w-auto bg-[#DA7A31] hover:bg-[#C2631D] text-white text-xs font-bold px-4 py-2 rounded shadow-xs flex items-center justify-center gap-1.5"
                >
                    <Plus className="w-4 h-4" />
                    <span>Log Daily Attendance</span>
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-[#4D4B55]">
                        <thead className="bg-gray-50 border-b border-gray-200 text-[#0B1C30] font-bold uppercase tracking-wider text-[10px]">
                            <tr>
                                <th className="py-3 px-4">Intern Record</th>
                                <th className="py-3 px-4">Date Logged</th>
                                <th className="py-3 px-4">Clock Times</th>
                                <th className="py-3 px-4">Presence Status</th>
                                <th className="py-3 px-4">Operational Notes</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {attendances.data.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-gray-500">
                                        No attendance entries found for the selected filter.
                                    </td>
                                </tr>
                            ) : (
                                attendances.data.map((att) => (
                                    <tr key={att.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-3.5 px-4">
                                            <div className="font-bold text-[#0B1C30] text-sm">
                                                {att.intern?.name || 'Intern'}
                                            </div>
                                            <div className="font-mono text-[11px] text-gray-500">
                                                {att.intern?.intern_id} &bull; {att.intern?.department}
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-4 font-semibold text-[#0B1C30]">
                                            {att.date}
                                        </td>
                                        <td className="py-3.5 px-4 text-gray-600">
                                            {att.check_in && att.check_out ? (
                                                <span>
                                                    {att.check_in} - {att.check_out}
                                                </span>
                                            ) : (
                                                <span className="text-gray-400 italic">Not clocked</span>
                                            )}
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <span
                                                className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                                                    att.status === 'Present'
                                                        ? 'bg-emerald-100 text-emerald-800'
                                                        : att.status === 'Half-day'
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : att.status === 'Leave'
                                                        ? 'bg-amber-100 text-amber-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}
                                            >
                                                {att.status}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 text-gray-600">
                                            {att.notes || '-'}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {attendances.links && attendances.links.length > 3 && (
                    <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                        <div>Total: {attendances.total} logged days</div>
                        <div className="flex gap-1">
                            {attendances.links.map((link, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => link.url && router.get(link.url)}
                                    disabled={!link.url}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`px-2.5 py-1 rounded text-xs ${
                                        link.active
                                            ? 'bg-[#0B1C30] text-white font-bold'
                                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
                    <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl relative">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-700"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h3 className="text-base font-bold text-[#0B1C30] mb-4">
                            Record Intern Daily Attendance
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                            <div>
                                <label className="block font-semibold text-[#0B1C30] mb-1">Select Intern *</label>
                                <select
                                    value={data.intern_id}
                                    onChange={(e) => setData('intern_id', e.target.value)}
                                    required
                                    className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                >
                                    <option value="">-- Choose Intern --</option>
                                    {interns.map((i) => (
                                        <option key={i.id} value={i.id}>
                                            {i.intern_id} - {i.name} ({i.department})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block font-semibold text-[#0B1C30] mb-1">Date *</label>
                                <input
                                    type="date"
                                    value={data.date}
                                    onChange={(e) => setData('date', e.target.value)}
                                    required
                                    className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1">Check-in Time</label>
                                    <input
                                        type="time"
                                        value={data.check_in}
                                        onChange={(e) => setData('check_in', e.target.value)}
                                        className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1">Check-out Time</label>
                                    <input
                                        type="time"
                                        value={data.check_out}
                                        onChange={(e) => setData('check_out', e.target.value)}
                                        className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-semibold text-[#0B1C30] mb-1">Status *</label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                >
                                    <option value="Present">Present</option>
                                    <option value="Half-day">Half-day</option>
                                    <option value="Leave">Leave</option>
                                    <option value="Absent">Absent</option>
                                </select>
                            </div>

                            <div>
                                <label className="block font-semibold text-[#0B1C30] mb-1">Notes</label>
                                <input
                                    type="text"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    placeholder="Approved medical leave, sprint planning, etc."
                                    className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-3 py-1.5 text-xs text-gray-600 hover:text-gray-900"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-[#DA7A31] hover:bg-[#C2631D] text-white text-xs font-bold px-4 py-2 rounded shadow transition"
                                >
                                    {processing ? 'Logging...' : 'Save Record'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
