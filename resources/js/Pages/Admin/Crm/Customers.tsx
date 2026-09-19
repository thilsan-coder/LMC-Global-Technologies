import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
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
} from 'lucide-react';

interface CustomersProps {
    customers: {
        data: CustomerItem[];
        links: any[];
        total: number;
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

    const { data, setData, post, put, processing, reset, errors } = useForm({
        name: '',
        company: '',
        email: '',
        phone: '',
        address: '',
        industry: '',
        status: 'active',
        notes: '',
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            route('admin.crm.customers'),
            { search: searchTerm, status: statusFilter },
            { preserveState: true }
        );
    };

    const openCreate = () => {
        setEditingCustomer(null);
        reset();
        setModalOpen(true);
    };

    const openEdit = (customer: CustomerItem) => {
        setEditingCustomer(customer);
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

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Are you sure you wish to delete customer "${name}"?`)) {
            router.delete(route('admin.crm.customers.destroy', id));
        }
    };

    return (
        <AdminLayout title="Enterprise Customers" subtitle="CRM Account Management">
            <Head title="CRM Customers - LMC Management" />

            {/* Top action bar */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <form onSubmit={handleSearch} className="flex flex-1 items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search name, company, industry..."
                            className="w-full pl-9 pr-4 py-1.5 text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31] py-1.5"
                    >
                        <option value="">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
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
                    <span>Add Customer</span>
                </button>
            </div>

            {/* Customers Table */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-[#4D4B55]">
                        <thead className="bg-gray-50 border-b border-gray-200 text-[#0B1C30] font-bold uppercase tracking-wider text-[10px]">
                            <tr>
                                <th className="py-3 px-4">Customer / Company</th>
                                <th className="py-3 px-4">Contact Coordinates</th>
                                <th className="py-3 px-4">Industry</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {customers.data.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-gray-500">
                                        No customer records found.
                                    </td>
                                </tr>
                            ) : (
                                customers.data.map((c) => (
                                    <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-3.5 px-4">
                                            <div className="font-bold text-[#0B1C30] text-sm">{c.name}</div>
                                            <div className="text-[11px] text-gray-500 flex items-center gap-1">
                                                <Building2 className="w-3 h-3 text-[#DA7A31]" />
                                                <span>{c.company || 'Private Account'}</span>
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-4 space-y-0.5">
                                            {c.email && (
                                                <div className="flex items-center gap-1.5 text-gray-600">
                                                    <Mail className="w-3 h-3 text-gray-400" />
                                                    <span>{c.email}</span>
                                                </div>
                                            )}
                                            {c.phone && (
                                                <div className="flex items-center gap-1.5 text-gray-600">
                                                    <Phone className="w-3 h-3 text-gray-400" />
                                                    <span>{c.phone}</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <span className="font-medium">{c.industry || 'General Tech'}</span>
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <span
                                                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                                    c.status === 'active'
                                                        ? 'bg-emerald-100 text-emerald-800'
                                                        : 'bg-gray-100 text-gray-600'
                                                }`}
                                            >
                                                {c.status}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 text-right space-x-2">
                                            <button
                                                onClick={() => openEdit(c)}
                                                className="p-1.5 text-gray-500 hover:text-[#0B1C30] hover:bg-gray-100 rounded"
                                                title="Edit Customer"
                                            >
                                                <Edit2 className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(c.id, c.name)}
                                                className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                                                title="Delete Customer"
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
                {customers.links && customers.links.length > 3 && (
                    <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                        <div>Total: {customers.total} customer accounts</div>
                        <div className="flex gap-1">
                            {customers.links.map((link, idx) => (
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

            {/* Create / Edit Modal */}
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
                            {editingCustomer ? 'Edit Customer Account' : 'Register New Enterprise Customer'}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                            <div>
                                <label className="block font-semibold text-[#0B1C30] mb-1">Customer Name *</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1">Company / Organization</label>
                                    <input
                                        type="text"
                                        value={data.company}
                                        onChange={(e) => setData('company', e.target.value)}
                                        className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1">Industry</label>
                                    <input
                                        type="text"
                                        value={data.industry}
                                        onChange={(e) => setData('industry', e.target.value)}
                                        placeholder="e.g. Logistics, CleanTech"
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

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1">Office Address</label>
                                    <input
                                        type="text"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1">Status *</label>
                                    <select
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value as 'active' | 'inactive')}
                                        className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block font-semibold text-[#0B1C30] mb-1">Notes / SLA Terms</label>
                                <textarea
                                    rows={3}
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
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
                                    {processing ? 'Saving...' : editingCustomer ? 'Update Customer' : 'Save Customer'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
