import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { LeadItem, User } from '@/types';
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
} from 'lucide-react';

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

export default function Leads({ leads, staffUsers, filters }: LeadsProps) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingLead, setEditingLead] = useState<LeadItem | null>(null);
    const [deletingLead, setDeletingLead] = useState<LeadItem | null>(null);

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

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            route('admin.crm.leads'),
            { search: searchTerm, status: statusFilter },
            { preserveState: true }
        );
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setStatusFilter('');
        router.get(route('admin.crm.leads'), {}, { preserveState: true });
    };

    const openCreate = () => {
        setEditingLead(null);
        clearErrors();
        reset();
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
            assigned_to: lead.assigned_to || '',
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

    return (
        <AdminLayout title="Sales Leads Pipeline" subtitle="Opportunity Management & Forecast">
            <Head title="Sales Leads - CRM" />

            {/* Filter toolbar */}
            <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-2xs mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <form onSubmit={handleSearch} className="flex flex-1 flex-col sm:flex-row items-center gap-3 w-full">
                    <div className="relative flex-1 w-full">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3 pointer-events-none" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by lead name, company, email..."
                            className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900"
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full sm:w-auto text-xs rounded-lg border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] py-2 px-3 bg-white text-gray-900 cursor-pointer"
                        >
                            <option value="">All Pipeline Stages</option>
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Qualified">Qualified</option>
                            <option value="Proposal">Proposal</option>
                            <option value="Won">Won</option>
                            <option value="Lost">Lost</option>
                        </select>
                        <button type="submit" className="lmc-btn lmc-btn-navy lmc-btn-sm shrink-0">
                            <Filter className="w-3.5 h-3.5" />
                            <span>Filter</span>
                        </button>
                        {(searchTerm || statusFilter) && (
                            <button
                                type="button"
                                onClick={handleClearFilters}
                                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
                                title="Reset Filters"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </form>

                <button onClick={openCreate} className="w-full md:w-auto lmc-btn lmc-btn-primary lmc-btn-sm shrink-0 shadow-2xs">
                    <Plus className="w-4 h-4" />
                    <span>New Sales Lead</span>
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-[#4D4B55]">
                        <thead className="bg-[#0B1C30] text-white font-bold uppercase tracking-wider text-[10px]">
                            <tr>
                                <th className="py-3.5 px-5">Lead / Company</th>
                                <th className="py-3.5 px-5">Est. Value</th>
                                <th className="py-3.5 px-5">Pipeline Stage</th>
                                <th className="py-3.5 px-5">Assigned Specialist</th>
                                <th className="py-3.5 px-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {leads.data.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-gray-500">
                                        No sales leads found.
                                    </td>
                                </tr>
                            ) : (
                                leads.data.map((l) => (
                                    <tr key={l.id} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="py-4 px-5">
                                            <div className="font-bold text-[#0B1C30] text-sm">{l.company || l.name}</div>
                                            <div className="text-[11px] text-gray-600 flex items-center gap-1.5 mt-0.5">
                                                <UserIcon className="w-3 h-3 text-[#DA7A31] shrink-0" />
                                                <span>Contact: {l.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-5">
                                            <div className="font-bold text-[#0B1C30]">
                                                {l.estimated_value ? `$${Number(l.estimated_value).toLocaleString()}` : 'N/A'}
                                            </div>
                                            <div className="text-[10px] text-gray-400 uppercase font-semibold">{l.source}</div>
                                        </td>
                                        <td className="py-4 px-5">
                                            <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${statusBadgeColor(l.status)}`}>
                                                {l.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-5">
                                            {l.assigned_user ? (
                                                <span className="font-semibold text-gray-800">{l.assigned_user.name}</span>
                                            ) : (
                                                <span className="text-gray-400 italic">Unassigned</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-5 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    onClick={() => openEdit(l)}
                                                    className="p-2 text-gray-600 hover:text-[#DA7A31] hover:bg-orange-50 rounded-lg transition"
                                                    title="Edit Opportunity"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => setDeletingLead(l)}
                                                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                                                    title="Delete Lead"
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

                {/* Pagination */}
                {leads.links && leads.links.length > 3 && (
                    <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
                        <div>
                            Showing <span className="font-semibold text-[#0B1C30]">{leads.from || 1}</span> to{' '}
                            <span className="font-semibold text-[#0B1C30]">{leads.to || leads.data.length}</span> of{' '}
                            <span className="font-semibold text-[#0B1C30]">{leads.total}</span> leads
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {leads.links.map((link, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => link.url && router.get(link.url)}
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

            {/* CREATE / EDIT MODAL WITH STICKY FOOTER */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-gray-200 relative max-h-[85vh] flex flex-col">
                        <div className="bg-[#0B1C30] px-6 py-4 flex items-center justify-between text-white shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#DA7A31]/20 border border-[#DA7A31]/40 flex items-center justify-center text-[#DA7A31]">
                                    <TrendingUp className="w-5 h-5" />
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

                        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0 overflow-hidden">
                            <div className="p-6 overflow-y-auto space-y-4 text-xs flex-1 text-gray-900">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block font-semibold text-[#0B1C30] mb-1">Company / Organization Name <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            value={data.company}
                                            onChange={(e) => setData('company', e.target.value)}
                                            placeholder="e.g. Ceylinco Agro Exports (Pvt) Ltd"
                                            required
                                            className="w-full p-2 text-xs rounded-lg border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-semibold text-[#0B1C30] mb-1">Contact Person Name <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="e.g. Priyantha Fernando"
                                            required
                                            className="w-full p-2 text-xs rounded-lg border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block font-semibold text-[#0B1C30] mb-1">Corporate Email Address</label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="e.g. export@ceylincoagro.lk"
                                            className="w-full p-2 text-xs rounded-lg border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-semibold text-[#0B1C30] mb-1">Contact Phone Number</label>
                                        <input
                                            type="text"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            placeholder="e.g. +94 77 999 1234"
                                            className="w-full p-2 text-xs rounded-lg border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block font-semibold text-[#0B1C30] mb-1">Est. Deal Value ($)</label>
                                        <input
                                            type="number"
                                            step="100"
                                            value={data.estimated_value}
                                            onChange={(e) => setData('estimated_value', e.target.value)}
                                            placeholder="e.g. 45000"
                                            className="w-full p-2 text-xs rounded-lg border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-semibold text-[#0B1C30] mb-1">Pipeline Stage <span className="text-red-500">*</span></label>
                                        <select
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value as LeadItem['status'])}
                                            className="w-full p-2 text-xs rounded-lg border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 cursor-pointer"
                                        >
                                            <option value="New">New</option>
                                            <option value="Contacted">Contacted</option>
                                            <option value="Qualified">Qualified</option>
                                            <option value="Proposal">Proposal</option>
                                            <option value="Won">Won</option>
                                            <option value="Lost">Lost</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block font-semibold text-[#0B1C30] mb-1">Lead Source</label>
                                        <select
                                            value={data.source}
                                            onChange={(e) => setData('source', e.target.value)}
                                            className="w-full p-2 text-xs rounded-lg border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 cursor-pointer"
                                        >
                                            <option value="Website">Website</option>
                                            <option value="Referral">Referral</option>
                                            <option value="LinkedIn">LinkedIn</option>
                                            <option value="Direct">Direct</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1">Assigned Account Manager</label>
                                    <select
                                        value={data.assigned_to}
                                        onChange={(e) => setData('assigned_to', e.target.value)}
                                        className="w-full p-2 text-xs rounded-lg border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 cursor-pointer"
                                    >
                                        <option value="">-- Leave Unassigned --</option>
                                        {staffUsers.map((u) => (
                                            <option key={u.id} value={u.id}>
                                                {u.name} ({u.email})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1">Opportunity Notes & Scope</label>
                                    <textarea
                                        rows={3}
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                        placeholder="e.g. Requesting full ERP system migration with inventory control..."
                                        className="w-full p-3 text-xs rounded-lg border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400"
                                    />
                                </div>
                            </div>

                            {/* ALWAYS VISIBLE STICKY FOOTER */}
                            <div className="shrink-0 bg-gray-50 border-t border-gray-200 p-4 flex items-center justify-end gap-3 z-20">
                                <button type="button" onClick={() => setModalOpen(false)} className="lmc-btn lmc-btn-secondary lmc-btn-sm">
                                    Cancel
                                </button>
                                <button type="submit" disabled={processing} className="lmc-btn lmc-btn-primary lmc-btn-sm shadow-2xs">
                                    {processing ? 'Saving...' : editingLead ? 'Update Sales Lead' : 'Save Opportunity'}
                                </button>
                            </div>
                        </form>
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
                            Are you sure you want to remove <span className="font-bold text-[#0B1C30]">{deletingLead.company || deletingLead.name}</span>?
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <button onClick={() => setDeletingLead(null)} className="lmc-btn lmc-btn-secondary lmc-btn-sm flex-1">
                                Cancel
                            </button>
                            <button onClick={confirmDelete} className="lmc-btn lmc-btn-danger lmc-btn-sm flex-1">
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
