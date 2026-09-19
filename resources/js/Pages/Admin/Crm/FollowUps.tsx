import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { FollowUpItem, LeadItem, CustomerItem } from '@/types';
import {
    CalendarCheck,
    Plus,
    CheckCircle2,
    Clock,
    X,
    Building2,
    User,
    Calendar,
} from 'lucide-react';

interface FollowUpsProps {
    followUps: {
        data: FollowUpItem[];
        links: any[];
        total: number;
    };
    leads: Array<{ id: number; name: string; company?: string }>;
    customers: Array<{ id: number; name: string; company?: string }>;
    filters: {
        status?: string;
    };
}

export default function FollowUps({ followUps, leads, customers, filters }: FollowUpsProps) {
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [modalOpen, setModalOpen] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        lead_id: '',
        customer_id: '',
        follow_up_date: '',
        notes: '',
        status: 'Pending',
    });

    const handleFilterChange = (val: string) => {
        setStatusFilter(val);
        router.get(route('admin.crm.followups'), { status: val }, { preserveState: true });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.crm.followups.store'), {
            onSuccess: () => {
                setModalOpen(false);
                reset();
            },
        });
    };

    const markComplete = (item: FollowUpItem) => {
        router.put(route('admin.crm.followups.update', item.id), {
            follow_up_date: item.follow_up_date,
            notes: item.notes,
            status: item.status === 'Completed' ? 'Pending' : 'Completed',
        });
    };

    return (
        <AdminLayout title="CRM Follow-ups & Reminders" subtitle="Scheduled Engagements">
            <Head title="CRM Follow-ups - LMC Management" />

            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs mb-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs">
                    <span className="font-semibold text-gray-500">Filter Status:</span>
                    <select
                        value={statusFilter}
                        onChange={(e) => handleFilterChange(e.target.value)}
                        className="text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31] py-1.5"
                    >
                        <option value="">All Follow-ups</option>
                        <option value="Pending">Pending Only</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>

                <button
                    onClick={() => {
                        reset();
                        setModalOpen(true);
                    }}
                    className="bg-[#DA7A31] hover:bg-[#C2631D] text-white text-xs font-bold px-4 py-2 rounded shadow-xs flex items-center gap-1.5"
                >
                    <Plus className="w-4 h-4" />
                    <span>Schedule Follow-up</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {followUps.data.length === 0 ? (
                    <div className="col-span-full bg-white p-10 text-center text-xs text-gray-500 rounded-lg border border-gray-200">
                        No follow-up reminders scheduled.
                    </div>
                ) : (
                    followUps.data.map((item) => (
                        <div
                            key={item.id}
                            className={`bg-white rounded-lg p-5 border shadow-xs flex flex-col justify-between transition-colors ${
                                item.status === 'Completed'
                                    ? 'border-emerald-200 bg-emerald-50/20'
                                    : 'border-gray-200 hover:border-[#DA7A31]'
                            }`}
                        >
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span
                                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                                            item.status === 'Completed'
                                                ? 'bg-emerald-100 text-emerald-800'
                                                : item.status === 'Cancelled'
                                                ? 'bg-gray-100 text-gray-600'
                                                : 'bg-amber-100 text-amber-800'
                                        }`}
                                    >
                                        {item.status}
                                    </span>
                                    <div className="text-[11px] text-gray-500 flex items-center gap-1">
                                        <Calendar className="w-3 h-3 text-[#DA7A31]" />
                                        <span>{new Date(item.follow_up_date).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <div className="font-bold text-sm text-[#0B1C30] mb-1">
                                    {item.lead?.name || item.customer?.name || 'General Corporate Engagement'}
                                </div>
                                <div className="text-[11px] text-gray-500 mb-3 flex items-center gap-1">
                                    <Building2 className="w-3 h-3 text-gray-400" />
                                    <span>{item.lead?.company || item.customer?.company || 'Direct'}</span>
                                </div>

                                <p className="text-xs text-[#4D4B55] bg-gray-50 p-2.5 rounded border border-gray-100 leading-relaxed mb-4">
                                    {item.notes}
                                </p>
                            </div>

                            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                                <div className="text-[10px] text-gray-400">By: {item.user?.name}</div>
                                <button
                                    onClick={() => markComplete(item)}
                                    className={`px-3 py-1 rounded text-[11px] font-bold transition ${
                                        item.status === 'Completed'
                                            ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                    }`}
                                >
                                    {item.status === 'Completed' ? 'Reopen' : 'Mark Completed'}
                                </button>
                            </div>
                        </div>
                    ))
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
                            Schedule New CRM Follow-Up
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                            <div>
                                <label className="block font-semibold text-[#0B1C30] mb-1">Link to Lead</label>
                                <select
                                    value={data.lead_id}
                                    onChange={(e) => setData('lead_id', e.target.value)}
                                    className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                >
                                    <option value="">-- No Lead Associated --</option>
                                    {leads.map((l) => (
                                        <option key={l.id} value={l.id}>
                                            Lead: {l.name} ({l.company})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block font-semibold text-[#0B1C30] mb-1">Or Link to Existing Customer</label>
                                <select
                                    value={data.customer_id}
                                    onChange={(e) => setData('customer_id', e.target.value)}
                                    className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                >
                                    <option value="">-- No Customer Associated --</option>
                                    {customers.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            Customer: {c.name} ({c.company})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block font-semibold text-[#0B1C30] mb-1">Follow-Up Date & Time *</label>
                                <input
                                    type="datetime-local"
                                    value={data.follow_up_date}
                                    onChange={(e) => setData('follow_up_date', e.target.value)}
                                    required
                                    className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold text-[#0B1C30] mb-1">Action Items / Objective *</label>
                                <textarea
                                    rows={3}
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    required
                                    placeholder="Call client to review technical proposal, clarify hosting specifications..."
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
                                    {processing ? 'Scheduling...' : 'Set Reminder'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
