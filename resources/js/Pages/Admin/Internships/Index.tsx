import React, { useState, useEffect, useRef } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { InternItem } from '@/types';
import CustomDropdown, { CustomDropdownOption } from '@/Components/CustomDropdown';
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
    AlertCircle,
    Eye,
    Filter,
    MoreVertical,
    User,
    Mail,
    Phone,
    Award,
    Activity,
    FileText,
} from 'lucide-react';

interface InternshipsProps {
    interns: {
        data: InternItem[];
        links: any[];
        total: number;
        from?: number;
        to?: number;
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
    const [viewingIntern, setViewingIntern] = useState<InternItem | null>(null);
    const [deletingIntern, setDeletingIntern] = useState<InternItem | null>(null);

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
        university: '',
        course: '',
        department: 'Software Engineering & Cloud Architecture',
        start_date: '',
        end_date: '',
        status: 'Active' as InternItem['status'],
        verification_status: 'Verified' as InternItem['verification_status'],
        supervisor: 'Elena Jayawardena',
        project_title: '',
        performance_score: 95.0,
        notes: '',
    });

    const statusFilterOptions: CustomDropdownOption[] = [
        { value: '', label: 'All Internship Statuses' },
        { value: 'Active', label: 'Active Retainer' },
        { value: 'Completed', label: 'Completed Alumni' },
        { value: 'Terminated', label: 'Terminated' },
    ];

    const verificationFilterOptions: CustomDropdownOption[] = [
        { value: '', label: 'All Verification Statuses' },
        { value: 'Verified', label: 'Verified Credentials' },
        { value: 'Pending', label: 'Pending Review' },
        { value: 'Revoked', label: 'Revoked Credentials' },
    ];

    const departmentOptions: CustomDropdownOption[] = [
        { value: 'Software Engineering & Cloud Architecture', label: 'Software Engineering & Cloud Architecture' },
        { value: 'Cloud Services & DevOps Infrastructure', label: 'Cloud Services & DevOps Infrastructure' },
        { value: 'Cybersecurity & Defensive Engineering', label: 'Cybersecurity & Defensive Engineering' },
        { value: 'Artificial Intelligence & Data Engineering', label: 'Artificial Intelligence & Data Engineering' },
    ];

    const modalStatusOptions: CustomDropdownOption[] = [
        { value: 'Active', label: 'Active Retainer' },
        { value: 'Completed', label: 'Completed Alumni' },
        { value: 'Terminated', label: 'Terminated' },
    ];

    const modalVerificationOptions: CustomDropdownOption[] = [
        { value: 'Verified', label: 'Verified Credentials' },
        { value: 'Pending', label: 'Pending Review' },
        { value: 'Revoked', label: 'Revoked Credentials' },
    ];

    // Dynamic metrics calculation
    const totalInterns = interns.total || 0;
    const activeCount = interns.data.filter((i) => i.status === 'Active').length;
    const completedCount = interns.data.filter((i) => i.status === 'Completed').length;
    const verifiedCount = interns.data.filter((i) => i.verification_status === 'Verified').length;

    const handleSearch = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
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
        clearErrors();
        reset();
        setData({
            name: '',
            email: '',
            phone: '',
            university: '',
            course: '',
            department: 'Software Engineering & Cloud Architecture',
            start_date: '',
            end_date: '',
            status: 'Active',
            verification_status: 'Verified',
            supervisor: 'Elena Jayawardena',
            project_title: '',
            performance_score: 95.0,
            notes: '',
        });
        setModalOpen(true);
    };

    const openEdit = (intern: InternItem) => {
        setEditingIntern(intern);
        clearErrors();
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

    const confirmDelete = () => {
        if (deletingIntern) {
            router.delete(route('admin.internships.destroy', deletingIntern.id), {
                onSuccess: () => setDeletingIntern(null),
            });
        }
    };

    const toggleVerification = (intern: InternItem) => {
        router.post(route('admin.internships.toggle-verification', intern.id));
    };

    return (
        <AdminLayout title="Internship Management" subtitle="Industrial Training & Credential Verification">
            <Head title="Internships - LMC Management" />

            <div className="space-y-6">
                {/* 1. EXECUTIVE METRICS SUMMARY */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Total Interns
                            </div>
                            <div className="text-2xl font-bold text-[#0B1C30] mt-1">{totalInterns}</div>
                            <div className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
                                <GraduationCap className="w-3.5 h-3.5 text-[#DA7A31]" />
                                <span>Enrolled Talent</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-[#0B1C30]/5 border border-[#0B1C30]/10 flex items-center justify-center text-[#0B1C30]">
                            <GraduationCap className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Active Interns
                            </div>
                            <div className="text-2xl font-bold text-emerald-600 mt-1">{activeCount}</div>
                            <div className="text-[11px] text-emerald-700/80 mt-1 flex items-center gap-1">
                                <Activity className="w-3.5 h-3.5 text-emerald-500" />
                                <span>Active Training Sprints</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                            <Activity className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Completed Alumni
                            </div>
                            <div className="text-2xl font-bold text-blue-600 mt-1">{completedCount}</div>
                            <div className="text-[11px] text-blue-700/80 mt-1 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                                <span>Certified Graduates</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Verified Credentials
                            </div>
                            <div className="text-2xl font-bold text-[#DA7A31] mt-1">{verifiedCount}</div>
                            <div className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
                                <ShieldCheck className="w-3.5 h-3.5 text-[#DA7A31]" />
                                <span>Blockchain / QR Validated</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-[#DA7A31]/10 border border-[#DA7A31]/20 flex items-center justify-center text-[#DA7A31]">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {/* 2. FILTER TOOLBAR & REGISTER BUTTON */}
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
                                    placeholder="Search by intern ID, name, university, or course..."
                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                />
                            </div>

                            {/* Status Filter Dropdown */}
                            <CustomDropdown
                                value={statusFilter}
                                onChange={(val) => {
                                    setStatusFilter(val);
                                    router.get(
                                        route('admin.internships.index'),
                                        { search: searchTerm, status: val, verification_status: verificationFilter },
                                        { preserveState: true }
                                    );
                                }}
                                options={statusFilterOptions}
                                variant="navy"
                            />

                            {/* Verification Filter Dropdown */}
                            <CustomDropdown
                                value={verificationFilter}
                                onChange={(val) => {
                                    setVerificationFilter(val);
                                    router.get(
                                        route('admin.internships.index'),
                                        { search: searchTerm, status: statusFilter, verification_status: val },
                                        { preserveState: true }
                                    );
                                }}
                                options={verificationFilterOptions}
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
                            <span>Register Intern</span>
                        </button>
                    </div>
                </div>

                {/* 3. TABLE WITH UN-CLIPPED ACTIONS (⋮) DROPDOWN */}
                <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs overflow-visible" ref={menuRef}>
                    <div className="overflow-x-auto overflow-y-visible">
                        <table className="w-full text-left text-xs text-[#4D4B55] table-fixed">
                            <thead className="bg-[#0B1C30] text-white font-bold uppercase tracking-wider text-[10px]">
                                <tr>
                                    <th className="py-3.5 px-5 w-[28%]">Intern Record</th>
                                    <th className="py-3.5 px-5 w-[20%]">Academic Background</th>
                                    <th className="py-3.5 px-5 w-[20%]">Department & Period</th>
                                    <th className="py-3.5 px-5 w-[12%]">Attendance</th>
                                    <th className="py-3.5 px-5 w-[10%]">Verification</th>
                                    <th className="py-3.5 px-5 w-[10%] text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {interns.data.length === 0 ? (
                                    <tr className="h-[340px]">
                                        <td colSpan={6} className="py-12 text-center text-gray-500">
                                            <div className="max-w-xs mx-auto text-center space-y-2">
                                                <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                                                    <GraduationCap className="w-6 h-6" />
                                                </div>
                                                <div className="font-bold text-gray-700">No Intern Records Found</div>
                                                <p className="text-xs text-gray-400">
                                                    Try adjusting your search criteria or register a new candidate.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    <>
                                        {interns.data.map((intern, idx) => {
                                            const isMenuOpen = openActionId === intern.id;
                                            const openUpward = idx >= interns.data.length - 1 || idx >= 2;

                                            return (
                                                <tr key={intern.id} className="h-[68px] hover:bg-slate-50/80 transition-colors">
                                                    {/* Intern Record */}
                                                    <td className="py-3.5 px-5">
                                                        <div className="flex items-start gap-3">
                                                            <div className="w-9 h-9 rounded-lg bg-[#0B1C30] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs mt-0.5">
                                                                {intern.name.charAt(0)}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <div className="font-mono font-bold text-[#DA7A31] text-[11px] truncate">
                                                                    {intern.intern_id}
                                                                </div>
                                                                <div
                                                                    className="font-bold text-[#0B1C30] text-sm hover:text-[#DA7A31] transition-colors cursor-pointer truncate"
                                                                    onClick={() => setViewingIntern(intern)}
                                                                >
                                                                    {intern.name}
                                                                </div>
                                                                <div className="text-[11px] text-gray-500 font-medium truncate">{intern.email}</div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Academic Background */}
                                                    <td className="py-3.5 px-5">
                                                        <div className="font-semibold text-gray-900 truncate">{intern.university}</div>
                                                        <div className="text-[11px] text-gray-500 font-medium truncate">{intern.course}</div>
                                                    </td>

                                                    {/* Department & Period */}
                                                    <td className="py-3.5 px-5">
                                                        <div className="font-semibold text-[#0B1C30] truncate">{intern.department}</div>
                                                        <div className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5 font-medium truncate">
                                                            <Calendar className="w-3.5 h-3.5 text-[#DA7A31] shrink-0" />
                                                            <span className="truncate">
                                                                {intern.start_date} to {intern.end_date}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    {/* Attendance & Status */}
                                                    <td className="py-3.5 px-5">
                                                        <div className="font-extrabold text-[#DA7A31] text-sm">
                                                            {intern.attendance_percentage}%
                                                        </div>
                                                        <span
                                                            className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border mt-0.5 ${
                                                                intern.status === 'Completed'
                                                                    ? 'bg-blue-100 text-blue-900 border-blue-300'
                                                                    : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                                            }`}
                                                        >
                                                            {intern.status}
                                                        </span>
                                                    </td>

                                                    {/* Verification Badge with Toggle Button */}
                                                    <td className="py-3.5 px-5">
                                                        <button
                                                            onClick={() => toggleVerification(intern)}
                                                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition flex items-center gap-1.5 border shadow-2xs cursor-pointer ${
                                                                intern.verification_status === 'Verified'
                                                                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300 hover:bg-emerald-200'
                                                                    : 'bg-red-100 text-red-900 border-red-300 hover:bg-red-200'
                                                            }`}
                                                            title="Click to toggle verification status"
                                                        >
                                                            <ShieldCheck className="w-3 h-3" />
                                                            <span>{intern.verification_status}</span>
                                                        </button>
                                                    </td>

                                                    {/* UN-CLIPPED ACTIONS (⋮) DROPDOWN */}
                                                    <td className="py-3.5 px-5 text-right relative">
                                                        <div className="relative inline-block text-left">
                                                            <button
                                                                type="button"
                                                                onClick={() => setOpenActionId(isMenuOpen ? null : intern.id)}
                                                                className={`p-2 rounded-lg transition-colors border ${
                                                                    isMenuOpen
                                                                        ? 'bg-[#0B1C30] text-white border-[#0B1C30]'
                                                                        : 'text-gray-600 hover:text-[#0B1C30] hover:bg-gray-100 border-gray-200'
                                                                }`}
                                                                title="Intern Actions"
                                                            >
                                                                <MoreVertical className="w-4 h-4" />
                                                            </button>

                                                            {isMenuOpen && (
                                                                <div
                                                                    className={`absolute right-0 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 py-1.5 z-50 animate-fadeIn text-left font-normal ${
                                                                        openUpward ? 'bottom-full mb-1.5' : 'top-full mt-1.5'
                                                                    }`}
                                                                >
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setOpenActionId(null);
                                                                            setViewingIntern(intern);
                                                                        }}
                                                                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-gray-700 hover:bg-slate-50 hover:text-[#0B1C30] transition font-medium"
                                                                    >
                                                                        <Eye className="w-4 h-4 text-slate-500" />
                                                                        <span>View Profile</span>
                                                                    </button>
                                                                    <a
                                                                        href={route('admin.internships.certificate', intern.id)}
                                                                        target="_blank"
                                                                        rel="noreferrer"
                                                                        onClick={() => setOpenActionId(null)}
                                                                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-indigo-700 hover:bg-indigo-50 hover:text-indigo-900 transition font-medium"
                                                                    >
                                                                        <Download className="w-4 h-4 text-indigo-600" />
                                                                        <span>Download Certificate</span>
                                                                    </a>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setOpenActionId(null);
                                                                            openEdit(intern);
                                                                        }}
                                                                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-amber-800 hover:bg-amber-50 hover:text-amber-900 transition font-medium"
                                                                    >
                                                                        <Edit2 className="w-4 h-4 text-amber-600" />
                                                                        <span>Edit Details</span>
                                                                    </button>
                                                                    <div className="my-1 border-t border-gray-100" />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setOpenActionId(null);
                                                                            setDeletingIntern(intern);
                                                                        }}
                                                                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-rose-700 hover:bg-rose-50 hover:text-rose-900 transition font-medium"
                                                                    >
                                                                        <Trash2 className="w-4 h-4 text-rose-600" />
                                                                        <span>Delete Intern</span>
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        {/* Empty rows to guarantee exact 5-row table height */}
                                        {Array.from({ length: Math.max(0, 5 - interns.data.length) }).map((_, i) => (
                                            <tr key={`empty-${i}`} className="h-[68px]">
                                                <td colSpan={6} className="py-3.5 px-5">&nbsp;</td>
                                            </tr>
                                        ))}
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Footer */}
                    {interns.links && interns.links.length > 0 && (
                        <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
                            <div>
                                Showing <span className="font-semibold text-[#0B1C30]">{interns.from || 1}</span> to{' '}
                                <span className="font-semibold text-[#0B1C30]">{interns.to || interns.data.length}</span> of{' '}
                                <span className="font-semibold text-[#0B1C30]">{interns.total}</span> registered interns
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {interns.links
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
                                    <GraduationCap className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold tracking-tight">
                                        {editingIntern ? 'Edit Intern Record' : 'Register New Intern'}
                                    </h3>
                                    <p className="text-xs text-gray-300">
                                        {editingIntern ? `Updating details for ${editingIntern.name}` : 'Fill in credentials and institutional details to register an intern'}
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
                                {/* SECTION 1: PERSONAL & CONTACT INFORMATION */}
                                <div>
                                    <div className="text-[11px] font-bold text-[#DA7A31] uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        <span>1. Personal & Contact Details</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">
                                                Full Name <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                                                <input
                                                    type="text"
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    placeholder="e.g. Kasun Chamara"
                                                    required
                                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                                />
                                            </div>
                                            {errors.name && <p className="text-red-500 text-[11px] mt-1">{errors.name}</p>}
                                        </div>

                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">
                                                Corporate / Student Email <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                                                <input
                                                    type="email"
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    placeholder="e.g. kasun@lmcglobal.com"
                                                    required
                                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                                />
                                            </div>
                                            {errors.email && <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>}
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block font-semibold text-[#0B1C30] mb-1">Contact Phone Number</label>
                                            <div className="relative">
                                                <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                                                <input
                                                    type="text"
                                                    value={data.phone}
                                                    onChange={(e) => setData('phone', e.target.value)}
                                                    placeholder="e.g. +94 71 234 5678"
                                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION 2: ACADEMIC CREDENTIALS */}
                                <div className="pt-4 border-t border-gray-100">
                                    <div className="text-[11px] font-bold text-[#DA7A31] uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <GraduationCap className="w-4 h-4" />
                                        <span>2. Academic Background</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">
                                                University / Institution <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <Building2 className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                                                <input
                                                    type="text"
                                                    value={data.university}
                                                    onChange={(e) => setData('university', e.target.value)}
                                                    placeholder="e.g. University of Colombo"
                                                    required
                                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">
                                                Degree / Academic Course <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <Award className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                                                <input
                                                    type="text"
                                                    value={data.course}
                                                    onChange={(e) => setData('course', e.target.value)}
                                                    placeholder="e.g. B.Sc. in Computer Science"
                                                    required
                                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                                />
                                            </div>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block font-semibold text-[#0B1C30] mb-1">
                                                Engineering Department <span className="text-red-500">*</span>
                                            </label>
                                            <CustomDropdown
                                                value={data.department}
                                                onChange={(val) => setData('department', val)}
                                                options={departmentOptions}
                                                variant="white"
                                                className="w-full"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION 3: INTERNSHIP TIMEFRAME & VERIFICATION */}
                                <div className="pt-4 border-t border-gray-100 space-y-4">
                                    <div className="text-[11px] font-bold text-[#DA7A31] uppercase tracking-wider mb-1 flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4" />
                                        <span>3. Internship Schedule & Verification</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">
                                                Start Date <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                                                <input
                                                    type="date"
                                                    value={data.start_date}
                                                    onChange={(e) => setData('start_date', e.target.value)}
                                                    onClick={(e) => {
                                                        try {
                                                            e.currentTarget.showPicker();
                                                        } catch (err) {}
                                                    }}
                                                    required
                                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 shadow-2xs cursor-pointer"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">
                                                End Date <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                                                <input
                                                    type="date"
                                                    value={data.end_date}
                                                    onChange={(e) => setData('end_date', e.target.value)}
                                                    onClick={(e) => {
                                                        try {
                                                            e.currentTarget.showPicker();
                                                        } catch (err) {}
                                                    }}
                                                    required
                                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 shadow-2xs cursor-pointer"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">
                                                Internship Status <span className="text-red-500">*</span>
                                            </label>
                                            <CustomDropdown
                                                value={data.status}
                                                onChange={(val) => setData('status', val as InternItem['status'])}
                                                options={modalStatusOptions}
                                                variant="white"
                                                className="w-full"
                                            />
                                        </div>

                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">
                                                Verification Status <span className="text-red-500">*</span>
                                            </label>
                                            <CustomDropdown
                                                value={data.verification_status}
                                                onChange={(val) => setData('verification_status', val as InternItem['verification_status'])}
                                                options={modalVerificationOptions}
                                                variant="white"
                                                className="w-full"
                                            />
                                        </div>

                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">Senior Mentor / Supervisor</label>
                                            <input
                                                type="text"
                                                value={data.supervisor}
                                                onChange={(e) => setData('supervisor', e.target.value)}
                                                placeholder="e.g. Elena Jayawardena"
                                                className="w-full px-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                            />
                                        </div>

                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">Performance Score (%)</label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                value={data.performance_score}
                                                onChange={(e) => setData('performance_score', parseFloat(e.target.value) || 0)}
                                                placeholder="95.0"
                                                className="w-full px-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block font-semibold text-[#0B1C30] mb-1">Assigned Industrial Project</label>
                                            <input
                                                type="text"
                                                value={data.project_title}
                                                onChange={(e) => setData('project_title', e.target.value)}
                                                placeholder="e.g. Enterprise Microservice Platform Systems"
                                                className="w-full px-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
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
                                    <span>{processing ? 'Saving Record...' : editingIntern ? 'Update Intern Record' : 'Save Intern Record'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* VIEW PROFILE MODAL */}
            {viewingIntern && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-gray-200 relative">
                        <div className="bg-[#0B1C30] p-6 text-white relative">
                            <button
                                onClick={() => setViewingIntern(null)}
                                className="absolute top-4 right-4 p-1 text-gray-400 hover:text-white rounded-lg"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-[#DA7A31] text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0">
                                    {viewingIntern.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-mono text-xs text-[#DA7A31] font-bold">
                                        {viewingIntern.intern_id}
                                    </div>
                                    <h3 className="text-lg font-bold">{viewingIntern.name}</h3>
                                    <div className="text-xs text-gray-300 flex items-center gap-1.5 mt-0.5">
                                        <GraduationCap className="w-3.5 h-3.5 text-[#DA7A31]" />
                                        <span>{viewingIntern.course}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 space-y-4 text-xs text-gray-900">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <div className="text-gray-400 text-[10px] font-bold uppercase">Internship Status</div>
                                    <span
                                        className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                                            viewingIntern.status === 'Completed'
                                                ? 'bg-blue-100 text-blue-900 border-blue-300'
                                                : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                        }`}
                                    >
                                        {viewingIntern.status}
                                    </span>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <div className="text-gray-400 text-[10px] font-bold uppercase">Credential Verification</div>
                                    <span
                                        className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                                            viewingIntern.verification_status === 'Verified'
                                                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                                : 'bg-red-100 text-red-900 border-red-300'
                                        }`}
                                    >
                                        {viewingIntern.verification_status}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2 pt-2 border-t border-gray-100">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Building2 className="w-4 h-4 text-[#DA7A31] shrink-0" />
                                    <span className="font-semibold shrink-0">University:</span>
                                    <span>{viewingIntern.university}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Mail className="w-4 h-4 text-[#DA7A31] shrink-0" />
                                    <span className="font-semibold shrink-0">Email:</span>
                                    <span>{viewingIntern.email}</span>
                                </div>
                                {viewingIntern.phone && (
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Phone className="w-4 h-4 text-[#DA7A31] shrink-0" />
                                        <span className="font-semibold shrink-0">Phone:</span>
                                        <span>{viewingIntern.phone}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Calendar className="w-4 h-4 text-[#DA7A31] shrink-0" />
                                    <span className="font-semibold shrink-0">Duration:</span>
                                    <span>{viewingIntern.start_date} to {viewingIntern.end_date}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Activity className="w-4 h-4 text-[#DA7A31] shrink-0" />
                                    <span className="font-semibold shrink-0">Attendance Benchmark:</span>
                                    <span className="font-bold text-[#DA7A31]">{viewingIntern.attendance_percentage}%</span>
                                </div>
                            </div>

                            {viewingIntern.project_title && (
                                <div className="pt-2 border-t border-gray-100">
                                    <div className="font-bold text-[#0B1C30] mb-1">Assigned Industrial Project</div>
                                    <p className="p-3 bg-slate-50 rounded-xl text-gray-600 border border-slate-100 font-medium">
                                        {viewingIntern.project_title}
                                    </p>
                                </div>
                            )}

                            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            const i = viewingIntern;
                                            setViewingIntern(null);
                                            openEdit(i);
                                        }}
                                        className="px-4 py-2 text-xs font-bold text-[#0B1C30] bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-300 transition"
                                    >
                                        <Edit2 className="w-3.5 h-3.5 inline mr-1.5" />
                                        <span>Edit Record</span>
                                    </button>
                                    <a
                                        href={route('admin.internships.pdf', viewingIntern.id)}
                                        target="_blank"
                                        className="px-4 py-2 text-xs font-bold text-[#DA7A31] bg-orange-50 hover:bg-orange-100 rounded-xl border border-orange-200 transition inline-flex items-center gap-1.5"
                                    >
                                        <Download className="w-3.5 h-3.5" />
                                        <span>Certificate</span>
                                    </a>
                                </div>
                                <button
                                    onClick={() => setViewingIntern(null)}
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
            {deletingIntern && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-200 text-center">
                        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="w-6 h-6" />
                        </div>
                        <h3 className="text-base font-bold text-[#0B1C30] mb-2">Delete Intern Record?</h3>
                        <p className="text-xs text-gray-500 mb-6">
                            Are you sure you want to remove <span className="font-bold text-[#0B1C30]">{deletingIntern.name}</span> ({deletingIntern.intern_id})? This action cannot be undone.
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <button
                                onClick={() => setDeletingIntern(null)}
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
