import React, { useState, useEffect, useRef } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { CustomerItem } from '@/types';
import {
    Users,
    Plus,
    Search,
    Edit2,
    Trash2,
    Building2,
    Phone,
    Mail,
    X,
    Filter,
    Eye,
    MapPin,
    ShieldCheck,
    CheckCircle2,
    XCircle,
    Activity,
    Layers,
    AlertCircle,
    User,
    MoreVertical,
    ChevronDown,
    UploadCloud,
    FileText,
    Check,
} from 'lucide-react';

interface CustomersProps {
    customers: {
        data: CustomerItem[];
        links: any[];
        total: number;
        from?: number;
        to?: number;
    };
    filters: {
        search?: string;
        status?: string;
        industry?: string;
    };
}

const INDUSTRY_OPTIONS = [
    'Logistics & Supply Chain',
    'Healthcare & MedTech',
    'CleanTech & IoT',
    'Software & Cloud Architecture',
    'FinTech & Financial Services',
    'Retail & E-Commerce',
    'Education & Academics',
    'Manufacturing & Industrial',
    'Other Enterprise Sector',
];

import CustomDropdown, { CustomDropdownOption } from '@/Components/CustomDropdown';

export default function Customers({ customers, filters }: CustomersProps) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [industryFilter, setIndustryFilter] = useState(filters.industry || '');

    const [modalOpen, setModalOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState<CustomerItem | null>(null);
    const [viewingCustomer, setViewingCustomer] = useState<CustomerItem | null>(null);
    const [deletingCustomer, setDeletingCustomer] = useState<CustomerItem | null>(null);

    // Active row action dropdown state (c.id or null)
    const [openActionId, setOpenActionId] = useState<number | null>(null);

    const menuRef = useRef<HTMLDivElement>(null);

    const STATUS_FILTER_OPTIONS: CustomDropdownOption[] = [
        { value: '', label: 'All Account Statuses' },
        { value: 'active', label: 'Active Retainer' },
        { value: 'inactive', label: 'Inactive / On Hold' },
    ];

    const INDUSTRY_FILTER_OPTIONS: CustomDropdownOption[] = [
        { value: '', label: 'All Industry Sectors' },
        ...INDUSTRY_OPTIONS.map((ind) => ({ value: ind, label: ind })),
    ];

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
        address: '',
        industry: INDUSTRY_OPTIONS[0],
        status: 'active' as 'active' | 'inactive',
        notes: '',
    });

    // Dynamic metrics calculation
    const totalCustomers = customers.total || 0;
    const activeCustomersCount = customers.data.filter((c) => c.status === 'active').length;
    const inactiveCustomersCount = customers.data.filter((c) => c.status === 'inactive').length;
    const uniqueIndustriesCount = new Set(customers.data.map((c) => c.industry).filter(Boolean)).size;

    const handleSearch = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        router.get(
            route('admin.crm.customers'),
            {
                search: searchTerm,
                status: statusFilter,
                industry: industryFilter,
            },
            { preserveState: true }
        );
    };

    const openCreate = () => {
        setEditingCustomer(null);
        clearErrors();
        reset();
        setData({
            name: '',
            company: '',
            email: '',
            phone: '',
            address: '',
            industry: INDUSTRY_OPTIONS[0],
            status: 'active',
            notes: '',
        });
        setModalOpen(true);
    };

    const openEdit = (customer: CustomerItem) => {
        setEditingCustomer(customer);
        clearErrors();
        setData({
            name: customer.name || '',
            company: customer.company || '',
            email: customer.email || '',
            phone: customer.phone || '',
            address: customer.address || '',
            industry: customer.industry || INDUSTRY_OPTIONS[0],
            status: customer.status || 'active',
            notes: customer.notes || '',
        });
        setModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingCustomer) {
            put(route('admin.crm.customers.update', editingCustomer.id), {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        } else {
            post(route('admin.crm.customers.store'), {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        }
    };

    const confirmDelete = () => {
        if (!deletingCustomer) return;
        router.delete(route('admin.crm.customers.destroy', deletingCustomer.id), {
            onSuccess: () => setDeletingCustomer(null),
        });
    };

    return (
        <AdminLayout title="Enterprise Customers" subtitle="Account Roster & Portfolio CRM">
            <Head title="Customers - Enterprise CRM" />

            <div className="space-y-6">
                {/* 1. EXECUTIVE METRICS SUMMARY */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Total Accounts
                            </div>
                            <div className="text-2xl font-bold text-[#0B1C30] mt-1">{totalCustomers}</div>
                            <div className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
                                <Building2 className="w-3.5 h-3.5 text-[#DA7A31]" />
                                <span>Corporate Accounts</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-[#0B1C30]/5 border border-[#0B1C30]/10 flex items-center justify-center text-[#0B1C30]">
                            <Users className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Active Retainers
                            </div>
                            <div className="text-2xl font-bold text-emerald-600 mt-1">
                                {activeCustomersCount}
                            </div>
                            <div className="text-[11px] text-emerald-700/80 mt-1 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                <span>Active Retainer SLA</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                            <Activity className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Inactive Accounts
                            </div>
                            <div className="text-2xl font-bold text-slate-700 mt-1">
                                {inactiveCustomersCount}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                                <XCircle className="w-3.5 h-3.5 text-slate-400" />
                                <span>Pending Renewal</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
                            <XCircle className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Industry Sectors
                            </div>
                            <div className="text-2xl font-bold text-indigo-600 mt-1">{uniqueIndustriesCount} Sectors</div>
                            <div className="text-[11px] text-indigo-600/80 mt-1 flex items-center gap-1">
                                <Layers className="w-3.5 h-3.5 text-indigo-500" />
                                <span>Cross-Industry Portfolio</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                            <Layers className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {/* 2. FILTER TOOLBAR & REGISTER BUTTON WITH CLEAN WHITE SELECT CONTROLS */}
                <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-2xs">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                        {/* Search & Select Filters */}
                        <form onSubmit={handleSearch} className="flex flex-1 flex-col sm:flex-row items-center gap-3 w-full">
                            {/* Search Bar */}
                            <div className="relative flex-1 w-full">
                                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search by company, contact person, email, or industry..."
                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                />
                            </div>

                            {/* Status Filter Dropdown */}
                            <CustomDropdown
                                value={statusFilter}
                                onChange={(val) => {
                                    setStatusFilter(val);
                                    router.get(
                                        route('admin.crm.customers'),
                                        { search: searchTerm, status: val, industry: industryFilter },
                                        { preserveState: true }
                                    );
                                }}
                                options={STATUS_FILTER_OPTIONS}
                                variant="navy"
                            />

                            {/* Industry Filter Dropdown */}
                            <CustomDropdown
                                value={industryFilter}
                                onChange={(val) => {
                                    setIndustryFilter(val);
                                    router.get(
                                        route('admin.crm.customers'),
                                        { search: searchTerm, status: statusFilter, industry: val },
                                        { preserveState: true }
                                    );
                                }}
                                options={INDUSTRY_FILTER_OPTIONS}
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

                        {/* Primary Add Button */}
                        <button
                            onClick={openCreate}
                            className="lmc-btn lmc-btn-primary lmc-btn-sm shrink-0 shadow-2xs w-full lg:w-auto justify-center rounded-xl"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Register New Customer</span>
                        </button>
                    </div>
                </div>

                {/* 3. CLEAN CUSTOMER ACCOUNTS TABLE WITH UN-CLIPPED ACTIONS (⋮) DROPDOWN */}
                <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs overflow-visible" ref={menuRef}>
                    <div className="overflow-x-auto overflow-y-visible">
                        <table className="w-full text-left text-xs text-[#4D4B55] table-fixed">
                            <thead className="bg-[#0B1C30] text-white font-bold uppercase tracking-wider text-[10px]">
                                <tr>
                                    <th className="py-3.5 px-5 w-[32%]">Enterprise Client Account</th>
                                    <th className="py-3.5 px-5 w-[26%]">Contact Details</th>
                                    <th className="py-3.5 px-5 w-[18%]">Industry Sector</th>
                                    <th className="py-3.5 px-5 w-[14%]">SLA Status</th>
                                    <th className="py-3.5 px-5 w-[10%] text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {customers.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="h-[340px] text-center text-gray-500">
                                            <div className="max-w-xs mx-auto text-center space-y-2">
                                                <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                                                    <Users className="w-6 h-6" />
                                                </div>
                                                <div className="font-bold text-gray-700">No Enterprise Accounts Found</div>
                                                <p className="text-xs text-gray-400">
                                                    Try adjusting your search criteria or register a new customer account.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    <>
                                        {customers.data.map((c, idx) => {
                                            const companyTitle = c.company || c.name;
                                            const contactPerson = c.name;
                                            const isMenuOpen = openActionId === c.id;
                                            // Open upward for bottom rows so menu is NEVER clipped by table bottom
                                            const openUpward = idx >= customers.data.length - 1 || idx >= 2;

                                            return (
                                                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors h-[68px]">
                                                    {/* Client Company Title & Contact Person Subtitle */}
                                                    <td className="py-3.5 px-5">
                                                        <div className="flex items-start gap-3">
                                                            <div className="w-9 h-9 rounded-lg bg-[#0B1C30] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs mt-0.5">
                                                                {companyTitle.charAt(0)}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <div
                                                                    className="font-bold text-[#0B1C30] text-sm hover:text-[#DA7A31] transition-colors cursor-pointer truncate"
                                                                    onClick={() => setViewingCustomer(c)}
                                                                >
                                                                    {companyTitle}
                                                                </div>
                                                                <div className="text-[11px] text-gray-600 flex items-center gap-1.5 mt-0.5 truncate">
                                                                    <User className="w-3 h-3 text-[#DA7A31] shrink-0" />
                                                                    <span className="font-medium truncate">Contact: {contactPerson}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Email & Phone */}
                                                    <td className="py-3.5 px-5 space-y-1">
                                                        {c.email ? (
                                                            <div className="flex items-center gap-1.5 text-gray-700 truncate">
                                                                <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                                                <a href={`mailto:${c.email}`} className="hover:underline hover:text-[#DA7A31] truncate">
                                                                    {c.email}
                                                                </a>
                                                            </div>
                                                        ) : (
                                                            <span className="text-gray-400 italic">No email provided</span>
                                                        )}
                                                        {c.phone && (
                                                            <div className="flex items-center gap-1.5 text-gray-600 text-[11px] truncate">
                                                                <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                                                <span className="truncate">{c.phone}</span>
                                                            </div>
                                                        )}
                                                    </td>

                                                    {/* Industry */}
                                                    <td className="py-3.5 px-5">
                                                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200 truncate max-w-full">
                                                            <Layers className="w-3.5 h-3.5 mr-1.5 text-[#0B1C30] shrink-0" />
                                                            <span className="truncate">{c.industry || 'General IT'}</span>
                                                        </span>
                                                    </td>

                                                    {/* Status Badge */}
                                                    <td className="py-3.5 px-5">
                                                        <span
                                                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${c.status === 'active'
                                                                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                                                : 'bg-slate-100 text-slate-800 border border-slate-300'
                                                                }`}
                                                        >
                                                            <span
                                                                className={`w-1.5 h-1.5 rounded-full ${c.status === 'active' ? 'bg-emerald-600 animate-pulse' : 'bg-slate-500'
                                                                    }`}
                                                            />
                                                            {c.status}
                                                        </span>
                                                    </td>

                                                    {/* UN-CLIPPED ACTIONS (⋮) DROPDOWN MENU WITH EXACT VIEW / EDIT / DELETE LABELS */}
                                                    <td className="py-3.5 px-5 text-right relative">
                                                        <div className="relative inline-block text-left">
                                                            <button
                                                                type="button"
                                                                onClick={() => setOpenActionId(isMenuOpen ? null : c.id)}
                                                                className={`p-2 rounded-lg transition-colors border ${isMenuOpen
                                                                    ? 'bg-[#0B1C30] text-white border-[#0B1C30]'
                                                                    : 'text-gray-600 hover:text-[#0B1C30] hover:bg-gray-100 border-gray-200'
                                                                    }`}
                                                                title="Customer Actions"
                                                            >
                                                                <MoreVertical className="w-4 h-4" />
                                                            </button>

                                                            {isMenuOpen && (
                                                                <div
                                                                    className={`absolute right-0 w-36 bg-white rounded-xl shadow-2xl border border-gray-200 py-1.5 z-50 animate-fadeIn text-left font-normal ${openUpward ? 'bottom-full mb-1.5' : 'top-full mt-1.5'
                                                                        }`}
                                                                >
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setOpenActionId(null);
                                                                            setViewingCustomer(c);
                                                                        }}
                                                                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-gray-700 hover:bg-slate-50 hover:text-[#0B1C30] transition font-medium"
                                                                    >
                                                                        <Eye className="w-4 h-4 text-slate-500" />
                                                                        <span>View</span>
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setOpenActionId(null);
                                                                            openEdit(c);
                                                                        }}
                                                                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-amber-800 hover:bg-amber-50 hover:text-amber-900 transition font-medium"
                                                                    >
                                                                        <Edit2 className="w-4 h-4 text-amber-600" />
                                                                        <span>Edit</span>
                                                                    </button>
                                                                    <div className="my-1 border-t border-gray-100" />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setOpenActionId(null);
                                                                            setDeletingCustomer(c);
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
                                        {Array.from({ length: Math.max(0, 5 - customers.data.length) }).map((_, i) => (
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
                            Showing <span className="font-semibold text-[#0B1C30]">{customers.from || (customers.total > 0 ? 1 : 0)}</span> to{' '}
                            <span className="font-semibold text-[#0B1C30]">{customers.to || customers.data.length}</span> of{' '}
                            <span className="font-semibold text-[#0B1C30]">{customers.total}</span> enterprise accounts
                        </div>
                        {customers.links && customers.links.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                                {customers.links
                                    .filter((link) => link.active || link.label.includes('Previous') || link.label.includes('&laquo;') || link.label.includes('Next') || link.label.includes('&raquo;'))
                                    .map((link, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => link.url && router.get(link.url, {}, { preserveScroll: true, preserveState: true })}
                                        disabled={!link.url}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-3 py-1.5 rounded-md text-xs transition-all ${link.active
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

            {/* 4. REGISTER / EDIT CUSTOMER MODAL WITH PROFESSIONAL DRAG-AND-DROP DESIGN & CLEAN WHITE INPUTS */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-gray-200 relative max-h-[90vh] flex flex-col">
                        {/* Modal Header */}
                        <div className="bg-[#0B1C30] px-6 py-4 flex items-center justify-between text-white shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#DA7A31]/20 border border-[#DA7A31]/40 flex items-center justify-center text-[#DA7A31]">
                                    <Building2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold tracking-tight">
                                        {editingCustomer ? 'Edit Customer Account' : 'Register New Customer'}
                                    </h3>
                                    <p className="text-xs text-gray-300">
                                        {editingCustomer
                                            ? `Updating details for ${editingCustomer.company || editingCustomer.name}`
                                            : 'Fill in essential details to register an enterprise customer account'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="p-1 text-gray-400 hover:text-white rounded-lg transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Form Body */}
                        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0 overflow-hidden">
                            <div className="p-6 overflow-y-auto space-y-6 text-xs flex-1 text-gray-900">
                                {/* SECTION 1: CORPORATE INFORMATION */}
                                <div>
                                    <div className="text-[11px] font-bold text-[#DA7A31] uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <Building2 className="w-4 h-4" />
                                        <span>1. Corporate Information</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Company Name */}
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
                                                    placeholder="e.g. Apex Global Logistics Ltd"
                                                    required
                                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                                />
                                            </div>
                                            {errors.company && <p className="text-red-500 text-[11px] mt-1">{errors.company}</p>}
                                        </div>

                                        {/* Industry Sector Dropdown */}
                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">
                                                Industry Sector <span className="text-red-500">*</span>
                                            </label>
                                            <CustomDropdown
                                                value={data.industry}
                                                onChange={(val) => setData('industry', val)}
                                                options={INDUSTRY_OPTIONS.map((opt) => ({ value: opt, label: opt }))}
                                                variant="white"
                                                icon={Layers}
                                                className="w-full"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION 2: PRIMARY CONTACT DETAILS */}
                                <div className="pt-4 border-t border-gray-100">
                                    <div className="text-[11px] font-bold text-[#DA7A31] uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        <span>2. Primary Contact Details</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Contact Person Name */}
                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">
                                                Contact Person Name <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                                                <input
                                                    type="text"
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    placeholder="e.g. Duminda Bandara"
                                                    required
                                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                                />
                                            </div>
                                            {errors.name && <p className="text-red-500 text-[11px] mt-1">{errors.name}</p>}
                                        </div>

                                        {/* Corporate Email */}
                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">
                                                Corporate Email Address <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                                                <input
                                                    type="email"
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    placeholder="e.g. contact@apexlogistics.lk"
                                                    required
                                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                                />
                                            </div>
                                            {errors.email && <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>}
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">
                                                Contact Phone Number
                                            </label>
                                            <div className="relative">
                                                <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                                                <input
                                                    type="text"
                                                    value={data.phone}
                                                    onChange={(e) => setData('phone', e.target.value)}
                                                    placeholder="e.g. +94 11 789 4400"
                                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                                />
                                            </div>
                                        </div>

                                        {/* Address */}
                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">
                                                Headquarters Address
                                            </label>
                                            <div className="relative">
                                                <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                                                <input
                                                    type="text"
                                                    value={data.address}
                                                    onChange={(e) => setData('address', e.target.value)}
                                                    placeholder="e.g. Level 18, World Trade Center, Colombo 01"
                                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION 3: SLA STATUS & ACCOUNT NOTES */}
                                <div className="pt-4 border-t border-gray-100 space-y-4">
                                    <div className="text-[11px] font-bold text-[#DA7A31] uppercase tracking-wider mb-1 flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4" />
                                        <span>3. SLA Status & Account Notes</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">
                                                Account Status <span className="text-red-500">*</span>
                                            </label>
                                            <CustomDropdown
                                                value={data.status}
                                                onChange={(val) => setData('status', val as 'active' | 'inactive')}
                                                options={[
                                                    { value: 'active', label: 'Active Retainer' },
                                                    { value: 'inactive', label: 'Inactive / On Hold' },
                                                ]}
                                                variant="white"
                                                icon={ShieldCheck}
                                                className="w-full"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block font-semibold text-[#0B1C30] mb-1">
                                                SLA Deliverables & Account Notes
                                            </label>
                                            <textarea
                                                rows={3}
                                                value={data.notes}
                                                onChange={(e) => setData('notes', e.target.value)}
                                                placeholder="e.g. Enterprise SLA agreement active covering cloud deployment and support."
                                                className="w-full p-3 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* STICKY FOOTER WITH HIGH CONTRAST CLEARLY VISIBLE BUTTONS */}
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
                                    <span>
                                        {processing
                                            ? 'Saving Account...'
                                            : editingCustomer
                                                ? 'Update Customer Account'
                                                : 'Save Customer Account'}
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* VIEW PROFILE MODAL */}
            {viewingCustomer && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-gray-200 relative">
                        {/* Header */}
                        <div className="bg-[#0B1C30] p-6 text-white relative">
                            <button
                                onClick={() => setViewingCustomer(null)}
                                className="absolute top-4 right-4 p-1 text-gray-400 hover:text-white rounded-lg"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-[#DA7A31] text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0">
                                    {(viewingCustomer.company || viewingCustomer.name).charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">{viewingCustomer.company || viewingCustomer.name}</h3>
                                    <div className="text-xs text-gray-300 flex items-center gap-1.5 mt-0.5">
                                        <User className="w-3.5 h-3.5 text-[#DA7A31]" />
                                        <span>Contact: {viewingCustomer.name}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="p-6 space-y-4 text-xs text-gray-900">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <div className="text-gray-400 text-[10px] font-bold uppercase">Account Status</div>
                                    <span
                                        className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${viewingCustomer.status === 'active'
                                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                            : 'bg-slate-200 text-slate-800 border border-slate-300'
                                            }`}
                                    >
                                        {viewingCustomer.status}
                                    </span>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <div className="text-gray-400 text-[10px] font-bold uppercase">Industry Sector</div>
                                    <div className="font-semibold text-[#0B1C30] mt-1">
                                        {viewingCustomer.industry || 'General IT'}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 pt-2 border-t border-gray-100">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Mail className="w-4 h-4 text-[#DA7A31] shrink-0" />
                                    <span className="font-semibold shrink-0">Email:</span>
                                    <span>{viewingCustomer.email || 'N/A'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Phone className="w-4 h-4 text-[#DA7A31] shrink-0" />
                                    <span className="font-semibold shrink-0">Phone:</span>
                                    <span>{viewingCustomer.phone || 'N/A'}</span>
                                </div>
                                <div className="flex items-start gap-2 text-gray-700">
                                    <MapPin className="w-4 h-4 text-[#DA7A31] shrink-0 mt-0.5" />
                                    <span className="font-semibold shrink-0">Office Address:</span>
                                    <span>{viewingCustomer.address || 'N/A'}</span>
                                </div>
                            </div>

                            {viewingCustomer.notes && (
                                <div className="pt-2 border-t border-gray-100">
                                    <div className="font-bold text-[#0B1C30] mb-1">SLA Notes & Requirements</div>
                                    <p className="p-3 bg-slate-50 rounded-xl text-gray-600 border border-slate-100">
                                        {viewingCustomer.notes}
                                    </p>
                                </div>
                            )}

                            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                <button
                                    onClick={() => {
                                        const c = viewingCustomer;
                                        setViewingCustomer(null);
                                        openEdit(c);
                                    }}
                                    className="px-4 py-2 text-xs font-bold text-[#0B1C30] bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-300 transition"
                                >
                                    <Edit2 className="w-3.5 h-3.5 inline mr-1.5" />
                                    <span>Edit Record</span>
                                </button>
                                <button
                                    onClick={() => setViewingCustomer(null)}
                                    className="px-4 py-2 text-xs font-bold text-white bg-[#0B1C30] hover:bg-[#081423] rounded-xl transition"
                                >
                                    Close Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* DELETE CONFIRMATION MODAL */}
            {deletingCustomer && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-200 text-center">
                        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="w-6 h-6" />
                        </div>
                        <h3 className="text-base font-bold text-[#0B1C30] mb-2">Delete Customer Account?</h3>
                        <p className="text-xs text-gray-500 mb-6">
                            Are you sure you want to remove <span className="font-bold text-[#0B1C30]">{deletingCustomer.company || deletingCustomer.name}</span>? This action cannot be undone.
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <button
                                onClick={() => setDeletingCustomer(null)}
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
