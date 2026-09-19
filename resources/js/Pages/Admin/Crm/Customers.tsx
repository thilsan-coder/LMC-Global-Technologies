import React, { useState } from 'react';
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
    Briefcase,
    ShieldCheck,
    CheckCircle2,
    XCircle,
    Activity,
    TrendingUp,
    AlertCircle,
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
    };
}

export default function Customers({ customers, filters }: CustomersProps) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState<CustomerItem | null>(null);
    const [viewingCustomer, setViewingCustomer] = useState<CustomerItem | null>(null);
    const [deletingCustomer, setDeletingCustomer] = useState<CustomerItem | null>(null);

    const { data, setData, post, put, processing, reset, errors, clearErrors } = useForm({
        name: '',
        company: '',
        email: '',
        phone: '',
        address: '',
        industry: '',
        status: 'active' as 'active' | 'inactive',
        notes: '',
    });

    // KPI Metrics calculation
    const totalCustomers = customers.total || 0;
    const activeCustomersCount = customers.data.filter((c) => c.status === 'active').length;
    const inactiveCustomersCount = customers.data.filter((c) => c.status === 'inactive').length;

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            route('admin.crm.customers'),
            { search: searchTerm, status: statusFilter },
            { preserveState: true }
        );
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setStatusFilter('');
        router.get(route('admin.crm.customers'), {}, { preserveState: true });
    };

    const openCreate = () => {
        setEditingCustomer(null);
        clearErrors();
        reset();
        setModalOpen(true);
    };

    const openEdit = (customer: CustomerItem) => {
        setEditingCustomer(customer);
        clearErrors();
        setData({
            name: customer.name,
            company: customer.company || '',
            email: customer.email || '',
            phone: customer.phone || '',
            address: customer.address || '',
            industry: customer.industry || '',
            status: customer.status,
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
        if (deletingCustomer) {
            router.delete(route('admin.crm.customers.destroy', deletingCustomer.id), {
                onSuccess: () => setDeletingCustomer(null),
            });
        }
    };

    return (
        <AdminLayout title="Enterprise Customers" subtitle="Account Roster & Portfolio CRM">
            <Head title="Enterprise Customers - CRM Portal" />

            <div className="space-y-6">
                {/* Executive Summary Metrics Header */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Total Accounts
                            </div>
                            <div className="text-2xl font-bold text-[#0B1C30] mt-1">{totalCustomers}</div>
                            <div className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
                                <Building2 className="w-3 h-3 text-[#DA7A31]" />
                                <span>Enterprise Client Base</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-[#0B1C30]/5 border border-[#0B1C30]/10 flex items-center justify-center text-[#0B1C30]">
                            <Users className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Active Retainers
                            </div>
                            <div className="text-2xl font-bold text-emerald-600 mt-1">
                                {activeCustomersCount}
                            </div>
                            <div className="text-[11px] text-emerald-700/80 mt-1 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                <span>Active SLA Retainer</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                            <Activity className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                On Hold / Inactive
                            </div>
                            <div className="text-2xl font-bold text-gray-700 mt-1">
                                {inactiveCustomersCount}
                            </div>
                            <div className="text-[11px] text-gray-500 mt-1 flex items-center gap-1">
                                <XCircle className="w-3 h-3 text-gray-400" />
                                <span>Pending Renewal / Offboarding</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600">
                            <XCircle className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                SLA Satisfaction
                            </div>
                            <div className="text-2xl font-bold text-[#DA7A31] mt-1">99.2%</div>
                            <div className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
                                <TrendingUp className="w-3 h-3 text-[#DA7A31]" />
                                <span>High Enterprise Trust</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-[#DA7A31]/10 border border-[#DA7A31]/20 flex items-center justify-center text-[#DA7A31]">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {/* Filter Toolbar & Action Bar */}
                <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
                    <form onSubmit={handleSearch} className="flex flex-1 flex-col sm:flex-row items-center gap-3 w-full">
                        {/* Search input with left icon */}
                        <div className="relative flex-1 w-full">
                            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3 pointer-events-none" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by client name, company, email, or industry..."
                                className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-gray-50/50"
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full sm:w-auto text-xs rounded-lg border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] py-2 bg-gray-50/50"
                            >
                                <option value="">All Account Statuses</option>
                                <option value="active">Active Retainer</option>
                                <option value="inactive">Inactive / On Hold</option>
                            </select>

                            <button
                                type="submit"
                                className="lmc-btn lmc-btn-navy lmc-btn-sm shrink-0"
                            >
                                <Filter className="w-3.5 h-3.5" />
                                <span>Filter</span>
                            </button>

                            {(searchTerm || statusFilter) && (
                                <button
                                    type="button"
                                    onClick={handleClearFilters}
                                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
                                    title="Reset Filters"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </form>

                    {/* Primary New Customer Button */}
                    <button
                        onClick={openCreate}
                        className="w-full md:w-auto lmc-btn lmc-btn-primary lmc-btn-sm shrink-0 shadow-xs"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add New Customer</span>
                    </button>
                </div>

                {/* Customers Table Card */}
                <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-[#4D4B55]">
                            <thead className="bg-[#0B1C30] text-white font-bold uppercase tracking-wider text-[10px]">
                                <tr>
                                    <th className="py-3.5 px-5">Enterprise Client Account</th>
                                    <th className="py-3.5 px-5">Contact Coordinates</th>
                                    <th className="py-3.5 px-5">Industry Sector</th>
                                    <th className="py-3.5 px-5">SLA Status</th>
                                    <th className="py-3.5 px-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {customers.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="py-12 text-center text-gray-500">
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
                                    customers.data.map((c) => (
                                        <tr key={c.id} className="hover:bg-blue-50/30 transition-colors">
                                            {/* Client Name & Company */}
                                            <td className="py-4 px-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-lg bg-[#0B1C30] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                                                        {c.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div
                                                            className="font-bold text-[#0B1C30] text-sm hover:text-[#DA7A31] transition-colors cursor-pointer"
                                                            onClick={() => setViewingCustomer(c)}
                                                        >
                                                            {c.name}
                                                        </div>
                                                        <div className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                                                            <Building2 className="w-3 h-3 text-[#DA7A31]" />
                                                            <span className="font-medium">{c.company || 'Private Account'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Email & Phone */}
                                            <td className="py-4 px-5 space-y-1">
                                                {c.email ? (
                                                    <div className="flex items-center gap-1.5 text-gray-700">
                                                        <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                                        <a href={`mailto:${c.email}`} className="hover:underline hover:text-[#DA7A31]">
                                                            {c.email}
                                                        </a>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400 italic">No email provided</span>
                                                )}
                                                {c.phone && (
                                                    <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
                                                        <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                                        <span>{c.phone}</span>
                                                    </div>
                                                )}
                                            </td>

                                            {/* Industry */}
                                            <td className="py-4 px-5">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                                                    <Briefcase className="w-3 h-3 mr-1 text-[#0B1C30]" />
                                                    {c.industry || 'General IT'}
                                                </span>
                                            </td>

                                            {/* Status Badge */}
                                            <td className="py-4 px-5">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                                                        c.status === 'active'
                                                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                                            : 'bg-gray-100 text-gray-600 border border-gray-200'
                                                    }`}
                                                >
                                                    <span
                                                        className={`w-1.5 h-1.5 rounded-full ${
                                                            c.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'
                                                        }`}
                                                    />
                                                    {c.status}
                                                </span>
                                            </td>

                                            {/* Actions */}
                                            <td className="py-4 px-5 text-right">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <button
                                                        onClick={() => setViewingCustomer(c)}
                                                        className="p-1.5 text-gray-500 hover:text-[#0B1C30] hover:bg-gray-100 rounded-lg transition"
                                                        title="View Details"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => openEdit(c)}
                                                        className="p-1.5 text-gray-500 hover:text-[#DA7A31] hover:bg-orange-50 rounded-lg transition"
                                                        title="Edit Customer"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => setDeletingCustomer(c)}
                                                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                                                        title="Delete Customer"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Footer */}
                    {customers.links && customers.links.length > 3 && (
                        <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
                            <div>
                                Showing <span className="font-semibold text-[#0B1C30]">{customers.from || 1}</span> to{' '}
                                <span className="font-semibold text-[#0B1C30]">{customers.to || customers.data.length}</span> of{' '}
                                <span className="font-semibold text-[#0B1C30]">{customers.total}</span> enterprise customer accounts
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {customers.links.map((link, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => link.url && router.get(link.url)}
                                        disabled={!link.url}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-3 py-1.5 rounded-md text-xs transition-all ${
                                            link.active
                                                ? 'bg-[#0B1C30] text-white font-bold shadow-xs'
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

            {/* CREATE / EDIT CUSTOMER MODAL */}
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
                                        {editingCustomer ? 'Edit Enterprise Customer Account' : 'Register New Enterprise Customer'}
                                    </h3>
                                    <p className="text-xs text-gray-300">
                                        {editingCustomer
                                            ? `Updating CRM record for ${editingCustomer.name}`
                                            : 'Fill in corporate details to add an enterprise account to the CRM'}
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

                        {/* Modal Body Form */}
                        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 text-xs flex-1">
                            {/* Section 1: Basic Profile & Enterprise Info */}
                            <div>
                                <div className="text-[11px] font-bold text-[#DA7A31] uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    <span>1. Primary Account & Organization Details</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Customer / Contact Name */}
                                    <div className="md:col-span-2">
                                        <label className="block font-semibold text-[#0B1C30] mb-1">
                                            Contact Person Name <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <Users className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 pointer-events-none" />
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder="e.g. Alexander Wright"
                                                required
                                                className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31]"
                                            />
                                        </div>
                                        {errors.name && <p className="text-red-500 text-[11px] mt-1">{errors.name}</p>}
                                    </div>

                                    {/* Company Name */}
                                    <div>
                                        <label className="block font-semibold text-[#0B1C30] mb-1">
                                            Company / Organization Name
                                        </label>
                                        <div className="relative">
                                            <Building2 className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 pointer-events-none" />
                                            <input
                                                type="text"
                                                value={data.company}
                                                onChange={(e) => setData('company', e.target.value)}
                                                placeholder="e.g. Apex Global Systems"
                                                className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31]"
                                            />
                                        </div>
                                    </div>

                                    {/* Industry */}
                                    <div>
                                        <label className="block font-semibold text-[#0B1C30] mb-1">
                                            Industry Sector
                                        </label>
                                        <div className="relative">
                                            <Briefcase className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 pointer-events-none" />
                                            <input
                                                type="text"
                                                value={data.industry}
                                                onChange={(e) => setData('industry', e.target.value)}
                                                placeholder="e.g. CleanTech, Logistics, FinTech"
                                                className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Contact Coordinates */}
                            <div className="pt-4 border-t border-gray-100">
                                <div className="text-[11px] font-bold text-[#DA7A31] uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    <span>2. Communication & Location Coordinates</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Email */}
                                    <div>
                                        <label className="block font-semibold text-[#0B1C30] mb-1">
                                            Corporate Email Address
                                        </label>
                                        <div className="relative">
                                            <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 pointer-events-none" />
                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                placeholder="alexander@apexsystems.com"
                                                className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31]"
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
                                            <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 pointer-events-none" />
                                            <input
                                                type="text"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                placeholder="+1 (555) 234-5678"
                                                className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31]"
                                            />
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="md:col-span-2">
                                        <label className="block font-semibold text-[#0B1C30] mb-1">
                                            Headquarters / Office Address
                                        </label>
                                        <div className="relative">
                                            <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 pointer-events-none" />
                                            <input
                                                type="text"
                                                value={data.address}
                                                onChange={(e) => setData('address', e.target.value)}
                                                placeholder="e.g. 100 Enterprise Way, Suite 400, New York, NY"
                                                className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Status & SLA Governance */}
                            <div className="pt-4 border-t border-gray-100">
                                <div className="text-[11px] font-bold text-[#DA7A31] uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span>3. Account Status & SLA Requirements</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Status */}
                                    <div>
                                        <label className="block font-semibold text-[#0B1C30] mb-1">
                                            Account SLA Status <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value as 'active' | 'inactive')}
                                            className="w-full py-2 text-xs rounded-lg border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31]"
                                        >
                                            <option value="active">Active Retainer</option>
                                            <option value="inactive">Inactive / On Hold</option>
                                        </select>
                                    </div>

                                    {/* Notes */}
                                    <div className="md:col-span-2">
                                        <label className="block font-semibold text-[#0B1C30] mb-1">
                                            SLA Terms, Deliverables & Internal Notes
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={data.notes}
                                            onChange={(e) => setData('notes', e.target.value)}
                                            placeholder="Enter contract scope summary, preferred communication channel, or specific SLA deliverables..."
                                            className="w-full p-3 text-xs rounded-lg border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31]"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Form Footer Buttons */}
                            <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="lmc-btn lmc-btn-secondary lmc-btn-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="lmc-btn lmc-btn-primary lmc-btn-sm shadow-sm"
                                >
                                    {processing
                                        ? 'Saving Details...'
                                        : editingCustomer
                                        ? 'Update Customer Account'
                                        : 'Save Customer Account'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* VIEW CUSTOMER DETAIL MODAL */}
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
                                <div className="w-14 h-14 rounded-2xl bg-[#DA7A31] text-white flex items-center justify-center font-bold text-xl shadow-md">
                                    {viewingCustomer.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">{viewingCustomer.name}</h3>
                                    <div className="text-xs text-gray-300 flex items-center gap-1.5 mt-0.5">
                                        <Building2 className="w-3.5 h-3.5 text-[#DA7A31]" />
                                        <span>{viewingCustomer.company || 'Private Client Account'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Details Body */}
                        <div className="p-6 space-y-4 text-xs">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    <div className="text-gray-400 text-[10px] font-bold uppercase">Account Status</div>
                                    <span
                                        className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                            viewingCustomer.status === 'active'
                                                ? 'bg-emerald-100 text-emerald-800'
                                                : 'bg-gray-200 text-gray-700'
                                        }`}
                                    >
                                        {viewingCustomer.status}
                                    </span>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    <div className="text-gray-400 text-[10px] font-bold uppercase">Industry Sector</div>
                                    <div className="font-semibold text-[#0B1C30] mt-1">
                                        {viewingCustomer.industry || 'General IT'}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 pt-2 border-t border-gray-100">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Mail className="w-4 h-4 text-[#DA7A31]" />
                                    <span className="font-semibold">Email:</span>
                                    <span>{viewingCustomer.email || 'N/A'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Phone className="w-4 h-4 text-[#DA7A31]" />
                                    <span className="font-semibold">Phone:</span>
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
                                    <p className="p-3 bg-gray-50 rounded-xl text-gray-600 border border-gray-100">
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
                                    className="lmc-btn lmc-btn-outline-navy lmc-btn-sm"
                                >
                                    <Edit2 className="w-3.5 h-3.5" />
                                    <span>Edit Record</span>
                                </button>
                                <button
                                    onClick={() => setViewingCustomer(null)}
                                    className="lmc-btn lmc-btn-navy lmc-btn-sm"
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
                            Are you sure you want to remove <span className="font-bold text-[#0B1C30]">{deletingCustomer.name}</span>? This action cannot be undone.
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <button
                                onClick={() => setDeletingCustomer(null)}
                                className="lmc-btn lmc-btn-secondary lmc-btn-sm flex-1"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="lmc-btn lmc-btn-danger lmc-btn-sm flex-1"
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
