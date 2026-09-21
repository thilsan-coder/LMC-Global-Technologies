import React, { useState, useEffect, useRef } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import type { LeadItem, User } from '@/types';
import {
    Briefcase,
    Plus,
    Search,
    Edit2,
    Trash2,
    DollarSign,
    UserCheck,
    X,
    Filter,
    Building2,
    Mail,
    Phone,
    TrendingUp,
    AlertCircle,
    User as UserIcon,
    CheckCircle2,
    Clock,
    MoreVertical,
    Eye,
    Tag,
    FileText,
} from 'lucide-react';
import CustomDropdown, { CustomDropdownOption } from '@/Components/CustomDropdown';

interface LeadsProps {
    leads: {
        data: LeadItem[];
        links: any[];
        total: number;
        from?: number;
        to?: number;
    };
    staffUsers: User[];
    filters: {
        search?: string;
        status?: string;
    };
}

const PIPELINE_STAGE_OPTIONS: CustomDropdownOption[] = [
    { value: '', label: 'All Pipeline Stages' },
    { value: 'New', label: 'New' },
    { value: 'Contacted', label: 'Contacted' },
    { value: 'Qualified', label: 'Qualified' },
    { value: 'Proposal', label: 'Proposal' },
    { value: 'Won', label: 'Won' },
    { value: 'Lost', label: 'Lost' },
];

const LEAD_SOURCE_OPTIONS: CustomDropdownOption[] = [
    { value: 'Website', label: 'Website' },
    { value: 'Referral', label: 'Referral' },
    { value: 'LinkedIn', label: 'LinkedIn' },
    { value: 'Direct', label: 'Direct' },
    { value: 'Other', label: 'Other' },
];

