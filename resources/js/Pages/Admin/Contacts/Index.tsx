import React, { useState, useEffect, useRef } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ContactMessageItem } from '@/types';
import CustomDropdown, { CustomDropdownOption } from '@/Components/CustomDropdown';
import {
    Mail,
    Search,
    CheckCircle2,
    Trash2,
    Eye,
    Phone,
    Clock,
    X,
    Filter,
    MoreVertical,
    AlertCircle,
    User,
    Inbox,
    MessageSquare,
    Check,
} from 'lucide-react';

interface ContactsProps {
    messages: {
        data: ContactMessageItem[];
        links: any[];
        total: number;
        from?: number;
        to?: number;
    };
    unreadCount: number;
    filters: {
        search?: string;
        status?: string;
    };
}

export default function ContactsIndex({ messages, unreadCount, filters }: ContactsProps) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [selectedMsg, setSelectedMsg] = useState<ContactMessageItem | null>(null);
    const [deletingMsg, setDeletingMsg] = useState<ContactMessageItem | null>(null);

    // Active row action dropdown state (id or null)
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

    const statusOptions: CustomDropdownOption[] = [
        { value: '', label: 'All Inquiries' },
        { value: 'Unread', label: `Unread (${unreadCount})` },
        { value: 'Read', label: 'Read' },
        { value: 'Resolved', label: 'Resolved' },
    ];

    const handleSearch = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        router.get(
            route('admin.contacts.index'),
            { search: searchTerm, status: statusFilter },
            { preserveState: true }
        );
    };

    const setStatus = (id: number, status: 'Unread' | 'Read' | 'Resolved') => {
        router.put(route('admin.contacts.update', id), { status });
    };

    const confirmDelete = () => {
        if (!deletingMsg) return;
        router.delete(route('admin.contacts.destroy', deletingMsg.id), {
            onSuccess: () => setDeletingMsg(null),
        });
    };

    // Calculate metrics
    const totalMessages = messages.total || 0;
    const resolvedInView = messages.data.filter((m) => m.status === 'Resolved').length;

    return (
        <AdminLayout title="Contact & Inquiries Triage" subtitle="Inbound Communications Desk">
            <Head title="Contact Enquiries - LMC Management" />

            <div className="space-y-6">
                {/* 1. EXECUTIVE METRICS SUMMARY CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Total Inquiries
                            </div>
                            <div className="text-2xl font-bold text-[#0B1C30] mt-1">{totalMessages}</div>
                            <div className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
                                <Inbox className="w-3.5 h-3.5 text-gray-500" />
                                <span>All-time received</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-[#0B1C30]/5 border border-[#0B1C30]/10 flex items-center justify-center text-[#0B1C30]">
                            <Mail className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Unread Queue
                            </div>
                            <div className="text-2xl font-bold text-[#DA7A31] mt-1">{unreadCount}</div>
                            <div className="text-[11px] text-[#DA7A31] mt-1 flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                <span>Awaiting review</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-[#DA7A31]/10 border border-[#DA7A31]/20 flex items-center justify-center text-[#DA7A31]">
                            <Clock className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Resolved in View
                            </div>
                            <div className="text-2xl font-bold text-emerald-600 mt-1">{resolvedInView}</div>
                            <div className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Successfully closed</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Active Filter
                            </div>
                            <div className="text-2xl font-bold text-indigo-600 mt-1">
                                {statusFilter || 'All Inquiries'}
                            </div>
                            <div className="text-[11px] text-indigo-600/80 mt-1 flex items-center gap-1">
                                <Filter className="w-3.5 h-3.5 text-indigo-500" />
                                <span>Current status view</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                            <MessageSquare className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {/* 2. FILTER TOOLBAR WITH CLEAN SELECT CONTROLS */}
                <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-2xs">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                        <form onSubmit={handleSearch} className="flex flex-1 flex-col sm:flex-row items-center gap-3 w-full">
                            {/* Search Bar */}
                            <div className="relative flex-1 w-full">
                                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search sender, email, subject, or message content..."
                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                />
                            </div>

                            {/* Status Filter Dropdown */}
                            <div className="w-full sm:w-56">
                                <CustomDropdown
                                    value={statusFilter}
                                    onChange={(val) => {
                                        setStatusFilter(val);
                                        router.get(
                                            route('admin.contacts.index'),
                                            { search: searchTerm, status: val },
                                            { preserveState: true }
                                        );
                                    }}
                                    options={statusOptions}
                                    icon={Filter}
                                    variant="navy"
                                />
                            </div>

                            <button
                                type="submit"
                                className="lmc-btn lmc-btn-navy lmc-btn-sm shrink-0 w-full sm:w-auto justify-center rounded-xl"
                            >
                                <Filter className="w-3.5 h-3.5" />
                                <span>Filter</span>
                            </button>
                        </form>
                    </div>
                </div>

                {/* 3. STANDARDIZED INQUIRIES TABLE WITH UN-CLIPPED ACTIONS (⋮) DROPDOWN */}
                <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs overflow-visible" ref={menuRef}>
                    <div className="overflow-x-auto overflow-y-visible">
                        <table className="w-full text-left text-xs text-[#4D4B55] table-fixed">
                            <thead className="bg-[#0B1C30] text-white font-bold uppercase tracking-wider text-[10px]">
                                <tr>
                                    <th className="py-3.5 px-5 w-[32%]">Sender & Subject</th>
                                    <th className="py-3.5 px-5 w-[22%]">Contact Details</th>
                                    <th className="py-3.5 px-5 w-[24%]">Message Snippet</th>
                                    <th className="py-3.5 px-5 w-[12%]">Triage Status</th>
                                    <th className="py-3.5 px-5 w-[10%] text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {messages.data.length === 0 ? (
                                    <tr className="h-[340px]">
                                        <td colSpan={5} className="py-12 text-center text-gray-500">
                                            <div className="max-w-xs mx-auto text-center space-y-2">
                                                <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                                                    <Mail className="w-6 h-6" />
                                                </div>
                                                <div className="font-bold text-gray-700">No Inbound Inquiries Found</div>
                                                <p className="text-xs text-gray-400">
                                                    Try adjusting your search filters or status criteria.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    <>
                                        {messages.data.map((msg, idx) => {
                                            const isMenuOpen = openActionId === msg.id;
                                            const openUpward = idx >= messages.data.length - 1 || idx >= 2;

                                            return (
                                                <tr
                                                    key={msg.id}
                                                    className={`h-[68px] hover:bg-slate-50/80 transition-colors ${
                                                        msg.status === 'Unread' ? 'bg-amber-50/20' : ''
                                                    }`}
                                                >
                                                    {/* Sender & Subject */}
                                                    <td className="py-3.5 px-5">
                                                        <div className="flex items-start gap-3">
                                                            <div className="w-9 h-9 rounded-lg bg-[#0B1C30] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs mt-0.5">
                                                                {msg.name ? msg.name.charAt(0).toUpperCase() : 'M'}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <div
                                                                    className="font-bold text-[#0B1C30] text-sm hover:text-[#DA7A31] transition-colors cursor-pointer truncate"
                                                                    onClick={() => {
                                                                        setSelectedMsg(msg);
                                                                        if (msg.status === 'Unread') setStatus(msg.id, 'Read');
                                                                    }}
                                                                >
                                                                    {msg.subject}
                                                                </div>
                                                                <div className="text-[11px] text-gray-600 flex items-center gap-1.5 mt-0.5 truncate">
                                                                    <User className="w-3 h-3 text-[#DA7A31] shrink-0" />
                                                                    <span className="font-medium truncate">{msg.name}</span>
                                                                    <span className="text-gray-400">&bull;</span>
                                                                    <span className="text-gray-400 truncate">
                                                                        {new Date(msg.created_at).toLocaleDateString()}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Contact Details */}
                                                    <td className="py-3.5 px-5 space-y-0.5">
                                                        {msg.email ? (
                                                            <div className="flex items-center gap-1.5 text-gray-700 truncate">
                                                                <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                                                <a
                                                                    href={`mailto:${msg.email}`}
                                                                    className="hover:underline hover:text-[#DA7A31] truncate"
                                                                >
                                                                    {msg.email}
                                                                </a>
                                                            </div>
                                                        ) : (
                                                            <span className="text-gray-400 italic">No email</span>
                                                        )}
                                                        {msg.phone && (
                                                            <div className="flex items-center gap-1.5 text-gray-600 text-[11px] truncate">
                                                                <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                                                <span className="truncate">{msg.phone}</span>
                                                            </div>
                                                        )}
                                                    </td>

                                                    {/* Message Snippet */}
                                                    <td className="py-3.5 px-5">
                                                        <p className="text-xs text-[#4D4B55] line-clamp-2 italic font-medium">
                                                            "{msg.message}"
                                                        </p>
                                                    </td>

                                                    {/* Status Badge */}
                                                    <td className="py-3.5 px-5">
                                                        <span
                                                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                                                                msg.status === 'Resolved'
                                                                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                                                    : msg.status === 'Unread'
                                                                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                                                    : 'bg-slate-100 text-slate-800 border border-slate-300'
                                                            }`}
                                                        >
                                                            <span
                                                                className={`w-1.5 h-1.5 rounded-full ${
                                                                    msg.status === 'Unread'
                                                                        ? 'bg-amber-600 animate-pulse'
                                                                        : msg.status === 'Resolved'
                                                                        ? 'bg-emerald-600'
                                                                        : 'bg-slate-500'
                                                                }`}
                                                            />
                                                            {msg.status}
                                                        </span>
                                                    </td>

                                                    {/* UN-CLIPPED ACTIONS (⋮) DROPDOWN */}
                                                    <td className="py-3.5 px-5 text-right relative">
                                                        <div className="relative inline-block text-left">
                                                            <button
                                                                type="button"
                                                                onClick={() => setOpenActionId(isMenuOpen ? null : msg.id)}
                                                                className={`p-2 rounded-lg transition-colors border ${
                                                                    isMenuOpen
                                                                        ? 'bg-[#0B1C30] text-white border-[#0B1C30]'
                                                                        : 'text-gray-600 hover:text-[#0B1C30] hover:bg-gray-100 border-gray-200'
                                                                }`}
                                                                title="Message Actions"
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
                                                                            setSelectedMsg(msg);
                                                                            if (msg.status === 'Unread') setStatus(msg.id, 'Read');
                                                                        }}
                                                                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-gray-700 hover:bg-slate-50 hover:text-[#0B1C30] transition font-medium"
                                                                    >
                                                                        <Eye className="w-4 h-4 text-slate-500" />
                                                                        <span>Read Message</span>
                                                                    </button>

                                                                    {msg.status !== 'Resolved' ? (
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {
                                                                            setOpenActionId(null);
                                                                            setStatus(msg.id, 'Resolved');
                                                                        }}
                                                                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-emerald-700 hover:bg-emerald-50 hover:text-emerald-900 transition font-medium"
                                                                    >
                                                                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                                                        <span>Mark Resolved</span>
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setOpenActionId(null);
                                                                            setStatus(msg.id, 'Unread');
                                                                        }}
                                                                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-amber-800 hover:bg-amber-50 hover:text-amber-900 transition font-medium"
                                                                    >
                                                                        <Clock className="w-4 h-4 text-amber-600" />
                                                                        <span>Mark Unread</span>
                                                                    </button>
                                                                )}

                                                                <div className="my-1 border-t border-gray-100" />

                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setOpenActionId(null);
                                                                        setDeletingMsg(msg);
                                                                    }}
                                                                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-rose-700 hover:bg-rose-50 hover:text-rose-900 transition font-medium"
                                                                >
                                                                    <Trash2 className="w-4 h-4 text-rose-600" />
                                                                    <span>Delete</span>
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    {/* Empty rows to guarantee exact 5-row table height */}
                                    {Array.from({ length: Math.max(0, 5 - messages.data.length) }).map((_, i) => (
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
                {messages.links && messages.links.length > 0 && (
                        <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
                            <div>
                                Showing <span className="font-semibold text-[#0B1C30]">{messages.from || 1}</span> to{' '}
                                <span className="font-semibold text-[#0B1C30]">{messages.to || messages.data.length}</span> of{' '}
                                <span className="font-semibold text-[#0B1C30]">{messages.total}</span> inquiries
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {messages.links
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

            {/* VIEW MESSAGE MODAL */}
            {selectedMsg && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-gray-200 relative max-h-[85vh] flex flex-col">
                        <div className="bg-[#0B1C30] px-6 py-4 flex items-center justify-between text-white shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#DA7A31]/20 border border-[#DA7A31]/40 flex items-center justify-center text-[#DA7A31]">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold tracking-tight">Contact Inquiry Details</h3>
                                    <p className="text-xs text-gray-300">
                                        Received {new Date(selectedMsg.created_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedMsg(null)}
                                className="p-1 text-gray-400 hover:text-white rounded-lg transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto space-y-4 text-xs flex-1 text-gray-900">
                            <div className="flex items-center gap-2 mb-2">
                                <span
                                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                                        selectedMsg.status === 'Resolved'
                                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                            : 'bg-amber-100 text-amber-900 border-amber-300'
                                    }`}
                                >
                                    {selectedMsg.status}
                                </span>
                            </div>

                            <h3 className="text-base font-bold text-[#0B1C30]">{selectedMsg.subject}</h3>

                            <div className="bg-slate-50 p-4 rounded-xl text-xs space-y-1.5 border border-slate-100 font-medium">
                                <div>
                                    <span className="font-bold text-gray-600">From:</span> {selectedMsg.name}
                                </div>
                                <div>
                                    <span className="font-bold text-gray-600">Email:</span>{' '}
                                    <a
                                        href={`mailto:${selectedMsg.email}`}
                                        className="text-[#DA7A31] font-semibold hover:underline"
                                    >
                                        {selectedMsg.email}
                                    </a>
                                </div>
                                {selectedMsg.phone && (
                                    <div>
                                        <span className="font-bold text-gray-600">Phone:</span> {selectedMsg.phone}
                                    </div>
                                )}
                            </div>

                            <div className="text-xs text-[#4D4B55] leading-relaxed whitespace-pre-wrap bg-white p-4 rounded-xl border border-gray-200 font-medium">
                                {selectedMsg.message}
                            </div>
                        </div>

                        {/* Sticky Footer */}
                        <div className="shrink-0 bg-gray-50 border-t border-gray-200 p-4 flex items-center justify-end gap-3 z-20">
                            {selectedMsg.status !== 'Resolved' && (
                                <button
                                    onClick={() => {
                                        setStatus(selectedMsg.id, 'Resolved');
                                        setSelectedMsg(null);
                                    }}
                                    className="lmc-btn lmc-btn-primary h-[42px] py-0 px-4 text-xs font-semibold rounded-xl inline-flex items-center justify-center gap-2 shadow-2xs"
                                >
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span>Mark as Resolved</span>
                                </button>
                            )}
                            <button
                                onClick={() => setSelectedMsg(null)}
                                className="lmc-btn lmc-btn-secondary h-[42px] py-0 px-4 text-xs font-semibold rounded-xl inline-flex items-center justify-center"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* DELETE CONFIRMATION MODAL */}
            {deletingMsg && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-200 text-center">
                        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="w-6 h-6" />
                        </div>
                        <h3 className="text-base font-bold text-[#0B1C30] mb-2">Delete Inquiry?</h3>
                        <p className="text-xs text-gray-500 mb-6">
                            Are you sure you want to remove inquiry{' '}
                            <span className="font-bold text-[#0B1C30]">"{deletingMsg.subject}"</span> from{' '}
                            <span className="font-bold text-[#0B1C30]">{deletingMsg.name}</span>? This action cannot be undone.
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <button
                                onClick={() => setDeletingMsg(null)}
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
