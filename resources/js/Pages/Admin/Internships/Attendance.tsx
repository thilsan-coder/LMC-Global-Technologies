import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { AttendanceItem } from '@/types';
import CustomDropdown, { CustomDropdownOption } from '@/Components/CustomDropdown';
import {
    Clock,
    Plus,
    Calendar,
    Search,
    CheckCircle2,
    XCircle,
    X,
    UserCheck,
    Filter,
    User,
    FileText,
    Activity,
    AlertCircle,
} from 'lucide-react';

interface AttendanceProps {
    attendances: {
        data: AttendanceItem[];
        links: any[];
        total: number;
        from?: number;
        to?: number;
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

    const { data, setData, post, processing, reset, errors, clearErrors } = useForm({
        intern_id: '',
        date: new Date().toISOString().split('T')[0],
        check_in: '09:00',
        check_out: '17:30',
        status: 'Present',
        notes: '',
    });

    const statusOptions: CustomDropdownOption[] = [
        { value: '', label: 'All Attendance Statuses' },
        { value: 'Present', label: 'Present' },
        { value: 'Half-day', label: 'Half-day' },
        { value: 'Leave', label: 'Leave' },
        { value: 'Absent', label: 'Absent' },
    ];

    const internOptions: CustomDropdownOption[] = [
        { value: '', label: '-- Choose Intern --' },
        ...interns.map((i) => ({
            value: String(i.id),
            label: `${i.intern_id} - ${i.name} (${i.department})`,
        })),
    ];

    const modalStatusOptions: CustomDropdownOption[] = [
        { value: 'Present', label: 'Present' },
        { value: 'Half-day', label: 'Half-day' },
        { value: 'Leave', label: 'Leave' },
        { value: 'Absent', label: 'Absent' },
    ];

    // Dynamic metrics calculation
    const totalEntries = attendances.total || 0;
    const presentCount = attendances.data.filter((a) => a.status === 'Present').length;
    const halfDayCount = attendances.data.filter((a) => a.status === 'Half-day').length;
    const leaveAbsentCount = attendances.data.filter((a) => ['Leave', 'Absent'].includes(a.status)).length;

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

            <div className="space-y-6">
                {/* 1. EXECUTIVE METRICS SUMMARY */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Total Logged Entries
                            </div>
                            <div className="text-2xl font-bold text-[#0B1C30] mt-1">{totalEntries}</div>
                            <div className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-[#DA7A31]" />
                                <span>Institutional Log</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-[#0B1C30]/5 border border-[#0B1C30]/10 flex items-center justify-center text-[#0B1C30]">
                            <Clock className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Full-Day Present
                            </div>
                            <div className="text-2xl font-bold text-emerald-600 mt-1">{presentCount}</div>
                            <div className="text-[11px] text-emerald-700/80 mt-1 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                <span>Full Shift Complete</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Half-Day Presence
                            </div>
                            <div className="text-2xl font-bold text-blue-600 mt-1">{halfDayCount}</div>
                            <div className="text-[11px] text-blue-700/80 mt-1 flex items-center gap-1">
                                <Activity className="w-3.5 h-3.5 text-blue-500" />
                                <span>Partial Shift Recorded</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                            <Activity className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Leave / Absent
                            </div>
                            <div className="text-2xl font-bold text-amber-600 mt-1">{leaveAbsentCount}</div>
                            <div className="text-[11px] text-amber-700/80 mt-1 flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                                <span>Approved or Unplanned</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                            <AlertCircle className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {/* 2. FILTER TOOLBAR & LOG BUTTON */}
                <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-2xs">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                        <div className="flex flex-1 flex-col sm:flex-row items-center gap-3 w-full">
                            {/* Date Filter Input */}
                            <div className="relative flex-1 w-full sm:w-auto">
                                <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                                <input
                                    type="date"
                                    value={dateFilter}
                                    onChange={(e) => {
                                        setDateFilter(e.target.value);
                                        handleFilter(e.target.value, statusFilter);
                                    }}
                                    onClick={(e) => {
                                        try {
                                            e.currentTarget.showPicker();
                                        } catch (err) {}
                                    }}
                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 shadow-2xs cursor-pointer"
                                />
                            </div>

                            {/* Status Filter Dropdown */}
                            <CustomDropdown
                                value={statusFilter}
                                onChange={(val) => {
                                    setStatusFilter(val);
                                    handleFilter(dateFilter, val);
                                }}
                                options={statusOptions}
                                variant="navy"
                            />

                            <button
                                type="button"
                                onClick={() => handleFilter(dateFilter, statusFilter)}
                                className="lmc-btn lmc-btn-navy lmc-btn-sm shrink-0 w-full sm:w-auto justify-center rounded-xl"
                            >
                                <Filter className="w-3.5 h-3.5" />
                                <span>Filter</span>
                            </button>
                        </div>

                        <button
                            onClick={() => {
                                clearErrors();
                                reset();
                                setModalOpen(true);
                            }}
                            className="lmc-btn lmc-btn-primary lmc-btn-sm shrink-0 shadow-2xs w-full lg:w-auto justify-center rounded-xl"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Log Daily Attendance</span>
                        </button>
                    </div>
                </div>

                {/* 3. ATTENDANCE TABLE */}
                <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs overflow-visible">
                    <div className="overflow-x-auto overflow-y-visible">
                        <table className="w-full text-left text-xs text-[#4D4B55] table-fixed">
                            <thead className="bg-[#0B1C30] text-white font-bold uppercase tracking-wider text-[10px]">
                                <tr>
                                    <th className="py-3.5 px-5 w-[30%]">Intern Record</th>
                                    <th className="py-3.5 px-5 w-[18%]">Date Logged</th>
                                    <th className="py-3.5 px-5 w-[18%]">Clock Times</th>
                                    <th className="py-3.5 px-5 w-[14%]">Presence Status</th>
                                    <th className="py-3.5 px-5 w-[20%]">Operational Notes</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {attendances.data.length === 0 ? (
                                    <tr className="h-[340px]">
                                        <td colSpan={5} className="py-12 text-center text-gray-500">
                                            <div className="max-w-xs mx-auto text-center space-y-2">
                                                <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                                                    <Clock className="w-6 h-6" />
                                                </div>
                                                <div className="font-bold text-gray-700">No Attendance Entries Found</div>
                                                <p className="text-xs text-gray-400">
                                                    No entries recorded matching the selected filter criteria.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    <>
                                        {attendances.data.map((att) => (
                                            <tr key={att.id} className="h-[68px] hover:bg-slate-50/80 transition-colors">
                                                {/* Intern Details */}
                                                <td className="py-3.5 px-5">
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-9 h-9 rounded-lg bg-[#0B1C30] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs mt-0.5">
                                                            {(att.intern?.name || 'I').charAt(0)}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="font-bold text-[#0B1C30] text-sm truncate">
                                                                {att.intern?.name || 'Intern'}
                                                            </div>
                                                            <div className="font-mono text-[11px] text-gray-500 font-medium mt-0.5 truncate">
                                                                <span className="text-[#DA7A31] font-bold">{att.intern?.intern_id}</span> &bull; {att.intern?.department}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Date */}
                                                <td className="py-3.5 px-5 font-semibold text-[#0B1C30]">
                                                    <div className="flex items-center gap-1.5 truncate">
                                                        <Calendar className="w-3.5 h-3.5 text-[#DA7A31] shrink-0" />
                                                        <span className="truncate">{att.date}</span>
                                                    </div>
                                                </td>

                                                {/* Clock Times */}
                                                <td className="py-3.5 px-5 text-gray-600 font-medium">
                                                    {att.check_in && att.check_out ? (
                                                        <div className="flex items-center gap-1.5 font-semibold text-gray-800 truncate">
                                                            <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                                            <span className="truncate">{att.check_in} - {att.check_out}</span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-400 italic">Not clocked</span>
                                                    )}
                                                </td>

                                                {/* Status Badge */}
                                                <td className="py-3.5 px-5">
                                                    <span
                                                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                                                            att.status === 'Present'
                                                                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                                                : att.status === 'Half-day'
                                                                ? 'bg-blue-100 text-blue-900 border border-blue-300'
                                                                : att.status === 'Leave'
                                                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                                                : 'bg-red-100 text-red-900 border border-red-300'
                                                        }`}
                                                    >
                                                        <span
                                                            className={`w-1.5 h-1.5 rounded-full ${
                                                                att.status === 'Present'
                                                                    ? 'bg-emerald-600'
                                                                    : att.status === 'Half-day'
                                                                    ? 'bg-blue-600'
                                                                    : att.status === 'Leave'
                                                                    ? 'bg-amber-600'
                                                                    : 'bg-red-600'
                                                            }`}
                                                        />
                                                        {att.status}
                                                    </span>
                                                </td>

                                                {/* Notes */}
                                                <td className="py-3.5 px-5 text-gray-600 font-medium">
                                                    <span className="line-clamp-2">{att.notes || <span className="text-gray-400 italic">-</span>}</span>
                                                </td>
                                            </tr>
                                        ))}
                                        {/* Empty rows to guarantee exact 5-row table height */}
                                        {Array.from({ length: Math.max(0, 5 - attendances.data.length) }).map((_, i) => (
                                            <tr key={`empty-${i}`} className="h-[68px]">
                                                <td colSpan={5} className="py-3.5 px-5">&nbsp;</td>
                                            </tr>
                                        ))}
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Footer */}
                    {attendances.links && attendances.links.length > 0 && (
                        <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
                            <div>
                                Showing <span className="font-semibold text-[#0B1C30]">{attendances.from || 1}</span> to{' '}
                                <span className="font-semibold text-[#0B1C30]">{attendances.to || attendances.data.length}</span> of{' '}
                                <span className="font-semibold text-[#0B1C30]">{attendances.total}</span> logged entries
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {attendances.links
                                    .filter((link) => link.active || link.label.includes('Previous') || link.label.includes('&laquo;') || link.label.includes('Next') || link.label.includes('&raquo;'))
                                    .map((link, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => link.url && router.get(link.url, {}, { preserveScroll: true, preserveState: true })}
                                        disabled={!link.url}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-3 py-1.5 rounded-md text-xs transition-all ${
                                            link.active
                                                ? 'bg-[#0B1C30] text-white font-bold shadow-2xs'
                                                : link.url
                                                ? 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* LOG ATTENDANCE MODAL */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-gray-200 relative max-h-[90vh] flex flex-col">
                        {/* Modal Header */}
                        <div className="bg-[#0B1C30] px-6 py-4 flex items-center justify-between text-white shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#DA7A31]/20 border border-[#DA7A31]/40 flex items-center justify-center text-[#DA7A31]">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold tracking-tight">Record Intern Daily Attendance</h3>
                                    <p className="text-xs text-gray-300">Log clock-in/out timestamps and presence classification</p>
                                </div>
                            </div>
                            <button onClick={() => setModalOpen(false)} className="p-1 text-gray-400 hover:text-white rounded-lg transition">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Form Body */}
                        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0 overflow-hidden">
                            <div className="p-6 overflow-y-auto space-y-6 text-xs flex-1 text-gray-900">
                                {/* SECTION 1: INTERN & DATE */}
                                <div>
                                    <div className="text-[11px] font-bold text-[#DA7A31] uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        <span>1. Candidate & Date Selection</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">
                                                Select Intern Candidate <span className="text-red-500">*</span>
                                            </label>
                                            <CustomDropdown
                                                value={data.intern_id}
                                                onChange={(val) => setData('intern_id', val)}
                                                options={internOptions}
                                                variant="white"
                                                className="w-full"
                                            />
                                        </div>

                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">
                                                Attendance Date <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                                                <input
                                                    type="date"
                                                    value={data.date}
                                                    onChange={(e) => setData('date', e.target.value)}
                                                    onClick={(e) => {
                                                        try {
                                                            e.currentTarget.showPicker();
                                                        } catch (err) {}
                                                    }}
                                                    required
                                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 shadow-2xs cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION 2: TIMESTAMPS & STATUS */}
                                <div className="pt-4 border-t border-gray-100">
                                    <div className="text-[11px] font-bold text-[#DA7A31] uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span>2. Clock Timestamps & Classification</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">Check-in Time</label>
                                            <div className="relative">
                                                <Clock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                                                <input
                                                    type="time"
                                                    value={data.check_in}
                                                    onChange={(e) => setData('check_in', e.target.value)}
                                                    onClick={(e) => {
                                                        try {
                                                            e.currentTarget.showPicker();
                                                        } catch (err) {}
                                                    }}
                                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 shadow-2xs cursor-pointer"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">Check-out Time</label>
                                            <div className="relative">
                                                <Clock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                                                <input
                                                    type="time"
                                                    value={data.check_out}
                                                    onChange={(e) => setData('check_out', e.target.value)}
                                                    onClick={(e) => {
                                                        try {
                                                            e.currentTarget.showPicker();
                                                        } catch (err) {}
                                                    }}
                                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 shadow-2xs cursor-pointer"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">
                                                Presence Status <span className="text-red-500">*</span>
                                            </label>
                                            <CustomDropdown
                                                value={data.status}
                                                onChange={(val) => setData('status', val)}
                                                options={modalStatusOptions}
                                                variant="white"
                                                className="w-full"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION 3: OPERATIONAL NOTES */}
                                <div className="pt-4 border-t border-gray-100">
                                    <div className="text-[11px] font-bold text-[#DA7A31] uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <FileText className="w-4 h-4" />
                                        <span>3. Operational Notes</span>
                                    </div>
                                    <div>
                                        <label className="block font-semibold text-[#0B1C30] mb-1">Remarks / Justification</label>
                                        <input
                                            type="text"
                                            value={data.notes}
                                            onChange={(e) => setData('notes', e.target.value)}
                                            placeholder="e.g. Approved medical leave, sprint planning, project deployment..."
                                            className="w-full px-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* STICKY FOOTER */}
                            <div className="shrink-0 bg-gray-50 border-t border-gray-200 p-4 flex items-center justify-end gap-3 z-20">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-5 py-2.5 text-xs font-bold text-[#0B1C30] bg-gray-200 hover:bg-gray-300 border border-gray-300 rounded-xl transition-all shadow-2xs"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2.5 text-xs font-bold text-white bg-[#DA7A31] hover:bg-[#c66a27] rounded-xl shadow-md transition-all flex items-center gap-2"
                                >
                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                    <span>{processing ? 'Logging Attendance...' : 'Save Attendance Entry'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