export default function Leads({ leads, staffUsers, filters }: LeadsProps) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingLead, setEditingLead] = useState<LeadItem | null>(null);
    const [viewingLead, setViewingLead] = useState<LeadItem | null>(null);
    const [deletingLead, setDeletingLead] = useState<LeadItem | null>(null);

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

    const { data, setData, post, put, processing, reset, errors, clearErrors } = useForm({
        name: '',
        company: '',
        email: '',
        phone: '',
        source: 'Website',
        status: 'New' as LeadItem['status'],
        estimated_value: '' as string | number,
        assigned_to: '' as string | number,
        notes: '',
    });

    const handleSearch = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        router.get(
            route('admin.crm.leads'),
            { search: searchTerm, status: statusFilter },
            { preserveState: true }
        );
    };

    const openCreate = () => {
        setEditingLead(null);
        clearErrors();
        reset();
        setData({
            name: '',
            company: '',
            email: '',
            phone: '',
            source: 'Website',
            status: 'New',
            estimated_value: '',
            assigned_to: '',
            notes: '',
        });
        setModalOpen(true);
    };

    const openEdit = (lead: LeadItem) => {
        setEditingLead(lead);
        clearErrors();
        setData({
            name: lead.name || '',
            company: lead.company || '',
            email: lead.email || '',
            phone: lead.phone || '',
            source: lead.source || 'Website',
            status: lead.status || 'New',
            estimated_value: lead.estimated_value || '',
            assigned_to: lead.assigned_to ? String(lead.assigned_to) : '',
            notes: lead.notes || '',
        });
        setModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingLead) {
            put(route('admin.crm.leads.update', editingLead.id), {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        } else {
            post(route('admin.crm.leads.store'), {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        }
    };

    const confirmDelete = () => {
        if (deletingLead) {
            router.delete(route('admin.crm.leads.destroy', deletingLead.id), {
                onSuccess: () => setDeletingLead(null),
            });
        }
    };

    const statusBadgeColor = (status: LeadItem['status']) => {
        switch (status) {
            case 'New':
                return 'bg-blue-100 text-blue-900 border-blue-300';
            case 'Contacted':
                return 'bg-indigo-100 text-indigo-900 border-indigo-300';
            case 'Qualified':
                return 'bg-purple-100 text-purple-900 border-purple-300';
            case 'Proposal':
                return 'bg-amber-100 text-amber-900 border-amber-300';
            case 'Won':
                return 'bg-emerald-100 text-emerald-900 border-emerald-300';
            case 'Lost':
                return 'bg-slate-100 text-slate-800 border-slate-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    const totalLeads = leads.total || 0;
    const wonLeadsCount = leads.data.filter((l) => l.status === 'Won').length;
    const activeLeadsCount = leads.data.filter((l) => !['Won', 'Lost'].includes(l.status)).length;
    const totalEstValue = leads.data.reduce((acc, l) => acc + (Number(l.estimated_value) || 0), 0);

    const staffDropdownOptions: CustomDropdownOption[] = [
        { value: '', label: '-- Leave Unassigned --' },
        ...staffUsers.map((u) => ({ value: String(u.id), label: `${u.name} (${u.email})` })),
    ];

    return (
        <AdminLayout title="Sales Leads Pipeline" subtitle="Opportunity Management & Forecast">
            <Head title="Sales Leads - CRM" />

            <div className="space-y-6">
                {/* 1. EXECUTIVE METRICS SUMMARY */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Total Leads
                            </div>
                            <div className="text-2xl font-bold text-[#0B1C30] mt-1">{totalLeads}</div>
                            <div className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
                                <TrendingUp className="w-3.5 h-3.5 text-[#DA7A31]" />
                                <span>Total Opportunities</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-[#0B1C30]/5 border border-[#0B1C30]/10 flex items-center justify-center text-[#0B1C30]">
                            <Briefcase className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Active Pipeline
                            </div>
                            <div className="text-2xl font-bold text-blue-600 mt-1">{activeLeadsCount}</div>
                            <div className="text-[11px] text-blue-700/80 mt-1 flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-blue-500" />
                                <span>In Progress Deals</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Won Deals
                            </div>
                            <div className="text-2xl font-bold text-emerald-600 mt-1">{wonLeadsCount}</div>
                            <div className="text-[11px] text-emerald-700/80 mt-1 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                <span>Successfully Closed</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Est. Pipeline Value
                            </div>
                            <div className="text-2xl font-bold text-[#0B1C30] mt-1">
                                ${totalEstValue.toLocaleString()}
                            </div>
                            <div className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
                                <DollarSign className="w-3.5 h-3.5 text-[#DA7A31]" />
                                <span>Forecasted Value</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-[#DA7A31]/10 border border-[#DA7A31]/20 flex items-center justify-center text-[#DA7A31]">
                            <DollarSign className="w-6 h-6" />
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
                                    placeholder="Search by lead name, company, email..."
                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                />
                            </div>

                            {/* Status Filter Dropdown */}
                            <CustomDropdown
                                value={statusFilter}
                                onChange={(val) => {
                                    setStatusFilter(val);
                                    router.get(
                                        route('admin.crm.leads'),
                                        { search: searchTerm, status: val },
                                        { preserveState: true }
                                    );
                                }}
                                options={PIPELINE_STAGE_OPTIONS}
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
                            <span>New Sales Lead</span>
                        </button>
                    </div>
                </div>

                {/* 3. TABLE WITH UN-CLIPPED ACTIONS (⋮) DROPDOWN */}
                <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs overflow-visible" ref={menuRef}>
                    <div className="overflow-x-auto overflow-y-visible">
                        <table className="w-full text-left text-xs text-[#4D4B55] table-fixed">
                            <thead className="bg-[#0B1C30] text-white font-bold uppercase tracking-wider text-[10px]">
                                <tr>
                                    <th className="py-3.5 px-5 w-[30%]">Lead / Company</th>
                                    <th className="py-3.5 px-5 w-[22%]">Est. Value & Source</th>
                                    <th className="py-3.5 px-5 w-[18%]">Pipeline Stage</th>
                                    <th className="py-3.5 px-5 w-[18%]">Assigned Specialist</th>
                                    <th className="py-3.5 px-5 w-[12%] text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {leads.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="h-[340px] text-center text-gray-500">
                                            <div className="max-w-xs mx-auto text-center space-y-2">
                                                <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                                                    <Briefcase className="w-6 h-6" />
                                                </div>
                                                <div className="font-bold text-gray-700">No Sales Leads Found</div>
                                                <p className="text-xs text-gray-400">
                                                    Try adjusting your search criteria or register a new sales opportunity.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    <>
                                        {leads.data.map((l, idx) => {
                                            const leadTitle = l.company || l.name;
                                            const isMenuOpen = openActionId === l.id;
                                            const openUpward = idx >= leads.data.length - 1 || idx >= 2;

                                            return (
                                                <tr key={l.id} className="hover:bg-slate-50/80 transition-colors h-[68px]">
                                                    {/* Lead Title & Contact Name */}
                                                    <td className="py-3.5 px-5">
                                                        <div className="flex items-start gap-3">
                                                            <div className="w-9 h-9 rounded-lg bg-[#0B1C30] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs mt-0.5">
                                                                {leadTitle.charAt(0)}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <div
                                                                    className="font-bold text-[#0B1C30] text-sm hover:text-[#DA7A31] transition-colors cursor-pointer truncate"
                                                                    onClick={() => setViewingLead(l)}
                                                                >
                                                                    {leadTitle}
                                                                </div>
                                                                <div className="text-[11px] text-gray-600 flex items-center gap-1.5 mt-0.5 truncate">
                                                                    <UserIcon className="w-3 h-3 text-[#DA7A31] shrink-0" />
                                                                    <span className="font-medium truncate">{l.name}</span>
                                                                    {l.email && (
                                                                        <>
                                                                            <span className="text-gray-300">&bull;</span>
                                                                            <span className="text-gray-500 truncate">{l.email}</span>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Est Value & Source */}
                                                    <td className="py-3.5 px-5 space-y-1">
                                                        <div className="font-bold text-[#0B1C30] text-xs">
                                                            {l.estimated_value ? `$${Number(l.estimated_value).toLocaleString()}` : '$0'}
                                                        </div>
                                                        <div className="text-[11px] text-gray-500 flex items-center gap-1 truncate">
                                                            <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-[10px] font-semibold border border-gray-200 truncate">
                                                                {l.source}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    {/* Pipeline Stage Badge */}
                                                    <td className="py-3.5 px-5">
                                                        <span
                                                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                                                                l.status === 'Won'
                                                                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                                                    : l.status === 'Lost'
                                                                    ? 'bg-slate-100 text-slate-800 border border-slate-300'
                                                                    : l.status === 'Proposal'
                                                                    ? 'bg-indigo-100 text-indigo-900 border border-indigo-300'
                                                                    : 'bg-amber-100 text-amber-900 border border-amber-300'
                                                            }`}
                                                        >
                                                            <span
                                                                className={`w-1.5 h-1.5 rounded-full ${
                                                                    l.status === 'Won'
                                                                        ? 'bg-emerald-600 animate-pulse'
                                                                        : l.status === 'Lost'
                                                                        ? 'bg-slate-500'
                                                                        : 'bg-amber-500'
                                                                }`}
                                                            />
                                                            {l.status}
                                                        </span>
                                                    </td>

                                                    {/* Assigned Specialist */}
                                                    <td className="py-3.5 px-5">
                                                        <div className="text-xs font-semibold text-gray-800 truncate">
                                                            {l.assigned_user?.name || 'Unassigned'}
                                                        </div>
                                                        <div className="text-[11px] text-gray-400 truncate">
                                                            {l.assigned_user?.email || 'Awaiting assignment'}
                                                        </div>
                                                    </td>

                                                    {/* UN-CLIPPED ACTIONS (⋮) DROPDOWN */}
                                                    <td className="py-3.5 px-5 text-right relative">
                                                        <div className="relative inline-block text-left">
                                                            <button
                                                                type="button"
                                                                onClick={() => setOpenActionId(isMenuOpen ? null : l.id)}
                                                                className={`p-2 rounded-lg transition-colors border ${
                                                                    isMenuOpen
                                                                        ? 'bg-[#0B1C30] text-white border-[#0B1C30]'
                                                                        : 'text-gray-600 hover:text-[#0B1C30] hover:bg-gray-100 border-gray-200'
                                                                }`}
                                                                title="Lead Actions"
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
                                                                            setViewingLead(l);
                                                                        }}
                                                                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-gray-700 hover:bg-slate-50 hover:text-[#0B1C30] transition font-medium"
                                                                    >
                                                                        <Eye className="w-4 h-4 text-slate-500" />
                                                                        <span>View Profile</span>
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setOpenActionId(null);
                                                                            openEdit(l);
                                                                        }}
                                                                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-amber-800 hover:bg-amber-50 hover:text-amber-900 transition font-medium"
                                                                    >
                                                                        <Edit2 className="w-4 h-4 text-amber-600" />
                                                                        <span>Edit Lead</span>
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setOpenActionId(null);
                                                                            handleConvert(l);
                                                                        }}
                                                                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-emerald-700 hover:bg-emerald-50 hover:text-emerald-900 transition font-medium"
                                                                    >
                                                                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                                                        <span>Convert to Customer</span>
                                                                    </button>
                                                                    <div className="my-1 border-t border-gray-100" />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setOpenActionId(null);
                                                                            setDeletingLead(l);
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
                                        {Array.from({ length: Math.max(0, 5 - leads.data.length) }).map((_, i) => (
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
                            Showing <span className="font-semibold text-[#0B1C30]">{leads.from || (leads.total > 0 ? 1 : 0)}</span> to{' '}
                            <span className="font-semibold text-[#0B1C30]">{leads.to || leads.data.length}</span> of{' '}
                            <span className="font-semibold text-[#0B1C30]">{leads.total}</span> leads
                        </div>
                        {leads.links && leads.links.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                                {leads.links
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

            {/* CREATE / EDIT MODAL WITH CUSTOMERS PAGE STANDARD */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-gray-200 relative max-h-[90vh] flex flex-col">
                        {/* Modal Header */}
                        <div className="bg-[#0B1C30] px-6 py-4 flex items-center justify-between text-white shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#DA7A31]/20 border border-[#DA7A31]/40 flex items-center justify-center text-[#DA7A31]">
                                    <Briefcase className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold tracking-tight">
                                        {editingLead ? 'Edit Sales Lead Opportunity' : 'Register New Sales Lead'}
                                    </h3>
                                    <p className="text-xs text-gray-300">
                                        {editingLead ? `Updating lead details for ${editingLead.company || editingLead.name}` : 'Fill in deal specifics to log a new opportunity'}
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => setModalOpen(false)} className="p-1 text-gray-400 hover:text-white rounded-lg transition">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Form Body */}
                        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0 overflow-hidden">
                            <div className="p-6 overflow-y-auto space-y-6 text-xs flex-1 text-gray-900">
                                {/* SECTION 1: CORPORATE & OPPORTUNITY INFORMATION */}
                                <div>
                                    <div className="text-[11px] font-bold text-[#DA7A31] uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <Building2 className="w-4 h-4" />
                                        <span>1. Corporate & Opportunity Information</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">
                                                Company / Organization Name <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <Building2 className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                                                <input
                                                    type="text"
                                                    value={data.company}
                                                    onChange={(e) => setData('company', e.target.value)}
                                                    placeholder="e.g. Ceylinco Agro Exports (Pvt) Ltd"
                                                    required
                                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                                />
                                            </div>
                                            {errors.company && <p className="text-red-500 text-[11px] mt-1">{errors.company}</p>}
                                        </div>

                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">
                                                Contact Person Name <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <UserIcon className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                                                <input
                                                    type="text"
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    placeholder="e.g. Priyantha Fernando"
                                                    required
                                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                                />
                                            </div>
                                            {errors.name && <p className="text-red-500 text-[11px] mt-1">{errors.name}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION 2: CONTACT & COMMERCIAL TERMS */}
                                <div className="pt-4 border-t border-gray-100">
                                    <div className="text-[11px] font-bold text-[#DA7A31] uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <DollarSign className="w-4 h-4" />
                                        <span>2. Contact & Commercial Terms</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">Corporate Email Address</label>
                                            <div className="relative">
                                                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                                                <input
                                                    type="email"
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    placeholder="e.g. export@ceylincoagro.lk"
                                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">Contact Phone Number</label>
                                            <div className="relative">
                                                <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                                                <input
                                                    type="text"
                                                    value={data.phone}
                                                    onChange={(e) => setData('phone', e.target.value)}
                                                    placeholder="e.g. +94 77 999 1234"
                                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">Est. Deal Value ($)</label>
                                            <div className="relative">
                                                <DollarSign className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                                                <input
                                                    type="number"
                                                    step="100"
                                                    value={data.estimated_value}
                                                    onChange={(e) => setData('estimated_value', e.target.value)}
                                                    placeholder="e.g. 45000"
                                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">Pipeline Stage <span className="text-red-500">*</span></label>
                                            <CustomDropdown
                                                value={data.status}
                                                onChange={(val) => setData('status', val as LeadItem['status'])}
                                                options={PIPELINE_STAGE_OPTIONS.filter((o) => o.value !== '')}
                                                variant="white"
                                                className="w-full"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION 3: ALLOCATION & REQUIREMENTS */}
                                <div className="pt-4 border-t border-gray-100 space-y-4">
                                    <div className="text-[11px] font-bold text-[#DA7A31] uppercase tracking-wider mb-1 flex items-center gap-2">
                                        <FileText className="w-4 h-4" />
                                        <span>3. Allocation & Requirements</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">Lead Source</label>
                                            <CustomDropdown
                                                value={data.source}
                                                onChange={(val) => setData('source', val)}
                                                options={LEAD_SOURCE_OPTIONS}
                                                variant="white"
                                                className="w-full"
                                            />
                                        </div>

                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">Assigned Account Manager</label>
                                            <CustomDropdown
                                                value={String(data.assigned_to)}
                                                onChange={(val) => setData('assigned_to', val)}
                                                options={staffDropdownOptions}
                                                variant="white"
                                                className="w-full"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block font-semibold text-[#0B1C30] mb-1">Opportunity Notes & Scope</label>
                                            <textarea
                                                rows={3}
                                                value={data.notes}
                                                onChange={(e) => setData('notes', e.target.value)}
                                                placeholder="e.g. Requesting full ERP system migration with inventory control..."
                                                className="w-full p-3 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                            />
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
                                    <span>{processing ? 'Saving Opportunity...' : editingLead ? 'Update Sales Lead' : 'Save Opportunity'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* VIEW PROFILE / DETAILS MODAL */}
            {viewingLead && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-gray-200 relative">
                        <div className="bg-[#0B1C30] p-6 text-white relative">
                            <button
                                onClick={() => setViewingLead(null)}
                                className="absolute top-4 right-4 p-1 text-gray-400 hover:text-white rounded-lg"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-[#DA7A31] text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0">
                                    {(viewingLead.company || viewingLead.name).charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">{viewingLead.company || viewingLead.name}</h3>
                                    <div className="text-xs text-gray-300 flex items-center gap-1.5 mt-0.5">
                                        <UserIcon className="w-3.5 h-3.5 text-[#DA7A31]" />
                                        <span>Contact: {viewingLead.name}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 space-y-4 text-xs text-gray-900">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <div className="text-gray-400 text-[10px] font-bold uppercase">Pipeline Stage</div>
                                    <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${statusBadgeColor(viewingLead.status)}`}>
                                        {viewingLead.status}
                                    </span>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <div className="text-gray-400 text-[10px] font-bold uppercase">Est. Deal Value</div>
                                    <div className="font-bold text-[#0B1C30] text-sm mt-1">
                                        {viewingLead.estimated_value ? `$${Number(viewingLead.estimated_value).toLocaleString()}` : 'N/A'}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 pt-2 border-t border-gray-100">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Mail className="w-4 h-4 text-[#DA7A31] shrink-0" />
                                    <span className="font-semibold shrink-0">Email:</span>
                                    <span>{viewingLead.email || 'N/A'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Phone className="w-4 h-4 text-[#DA7A31] shrink-0" />
                                    <span className="font-semibold shrink-0">Phone:</span>
                                    <span>{viewingLead.phone || 'N/A'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Tag className="w-4 h-4 text-[#DA7A31] shrink-0" />
                                    <span className="font-semibold shrink-0">Lead Source:</span>
                                    <span>{viewingLead.source}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <UserCheck className="w-4 h-4 text-[#DA7A31] shrink-0" />
                                    <span className="font-semibold shrink-0">Specialist:</span>
                                    <span>{viewingLead.assigned_user ? viewingLead.assigned_user.name : 'Unassigned'}</span>
                                </div>
                            </div>

                            {viewingLead.notes && (
                                <div className="pt-2 border-t border-gray-100">
                                    <div className="font-bold text-[#0B1C30] mb-1">Opportunity Notes</div>
                                    <p className="p-3 bg-slate-50 rounded-xl text-gray-600 border border-slate-100">
                                        {viewingLead.notes}
                                    </p>
                                </div>
                            )}

                            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                <button
                                    onClick={() => {
                                        const l = viewingLead;
                                        setViewingLead(null);
                                        openEdit(l);
                                    }}
                                    className="px-4 py-2 text-xs font-bold text-[#0B1C30] bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-300 transition"
                                >
                                    <Edit2 className="w-3.5 h-3.5 inline mr-1.5" />
                                    <span>Edit Lead</span>
                                </button>
                                <button
                                    onClick={() => setViewingLead(null)}
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
            {deletingLead && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-200 text-center">
                        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="w-6 h-6" />
                        </div>
                        <h3 className="text-base font-bold text-[#0B1C30] mb-2">Delete Lead Opportunity?</h3>
                        <p className="text-xs text-gray-500 mb-6">
                            Are you sure you want to remove <span className="font-bold text-[#0B1C30]">{deletingLead.company || deletingLead.name}</span>? This action cannot be undone.
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <button
                                onClick={() => setDeletingLead(null)}
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
