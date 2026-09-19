import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ContactMessageItem } from '@/types';
import {
    Mail,
    Search,
    CheckCircle2,
    Trash2,
    Eye,
    Phone,
    Clock,
    X,
} from 'lucide-react';

interface ContactsProps {
    messages: {
        data: ContactMessageItem[];
        links: any[];
        total: number;
    };
    unreadCount: number;
    filters: {
        search?: string;
        status?: string;
    };
}

export default function ContactsIndex({ messages, unreadCount, filters }: ContactsProps) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [selectedMsg, setSelectedMsg] = useState<ContactMessageItem | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            route('admin.contacts.index'),
            { search: searchTerm, status: statusFilter },
            { preserveState: true }
        );
    };

    const setStatus = (id: number, status: 'Unread' | 'Read' | 'Resolved') => {
        router.put(route('admin.contacts.update', id), { status });
    };

    const handleDelete = (id: number, subject: string) => {
        if (confirm(`Delete message "${subject}"?`)) {
            router.delete(route('admin.contacts.destroy', id));
        }
    };

    return (
        <AdminLayout title="Contact & Inquiries Triage" subtitle="Inbound Communications">
            <Head title="Contact Enquiries - LMC Management" />

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <form onSubmit={handleSearch} className="flex flex-1 items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search sender, email, subject..."
                            className="w-full pl-9 pr-4 py-1.5 text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            router.get(
                                route('admin.contacts.index'),
                                { search: searchTerm, status: e.target.value },
                                { preserveState: true }
                            );
                        }}
                        className="text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31] py-1.5"
                    >
                        <option value="">All Inquiries</option>
                        <option value="Unread">Unread ({unreadCount})</option>
                        <option value="Read">Read</option>
                        <option value="Resolved">Resolved</option>
                    </select>

                    <button
                        type="submit"
                        className="bg-[#0B1C30] hover:bg-[#132842] text-white text-xs font-semibold px-4 py-1.5 rounded"
                    >
                        Filter
                    </button>
                </form>
            </div>

            {/* Message Cards / List */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
                <div className="divide-y divide-gray-100">
                    {messages.data.length === 0 ? (
                        <div className="p-8 text-center text-xs text-gray-500">
                            No contact inquiries found matching criteria.
                        </div>
                    ) : (
                        messages.data.map((msg) => (
                            <div
                                key={msg.id}
                                className={`p-4 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                                    msg.status === 'Unread' ? 'bg-amber-50/20 border-l-4 border-[#DA7A31]' : ''
                                }`}
                            >
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                                msg.status === 'Unread'
                                                    ? 'bg-amber-100 text-amber-800'
                                                    : msg.status === 'Resolved'
                                                    ? 'bg-emerald-100 text-emerald-800'
                                                    : 'bg-gray-100 text-gray-700'
                                            }`}
                                        >
                                            {msg.status}
                                        </span>
                                        <div className="text-sm font-bold text-[#0B1C30]">{msg.subject}</div>
                                    </div>
                                    <div className="text-xs text-gray-600">
                                        From: <strong>{msg.name}</strong> ({msg.email}) {msg.phone && `&bull; ${msg.phone}`}
                                    </div>
                                    <div className="text-xs text-[#4D4B55] line-clamp-1 italic">
                                        "{msg.message}"
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
                                    <button
                                        onClick={() => {
                                            setSelectedMsg(msg);
                                            if (msg.status === 'Unread') setStatus(msg.id, 'Read');
                                        }}
                                        className="px-3 py-1.5 bg-[#0B1C30] hover:bg-[#132842] text-white text-xs font-semibold rounded flex items-center gap-1"
                                    >
                                        <Eye className="w-3.5 h-3.5" />
                                        <span>Read Message</span>
                                    </button>

                                    {msg.status !== 'Resolved' && (
                                        <button
                                            onClick={() => setStatus(msg.id, 'Resolved')}
                                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded flex items-center gap-1"
                                        >
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                            <span>Resolve</span>
                                        </button>
                                    )}

                                    <button
                                        onClick={() => handleDelete(msg.id, msg.subject)}
                                        className="p-1.5 text-red-500 hover:text-red-700 rounded"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                {messages.links && messages.links.length > 3 && (
                    <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                        <div>Total: {messages.total} inquiries</div>
                        <div className="flex gap-1">
                            {messages.links.map((link, idx) => (
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

            {/* View Full Message Modal */}
            {selectedMsg && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
                    <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-2xl relative">
                        <button
                            onClick={() => setSelectedMsg(null)}
                            className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-700"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-2 mb-2">
                            <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                    selectedMsg.status === 'Resolved'
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : 'bg-amber-100 text-amber-800'
                                }`}
                            >
                                {selectedMsg.status}
                            </span>
                            <span className="text-[11px] text-gray-400">
                                Received {new Date(selectedMsg.created_at).toLocaleString()}
                            </span>
                        </div>

                        <h3 className="text-base font-bold text-[#0B1C30] mb-2">{selectedMsg.subject}</h3>

                        <div className="bg-gray-50 p-3 rounded text-xs space-y-1 mb-4 border border-gray-100">
                            <div>
                                <span className="font-semibold text-gray-500">From:</span> {selectedMsg.name}
                            </div>
                            <div>
                                <span className="font-semibold text-gray-500">Email:</span>{' '}
                                <a href={`mailto:${selectedMsg.email}`} className="text-[#DA7A31] hover:underline">
                                    {selectedMsg.email}
                                </a>
                            </div>
                            {selectedMsg.phone && (
                                <div>
                                    <span className="font-semibold text-gray-500">Phone:</span> {selectedMsg.phone}
                                </div>
                            )}
                        </div>

                        <div className="text-xs text-[#4D4B55] leading-relaxed whitespace-pre-wrap bg-white p-4 rounded border border-gray-200 mb-6">
                            {selectedMsg.message}
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                            {selectedMsg.status !== 'Resolved' && (
                                <button
                                    onClick={() => {
                                        setStatus(selectedMsg.id, 'Resolved');
                                        setSelectedMsg(null);
                                    }}
                                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded shadow transition"
                                >
                                    Mark as Resolved
                                </button>
                            )}
                            <button
                                onClick={() => setSelectedMsg(null)}
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
