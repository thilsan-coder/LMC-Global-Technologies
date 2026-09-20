import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { FollowUpItem } from '@/types';
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

    const { data, setData, post, processing, reset, errors, clearErrors } = useForm({
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

    const openCreate = () => {
        clearErrors();
        reset();
        setModalOpen(true);
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
        <AdminLayout title="CRM Follow-ups & Reminders" subtitle="Scheduled Engagements & Follow-ups">
            <Head title="Follow-ups & Reminders - CRM" />

            <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-2xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-xs w-full sm:w-auto">
                    <span className="font-semibold text-[#0B1C30]">Filter Status:</span>
                    <select
                        value={statusFilter}
                        onChange={(e) => handleFilterChange(e.target.value)}
                        className="text-xs rounded-lg border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] py-2 px-3 bg-white text-gray-900 cursor-pointer"
                    >
                        <option value="">All Follow-ups</option>
                        <option value="Pending">Pending Reminders</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>

                <button
                    onClick={openCreate}
                    className="w-full sm:w-auto lmc-btn lmc-btn-primary lmc-btn-sm shrink-0 shadow-2xs"
                >
                    <Plus className="w-4 h-4" />
                    <span>Schedule Follow-up</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {followUps.data.length === 0 ? (
                    <div className="col-span-full bg-white p-12 text-center text-xs text-gray-500 rounded-xl border border-gray-200/80 shadow-2xs">
                        <CalendarCheck className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                        <div className="font-bold text-gray-700">No Scheduled Follow-ups Found</div>
                        <p className="text-gray-400 mt-1">Schedule a new reminder to stay on top of client engagements.</p>
                    </div>
                ) : (
                    followUps.data.map((item) => (
                        <div
                            key={item.id}
                            className={`p-5 rounded-xl border transition-all shadow-2xs flex flex-col justify-between bg-white ${
                                item.status === 'Completed'
                                    ? 'border-emerald-200/80 opacity-90'
                                    : 'border-gray-200 hover:border-[#DA7A31]/40'
                            }`}
                        >
                            <div>
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <span
                                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                                            item.status === 'Completed'
                                                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                                : 'bg-amber-100 text-amber-900 border-amber-300'
                                        }`}
                                    >
                                        {item.status === 'Completed' ? (
                                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                        ) : (
                                            <Clock className="w-3 h-3 text-amber-600" />
                                        )}
                                        {item.status}
                                    </span>
                                    <div className="text-[11px] font-semibold text-[#DA7A31] flex items-center gap-1">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>{item.follow_up_date}</span>
                                    </div>
                                </div>

                                <div className="space-y-1.5 mb-4">
                                    {item.customer && (
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#0B1C30]">
                                            <Building2 className="w-3.5 h-3.5 text-[#DA7A31] shrink-0" />
                                            <span>Customer: {item.customer.company || item.customer.name}</span>
                                        </div>
                                    )}
                                    {item.lead && (
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#0B1C30]">
                                            <User className="w-3.5 h-3.5 text-[#DA7A31] shrink-0" />
                                            <span>Lead: {item.lead.company || item.lead.name}</span>
                                        </div>
                                    )}
                                    <p className="text-xs text-gray-700 mt-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                        {item.notes}
                                    </p>
                                </div>
                            </div>

                            <div className="pt-3 border-t border-gray-100 flex items-center justify-end">
                                <button
                                    onClick={() => markComplete(item)}
                                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                                        item.status === 'Completed'
                                            ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                                            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs'
                                    }`}
                                >
                                    {item.status === 'Completed' ? 'Reopen Follow-up' : 'Mark Completed'}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* CREATE MODAL WITH STICKY FOOTER */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-gray-200 relative max-h-[85vh] flex flex-col">
                        <div className="bg-[#0B1C30] px-6 py-4 flex items-center justify-between text-white shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#DA7A31]/20 border border-[#DA7A31]/40 flex items-center justify-center text-[#DA7A31]">
                                    <CalendarCheck className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold tracking-tight">Schedule Follow-up Engagement</h3>
                                    <p className="text-xs text-gray-300">Set a reminder to contact a lead or customer</p>
                                </div>
                            </div>
                            <button onClick={() => setModalOpen(false)} className="p-1 text-gray-400 hover:text-white rounded-lg transition">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0 overflow-hidden">
                            <div className="p-6 overflow-y-auto space-y-4 text-xs flex-1 text-gray-900">
                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1">Link to Sales Lead</label>
                                    <select
                                        value={data.lead_id}
                                        onChange={(e) => setData('lead_id', e.target.value)}
                                        className="w-full p-2 text-xs rounded-lg border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 cursor-pointer"
                                    >
                                        <option value="">-- No Lead Associated --</option>
                                        {leads.map((l) => (
                                            <option key={l.id} value={l.id}>
                                                Lead: {l.name} ({l.company || 'Private'})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1">Or Link to Existing Customer</label>
                                    <select
                                        value={data.customer_id}
                                        onChange={(e) => setData('customer_id', e.target.value)}
                                        className="w-full p-2 text-xs rounded-lg border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 cursor-pointer"
                                    >
                                        <option value="">-- No Customer Associated --</option>
                                        {customers.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                Customer: {c.company || c.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1">Follow-Up Date & Time <span className="text-red-500">*</span></label>
                                    <input
                                        type="datetime-local"
                                        value={data.follow_up_date}
                                        onChange={(e) => setData('follow_up_date', e.target.value)}
                                        required
                                        className="w-full p-2 text-xs rounded-lg border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900"
                                    />
                                </div>

                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1">Action Items / Objective <span className="text-red-500">*</span></label>
                                    <textarea
                                        rows={3}
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                        required
                                        placeholder="e.g. Call client to review technical proposal, clarify cloud hosting specifications..."
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
