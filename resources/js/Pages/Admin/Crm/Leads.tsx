import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
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
} from 'lucide-react';

interface LeadsProps {
    leads: {
        data: LeadItem[];
        links: any[];
        total: number;
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

    const { data, setData, post, put, processing, reset, errors } = useForm({
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

    const openCreate = () => {
        setEditingLead(null);
        reset();
        setModalOpen(true);
    };

    const openEdit = (lead: LeadItem) => {
        setEditingLead(lead);
        setData({
            name: lead.name,
            company: lead.company || '',
            email: lead.email || '',
            phone: lead.phone || '',
            source: lead.source,
            status: lead.status,
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

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Delete lead opportunity "${name}"?`)) {
            router.delete(route('admin.crm.leads.destroy', id));
        }
    };

    return (
        <AdminLayout title="CRM Sales Pipeline" subtitle="Opportunity & Deal Tracking">
            <Head title="CRM Leads - LMC Management" />

            {/* Top filter / action bar */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <form onSubmit={handleSearch} className="flex flex-1 items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search leads, companies..."
                            className="w-full pl-9 pr-4 py-1.5 text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31] py-1.5"
                    >
                        <option value="">All Pipeline Stages</option>
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Proposal">Proposal</option>
                        <option value="Won">Won</option>
                        <option value="Lost">Lost</option>
                    </select>
                    <button
                        type="submit"
                        className="bg-[#0B1C30] hover:bg-[#132842] text-white text-xs font-semibold px-4 py-1.5 rounded"
                    >
                        Filter
                    </button>
                </form>

                <button
                    onClick={openCreate}
                    className="w-full sm:w-auto bg-[#DA7A31] hover:bg-[#C2631D] text-white text-xs font-bold px-4 py-2 rounded shadow-xs flex items-center justify-center gap-1.5"
                >
                    <Plus className="w-4 h-4" />
                    <span>Create Lead</span>
                </button>
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-[#4D4B55]">
                        <thead className="bg-gray-50 border-b border-gray-200 text-[#0B1C30] font-bold uppercase tracking-wider text-[10px]">
                            <tr>
                                <th className="py-3 px-4">Lead / Company</th>
                                <th className="py-3 px-4">Deal Value</th>
                                <th className="py-3 px-4">Source</th>
                                <th className="py-3 px-4">Pipeline Status</th>
                                <th className="py-3 px-4">Assigned To</th>
                                <th className="py-3 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {leads.data.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-8 text-center text-gray-500">
                                        No sales leads found matching criteria.
                                    </td>
                                </tr>
                            ) : (
                                leads.data.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-3.5 px-4">
                                            <div className="font-bold text-[#0B1C30] text-sm">{lead.name}</div>
                                            <div className="text-[11px] text-gray-500">
                                                {lead.company || 'Direct Client'} &bull; {lead.email || lead.phone || 'No direct phone'}
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-4 font-bold text-[#0B1C30]">
                                            {lead.estimated_value
                                                ? `$${Number(lead.estimated_value).toLocaleString()}`
                                                : '-'}
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[10px] font-medium">
                                                {lead.source}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <span
                                                className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                                    lead.status === 'Won'
                                                        ? 'bg-emerald-100 text-emerald-800'
                                                        : lead.status === 'Proposal'
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : lead.status === 'Lost'
                                                        ? 'bg-red-100 text-red-800'
                                                        : 'bg-amber-100 text-amber-800'
                                                }`}
                                            >
                                                {lead.status}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 text-gray-700 font-medium">
                                            {lead.assigned_user?.name || (
                                                <span className="text-gray-400 italic">Unassigned</span>
                                            )}
                                        </td>
                                        <td className="py-3.5 px-4 text-right space-x-2">
                                            <button
                                                onClick={() => openEdit(lead)}
                                                className="p-1.5 text-gray-500 hover:text-[#0B1C30] hover:bg-gray-100 rounded"
                                                title="Edit Opportunity"
                                            >
                                                <Edit2 className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(lead.id, lead.name)}
                                                className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                                                title="Delete Lead"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {leads.links && leads.links.length > 3 && (
                    <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                        <div>Total: {leads.total} deals</div>
                        <div className="flex gap-1">
                            {leads.links.map((link, idx) => (
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
                    <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-2xl relative">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-700"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h3 className="text-base font-bold text-[#0B1C30] mb-4">
                            {editingLead ? 'Update Sales Opportunity' : 'Create Sales Lead'}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1">Lead / Contact Name *</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1">Company</label>
                                    <input
                                        type="text"
                                        value={data.company}
                                        onChange={(e) => setData('company', e.target.value)}
                                        className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1">Phone</label>
                                    <input
                                        type="text"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1">Deal Value ($)</label>
                                    <input
                                        type="number"
                                        step="100"
                                        value={data.estimated_value}
                                        onChange={(e) => setData('estimated_value', e.target.value)}
                                        placeholder="50000"
                                        className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1">Stage *</label>
                                    <select
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value as LeadItem['status'])}
                                        className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
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
                                    <label className="block font-semibold text-[#0B1C30] mb-1">Source</label>
                                    <select
                                        value={data.source}
                                        onChange={(e) => setData('source', e.target.value)}
                                        className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
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
                                <label className="block font-semibold text-[#0B1C30] mb-1">Assign to Specialist</label>
                                <select
                                    value={data.assigned_to}
                                    onChange={(e) => setData('assigned_to', e.target.value)}
                                    className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
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
                                <label className="block font-semibold text-[#0B1C30] mb-1">Opportunity Notes</label>
                                <textarea
                                    rows={3}
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    placeholder="Key technical requirements, timeline, budget notes..."
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
                                    {processing ? 'Saving...' : editingLead ? 'Update Lead' : 'Save Opportunity'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
