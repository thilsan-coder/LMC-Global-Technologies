import React, { useState, useEffect, useRef } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { User } from '@/types';
import CustomDropdown, { CustomDropdownOption } from '@/Components/CustomDropdown';
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
    Filter,
    MoreVertical,
    Eye,
    Mail,
    Phone,
    Briefcase,
    CheckCircle2,
    AlertCircle,
    User as UserIcon,
    Key,
    Activity,
} from 'lucide-react';

interface UsersProps {
    users: {
        data: User[];
        links: any[];
        total: number;
        from?: number;
        to?: number;
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
    const [viewingUser, setViewingUser] = useState<User | null>(null);
    const [deletingUser, setDeletingUser] = useState<User | null>(null);

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
        email: '',
        phone: '',
        designation: '',
        password: '',
        role: 'Staff',
        is_active: true,
    });

    const roleOptions: CustomDropdownOption[] = [
        { value: '', label: 'All Roles' },
        ...roles.map((r) => ({
            value: r.name,
            label: `${r.name} Role`,
        })),
    ];

    const modalRoleOptions: CustomDropdownOption[] = [
        { value: 'Admin', label: 'Admin (Full Privileges)' },
        { value: 'Staff', label: 'Staff (Standard Privileges)' },
        { value: 'Intern', label: 'Intern (Restricted Privileges)' },
    ];

    // Dynamic metrics calculation
    const totalUsers = users.total || 0;
    const adminCount = users.data.filter((u) => u.roles?.some((r: any) => (typeof r === 'string' ? r : r.name) === 'Admin')).length;
    const staffCount = users.data.filter((u) => u.roles?.some((r: any) => (typeof r === 'string' ? r : r.name) === 'Staff')).length;
    const activeCount = users.data.filter((u) => u.is_active !== false).length;

    const handleSearch = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        router.get(
            route('admin.users.index'),
            { search: searchTerm, role: roleFilter },
            { preserveState: true }
        );
    };

    const openCreate = () => {
        setEditingUser(null);
        clearErrors();
        reset();
        setData({
            name: '',
            email: '',
            phone: '',
            designation: '',
            password: '',
            role: 'Staff',
            is_active: true,
        });
        setModalOpen(true);
    };

    const openEdit = (u: User) => {
        setEditingUser(u);
        clearErrors();
        setData({
            name: u.name,
            email: u.email,
            phone: u.phone || '',
            designation: u.designation || '',
            password: '',
            role: (u.roles && (typeof u.roles[0] === 'string' ? u.roles[0] : (u.roles[0] as any)?.name)) || 'Staff',
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

    const confirmDelete = () => {
        if (deletingUser) {
            router.delete(route('admin.users.destroy', deletingUser.id), {
                onSuccess: () => setDeletingUser(null),
            });
        }
    };

    return (
        <AdminLayout title="User & Role Governance" subtitle="Spatie RBAC & Access Control">
            <Head title="Users & Permissions - LMC Management" />

            <div className="space-y-6">
                {/* 1. EXECUTIVE METRICS SUMMARY */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Total Accounts
                            </div>
                            <div className="text-2xl font-bold text-[#0B1C30] mt-1">{totalUsers}</div>
                            <div className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
                                <Shield className="w-3.5 h-3.5 text-[#DA7A31]" />
                                <span>RBAC Authorized Users</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-[#0B1C30]/5 border border-[#0B1C30]/10 flex items-center justify-center text-[#0B1C30]">
                            <Shield className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Administrators
                            </div>
                            <div className="text-2xl font-bold text-[#DA7A31] mt-1">{adminCount}</div>
                            <div className="text-[11px] text-[#DA7A31]/80 mt-1 flex items-center gap-1">
                                <Lock className="w-3.5 h-3.5 text-[#DA7A31]" />
                                <span>Full Governance Scope</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-[#DA7A31]/10 border border-[#DA7A31]/20 flex items-center justify-center text-[#DA7A31]">
                            <Lock className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Staff Specialists
                            </div>
                            <div className="text-2xl font-bold text-blue-600 mt-1">{staffCount}</div>
                            <div className="text-[11px] text-blue-700/80 mt-1 flex items-center gap-1">
                                <Briefcase className="w-3.5 h-3.5 text-blue-500" />
                                <span>Operational Personnel</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                            <Briefcase className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Active Accounts
                            </div>
                            <div className="text-2xl font-bold text-emerald-600 mt-1">{activeCount}</div>
                            <div className="text-[11px] text-emerald-700/80 mt-1 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                <span>Authenticated & Live</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                            <CheckCircle2 className="w-6 h-6" />
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
                                    placeholder="Search by user name, email, or designation..."
                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                />
                            </div>

                            {/* Role Filter Dropdown */}
                            <CustomDropdown
                                value={roleFilter}
                                onChange={(val) => {
                                    setRoleFilter(val);
                                    router.get(
                                        route('admin.users.index'),
                                        { search: searchTerm, role: val },
                                        { preserveState: true }
                                    );
                                }}
                                options={roleOptions}
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
                            <span>Create Corporate User</span>
                        </button>
                    </div>
                </div>

                {/* 3. TABLE WITH UN-CLIPPED ACTIONS (⋮) DROPDOWN */}
                <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs overflow-visible" ref={menuRef}>
                    <div className="overflow-x-auto overflow-y-visible">
                        <table className="w-full text-left text-xs text-[#4D4B55] table-fixed">
                            <thead className="bg-[#0B1C30] text-white font-bold uppercase tracking-wider text-[10px]">
                                <tr>
                                    <th className="py-3.5 px-5 w-[32%]">Corporate Identity</th>
                                    <th className="py-3.5 px-5 w-[20%]">Role & Access Tier</th>
                                    <th className="py-3.5 px-5 w-[22%]">Designation</th>
                                    <th className="py-3.5 px-5 w-[16%]">Account Status</th>
                                    <th className="py-3.5 px-5 w-[10%] text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {users.data.length === 0 ? (
                                    <tr className="h-[340px]">
                                        <td colSpan={5} className="py-12 text-center text-gray-500">
                                            <div className="max-w-xs mx-auto text-center space-y-2">
                                                <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                                                    <Shield className="w-6 h-6" />
                                                </div>
                                                <div className="font-bold text-gray-700">No User Accounts Found</div>
                                                <p className="text-xs text-gray-400">
                                                    Try adjusting your search criteria or register a new user account.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    <>
                                        {users.data.map((u, idx) => {
                                            const isMenuOpen = openActionId === u.id;
                                            const openUpward = idx >= users.data.length - 1 || idx >= 2;
                                            const roleName = (u.roles && (typeof u.roles[0] === 'string' ? u.roles[0] : (u.roles[0] as any)?.name)) || 'Staff';

                                            return (
                                                <tr key={u.id} className="h-[68px] hover:bg-slate-50/80 transition-colors">
                                                    {/* User Identity */}
                                                    <td className="py-3.5 px-5">
                                                        <div className="flex items-start gap-3">
                                                            <div className="w-9 h-9 rounded-lg bg-[#0B1C30] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs mt-0.5">
                                                                {u.name.charAt(0)}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <div
                                                                    className="font-bold text-[#0B1C30] text-sm hover:text-[#DA7A31] transition-colors cursor-pointer truncate"
                                                                    onClick={() => setViewingUser(u)}
                                                                >
                                                                    {u.name}
                                                                </div>
                                                                <div className="text-[11px] text-gray-500 flex items-center gap-1.5 mt-0.5 truncate">
                                                                    <Mail className="w-3 h-3 text-[#DA7A31] shrink-0" />
                                                                    <span className="truncate">{u.email}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Role & Access Tier */}
                                                    <td className="py-3.5 px-5">
                                                        <span
                                                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold border ${
                                                                roleName === 'Admin'
                                                                    ? 'bg-amber-50 text-[#DA7A31] border-amber-200'
                                                                    : roleName === 'Staff'
                                                                    ? 'bg-blue-50 text-blue-800 border-blue-200'
                                                                    : 'bg-slate-100 text-slate-800 border-slate-200'
                                                                }`}
                                                        >
                                                            <Shield className="w-3.5 h-3.5 text-current shrink-0" />
                                                            <span className="truncate">{roleName}</span>
                                                        </span>
                                                    </td>

                                                    {/* Designation */}
                                                    <td className="py-3.5 px-5">
                                                        <div className="font-semibold text-gray-800 text-xs truncate">
                                                            {u.designation || <span className="text-gray-400 italic">Not specified</span>}
                                                        </div>
                                                        {u.phone && (
                                                            <div className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5 truncate">
                                                                <Phone className="w-3 h-3 text-gray-400 shrink-0" />
                                                                <span className="truncate">{u.phone}</span>
                                                            </div>
                                                        )}
                                                    </td>

                                                    {/* Account Status Badge */}
                                                    <td className="py-3.5 px-5">
                                                        <span
                                                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                                                                u.is_active !== false
                                                                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                                                    : 'bg-slate-100 text-slate-800 border border-slate-300'
                                                            }`}
                                                        >
                                                            <span
                                                                className={`w-1.5 h-1.5 rounded-full ${
                                                                    u.is_active !== false ? 'bg-emerald-600 animate-pulse' : 'bg-slate-500'
                                                                }`}
                                                            />
                                                            {u.is_active !== false ? 'Active' : 'Suspended'}
                                                        </span>
                                                    </td>

                                                    {/* UN-CLIPPED ACTIONS (⋮) DROPDOWN */}
                                                    <td className="py-3.5 px-5 text-right relative">
                                                        <div className="relative inline-block text-left">
                                                            <button
                                                                type="button"
                                                                onClick={() => setOpenActionId(isMenuOpen ? null : u.id)}
                                                                className={`p-2 rounded-lg transition-colors border ${
                                                                    isMenuOpen
                                                                        ? 'bg-[#0B1C30] text-white border-[#0B1C30]'
                                                                        : 'text-gray-600 hover:text-[#0B1C30] hover:bg-gray-100 border-gray-200'
                                                                }`}
                                                                title="User Actions"
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
                                                                            setViewingUser(u);
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
                                                                            openEdit(u);
                                                                        }}
                                                                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-amber-800 hover:bg-amber-50 hover:text-amber-900 transition font-medium"
                                                                    >
                                                                        <Edit2 className="w-4 h-4 text-amber-600" />
                                                                        <span>Edit User</span>
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setOpenActionId(null);
                                                                            toggleActive(u);
                                                                        }}
                                                                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-blue-800 hover:bg-blue-50 hover:text-blue-900 transition font-medium"
                                                                    >
                                                                        {u.is_active !== false ? (
                                                                            <UserX className="w-4 h-4 text-blue-600" />
                                                                        ) : (
                                                                            <UserCheck className="w-4 h-4 text-blue-600" />
                                                                        )}
                                                                        <span>{u.is_active !== false ? 'Suspend User' : 'Activate User'}</span>
                                                                    </button>
                                                                    <div className="my-1 border-t border-gray-100" />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setOpenActionId(null);
                                                                            setDeletingUser(u);
                                                                        }}
                                                                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-rose-700 hover:bg-rose-50 hover:text-rose-900 transition font-medium"
                                                                    >
                                                                        <Trash2 className="w-4 h-4 text-rose-600" />
                                                                        <span>Delete Account</span>
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        {/* Empty rows to guarantee exact 5-row table height */}
                                        {Array.from({ length: Math.max(0, 5 - users.data.length) }).map((_, i) => (
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
                    {users.links && users.links.length > 0 && (
                        <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
                            <div>
                                Showing <span className="font-semibold text-[#0B1C30]">{users.from || 1}</span> to{' '}
                                <span className="font-semibold text-[#0B1C30]">{users.to || users.data.length}</span> of{' '}
                                <span className="font-semibold text-[#0B1C30]">{users.total}</span> accounts
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {users.links
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

            {/* CREATE / EDIT MODAL WITH CUSTOMERS PAGE STANDARD */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-gray-200 relative max-h-[90vh] flex flex-col">
                        {/* Modal Header */}
                        <div className="bg-[#0B1C30] px-6 py-4 flex items-center justify-between text-white shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#DA7A31]/20 border border-[#DA7A31]/40 flex items-center justify-center text-[#DA7A31]">
                                    <Shield className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold tracking-tight">
                                        {editingUser ? `Edit User: ${editingUser.name}` : 'Create Corporate User'}
                                    </h3>
                                    <p className="text-xs text-gray-300">Set access credentials, designation, and RBAC assignment</p>
                                </div>
                            </div>
                            <button onClick={() => setModalOpen(false)} className="p-1 text-gray-400 hover:text-white rounded-lg transition">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Form Body */}
                        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0 overflow-hidden">
                            <div className="p-6 overflow-y-auto space-y-6 text-xs flex-1 text-gray-900">
                                {/* SECTION 1: PERSONAL & CORPORATE DETAILS */}
                                <div>
                                    <div className="text-[11px] font-bold text-[#DA7A31] uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <UserIcon className="w-4 h-4" />
                                        <span>1. Corporate Identity</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">
                                                Full Name <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <UserIcon className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                                                <input
                                                    type="text"
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    placeholder="e.g. Elena Jayawardena"
                                                    required
                                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                                />
                                            </div>
                                            {errors.name && <p className="text-red-500 text-[11px] mt-1">{errors.name}</p>}
                                        </div>

                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">
                                                Corporate Email <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                                                <input
                                                    type="email"
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    placeholder="e.g. elena@lmcglobal.com"
                                                    required
                                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                                />
                                            </div>
                                            {errors.email && <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>}
                                        </div>

                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">Contact Phone</label>
                                            <div className="relative">
                                                <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                                                <input
                                                    type="text"
                                                    value={data.phone}
                                                    onChange={(e) => setData('phone', e.target.value)}
                                                    placeholder="e.g. +94 11 234 5678"
                                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">Corporate Designation</label>
                                            <div className="relative">
                                                <Briefcase className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                                                <input
                                                    type="text"
                                                    value={data.designation}
                                                    onChange={(e) => setData('designation', e.target.value)}
                                                    placeholder="e.g. Senior Solutions Architect"
                                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION 2: ACCESS GOVERNANCE & SECURITY */}
                                <div className="pt-4 border-t border-gray-100">
                                    <div className="text-[11px] font-bold text-[#DA7A31] uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <Key className="w-4 h-4" />
                                        <span>2. Role Tier & Access Credentials</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">
                                                Assigned Role <span className="text-red-500">*</span>
                                            </label>
                                            <CustomDropdown
                                                value={data.role}
                                                onChange={(val) => setData('role', val)}
                                                options={modalRoleOptions}
                                                variant="white"
                                                className="w-full"
                                            />
                                        </div>

                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">
                                                Password {editingUser && '(Leave blank to retain current)'} {!editingUser && <span className="text-red-500">*</span>}
                                            </label>
                                            <div className="relative">
                                                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                                                <input
                                                    type="password"
                                                    value={data.password}
                                                    onChange={(e) => setData('password', e.target.value)}
                                                    placeholder="••••••••"
                                                    required={!editingUser}
                                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 shadow-2xs"
                                                />
                                            </div>
                                            {errors.password && <p className="text-red-500 text-[11px] mt-1">{errors.password}</p>}
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
                                    <span>{processing ? 'Saving...' : editingUser ? 'Update Account' : 'Save User'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* VIEW PROFILE MODAL */}
            {viewingUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-gray-200 relative">
                        <div className="bg-[#0B1C30] p-6 text-white relative">
                            <button
                                onClick={() => setViewingUser(null)}
                                className="absolute top-4 right-4 p-1 text-gray-400 hover:text-white rounded-lg"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-[#DA7A31] text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0">
                                    {viewingUser.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">{viewingUser.name}</h3>
                                    <div className="text-xs text-gray-300 flex items-center gap-1.5 mt-0.5">
                                        <Briefcase className="w-3.5 h-3.5 text-[#DA7A31]" />
                                        <span>{viewingUser.designation || 'Corporate Member'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 space-y-4 text-xs text-gray-900">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <div className="text-gray-400 text-[10px] font-bold uppercase">Assigned Role</div>
                                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-50 text-[#DA7A31] border border-amber-200">
                                        {(viewingUser.roles && (typeof viewingUser.roles[0] === 'string' ? viewingUser.roles[0] : (viewingUser.roles[0] as any)?.name)) || 'Staff'}
                                    </span>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <div className="text-gray-400 text-[10px] font-bold uppercase">Account Status</div>
                                    <span
                                        className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                                            viewingUser.is_active !== false
                                                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                                : 'bg-slate-200 text-slate-800 border-slate-300'
                                        }`}
                                    >
                                        {viewingUser.is_active !== false ? 'Active' : 'Suspended'}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2 pt-2 border-t border-gray-100">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Mail className="w-4 h-4 text-[#DA7A31] shrink-0" />
                                    <span className="font-semibold shrink-0">Email:</span>
                                    <span>{viewingUser.email}</span>
                                </div>
                                {viewingUser.phone && (
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Phone className="w-4 h-4 text-[#DA7A31] shrink-0" />
                                        <span className="font-semibold shrink-0">Phone:</span>
                                        <span>{viewingUser.phone}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Briefcase className="w-4 h-4 text-[#DA7A31] shrink-0" />
                                    <span className="font-semibold shrink-0">Designation:</span>
                                    <span>{viewingUser.designation || 'N/A'}</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                <button
                                    onClick={() => {
                                        const u = viewingUser;
                                        setViewingUser(null);
                                        openEdit(u);
                                    }}
                                    className="px-4 py-2 text-xs font-bold text-[#0B1C30] bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-300 transition"
                                >
                                    <Edit2 className="w-3.5 h-3.5 inline mr-1.5" />
                                    <span>Edit User</span>
                                </button>
                                <button
                                    onClick={() => setViewingUser(null)}
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
            {deletingUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-200 text-center">
                        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="w-6 h-6" />
                        </div>
                        <h3 className="text-base font-bold text-[#0B1C30] mb-2">Delete User Account?</h3>
                        <p className="text-xs text-gray-500 mb-6">
                            Are you sure you want to remove <span className="font-bold text-[#0B1C30]">{deletingUser.name}</span>? This action cannot be undone.
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <button
                                onClick={() => setDeletingUser(null)}
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
