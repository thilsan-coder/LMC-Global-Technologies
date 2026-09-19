import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { User } from '@/types';
import {
    Shield,
    Plus,
    Search,
    Edit2,
    Trash2,
    Lock,
    UserCheck,
    UserX,
    X,
} from 'lucide-react';

interface UsersProps {
    users: {
        data: User[];
        links: any[];
        total: number;
    };
    roles: Array<{ id: number; name: string; permissions: Array<{ name: string }> }>;
    allPermissions: Array<{ id: number; name: string }>;
    filters: {
        search?: string;
        role?: string;
    };
}

export default function UsersIndex({ users, roles, allPermissions, filters }: UsersProps) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [roleFilter, setRoleFilter] = useState(filters.role || '');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const { data, setData, post, put, processing, reset, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        designation: '',
        password: '',
        role: 'Staff',
        is_active: true,
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            route('admin.users.index'),
            { search: searchTerm, role: roleFilter },
            { preserveState: true }
        );
    };

    const openCreate = () => {
        setEditingUser(null);
        reset();
        setModalOpen(true);
    };

    const openEdit = (u: User) => {
        setEditingUser(u);
        setData({
            name: u.name,
            email: u.email,
            phone: u.phone || '',
            designation: u.designation || '',
            password: '',
            role: (u.roles && u.roles[0]) || 'Staff',
            is_active: u.is_active ?? true,
        });
        setModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingUser) {
            put(route('admin.users.update', editingUser.id), {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        } else {
            post(route('admin.users.store'), {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        }
    };

    const toggleActive = (u: User) => {
        router.post(route('admin.users.toggle-active', u.id));
    };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Remove user account "${name}"?`)) {
            router.delete(route('admin.users.destroy', id));
        }
    };

    return (
        <AdminLayout title="User & Role Governance" subtitle="Spatie RBAC & Access Control">
            <Head title="Users & Permissions - LMC Management" />

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <form onSubmit={handleSearch} className="flex flex-1 items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search user name, email, role..."
                            className="w-full pl-9 pr-4 py-1.5 text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                        />
                    </div>

                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31] py-1.5"
                    >
                        <option value="">All Roles</option>
                        {roles.map((r) => (
                            <option key={r.id} value={r.name}>
                                {r.name}
                            </option>
                        ))}
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
                    <span>Create User</span>
                </button>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-[#4D4B55]">
                        <thead className="bg-gray-50 border-b border-gray-200 text-[#0B1C30] font-bold uppercase tracking-wider text-[10px]">
                            <tr>
                                <th className="py-3 px-4">User Details</th>
                                <th className="py-3 px-4">Assigned Role</th>
                                <th className="py-3 px-4">Designation</th>
                                <th className="py-3 px-4">Account Status</th>
                                <th className="py-3 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.data.map((u) => (
                                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-3.5 px-4">
                                        <div className="font-bold text-[#0B1C30] text-sm">{u.name}</div>
                                        <div className="text-[11px] text-gray-500">{u.email}</div>
                                    </td>
                                    <td className="py-3.5 px-4">
                                        <span
                                            className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                                u.roles?.includes('Admin')
                                                    ? 'bg-[#0B1C30] text-white'
                                                    : u.roles?.includes('Staff')
                                                    ? 'bg-[#DA7A31]/15 text-[#DA7A31] border border-[#DA7A31]/30'
                                                    : 'bg-blue-100 text-blue-800'
                                            }`}
                                        >
                                            {u.roles && u.roles[0] ? u.roles[0] : 'User'}
                                        </span>
                                    </td>
                                    <td className="py-3.5 px-4 text-gray-700">
                                        {u.designation || 'Specialist'}
                                    </td>
                                    <td className="py-3.5 px-4">
                                        <button
                                            onClick={() => toggleActive(u)}
                                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition ${
                                                u.is_active
                                                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                                            }`}
                                            title="Click to toggle active state"
                                        >
                                            {u.is_active ? 'Active' : 'Deactivated'}
                                        </button>
                                    </td>
                                    <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                                        <button
                                            onClick={() => openEdit(u)}
                                            className="p-1.5 text-gray-500 hover:text-[#0B1C30] hover:bg-gray-100 rounded"
                                            title="Edit User"
                                        >
                                            <Edit2 className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(u.id, u.name)}
                                            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                                            title="Delete User"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {users.links && users.links.length > 3 && (
                    <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                        <div>Total: {users.total} accounts</div>
                        <div className="flex gap-1">
                            {users.links.map((link, idx) => (
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
                            {editingUser ? `Edit User: ${editingUser.name}` : 'Create Corporate User'}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                            <div>
                                <label className="block font-semibold text-[#0B1C30] mb-1">Full Name *</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                />
                                {errors.name && <p className="text-[10px] text-red-600 mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block font-semibold text-[#0B1C30] mb-1">Corporate Email *</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                    className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                />
                                {errors.email && <p className="text-[10px] text-red-600 mt-1">{errors.email}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1">Designation</label>
                                    <input
                                        type="text"
                                        value={data.designation}
                                        onChange={(e) => setData('designation', e.target.value)}
                                        placeholder="Senior Developer"
                                        className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1">Assigned Role *</label>
                                    <select
                                        value={data.role}
                                        onChange={(e) => setData('role', e.target.value)}
                                        className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                    >
                                        <option value="Admin">Admin</option>
                                        <option value="Staff">Staff</option>
                                        <option value="Intern">Intern</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block font-semibold text-[#0B1C30] mb-1">
                                    Password {editingUser && '(Leave blank to retain current)'}
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                                    required={!editingUser}
                                    className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                />
                                {errors.password && <p className="text-[10px] text-red-600 mt-1">{errors.password}</p>}
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
                                    {processing ? 'Saving...' : editingUser ? 'Update Account' : 'Save User'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
