import React, { useState, useEffect, useRef } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { FollowUpItem } from '@/types';
import CustomDropdown, { CustomDropdownOption } from '@/Components/CustomDropdown';
import {
    CalendarCheck,
    Plus,
    CheckCircle2,
    Clock,
    X,
    Building2,
    User,
    Calendar,
    Filter,
    Search,
    AlertCircle,
    MoreVertical,
    Eye,
    Trash2,
    FileText,
    Activity,
    XCircle,
} from 'lucide-react';

interface FollowUpsProps {
    followUps: {
        data: FollowUpItem[];
        links: any[];
        total: number;
        from?: number;
        to?: number;
    };
    leads: Array<{ id: number; name: string; company?: string }>;
    customers: Array<{ id: number; name: string; company?: string }>;
    filters: {
        search?: string;
        status?: string;
    };
}

export default function FollowUps({ followUps, leads, customers, filters }: FollowUpsProps) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [modalOpen, setModalOpen] = useState(false);
    const [viewingFollowUp, setViewingFollowUp] = useState<FollowUpItem | null>(null);
    const [deletingFollowUp, setDeletingFollowUp] = useState<FollowUpItem | null>(null);

    // Active row action dropdown state
    const [openActionId, setOpenActionId] = useState<number | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close action menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenActionId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const { data, setData, post, processing, reset, errors, clearErrors } = useForm({
        lead_id: '',
        customer_id: '',
        follow_up_date: '',
        notes: '',
        status: 'Pending',
    });

    const statusOptions: CustomDropdownOption[] = [
        { value: '', label: 'All Follow-ups' },
        { value: 'Pending', label: 'Pending Reminders' },
        { value: 'Completed', label: 'Completed Engagements' },
        { value: 'Cancelled', label: 'Cancelled Engagements' },
    ];

    const leadOptions: CustomDropdownOption[] = [
        { value: '', label: '-- No Lead Associated --' },
        ...leads.map((l) => ({
            value: String(l.id),
            label: `Lead: ${l.name} (${l.company || 'Private'})`,
        })),
    ];

    const customerOptions: CustomDropdownOption[] = [
        { value: '', label: '-- No Customer Associated --' },
        ...customers.map((c) => ({
            value: String(c.id),
            label: `Customer: ${c.company || c.name}`,
        })),
    ];

    // Dynamic metrics calculation
    const totalFollowUps = followUps.total || 0;
    const pendingCount = followUps.data.filter((f) => f.status === 'Pending').length;
    const completedCount = followUps.data.filter((f) => f.status === 'Completed').length;
    const cancelledCount = followUps.data.filter((f) => f.status === 'Cancelled').length;

    const handleSearch = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        router.get(
            route('admin.crm.followups'),
            { search: searchTerm, status: statusFilter },
            { preserveState: true }
        );
    };

    const openCreate = () => {
        clearErrors();
        reset();
        setData({
            lead_id: '',
            customer_id: '',
            follow_up_date: '',
            notes: '',
            status: 'Pending',
        });
        setModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.crm.followups.store'), {
            onSuccess: () => {
                setModalOpen(false);
                reset();
            },
        });
    };

    const markComplete = (item: FollowUpItem) => {
        router.put(route('admin.crm.followups.update', item.id), {
            follow_up_date: item.follow_up_date,
            notes: item.notes,
            status: item.status === 'Completed' ? 'Pending' : 'Completed',
        });
    };

    const confirmDelete = () => {
        if (deletingFollowUp) {
            router.delete(route('admin.crm.followups.destroy', deletingFollowUp.id), {
                onSuccess: () => setDeletingFollowUp(null),
            });
        }
    };

    return (
        <AdminLayout title="CRM Follow-ups & Reminders" subtitle="Scheduled Engagements & Follow-ups">
            <Head title="Follow-ups & Reminders - CRM" />

            <div className="space-y-6">
                {/* 1. EXECUTIVE METRICS SUMMARY */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Total Follow-ups
                            </div>
                            <div className="text-2xl font-bold text-[#0B1C30] mt-1">{totalFollowUps}</div>
                            <div className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
                                <CalendarCheck className="w-3.5 h-3.5 text-[#DA7A31]" />
                                <span>Engagement Log</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-[#0B1C30]/5 border border-[#0B1C30]/10 flex items-center justify-center text-[#0B1C30]">
                            <CalendarCheck className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Pending Reminders
                            </div>
                            <div className="text-2xl font-bold text-amber-600 mt-1">{pendingCount}</div>
                            <div className="text-[11px] text-amber-700/80 mt-1 flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-amber-500" />
                                <span>Awaiting Execution</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                            <Clock className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Completed
                            </div>
                            <div className="text-2xl font-bold text-emerald-600 mt-1">{completedCount}</div>
                            <div className="text-[11px] text-emerald-700/80 mt-1 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                <span>Successfully Reached</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Cancelled / Hold
                            </div>
                            <div className="text-2xl font-bold text-slate-700 mt-1">{cancelledCount}</div>
                            <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                                <XCircle className="w-3.5 h-3.5 text-slate-400" />
                                <span>Postponed or Dropped</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
                            <XCircle className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {/* 2. FILTER TOOLBAR & CREATE BUTTON */}
                <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-2xs">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                        <form onSubmit={handleSearch} className="flex flex-1 flex-col sm:flex-row items-center gap-3 w-full">
                            {/* Search Bar */}
                            <div className="relative flex-1 w-full">
                                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search follow-ups by lead, customer, or notes..."
                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                />
                            </div>

                            {/* Status Filter Dropdown */}
                            <CustomDropdown
                                value={statusFilter}
                                onChange={(val) => {
                                    setStatusFilter(val);
                                    router.get(
                                        route('admin.crm.followups'),
                                        { search: searchTerm, status: val },
                                        { preserveState: true }
                                    );
                                }}
                                options={statusOptions}
                                variant="navy"
                            />

                            <button
                                type="submit"
                                className="lmc-btn lmc-btn-navy lmc-btn-sm shrink-0 w-full sm:w-auto justify-center rounded-xl"
                            >
                                <Filter className="w-3.5 h-3.5" />
                                <span>Filter</span>
                            </button>
                        </form>

                        <button
                            onClick={openCreate}
                            className="lmc-btn lmc-btn-primary lmc-btn-sm shrink-0 shadow-2xs w-full lg:w-auto justify-center rounded-xl"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Schedule Follow-up</span>
                        </button>
                    </div>
                </div>

                {/* 3. TABLE WITH UN-CLIPPED ACTIONS (⋮) DROPDOWN */}
                <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs overflow-visible" ref={menuRef}>
                    <div className="overflow-x-auto overflow-y-visible">
                        <table className="w-full text-left text-xs text-[#4D4B55] table-fixed">
                            <thead className="bg-[#0B1C30] text-white font-bold uppercase tracking-wider text-[10px]">
                                <tr>
                                    <th className="py-3.5 px-5 w-[30%]">Associated Client / Account</th>
                                    <th className="py-3.5 px-5 w-[18%]">Scheduled Date & Time</th>
                                    <th className="py-3.5 px-5 w-[28%]">Objective / Notes</th>
                                    <th className="py-3.5 px-5 w-[14%]">Status</th>
                                    <th className="py-3.5 px-5 w-[10%] text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {followUps.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="h-[340px] text-center text-gray-500">
                                            <div className="max-w-xs mx-auto text-center space-y-2">
                                                <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                                                    <CalendarCheck className="w-6 h-6" />
                                                </div>
                                                <div className="font-bold text-gray-700">No Scheduled Follow-ups Found</div>
                                                <p className="text-xs text-gray-400">
                                                    Try adjusting your search criteria or schedule a new client engagement.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    <>
                                        {followUps.data.map((item, idx) => {
                                            const isMenuOpen = openActionId === item.id;
                                            const openUpward = idx >= followUps.data.length - 1 || idx >= 2;
                                            const accountName = item.customer?.company || item.customer?.name || item.lead?.company || item.lead?.name || 'Private Contact';
                                            const accountType = item.customer ? 'Customer' : item.lead ? 'Sales Lead' : 'Engagement';

                                            return (
                                                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors h-[68px]">
                                                    {/* Associated Account */}
                                                    <td className="py-3.5 px-5">
                                                        <div className="flex items-start gap-3">
                                                            <div className="w-9 h-9 rounded-lg bg-[#0B1C30] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs mt-0.5">
                                                                {accountName.charAt(0)}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <div
                                                                    className="font-bold text-[#0B1C30] text-sm hover:text-[#DA7A31] transition-colors cursor-pointer truncate"
                                                                    onClick={() => setViewingFollowUp(item)}
                                                                >
                                                                    {accountName}
                                                                </div>
                                                                <div className="text-[11px] text-gray-600 flex items-center gap-1.5 mt-0.5 truncate">
                                                                    {item.customer ? (
                                                                        <Building2 className="w-3 h-3 text-[#DA7A31] shrink-0" />
                                                                    ) : (
                                                                        <User className="w-3 h-3 text-[#DA7A31] shrink-0" />
                                                                    )}
                                                                    <span className="font-medium truncate">{accountType}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Scheduled Date */}
                                                    <td className="py-3.5 px-5">
                                                        <div className="flex items-center gap-1.5 font-bold text-[#0B1C30] text-xs truncate">
                                                            <Calendar className="w-3.5 h-3.5 text-[#DA7A31] shrink-0" />
                                                            <span className="truncate">{item.follow_up_date}</span>
                                                        </div>
                                                    </td>

                                                    {/* Notes */}
                                                    <td className="py-3.5 px-5">
                                                        <p className="text-gray-700 line-clamp-2 font-medium text-xs">
                                                            {item.notes}
                                                        </p>
                                                    </td>

                                                    {/* Status Badge */}
                                                    <td className="py-3.5 px-5">
                                                        <span
                                                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                                                                item.status === 'Completed'
                                                                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                                                    : item.status === 'Cancelled'
                                                                    ? 'bg-slate-100 text-slate-800 border border-slate-300'
                                                                    : 'bg-amber-100 text-amber-900 border border-amber-300'
                                                            }`}
                                                        >
                                                            <span
                                                                className={`w-1.5 h-1.5 rounded-full ${
                                                                    item.status === 'Completed'
                                                                        ? 'bg-emerald-600'
                                                                        : item.status === 'Cancelled'
                                                                        ? 'bg-slate-500'
                                                                        : 'bg-amber-600 animate-pulse'
                                                                }`}
                                                            />
                                                            {item.status}
                                                        </span>
                                                    </td>

                                                    {/* UN-CLIPPED ACTIONS (⋮) DROPDOWN */}
                                                    <td className="py-3.5 px-5 text-right relative">
                                                        <div className="relative inline-block text-left">
                                                            <button
                                                                type="button"
                                                                onClick={() => setOpenActionId(isMenuOpen ? null : item.id)}
                                                                className={`p-2 rounded-lg transition-colors border ${
                                                                    isMenuOpen
                                                                        ? 'bg-[#0B1C30] text-white border-[#0B1C30]'
                                                                        : 'text-gray-600 hover:text-[#0B1C30] hover:bg-gray-100 border-gray-200'
                                                                }`}
                                                                title="Follow-up Actions"
                                                            >
                                                                <MoreVertical className="w-4 h-4" />
                                                            </button>

                                                            {isMenuOpen && (
                                                                <div
                                                                    className={`absolute right-0 w-44 bg-white rounded-xl shadow-2xl border border-gray-200 py-1.5 z-50 animate-fadeIn text-left font-normal ${
                                                                        openUpward ? 'bottom-full mb-1.5' : 'top-full mt-1.5'
                                                                    }`}
                                                                >
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setOpenActionId(null);
                                                                            setViewingFollowUp(item);
                                                                        }}
                                                                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-gray-700 hover:bg-slate-50 hover:text-[#0B1C30] transition font-medium"
                                                                    >
                                                                        <Eye className="w-4 h-4 text-slate-500" />
                                                                        <span>View Details</span>
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setOpenActionId(null);
                                                                            markComplete(item);
                                                                        }}
                                                                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-emerald-800 hover:bg-emerald-50 hover:text-emerald-900 transition font-medium"
                                                                    >
                                                                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                                                        <span>{item.status === 'Completed' ? 'Reopen Follow-up' : 'Mark Completed'}</span>
                                                                    </button>
                                                                    <div className="my-1 border-t border-gray-100" />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setOpenActionId(null);
                                                                            setDeletingFollowUp(item);
                                                                        }}
                                                                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-rose-700 hover:bg-rose-50 hover:text-rose-900 transition font-medium"
                                                                    >
                                                                        <Trash2 className="w-4 h-4 text-rose-600" />
                                                                        <span>Delete Reminder</span>
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        {Array.from({ length: Math.max(0, 5 - followUps.data.length) }).map((_, i) => (
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
                    <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
                        <div>
                            Showing <span className="font-semibold text-[#0B1C30]">{followUps.from || (followUps.total > 0 ? 1 : 0)}</span> to{' '}
                            <span className="font-semibold text-[#0B1C30]">{followUps.to || followUps.data.length}</span> of{' '}
                            <span className="font-semibold text-[#0B1C30]">{followUps.total}</span> follow-up reminders
                        </div>
                        {followUps.links && followUps.links.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                                {followUps.links
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
                        )}
                    </div>
                </div>
            </div>

            {/* CREATE MODAL WITH CUSTOMERS PAGE STANDARD */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-gray-200 relative max-h-[90vh] flex flex-col">
                        {/* Modal Header */}
                        <div className="bg-[#0B1C30] px-6 py-4 flex items-center justify-between text-white shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#DA7A31]/20 border border-[#DA7A31]/40 flex items-center justify-center text-[#DA7A31]">
                                    <CalendarCheck className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold tracking-tight">Schedule Follow-up Engagement</h3>
                                    <p className="text-xs text-gray-300">Set a reminder to contact an enterprise client or sales lead</p>
                                </div>
                            </div>
                            <button onClick={() => setModalOpen(false)} className="p-1 text-gray-400 hover:text-white rounded-lg transition">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Form Body */}
                        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0 overflow-hidden">
                            <div className="p-6 overflow-y-auto space-y-6 text-xs flex-1 text-gray-900">
                                {/* SECTION 1: ACCOUNT LINKAGE */}
                                <div>
                                    <div className="text-[11px] font-bold text-[#DA7A31] uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <Building2 className="w-4 h-4" />
                                        <span>1. Account Linkage</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">Link to Sales Lead</label>
                                            <CustomDropdown
                                                value={data.lead_id}
                                                onChange={(val) => setData('lead_id', val)}
                                                options={leadOptions}
                                                variant="white"
                                                className="w-full"
                                            />
                                        </div>

                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">Or Link to Existing Customer</label>
                                            <CustomDropdown
                                                value={data.customer_id}
                                                onChange={(val) => setData('customer_id', val)}
                                                options={customerOptions}
                                                variant="white"
                                                className="w-full"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION 2: TIMING & DELIVERABLES */}
                                <div className="pt-4 border-t border-gray-100">
                                    <div className="text-[11px] font-bold text-[#DA7A31] uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>2. Timing & Action Items</span>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">
                                                Follow-Up Date & Time <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                                                <input
                                                    type="datetime-local"
                                                    value={data.follow_up_date}
                                                    onChange={(e) => setData('follow_up_date', e.target.value)}
                                                    onClick={(e) => {
                                                        try {
                                                            e.currentTarget.showPicker();
                                                        } catch (err) {}
                                                    }}
                                                    required
                                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 shadow-2xs cursor-pointer"
                                                />
                                            </div>
                                            {errors.follow_up_date && <p className="text-red-500 text-[11px] mt-1">{errors.follow_up_date}</p>}
                                        </div>

                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">
                                                Action Items & Discussion Scope <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                rows={3}
                                                value={data.notes}
                                                onChange={(e) => setData('notes', e.target.value)}
                                                required
                                                placeholder="e.g. Call client to review technical proposal, clarify cloud hosting specifications..."
                                                className="w-full p-3 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                            />
                                            {errors.notes && <p className="text-red-500 text-[11px] mt-1">{errors.notes}</p>}
                                        </div>
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
                                    <span>{processing ? 'Scheduling...' : 'Set Reminder'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* VIEW DETAILS MODAL */}
            {viewingFollowUp && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-gray-200 relative">
                        <div className="bg-[#0B1C30] p-6 text-white relative">
                            <button
                                onClick={() => setViewingFollowUp(null)}
                                className="absolute top-4 right-4 p-1 text-gray-400 hover:text-white rounded-lg"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-[#DA7A31] text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0">
                                    <CalendarCheck className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">
                                        {viewingFollowUp.customer?.company || viewingFollowUp.customer?.name || viewingFollowUp.lead?.company || viewingFollowUp.lead?.name || 'Client Engagement'}
                                    </h3>
                                    <div className="text-xs text-gray-300 flex items-center gap-1.5 mt-0.5">
                                        <Calendar className="w-3.5 h-3.5 text-[#DA7A31]" />
                                        <span>{viewingFollowUp.follow_up_date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 space-y-4 text-xs text-gray-900">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <div className="text-gray-400 text-[10px] font-bold uppercase">Engagement Status</div>
                                    <span
                                        className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                                            viewingFollowUp.status === 'Completed'
                                                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                                : viewingFollowUp.status === 'Cancelled'
                                                ? 'bg-slate-100 text-slate-800 border border-slate-300'
                                                : 'bg-amber-100 text-amber-900 border border-amber-300'
                                        }`}
                                    >
                                        {viewingFollowUp.status}
                                    </span>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <div className="text-gray-400 text-[10px] font-bold uppercase">Account Type</div>
                                    <div className="font-semibold text-[#0B1C30] mt-1">
                                        {viewingFollowUp.customer ? 'Enterprise Customer' : viewingFollowUp.lead ? 'Sales Pipeline Lead' : 'Independent'}
                                    </div>
                                </div>
                            </div>

                            {viewingFollowUp.notes && (
                                <div className="pt-2 border-t border-gray-100">
                                    <div className="font-bold text-[#0B1C30] mb-1">Action Items & Agenda</div>
                                    <p className="p-3 bg-slate-50 rounded-xl text-gray-600 border border-slate-100 whitespace-pre-wrap font-medium">
                                        {viewingFollowUp.notes}
                                    </p>
                                </div>
                            )}

                            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                <button
                                    onClick={() => {
                                        const item = viewingFollowUp;
                                        setViewingFollowUp(null);
                                        markComplete(item);
                                    }}
                                    className="px-4 py-2 text-xs font-bold text-[#0B1C30] bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-300 transition"
                                >
                                    <CheckCircle2 className="w-3.5 h-3.5 inline mr-1.5 text-emerald-600" />
                                    <span>{viewingFollowUp.status === 'Completed' ? 'Reopen Follow-up' : 'Mark Completed'}</span>
                                </button>
                                <button
                                    onClick={() => setViewingFollowUp(null)}
                                    className="px-4 py-2 text-xs font-bold text-white bg-[#0B1C30] hover:bg-[#081423] rounded-xl transition"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* DELETE CONFIRMATION MODAL */}
            {deletingFollowUp && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-200 text-center">
                        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="w-6 h-6" />
                        </div>
                        <h3 className="text-base font-bold text-[#0B1C30] mb-2">Delete Follow-up Reminder?</h3>
                        <p className="text-xs text-gray-500 mb-6">
                            Are you sure you want to remove this scheduled reminder? This action cannot be undone.
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <button
                                onClick={() => setDeletingFollowUp(null)}
                                className="px-4 py-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl border border-gray-300 flex-1 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl flex-1 transition shadow-xs"
                            >
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
