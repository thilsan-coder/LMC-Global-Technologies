import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { ProductItem } from '@/types';
import {
    Layers,
    Plus,
    Edit2,
    Trash2,
    X,
    CheckCircle2,
    Zap,
} from 'lucide-react';

interface ProductsProps {
    products: ProductItem[];
}

export default function ProductsIndex({ products }: ProductsProps) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);

    const { data, setData, post, put, processing, reset, errors } = useForm({
        name: '',
        summary: '',
        description: '',
        features: '' as any,
        benefits: '' as any,
        tech_stack: '' as any,
        is_demo: true,
        status: 'Available' as ProductItem['status'],
        display_order: 0,
    });

    const openCreate = () => {
        setEditingProduct(null);
        reset();
        setModalOpen(true);
    };

    const openEdit = (prod: ProductItem) => {
        setEditingProduct(prod);
        setData({
            name: prod.name,
            summary: prod.summary,
            description: prod.description,
            features: prod.features ? prod.features.join('\n') : '',
            benefits: prod.benefits ? prod.benefits.join('\n') : '',
            tech_stack: prod.tech_stack ? prod.tech_stack.join(', ') : '',
            is_demo: prod.is_demo,
            status: prod.status,
            display_order: prod.display_order,
        });
        setModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            ...data,
            features: typeof data.features === 'string' ? data.features.split('\n').map((s: string) => s.trim()).filter(Boolean) : data.features,
            benefits: typeof data.benefits === 'string' ? data.benefits.split('\n').map((s: string) => s.trim()).filter(Boolean) : data.benefits,
            tech_stack: typeof data.tech_stack === 'string' ? data.tech_stack.split(',').map((s: string) => s.trim()).filter(Boolean) : data.tech_stack,
        };

        if (editingProduct) {
            put(route('admin.products.update', editingProduct.id), {
                data: payload,
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        } else {
            post(route('admin.products.store'), {
                data: payload,
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Delete product "${name}"?`)) {
            router.delete(route('admin.products.destroy', id));
        }
    };

    return (
        <AdminLayout title="Product Management" subtitle="Enterprise Software Suites & Demo Catalog">
            <Head title="Products - LMC Management" />

            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs mb-6 flex items-center justify-between">
                <div className="text-xs text-gray-500">
                    Manage software blueprints and modular enterprise systems showcased on the corporate portal.
                </div>
                <button
                    onClick={openCreate}
                    className="bg-[#DA7A31] hover:bg-[#C2631D] text-white text-xs font-bold px-4 py-2 rounded shadow-xs flex items-center gap-1.5"
                >
                    <Plus className="w-4 h-4" />
                    <span>Register Product</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((prod) => (
                    <div
                        key={prod.id}
                        className="bg-white rounded-lg border border-gray-200 shadow-xs p-6 flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-700 uppercase">
                                    {prod.is_demo ? 'DEMO SYSTEM' : 'CORE PRODUCT'}
                                </span>
                                <span className="text-[11px] font-bold text-[#DA7A31]">{prod.status}</span>
                            </div>

                            <h3 className="text-base font-bold text-[#0B1C30] mb-2">{prod.name}</h3>
                            <p className="text-xs text-[#4D4B55] leading-relaxed mb-4 line-clamp-3">
                                {prod.summary}
                            </p>

                            <div className="space-y-1 mb-4">
                                {prod.features?.slice(0, 3).map((f, i) => (
                                    <div key={i} className="flex items-center gap-1.5 text-xs text-gray-600">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-[#DA7A31] flex-shrink-0" />
                                        <span className="truncate">{f}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-[11px] text-gray-400 font-mono">Order: {prod.display_order}</span>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => openEdit(prod)}
                                    className="p-1.5 text-gray-600 hover:text-[#0B1C30] rounded"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(prod.id, prod.name)}
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
                            {editingProduct ? 'Edit Product Specification' : 'Register Enterprise Product'}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                            <div>
                                <label className="block font-semibold text-[#0B1C30] mb-1">Product Title *</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold text-[#0B1C30] mb-1">Executive Summary *</label>
                                <input
                                    type="text"
                                    value={data.summary}
                                    onChange={(e) => setData('summary', e.target.value)}
                                    required
                                    placeholder="One sentence value proposition..."
                                    className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold text-[#0B1C30] mb-1">Full Description *</label>
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
                                    placeholder="Multi-tenant architecture&#10;Automated sync&#10;Role-based permissions"
                                    className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold text-[#0B1C30] mb-1">Business Benefits (One per line)</label>
                                <textarea
                                    rows={3}
                                    value={data.benefits}
                                    onChange={(e) => setData('benefits', e.target.value)}
                                    placeholder="Reduces turnaround by 40%&#10;Zero data loss"
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
                                        value={data.tech_stack}
                                        onChange={(e) => setData('tech_stack', e.target.value)}
                                        placeholder="Laravel, React, PostgreSQL"
                                        className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                    />
                                </div>

                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1">Status</label>
                                    <select
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value as ProductItem['status'])}
                                        className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                    >
                                        <option value="Available">Available</option>
                                        <option value="In Development">In Development</option>
                                        <option value="Beta">Beta</option>
                                    </select>
                                </div>
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
                                    {processing ? 'Saving...' : editingProduct ? 'Update Product' : 'Save Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
