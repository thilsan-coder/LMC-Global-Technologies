import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ReviewItem } from '@/types';
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
} from 'lucide-react';

interface ReviewsProps {
    reviews: {
        data: ReviewItem[];
        links: any[];
        total: number;
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

    const handleFilterChange = (status: string) => {
        setStatusFilter(status);
        router.get(
            route('admin.reviews.index'),
            { search: searchTerm, status: status },
            { preserveState: true }
        );
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            route('admin.reviews.index'),
            { search: searchTerm, status: statusFilter },
            { preserveState: true }
        );
    };

    const approveReview = (id: number) => {
        router.post(route('admin.reviews.approve', id));
    };

    const rejectReview = (id: number) => {
        const reason = prompt('Reason for rejection (optional):', 'Does not meet publication guidelines');
        if (reason !== null) {
            router.post(route('admin.reviews.reject', id), { admin_notes: reason });
        }
    };

    const toggleVerified = (id: number) => {
        router.post(route('admin.reviews.toggle-verified', id));
    };

    const deleteReview = (id: number, author: string) => {
        if (confirm(`Permanently delete review by "${author}"?`)) {
            router.delete(route('admin.reviews.destroy', id));
        }
    };

    return (
        <AdminLayout title="Review Moderation Workflow" subtitle="Quality Assurance & Verification Desk">
            <Head title="Review Moderation - LMC Management" />

            {/* Workflow Pipeline Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <button
                    onClick={() => handleFilterChange('')}
                    className={`p-4 rounded-lg border text-left transition shadow-xs ${
                        statusFilter === ''
                            ? 'bg-[#0B1C30] text-white border-[#0B1C30]'
                            : 'bg-white hover:bg-gray-50 border-gray-200 text-[#4D4B55]'
                    }`}
                >
                    <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">All Reviews</div>
                    <div className="text-2xl font-extrabold mt-1">{counts.all}</div>
                </button>

                <button
                    onClick={() => handleFilterChange('Pending')}
                    className={`p-4 rounded-lg border text-left transition shadow-xs relative overflow-hidden ${
                        statusFilter === 'Pending'
                            ? 'bg-[#DA7A31] text-white border-[#DA7A31]'
                            : 'bg-white hover:bg-gray-50 border-amber-300 text-amber-900'
                    }`}
                >
                    {counts.pending > 0 && (
                        <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                        </span>
                    )}
                    <div className="text-[10px] font-bold uppercase tracking-wider opacity-90">Pending Moderation</div>
                    <div className="text-2xl font-extrabold mt-1">{counts.pending}</div>
                </button>

                <button
                    onClick={() => handleFilterChange('Approved')}
                    className={`p-4 rounded-lg border text-left transition shadow-xs ${
                        statusFilter === 'Approved'
                            ? 'bg-emerald-700 text-white border-emerald-700'
                            : 'bg-white hover:bg-gray-50 border-emerald-200 text-emerald-900'
                    }`}
                >
                    <div className="text-[10px] font-bold uppercase tracking-wider opacity-90">Published Publicly</div>
                    <div className="text-2xl font-extrabold mt-1">{counts.approved}</div>
                </button>

                <button
                    onClick={() => handleFilterChange('Rejected')}
                    className={`p-4 rounded-lg border text-left transition shadow-xs ${
                        statusFilter === 'Rejected'
                            ? 'bg-red-800 text-white border-red-800'
                            : 'bg-white hover:bg-gray-50 border-gray-200 text-red-900'
                    }`}
                >
                    <div className="text-[10px] font-bold uppercase tracking-wider opacity-90">Rejected Queue</div>
                    <div className="text-2xl font-extrabold mt-1">{counts.rejected}</div>
                </button>
            </div>

            {/* Search Bar */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs mb-6 flex items-center justify-between">
                <form onSubmit={handleSearch} className="flex-1 max-w-md relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search review author, company, or service..."
                        className="w-full pl-9 pr-4 py-1.5 text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                    />
                </form>
            </div>

            {/* Reviews Cards List */}
            <div className="space-y-4">
                {reviews.data.length === 0 ? (
                    <div className="bg-white p-12 text-center text-xs text-gray-500 rounded-lg border border-gray-200 shadow-xs">
                        No reviews found in this moderation stage.
                    </div>
                ) : (
                    reviews.data.map((r) => (
                        <div
                            key={r.id}
                            className={`bg-white rounded-lg border p-6 shadow-xs transition-all flex flex-col md:flex-row justify-between gap-6 ${
                                r.status === 'Pending'
                                    ? 'border-amber-400 bg-amber-50/20'
                                    : r.status === 'Approved'
                                    ? 'border-emerald-300'
                                    : 'border-red-200 opacity-70'
                            }`}
                        >
                            <div className="flex-1 space-y-3">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span
                                        className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                            r.status === 'Approved'
                                                ? 'bg-emerald-100 text-emerald-800'
                                                : r.status === 'Pending'
                                                ? 'bg-amber-100 text-amber-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}
                                    >
                                        STATUS: {r.status}
                                    </span>

                                    <div className="flex items-center space-x-1">
                                        {[...Array(r.rating)].map((_, i) => (
                                            <Star key={i} className="w-3.5 h-3.5 fill-[#DA7A31] text-[#DA7A31]" />
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => toggleVerified(r.id)}
                                        className={`text-[10px] font-semibold px-2 py-0.5 rounded transition flex items-center gap-1 ${
                                            r.is_verified_client
                                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                        }`}
                                        title="Toggle verified client badge"
                                    >
                                        <CheckCircle2 className="w-3 h-3" />
                                        <span>{r.is_verified_client ? 'Verified Client' : 'Unverified'}</span>
                                    </button>

                                    <span className="text-[11px] text-gray-400">
                                        Submitted on {new Date(r.created_at).toLocaleDateString()}
                                    </span>
                                </div>

                                <div>
                                    <div className="text-sm font-bold text-[#0B1C30]">
                                        {r.name}{' '}
                                        <span className="font-normal text-gray-500 text-xs">
                                            ({r.role ? `${r.role}, ` : ''}{r.company}) &bull; {r.email}
                                        </span>
                                    </div>
                                    <div className="text-xs font-semibold text-[#DA7A31] mt-0.5">
                                        Target: {r.service_or_product}
                                    </div>
                                </div>

                                <p className="text-xs sm:text-sm text-[#4D4B55] leading-relaxed italic bg-white p-3 rounded border border-gray-100">
                                    "{r.review}"
                                </p>

                                {r.admin_notes && (
                                    <div className="text-[11px] text-gray-500 bg-gray-50 p-2 rounded border border-gray-200">
                                        <strong>Admin Notes:</strong> {r.admin_notes}
                                    </div>
                                )}
                            </div>

                            {/* Moderation Actions */}
                            <div className="flex md:flex-col items-center justify-end md:justify-center gap-2 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 flex-shrink-0">
                                {r.status !== 'Approved' && (
                                    <button
                                        onClick={() => approveReview(r.id)}
                                        className="w-full lmc-btn lmc-btn-sm bg-emerald-600 hover:bg-emerald-700 text-white"
                                    >
                                        <ThumbsUp className="w-3.5 h-3.5" />
                                        <span>Approve Review</span>
                                    </button>
                                )}

                                {r.status !== 'Rejected' && (
                                    <button
                                        onClick={() => rejectReview(r.id)}
                                        className="w-full lmc-btn lmc-btn-sm bg-amber-600 hover:bg-amber-700 text-white"
                                    >
                                        <ThumbsDown className="w-3.5 h-3.5" />
                                        <span>Reject</span>
                                    </button>
                                )}

                                <button
                                    onClick={() => deleteReview(r.id, r.name)}
                                    className="w-full lmc-btn lmc-btn-sm lmc-btn-danger"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            {reviews.links && reviews.links.length > 3 && (
                <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200 shadow-xs flex items-center justify-between text-xs text-gray-500">
                    <div>Total: {reviews.total} reviews</div>
                    <div className="flex gap-1">
                        {reviews.links.map((link, idx) => (
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
        </AdminLayout>
    );
}
