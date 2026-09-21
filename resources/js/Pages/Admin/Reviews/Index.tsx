import React, { useState, useEffect, useRef } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ReviewItem } from '@/types';
import CustomDropdown, { CustomDropdownOption } from '@/Components/CustomDropdown';
import {
    Star,
    CheckCircle2,
    XCircle,
    Trash2,
    ShieldCheck,
    Search,
    Filter,
    Clock,
    ThumbsUp,
    ThumbsDown,
    MoreVertical,
    AlertCircle,
    User,
    Eye,
    X,
    MessageSquare,
    Building2,
    Check,
} from 'lucide-react';

interface ReviewsProps {
    reviews: {
        data: ReviewItem[];
        links: any[];
        total: number;
        from?: number;
        to?: number;
    };
    counts: {
        all: number;
        pending: number;
        approved: number;
        rejected: number;
    };
    filters: {
        search?: string;
        status?: string;
    };
}

export default function ReviewsIndex({ reviews, counts, filters }: ReviewsProps) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');

    const [viewingReview, setViewingReview] = useState<ReviewItem | null>(null);
    const [rejectingReview, setRejectingReview] = useState<ReviewItem | null>(null);
    const [rejectionReason, setRejectionReason] = useState('Does not meet publication guidelines');
    const [deletingReview, setDeletingReview] = useState<ReviewItem | null>(null);

    // Active row action dropdown state (id or null)
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

    const statusOptions: CustomDropdownOption[] = [
        { value: '', label: `All Reviews (${counts.all})` },
        { value: 'Pending', label: `Pending Moderation (${counts.pending})` },
        { value: 'Approved', label: `Published Publicly (${counts.approved})` },
        { value: 'Rejected', label: `Rejected Queue (${counts.rejected})` },
    ];

    const handleFilterChange = (status: string) => {
        setStatusFilter(status);
        router.get(
            route('admin.reviews.index'),
            { search: searchTerm, status: status },
            { preserveState: true }
        );
    };

    const handleSearch = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        router.get(
            route('admin.reviews.index'),
            { search: searchTerm, status: statusFilter },
            { preserveState: true }
        );
    };

    const approveReview = (id: number) => {
        router.post(route('admin.reviews.approve', id), {}, {
            onSuccess: () => {
                if (viewingReview?.id === id) setViewingReview(null);
            },
        });
    };

    const submitRejection = () => {
        if (!rejectingReview) return;
        router.post(
            route('admin.reviews.reject', rejectingReview.id),
            { admin_notes: rejectionReason },
            {
                onSuccess: () => {
                    setRejectingReview(null);
                    if (viewingReview?.id === rejectingReview.id) setViewingReview(null);
                },
            }
        );
    };

    const toggleVerified = (id: number) => {
        router.post(route('admin.reviews.toggle-verified', id), {}, {
            preserveScroll: true,
        });
    };

    const confirmDelete = () => {
        if (!deletingReview) return;
        router.delete(route('admin.reviews.destroy', deletingReview.id), {
            onSuccess: () => setDeletingReview(null),
        });
    };

    return (
        <AdminLayout title="Review Moderation Workflow" subtitle="Quality Assurance & Verification Desk">
            <Head title="Review Moderation - LMC Management" />

            <div className="space-y-6">
                {/* 1. EXECUTIVE METRICS SUMMARY CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button
                        type="button"
                        onClick={() => handleFilterChange('')}
                        className={`bg-white p-5 rounded-xl border transition-all text-left shadow-2xs flex items-center justify-between cursor-pointer ${
                            statusFilter === ''
                                ? 'border-[#0B1C30] ring-2 ring-[#0B1C30]/20 bg-slate-50/50'
                                : 'border-gray-200/80 hover:border-gray-300'
                        }`}
                    >
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                All Reviews
                            </div>
                            <div className="text-2xl font-bold text-[#0B1C30] mt-1">{counts.all}</div>
                            <div className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
                                <MessageSquare className="w-3.5 h-3.5 text-gray-500" />
                                <span>Total submitted</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-[#0B1C30]/5 border border-[#0B1C30]/10 flex items-center justify-center text-[#0B1C30]">
                            <MessageSquare className="w-6 h-6" />
                        </div>
                    </button>

                    <button
                        type="button"
                        onClick={() => handleFilterChange('Pending')}
                        className={`bg-white p-5 rounded-xl border transition-all text-left shadow-2xs flex items-center justify-between cursor-pointer relative overflow-hidden ${
                            statusFilter === 'Pending'
                                ? 'border-[#DA7A31] ring-2 ring-[#DA7A31]/20 bg-amber-50/30'
                                : 'border-amber-200/80 hover:border-amber-300'
                        }`}
                    >
                        {counts.pending > 0 && (
                            <span className="absolute top-3 right-3 flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                            </span>
                        )}
                        <div>
                            <div className="text-xs font-semibold text-amber-900 uppercase tracking-wider">
                                Pending Moderation
                            </div>
                            <div className="text-2xl font-bold text-[#DA7A31] mt-1">{counts.pending}</div>
                            <div className="text-[11px] text-[#DA7A31] mt-1 flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                <span>Requires triage</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-[#DA7A31]/10 border border-[#DA7A31]/20 flex items-center justify-center text-[#DA7A31]">
                            <Clock className="w-6 h-6" />
                        </div>
                    </button>

                    <button
                        type="button"
                        onClick={() => handleFilterChange('Approved')}
                        className={`bg-white p-5 rounded-xl border transition-all text-left shadow-2xs flex items-center justify-between cursor-pointer ${
                            statusFilter === 'Approved'
                                ? 'border-emerald-600 ring-2 ring-emerald-600/20 bg-emerald-50/30'
                                : 'border-emerald-200/80 hover:border-emerald-300'
                        }`}
                    >
                        <div>
                            <div className="text-xs font-semibold text-emerald-900 uppercase tracking-wider">
                                Published Publicly
                            </div>
                            <div className="text-2xl font-bold text-emerald-600 mt-1">{counts.approved}</div>
                            <div className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Live on portal</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                    </button>

                    <button
                        type="button"
                        onClick={() => handleFilterChange('Rejected')}
                        className={`bg-white p-5 rounded-xl border transition-all text-left shadow-2xs flex items-center justify-between cursor-pointer ${
                            statusFilter === 'Rejected'
                                ? 'border-rose-600 ring-2 ring-rose-600/20 bg-rose-50/30'
                                : 'border-gray-200/80 hover:border-gray-300'
                        }`}
                    >
                        <div>
                            <div className="text-xs font-semibold text-rose-900 uppercase tracking-wider">
                                Rejected Queue
                            </div>
                            <div className="text-2xl font-bold text-rose-600 mt-1">{counts.rejected}</div>
                            <div className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                                <XCircle className="w-3.5 h-3.5" />
                                <span>Declined reviews</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                            <XCircle className="w-6 h-6" />
                        </div>
                    </button>
                </div>

                {/* 2. FILTER TOOLBAR WITH CLEAN CONTROLS */}
                <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-2xs">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                        <form onSubmit={handleSearch} className="flex flex-1 flex-col sm:flex-row items-center gap-3 w-full">
                            {/* Search Bar */}
                            <div className="relative flex-1 w-full">
                                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search author, company, email, or service target..."
                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                />
                            </div>

                            {/* Status Filter Dropdown */}
                            <div className="w-full sm:w-60">
                                <CustomDropdown
                                    value={statusFilter}
                                    onChange={(val) => handleFilterChange(val)}
                                    options={statusOptions}
                                    icon={Filter}
                                    variant="navy"
                                />
                            </div>

                            <button
                                type="submit"
                                className="lmc-btn lmc-btn-navy lmc-btn-sm shrink-0 w-full sm:w-auto justify-center rounded-xl"
                            >
                                <Filter className="w-3.5 h-3.5" />
                                <span>Filter</span>
                            </button>
                        </form>
                    </div>
                </div>

                {/* 3. STANDARDIZED REVIEWS TABLE WITH UN-CLIPPED ACTIONS (⋮) DROPDOWN */}
                <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs overflow-visible" ref={menuRef}>
                    <div className="overflow-x-auto overflow-y-visible">
                        <table className="w-full text-left text-xs text-[#4D4B55] table-fixed">
                            <thead className="bg-[#0B1C30] text-white font-bold uppercase tracking-wider text-[10px]">
                                <tr>
                                    <th className="py-3.5 px-5 w-[28%]">Author & Organization</th>
                                    <th className="py-3.5 px-5 w-[18%]">Rating & Target</th>
                                    <th className="py-3.5 px-5 w-[30%]">Review Content</th>
                                    <th className="py-3.5 px-5 w-[14%]">Moderation Status</th>
                                    <th className="py-3.5 px-5 w-[10%] text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {reviews.data.length === 0 ? (
                                    <tr className="h-[340px]">
                                        <td colSpan={5} className="py-12 text-center text-gray-500">
                                            <div className="max-w-xs mx-auto text-center space-y-2">
                                                <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                                                    <Star className="w-6 h-6" />
                                                </div>
                                                <div className="font-bold text-gray-700">No Reviews Found</div>
                                                <p className="text-xs text-gray-400">
                                                    No client reviews found in this moderation stage.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    <>
                                        {reviews.data.map((r, idx) => {
                                            const isMenuOpen = openActionId === r.id;
                                            const openUpward = idx >= reviews.data.length - 1 || idx >= 2;

                                            return (
                                                <tr
                                                    key={r.id}
                                                    className={`h-[68px] hover:bg-slate-50/80 transition-colors ${
                                                        r.status === 'Pending'
                                                            ? 'bg-amber-50/20'
                                                            : r.status === 'Rejected'
                                                            ? 'opacity-80'
                                                            : ''
                                                    }`}
                                                >
                                                    {/* Author & Organization */}
                                                    <td className="py-3.5 px-5">
                                                        <div className="flex items-start gap-3">
                                                            <div className="w-9 h-9 rounded-lg bg-[#0B1C30] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs mt-0.5">
                                                                {r.name.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <div
                                                                    className="font-bold text-[#0B1C30] text-sm hover:text-[#DA7A31] transition-colors cursor-pointer truncate"
                                                                    onClick={() => setViewingReview(r)}
                                                                >
                                                                    {r.name}
                                                                </div>
                                                                <div className="text-[11px] text-gray-600 flex items-center gap-1.5 mt-0.5 truncate">
                                                                    <Building2 className="w-3 h-3 text-[#DA7A31] shrink-0" />
                                                                    <span className="font-medium truncate">
                                                                        {r.role ? `${r.role}, ` : ''}{r.company}
                                                                    </span>
                                                                </div>
                                                                <div className="text-[11px] text-gray-400 mt-0.5 truncate">
                                                                    {r.email}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Rating & Target */}
                                                    <td className="py-3.5 px-5 space-y-0.5">
                                                        <div className="flex items-center gap-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`w-3.5 h-3.5 ${
                                                                        i < r.rating
                                                                            ? 'fill-[#DA7A31] text-[#DA7A31]'
                                                                            : 'text-gray-200'
                                                                    }`}
                                                                />
                                                            ))}
                                                            <span className="text-[11px] font-bold text-gray-700 ml-1">
                                                                {r.rating}.0
                                                            </span>
                                                        </div>
                                                        <div className="text-xs font-semibold text-[#0B1C30] truncate">
                                                            {r.service_or_product}
                                                        </div>
                                                    </td>

                                                    {/* Review Content */}
                                                    <td className="py-3.5 px-5">
                                                        <p className="text-xs text-[#4D4B55] line-clamp-1 italic font-medium">
                                                            "{r.review}"
                                                        </p>
                                                        <div className="mt-0.5 flex items-center gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => toggleVerified(r.id)}
                                                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition flex items-center gap-1 border ${
                                                                    r.is_verified_client
                                                                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                                                                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                                                                }`}
                                                                title="Click to toggle verified status"
                                                            >
                                                                <CheckCircle2 className="w-3 h-3" />
                                                                <span>{r.is_verified_client ? 'Verified Client' : 'Unverified'}</span>
                                                            </button>
                                                            <span className="text-[10px] text-gray-400">
                                                                {new Date(r.created_at).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    {/* Moderation Status */}
                                                    <td className="py-3.5 px-5">
                                                        <span
                                                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                                                                r.status === 'Approved'
                                                                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                                                    : r.status === 'Pending'
                                                                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                                                    : 'bg-rose-100 text-rose-900 border border-rose-300'
                                                            }`}
                                                        >
                                                            <span
                                                                className={`w-1.5 h-1.5 rounded-full ${
                                                                    r.status === 'Pending'
                                                                        ? 'bg-amber-600 animate-pulse'
                                                                        : r.status === 'Approved'
                                                                        ? 'bg-emerald-600'
                                                                        : 'bg-rose-600'
                                                                }`}
                                                            />
                                                            {r.status}
                                                        </span>
                                                    </td>

                                                    {/* UN-CLIPPED ACTIONS (⋮) DROPDOWN */}
                                                    <td className="py-3.5 px-5 text-right relative">
                                                        <div className="relative inline-block text-left">
                                                            <button
                                                                type="button"
                                                                onClick={() => setOpenActionId(isMenuOpen ? null : r.id)}
                                                                className={`p-2 rounded-lg transition-colors border ${
                                                                    isMenuOpen
                                                                        ? 'bg-[#0B1C30] text-white border-[#0B1C30]'
                                                                        : 'text-gray-600 hover:text-[#0B1C30] hover:bg-gray-100 border-gray-200'
                                                                }`}
                                                                title="Review Actions"
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
                                                                            setViewingReview(r);
                                                                        }}
                                                                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-gray-700 hover:bg-slate-50 hover:text-[#0B1C30] transition font-medium"
                                                                    >
                                                                        <Eye className="w-4 h-4 text-slate-500" />
                                                                        <span>View Full Review</span>
                                                                    </button>

                                                                    {r.status !== 'Approved' && (
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                setOpenActionId(null);
                                                                                approveReview(r.id);
                                                                            }}
                                                                            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-emerald-700 hover:bg-emerald-50 hover:text-emerald-900 transition font-medium"
                                                                        >
                                                                            <ThumbsUp className="w-4 h-4 text-emerald-600" />
                                                                            <span>Approve Review</span>
                                                                        </button>
                                                                    )}

                                                                    {r.status !== 'Rejected' && (
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                setOpenActionId(null);
                                                                                setRejectingReview(r);
                                                                                setRejectionReason('Does not meet publication guidelines');
                                                                            }}
                                                                            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-amber-800 hover:bg-amber-50 hover:text-amber-900 transition font-medium"
                                                                        >
                                                                            <ThumbsDown className="w-4 h-4 text-amber-600" />
                                                                            <span>Reject Review</span>
                                                                        </button>
                                                                    )}

                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setOpenActionId(null);
                                                                            toggleVerified(r.id);
                                                                        }}
                                                                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-indigo-700 hover:bg-indigo-50 hover:text-indigo-900 transition font-medium"
                                                                    >
                                                                        <ShieldCheck className="w-4 h-4 text-indigo-600" />
                                                                        <span>Toggle Verified</span>
                                                                    </button>

                                                                    <div className="my-1 border-t border-gray-100" />

                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setOpenActionId(null);
                                                                            setDeletingReview(r);
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
                                        {/* Empty rows to guarantee exact 5-row table height */}
                                        {Array.from({ length: Math.max(0, 5 - reviews.data.length) }).map((_, i) => (
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
                    {reviews.links && reviews.links.length > 0 && (
                        <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
                            <div>
                                Showing <span className="font-semibold text-[#0B1C30]">{reviews.from || 1}</span> to{' '}
                                <span className="font-semibold text-[#0B1C30]">{reviews.to || reviews.data.length}</span> of{' '}
                                <span className="font-semibold text-[#0B1C30]">{reviews.total}</span> client reviews
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {reviews.links
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

            {/* VIEW FULL REVIEW MODAL */}
            {viewingReview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden border border-gray-200 relative max-h-[90vh] flex flex-col">
                        <div className="bg-[#0B1C30] px-6 py-4 flex items-center justify-between text-white shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#DA7A31]/20 border border-[#DA7A31]/40 flex items-center justify-center text-[#DA7A31]">
                                    <Star className="w-5 h-5 fill-[#DA7A31]" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold tracking-tight">Client Review Details</h3>
                                    <p className="text-xs text-gray-300">
                                        Submitted on {new Date(viewingReview.created_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setViewingReview(null)}
                                className="p-1 text-gray-400 hover:text-white rounded-lg transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto space-y-4 text-xs flex-1 text-gray-900">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                                            viewingReview.status === 'Approved'
                                                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                                : viewingReview.status === 'Pending'
                                                ? 'bg-amber-100 text-amber-900 border-amber-300'
                                                : 'bg-rose-100 text-rose-900 border-rose-300'
                                        }`}
                                    >
                                        {viewingReview.status}
                                    </span>
                                    {viewingReview.is_verified_client && (
                                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border bg-emerald-50 text-emerald-800 border-emerald-300 flex items-center gap-1">
                                            <CheckCircle2 className="w-3 h-3" />
                                            Verified Client
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${
                                                i < viewingReview.rating
                                                    ? 'fill-[#DA7A31] text-[#DA7A31]'
                                                    : 'text-gray-200'
                                            }`}
                                        />
                                    ))}
                                    <span className="font-bold text-xs text-gray-700 ml-1">
                                        {viewingReview.rating}.0
                                    </span>
                                </div>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-xl text-xs space-y-1.5 border border-slate-100 font-medium">
                                <div>
                                    <span className="font-bold text-gray-600">Author:</span> {viewingReview.name}
                                </div>
                                <div>
                                    <span className="font-bold text-gray-600">Company:</span> {viewingReview.company}
                                    {viewingReview.role && ` (${viewingReview.role})`}
                                </div>
                                <div>
                                    <span className="font-bold text-gray-600">Email:</span> {viewingReview.email}
                                </div>
                                <div>
                                    <span className="font-bold text-gray-600">Target:</span>{' '}
                                    <span className="text-[#DA7A31] font-semibold">{viewingReview.service_or_product}</span>
                                </div>
                            </div>

                            <div>
                                <label className="block font-semibold text-[#0B1C30] mb-1.5">Review Statement</label>
                                <div className="text-xs text-[#4D4B55] leading-relaxed whitespace-pre-wrap bg-white p-4 rounded-xl border border-gray-200 font-medium italic">
                                    "{viewingReview.review}"
                                </div>
                            </div>

                            {viewingReview.admin_notes && (
                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1.5">Moderation Notes</label>
                                    <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-200 font-medium">
                                        {viewingReview.admin_notes}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sticky Footer */}
                        <div className="shrink-0 bg-gray-50 border-t border-gray-200 p-4 flex items-center justify-end gap-3 z-20">
                            {viewingReview.status !== 'Approved' && (
                                <button
                                    onClick={() => approveReview(viewingReview.id)}
                                    className="lmc-btn lmc-btn-primary h-[42px] py-0 px-4 text-xs font-semibold rounded-xl inline-flex items-center justify-center gap-2 shadow-2xs"
                                >
                                    <ThumbsUp className="w-4 h-4" />
                                    <span>Approve & Publish</span>
                                </button>
                            )}
                            {viewingReview.status !== 'Rejected' && (
                                <button
                                    onClick={() => {
                                        setRejectingReview(viewingReview);
                                        setRejectionReason('Does not meet publication guidelines');
                                    }}
                                    className="h-[42px] py-0 px-4 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl inline-flex items-center justify-center gap-2 shadow-2xs transition"
                                >
                                    <ThumbsDown className="w-4 h-4" />
                                    <span>Reject</span>
                                </button>
                            )}
                            <button
                                onClick={() => setViewingReview(null)}
                                className="lmc-btn lmc-btn-secondary h-[42px] py-0 px-4 text-xs font-semibold rounded-xl inline-flex items-center justify-center"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* REJECT REVIEW MODAL */}
            {rejectingReview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-gray-200 relative flex flex-col">
                        <div className="bg-[#0B1C30] px-6 py-4 flex items-center justify-between text-white shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                                    <ThumbsDown className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold tracking-tight">Reject Review</h3>
                                    <p className="text-xs text-gray-300">
                                        Specify reason for rejecting review by {rejectingReview.name}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setRejectingReview(null)}
                                className="p-1 text-gray-400 hover:text-white rounded-lg transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4 text-xs">
                            <div>
                                <label className="block font-semibold text-[#0B1C30] mb-1">
                                    Rejection Reason / Internal Admin Notes
                                </label>
                                <textarea
                                    rows={3}
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    placeholder="Enter reason for rejection..."
                                    className="w-full p-3 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs resize-none"
                                />
                            </div>
                        </div>

                        <div className="shrink-0 bg-gray-50 border-t border-gray-200 p-4 flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setRejectingReview(null)}
                                className="px-4 py-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl border border-gray-300 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={submitRejection}
                                className="px-4 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl transition shadow-xs"
                            >
                                Confirm Rejection
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* DELETE CONFIRMATION MODAL */}
            {deletingReview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-200 text-center">
                        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="w-6 h-6" />
                        </div>
                        <h3 className="text-base font-bold text-[#0B1C30] mb-2">Delete Review?</h3>
                        <p className="text-xs text-gray-500 mb-6">
                            Are you sure you want to permanently remove the review by{' '}
                            <span className="font-bold text-[#0B1C30]">{deletingReview.name}</span> ({deletingReview.company})? This action cannot be undone.
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <button
                                onClick={() => setDeletingReview(null)}
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
