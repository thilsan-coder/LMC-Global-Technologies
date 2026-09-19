import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { InternItem } from '@/types';
import {
    GraduationCap,
    Plus,
    Search,
    Edit2,
    Trash2,
    ShieldCheck,
    Download,
    Building2,
    Calendar,
    X,
    CheckCircle2,
    AlertTriangle,
    Eye,
} from 'lucide-react';

interface InternshipsProps {
    interns: {
        data: InternItem[];
        links: any[];
        total: number;
    };
    filters: {
        search?: string;
        status?: string;
        verification_status?: string;
    };
}

export default function InternshipsIndex({ interns, filters }: InternshipsProps) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [verificationFilter, setVerificationFilter] = useState(filters.verification_status || '');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingIntern, setEditingIntern] = useState<InternItem | null>(null);

    const { data, setData, post, put, processing, reset, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        university: '',
        course: '',
        department: 'Software Engineering',
        start_date: '',
        end_date: '',
        status: 'Active' as InternItem['status'],
        verification_status: 'Verified' as InternItem['verification_status'],
        supervisor: 'Elena Jayawardena',
        project_title: '',
        performance_score: 95.0,
        notes: '',
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            route('admin.internships.index'),
            {
                search: searchTerm,
                status: statusFilter,
                verification_status: verificationFilter,
            },
            { preserveState: true }
        );
    };

    const openCreate = () => {
        setEditingIntern(null);
        reset();
        setModalOpen(true);
    };

    const openEdit = (intern: InternItem) => {
        setEditingIntern(intern);
        setData({
            name: intern.name,
            email: intern.email,
            phone: intern.phone || '',
            university: intern.university,
            course: intern.course,
            department: intern.department,
            start_date: intern.start_date,
            end_date: intern.end_date,
            status: intern.status,
            verification_status: intern.verification_status,
            supervisor: intern.supervisor || '',
            project_title: intern.project_title || '',
            performance_score: intern.performance_score || 90.0,
            notes: intern.notes || '',
        });
        setModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingIntern) {
            put(route('admin.internships.update', editingIntern.id), {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        } else {
            post(route('admin.internships.store'), {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id: number, internId: string) => {
        if (confirm(`Are you sure you want to delete intern record "${internId}"?`)) {
            router.delete(route('admin.internships.destroy', id));
        }
    };

    const toggleVerification = (intern: InternItem) => {
        router.post(route('admin.internships.toggle-verification', intern.id));
    };

    return (
        <AdminLayout title="Internship Management" subtitle="Industrial Training & Credential Verification">
            <Head title="Internships - LMC Management" />

            {/* Filter / Action Bar */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <form onSubmit={handleSearch} className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search Intern ID, Name, Uni..."
                            className="w-full pl-9 pr-4 py-1.5 text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31] py-1.5"
                    >
                        <option value="">All Internship Statuses</option>
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                        <option value="Terminated">Terminated</option>
                    </select>

                    <select
                        value={verificationFilter}
                        onChange={(e) => setVerificationFilter(e.target.value)}
                        className="text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31] py-1.5"
                    >
                        <option value="">All Verification</option>
                        <option value="Verified">Verified</option>
                        <option value="Pending">Pending</option>
                        <option value="Revoked">Revoked</option>
                    </select>

                    <button
                        type="submit"
                        className="lmc-btn lmc-btn-navy lmc-btn-sm"
                    >
                        Filter
                    </button>
                </form>

                <button
                    onClick={openCreate}
                    className="w-full sm:w-auto lmc-btn lmc-btn-primary lmc-btn-sm"
                >
                    <Plus className="w-4 h-4" />
                    <span>Register Intern</span>
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-[#4D4B55]">
                        <thead className="bg-gray-50 border-b border-gray-200 text-[#0B1C30] font-bold uppercase tracking-wider text-[10px]">
                            <tr>
                                <th className="py-3 px-4">Intern Record</th>
                                <th className="py-3 px-4">Academic Background</th>
                                <th className="py-3 px-4">Department & Period</th>
                                <th className="py-3 px-4">Attendance</th>
                                <th className="py-3 px-4">Verification</th>
                                <th className="py-3 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {interns.data.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-8 text-center text-gray-500">
                                        No intern records match the search criteria.
                                    </td>
                                </tr>
                            ) : (
                                interns.data.map((intern) => (
                                    <tr key={intern.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-3.5 px-4">
                                            <div className="font-mono font-extrabold text-[#0B1C30] text-xs">
                                                {intern.intern_id}
                                            </div>
                                            <div className="font-bold text-sm text-[#0B1C30] mt-0.5">
                                                {intern.name}
                                            </div>
                                            <div className="text-[11px] text-gray-500">{intern.email}</div>
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <div className="font-semibold text-gray-800">{intern.university}</div>
                                            <div className="text-[11px] text-gray-500">{intern.course}</div>
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <div className="font-semibold text-[#0B1C30]">{intern.department}</div>
                                            <div className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                                                <Calendar className="w-3 h-3 text-[#DA7A31]" />
                                                <span>
                                                    {intern.start_date} to {intern.end_date}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <div className="font-extrabold text-[#DA7A31]">
                                                {intern.attendance_percentage}%
                                            </div>
                                            <span
                                                className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                                                    intern.status === 'Completed'
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : 'bg-emerald-100 text-emerald-800'
                                                }`}
                                            >
                                                {intern.status}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <button
                                                onClick={() => toggleVerification(intern)}
                                                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition flex items-center gap-1 ${
                                                    intern.verification_status === 'Verified'
                                                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                                                }`}
                                                title="Click to toggle status"
                                            >
                                                <ShieldCheck className="w-3 h-3" />
                                                <span>{intern.verification_status}</span>
                                            </button>
                                        </td>
                                        <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                                            <a
                                                href={route('admin.internships.pdf', intern.id)}
                                                target="_blank"
                                                className="inline-block p-1.5 text-[#0B1C30] hover:text-[#DA7A31] hover:bg-gray-100 rounded"
                                                title="Download Certificate PDF"
                                            >
                                                <Download className="w-3.5 h-3.5" />
                                            </a>
                                            <button
                                                onClick={() => openEdit(intern)}
                                                className="p-1.5 text-gray-500 hover:text-[#0B1C30] hover:bg-gray-100 rounded"
                                                title="Edit Intern"
                                            >
                                                <Edit2 className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(intern.id, intern.intern_id)}
                                                className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                                                title="Delete Intern"
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
                {interns.links && interns.links.length > 3 && (
                    <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                        <div>Total: {interns.total} registered interns</div>
                        <div className="flex gap-1">
                            {interns.links.map((link, idx) => (
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

            {/* Create/Edit Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
                    <div className="bg-white rounded-lg max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-700"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h3 className="text-base font-bold text-[#0B1C30] mb-4">
                            {editingIntern ? `Edit Record: ${editingIntern.intern_id}` : 'Register New Industrial Intern'}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                            <div className="grid grid-cols-2 gap-3">
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
                                    <label className="block font-semibold text-[#0B1C30] mb-1">Email Address *</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                    />
                                    {errors.email && <p className="text-[10px] text-red-600 mt-1">{errors.email}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1">University / Institute *</label>
                                    <input
                                        type="text"
                                        value={data.university}
                                        onChange={(e) => setData('university', e.target.value)}
                                        required
                                        placeholder="e.g. University of Colombo"
                                        className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1">Degree Course *</label>
                                    <input
                                        type="text"
                                        value={data.course}
                                        onChange={(e) => setData('course', e.target.value)}
                                        required
                                        placeholder="BSc (Hons) Software Engineering"
                                        className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1">Department *</label>
                                    <select
                                        value={data.department}
                                        onChange={(e) => setData('department', e.target.value)}
                                        className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                    >
                                        <option value="Software Engineering & Cloud Architecture">
                                            Software Engineering & Cloud Architecture
                                        </option>
                                        <option value="Cloud Services & DevOps Infrastructure">
                                            Cloud Services & DevOps Infrastructure
                                        </option>
                                        <option value="Cybersecurity & Defensive Engineering">
                                            Cybersecurity & Defensive Engineering
                                        </option>
                                        <option value="Artificial Intelligence & Data Engineering">
                                            Artificial Intelligence & Data Engineering
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1">Supervisor</label>
                                    <input
                                        type="text"
                                        value={data.supervisor}
                                        onChange={(e) => setData('supervisor', e.target.value)}
                                        className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1">Start Date *</label>
                                    <input
                                        type="date"
                                        value={data.start_date}
                                        onChange={(e) => setData('start_date', e.target.value)}
                                        required
                                        className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1">End Date *</label>
                                    <input
                                        type="date"
                                        value={data.end_date}
                                        onChange={(e) => setData('end_date', e.target.value)}
                                        required
                                        className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1">Status *</label>
                                    <select
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value as InternItem['status'])}
                                        className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Terminated">Terminated</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1">Verification *</label>
                                    <select
                                        value={data.verification_status}
                                        onChange={(e) =>
                                            setData(
                                                'verification_status',
                                                e.target.value as InternItem['verification_status']
                                            )
                                        }
                                        className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                    >
                                        <option value="Verified">Verified</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Revoked">Revoked</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1">Performance Score (%)</label>
                                    <input
                                        type="number"
                                        step="0.5"
                                        value={data.performance_score}
                                        onChange={(e) => setData('performance_score', parseFloat(e.target.value))}
                                        className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-semibold text-[#0B1C30] mb-1">Assigned Project Title</label>
                                <input
                                    type="text"
                                    value={data.project_title}
                                    onChange={(e) => setData('project_title', e.target.value)}
                                    placeholder="e.g. Distributed Caching Layer & Auth Gateway"
                                    className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-200">
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
                                    className="lmc-btn lmc-btn-primary lmc-btn-sm"
                                >
                                    {processing ? 'Processing...' : editingIntern ? 'Update Record' : 'Save & Register Intern'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
