import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ServiceItem } from '@/types';
import {
    Server,
    Plus,
    Edit2,
    Trash2,
    X,
    CheckCircle2,
    Globe,
    Smartphone,
    Briefcase,
    GraduationCap,
    ShieldCheck,
    Cpu,
} from 'lucide-react';

interface ServicesProps {
    services: ServiceItem[];
}

export default function ServicesIndex({ services }: ServicesProps) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<ServiceItem | null>(null);

    const iconMap: Record<string, React.ReactNode> = {
        Globe: <Globe className="w-5 h-5 text-[#DA7A31]" />,
        Smartphone: <Smartphone className="w-5 h-5 text-[#DA7A31]" />,
        Briefcase: <Briefcase className="w-5 h-5 text-[#DA7A31]" />,
        GraduationCap: <GraduationCap className="w-5 h-5 text-[#DA7A31]" />,
        Cloud: <Server className="w-5 h-5 text-[#DA7A31]" />,
        ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#DA7A31]" />,
    };

    const { data, setData, post, put, processing, reset, errors } = useForm({
        name: '',
        summary: '',
        description: '',
        features: '' as any,
        technologies: '' as any,
        icon: 'Globe',
        status: 'Active' as ServiceItem['status'],
        display_order: 0,
    });

    const openCreate = () => {
        setEditingService(null);
        reset();
        setModalOpen(true);
    };

    const openEdit = (s: ServiceItem) => {
        setEditingService(s);
        setData({
            name: s.name,
            summary: s.summary,
            description: s.description,
            features: s.features ? s.features.join('\n') : '',
            technologies: s.technologies ? s.technologies.join(', ') : '',
            icon: s.icon || 'Globe',
            status: s.status,
            display_order: s.display_order,
        });
        setModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            ...data,
            features: typeof data.features === 'string' ? data.features.split('\n').map((s: string) => s.trim()).filter(Boolean) : data.features,
            technologies: typeof data.technologies === 'string' ? data.technologies.split(',').map((s: string) => s.trim()).filter(Boolean) : data.technologies,
        };

        if (editingService) {
            router.put(route('admin.services.update', editingService.id), payload, {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        } else {
            router.post(route('admin.services.store'), payload, {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Delete service "${name}"?`)) {
            router.delete(route('admin.services.destroy', id));
        }
    };

    return (
        <AdminLayout title="Corporate Services CMS" subtitle="Specialized Engineering Capabilities">
            <Head title="Services - LMC Management" />

            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs mb-6 flex items-center justify-between">
                <div className="text-xs text-gray-500">
                    Manage service offerings and technical deliverables presented on the corporate portal.
                </div>
                <button
                    onClick={openCreate}
                    className="lmc-btn lmc-btn-primary lmc-btn-sm"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Service Offering</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <div
                        key={service.id}
                        className="bg-white rounded-lg border border-gray-200 shadow-xs p-6 flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-10 h-10 rounded bg-[#0B1C30]/5 flex items-center justify-center">
                                    {iconMap[service.icon] || <Cpu className="w-5 h-5 text-[#DA7A31]" />}
                                </div>
                                <span
                                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                                        service.status === 'Active'
                                            ? 'bg-emerald-100 text-emerald-800'
                                            : 'bg-gray-100 text-gray-600'
                                    }`}
                                >
                                    {service.status}
                                </span>
                            </div>

                            <h3 className="text-base font-bold text-[#0B1C30] mb-2">{service.name}</h3>
                            <p className="text-xs text-[#4D4B55] leading-relaxed mb-4 line-clamp-3">
                                {service.summary}
                            </p>

                            <div className="space-y-1 mb-4">
                                {service.features?.slice(0, 3).map((f, i) => (
                                    <div key={i} className="flex items-center gap-1.5 text-xs text-gray-600">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-[#DA7A31] flex-shrink-0" />
                                        <span className="truncate">{f}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-[11px] text-gray-400 font-mono">Order: {service.display_order}</span>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => openEdit(service)}
                                    className="p-1.5 text-gray-600 hover:text-[#0B1C30] rounded"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(service.id, service.name)}
                                    className="p-1.5 text-red-500 hover:text-red-700 rounded"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
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
                            {editingService ? 'Edit Service Scope' : 'Add Corporate Service'}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                            <div className="grid grid-cols-3 gap-3">
                                <div className="col-span-2">
                                    <label className="block font-semibold text-[#0B1C30] mb-1">Service Name *</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1">Icon *</label>
                                    <select
                                        value={data.icon}
                                        onChange={(e) => setData('icon', e.target.value)}
                                        className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                    >
                                        <option value="Globe">Globe (Web)</option>
                                        <option value="Smartphone">Smartphone (Mobile)</option>
                                        <option value="Briefcase">Briefcase (Consulting)</option>
                                        <option value="GraduationCap">GraduationCap (Internship)</option>
                                        <option value="Cloud">Cloud (DevOps)</option>
                                        <option value="ShieldCheck">ShieldCheck (Security)</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block font-semibold text-[#0B1C30] mb-1">Summary *</label>
                                <input
                                    type="text"
                                    value={data.summary}
                                    onChange={(e) => setData('summary', e.target.value)}
                                    required
                                    className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold text-[#0B1C30] mb-1">Detailed Description *</label>
                                <textarea
                                    rows={4}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    required
                                    className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold text-[#0B1C30] mb-1">Features (One per line)</label>
                                <textarea
                                    rows={3}
                                    value={data.features}
                                    onChange={(e) => setData('features', e.target.value)}
                                    placeholder="Microservice architecture&#10;Sub-second latency"
                                    className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1">
                                        Technologies (Comma separated)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.technologies}
                                        onChange={(e) => setData('technologies', e.target.value)}
                                        placeholder="Laravel, React, Docker, AWS"
                                        className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1">Status</label>
                                    <select
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value as ServiceItem['status'])}
                                        className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
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
                                    {processing ? 'Saving...' : editingService ? 'Update Service' : 'Save Service'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
