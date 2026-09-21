import React, { useState, useEffect, useRef } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ProductItem } from '@/types';
import CustomDropdown, { CustomDropdownOption } from '@/Components/CustomDropdown';
import {
    Layers,
    Plus,
    Search,
    Edit2,
    Trash2,
    X,
    CheckCircle2,
    Zap,
    Filter,
    MoreVertical,
    Eye,
    AlertCircle,
    Activity,
    Cpu,
    Check,
    FileText,
    Code,
    Sparkles,
} from 'lucide-react';

interface ProductsProps {
    products: ProductItem[];
}

export default function ProductsIndex({ products }: ProductsProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
    const [viewingProduct, setViewingProduct] = useState<ProductItem | null>(null);
    const [deletingProduct, setDeletingProduct] = useState<ProductItem | null>(null);

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
        summary: '',
        description: '',
        features: '' as any,
        benefits: '' as any,
        tech_stack: '' as any,
        is_demo: true,
        status: 'Available' as ProductItem['status'],
        display_order: 0,
    });

    const statusFilterOptions: CustomDropdownOption[] = [
        { value: '', label: 'All Product Statuses' },
        { value: 'Available', label: 'Available' },
        { value: 'In Development', label: 'In Development' },
        { value: 'Beta', label: 'Beta' },
    ];

    const modalStatusOptions: CustomDropdownOption[] = [
        { value: 'Available', label: 'Available' },
        { value: 'In Development', label: 'In Development' },
        { value: 'Beta', label: 'Beta' },
    ];

    const PAGE_SIZE = 5;
    const [currentPage, setCurrentPage] = useState(1);

    // Reset pagination to 1 when search or filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter]);

    // Filtered list
    const filteredProducts = products.filter((p) => {
        const matchesSearch =
            !searchTerm ||
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.summary.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = !statusFilter || p.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE) || 1;
    const paginatedProducts = filteredProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    // Dynamic metrics calculation
    const totalProducts = products.length;
    const availableCount = products.filter((p) => p.status === 'Available').length;
    const inDevCount = products.filter((p) => p.status === 'In Development').length;
    const demoCount = products.filter((p) => p.is_demo).length;

    const openCreate = () => {
        setEditingProduct(null);
        clearErrors();
        reset();
        setData({
            name: '',
            summary: '',
            description: '',
            features: '',
            benefits: '',
            tech_stack: '',
            is_demo: true,
            status: 'Available',
            display_order: 0,
        });
        setModalOpen(true);
    };

    const openEdit = (prod: ProductItem) => {
        setEditingProduct(prod);
        clearErrors();
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
            router.put(route('admin.products.update', editingProduct.id), payload, {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        } else {
            router.post(route('admin.products.store'), payload, {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        }
    };

    const confirmDelete = () => {
        if (deletingProduct) {
            router.delete(route('admin.products.destroy', deletingProduct.id), {
                onSuccess: () => setDeletingProduct(null),
            });
        }
    };

    return (
        <AdminLayout title="Product Management" subtitle="Enterprise Software Suites & Demo Catalog">
            <Head title="Products - LMC Management" />

            <div className="space-y-6">
                {/* 1. EXECUTIVE METRICS SUMMARY */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Total Products
                            </div>
                            <div className="text-2xl font-bold text-[#0B1C30] mt-1">{totalProducts}</div>
                            <div className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
                                <Layers className="w-3.5 h-3.5 text-[#DA7A31]" />
                                <span>Enterprise Catalog</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-[#0B1C30]/5 border border-[#0B1C30]/10 flex items-center justify-center text-[#0B1C30]">
                            <Layers className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Available Suites
                            </div>
                            <div className="text-2xl font-bold text-emerald-600 mt-1">{availableCount}</div>
                            <div className="text-[11px] text-emerald-700/80 mt-1 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                <span>Commercial Production</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                In Development
                            </div>
                            <div className="text-2xl font-bold text-blue-600 mt-1">{inDevCount}</div>
                            <div className="text-[11px] text-blue-700/80 mt-1 flex items-center gap-1">
                                <Activity className="w-3.5 h-3.5 text-blue-500" />
                                <span>R&D Sprint Stage</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                            <Activity className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Demo Blueprints
                            </div>
                            <div className="text-2xl font-bold text-[#DA7A31] mt-1">{demoCount}</div>
                            <div className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
                                <Sparkles className="w-3.5 h-3.5 text-[#DA7A31]" />
                                <span>Interactive Showcase</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-[#DA7A31]/10 border border-[#DA7A31]/20 flex items-center justify-center text-[#DA7A31]">
                            <Sparkles className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {/* 2. FILTER TOOLBAR & REGISTER BUTTON */}
                <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-2xs">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                        <div className="flex flex-1 flex-col sm:flex-row items-center gap-3 w-full">
                            {/* Search Bar */}
                            <div className="relative flex-1 w-full">
                                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search by product name, summary, or capabilities..."
                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                />
                            </div>

                            {/* Status Filter Dropdown */}
                            <CustomDropdown
                                value={statusFilter}
                                onChange={(val) => setStatusFilter(val)}
                                options={statusFilterOptions}
                                variant="navy"
                            />

                            <button
                                type="button"
                                onClick={() => {
                                    setSearchTerm('');
                                    setStatusFilter('');
                                }}
                                className="lmc-btn lmc-btn-navy lmc-btn-sm shrink-0 w-full sm:w-auto justify-center rounded-xl"
                            >
                                <Filter className="w-3.5 h-3.5" />
                                <span>Reset Filter</span>
                            </button>
                        </div>

                        <button
                            onClick={openCreate}
                            className="lmc-btn lmc-btn-primary lmc-btn-sm shrink-0 shadow-2xs w-full lg:w-auto justify-center rounded-xl"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Register Product</span>
                        </button>
                    </div>
                </div>

                {/* 3. TABLE WITH UN-CLIPPED ACTIONS (⋮) DROPDOWN */}
                <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs overflow-visible" ref={menuRef}>
                    <div className="overflow-x-auto overflow-y-visible">
                        <table className="w-full text-left text-xs text-[#4D4B55] table-fixed">
                            <thead className="bg-[#0B1C30] text-white font-bold uppercase tracking-wider text-[10px]">
                                <tr>
                                    <th className="py-3.5 px-5 w-[30%]">Enterprise Product Suite</th>
                                    <th className="py-3.5 px-5 w-[20%]">Classification</th>
                                    <th className="py-3.5 px-5 w-[24%]">Technology Stack</th>
                                    <th className="py-3.5 px-5 w-[16%]">Status</th>
                                    <th className="py-3.5 px-5 text-right w-[10%]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {paginatedProducts.length === 0 ? (
                                    <tr className="h-[340px]">
                                        <td colSpan={5} className="py-12 text-center text-gray-500">
                                            <div className="max-w-xs mx-auto text-center space-y-2">
                                                <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                                                    <Layers className="w-6 h-6" />
                                                </div>
                                                <div className="font-bold text-gray-700">No Enterprise Products Found</div>
                                                <p className="text-xs text-gray-400">
                                                    Try adjusting your search criteria or register a new product suite.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    <>
                                        {paginatedProducts.map((prod, idx) => {
                                            const isMenuOpen = openActionId === prod.id;
                                            const openUpward = idx >= paginatedProducts.length - 1 || idx >= 2;

                                            return (
                                                <tr key={prod.id} className="h-[68px] hover:bg-slate-50/80 transition-colors">
                                                    {/* Product Name & Summary */}
                                                    <td className="py-3.5 px-5 truncate">
                                                        <div className="flex items-start gap-3">
                                                            <div className="w-9 h-9 rounded-lg bg-[#0B1C30] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs mt-0.5">
                                                                {prod.name.charAt(0)}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <div
                                                                    className="font-bold text-[#0B1C30] text-sm hover:text-[#DA7A31] transition-colors cursor-pointer truncate"
                                                                    onClick={() => setViewingProduct(prod)}
                                                                >
                                                                    {prod.name}
                                                                </div>
                                                                <div className="text-[11px] text-gray-500 truncate mt-0.5">
                                                                    {prod.summary}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Classification */}
                                                    <td className="py-3.5 px-5">
                                                        <span
                                                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border ${
                                                                prod.is_demo
                                                                    ? 'bg-amber-50 text-[#DA7A31] border-amber-200'
                                                                    : 'bg-slate-100 text-[#0B1C30] border-slate-200'
                                                            }`}
                                                        >
                                                            {prod.is_demo ? 'Interactive Demo' : 'Core Architecture'}
                                                        </span>
                                                    </td>

                                                    {/* Tech Stack */}
                                                    <td className="py-3.5 px-5">
                                                        {prod.tech_stack && prod.tech_stack.length > 0 ? (
                                                            <div className="flex flex-wrap gap-1">
                                                                {prod.tech_stack.slice(0, 3).map((t, i) => (
                                                                    <span
                                                                        key={i}
                                                                        className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-700 border border-gray-200"
                                                                    >
                                                                        {t}
                                                                    </span>
                                                                ))}
                                                                {prod.tech_stack.length > 3 && (
                                                                    <span className="text-[10px] text-gray-400 self-center">
                                                                        +{prod.tech_stack.length - 3}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <span className="text-gray-400 italic">Unspecified</span>
                                                        )}
                                                    </td>

                                                    {/* Status Badge */}
                                                    <td className="py-3.5 px-5">
                                                        <span
                                                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                                                                prod.status === 'Available'
                                                                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                                                    : prod.status === 'In Development'
                                                                    ? 'bg-blue-100 text-blue-900 border border-blue-300'
                                                                    : 'bg-amber-100 text-amber-900 border border-amber-300'
                                                            }`}
                                                        >
                                                            <span
                                                                className={`w-1.5 h-1.5 rounded-full ${
                                                                    prod.status === 'Available'
                                                                        ? 'bg-emerald-600'
                                                                        : prod.status === 'In Development'
                                                                        ? 'bg-blue-600 animate-pulse'
                                                                        : 'bg-amber-600'
                                                                }`}
                                                            />
                                                            {prod.status}
                                                        </span>
                                                    </td>

                                                    {/* UN-CLIPPED ACTIONS (⋮) DROPDOWN */}
                                                    <td className="py-3.5 px-5 text-right relative">
                                                        <div className="relative inline-block text-left">
                                                            <button
                                                                type="button"
                                                                onClick={() => setOpenActionId(isMenuOpen ? null : prod.id)}
                                                                className={`p-2 rounded-lg transition-colors border ${
                                                                    isMenuOpen
                                                                        ? 'bg-[#0B1C30] text-white border-[#0B1C30]'
                                                                        : 'text-gray-600 hover:text-[#0B1C30] hover:bg-gray-100 border-gray-200'
                                                                }`}
                                                                title="Product Actions"
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
                                                                            setViewingProduct(prod);
                                                                        }}
                                                                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-gray-700 hover:bg-slate-50 hover:text-[#0B1C30] transition font-medium"
                                                                    >
                                                                        <Eye className="w-4 h-4 text-slate-500" />
                                                                        <span>View Details</span>
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setOpenActionId(null);
                                                                            openEdit(prod);
                                                                        }}
                                                                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-amber-800 hover:bg-amber-50 hover:text-amber-900 transition font-medium"
                                                                    >
                                                                        <Edit2 className="w-4 h-4 text-amber-600" />
                                                                        <span>Edit Product</span>
                                                                    </button>
                                                                    <div className="my-1 border-t border-gray-100" />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setOpenActionId(null);
                                                                            setDeletingProduct(prod);
                                                                        }}
                                                                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-rose-700 hover:bg-rose-50 hover:text-rose-900 transition font-medium"
                                                                    >
                                                                        <Trash2 className="w-4 h-4 text-rose-600" />
                                                                        <span>Delete Product</span>
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        {/* Empty rows to guarantee exact 5-row table height */}
                                        {Array.from({ length: Math.max(0, 5 - paginatedProducts.length) }).map((_, i) => (
                                            <tr key={`empty-${i}`} className="h-[68px]">
                                                <td colSpan={5} className="py-3.5 px-5">&nbsp;</td>
                                            </tr>
                                        ))}
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Customers Standard Pagination Footer */}
                    <div className="px-5 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-xs text-gray-500">
                            Showing{' '}
                            <span className="font-semibold text-gray-700">
                                {filteredProducts.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}
                            </span>{' '}
                            to{' '}
                            <span className="font-semibold text-gray-700">
                                {Math.min(currentPage * PAGE_SIZE, filteredProducts.length)}
                            </span>{' '}
                            of{' '}
                            <span className="font-semibold text-gray-700">
                                {filteredProducts.length}
                            </span>{' '}
                            results
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                type="button"
                                disabled={currentPage <= 1}
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                                    currentPage <= 1
                                        ? 'opacity-40 cursor-not-allowed bg-gray-50 text-gray-400 border-gray-200'
                                        : 'bg-white text-gray-700 hover:bg-slate-50 border-gray-200 shadow-2xs'
                                }`}
                            >
                                Previous
                            </button>
                            <button
                                type="button"
                                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0B1C30] text-white shadow-2xs"
                            >
                                {currentPage}
                            </button>
                            <button
                                type="button"
                                disabled={currentPage >= totalPages}
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                                    currentPage >= totalPages
                                        ? 'opacity-40 cursor-not-allowed bg-gray-50 text-gray-400 border-gray-200'
                                        : 'bg-white text-gray-700 hover:bg-slate-50 border-gray-200 shadow-2xs'
                                }`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
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
                                    <Layers className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold tracking-tight">
                                        {editingProduct ? 'Edit Product Specification' : 'Register Enterprise Product'}
                                    </h3>
                                    <p className="text-xs text-gray-300">Configure software attributes, architectural capabilities, and tech stack</p>
                                </div>
                            </div>
                            <button onClick={() => setModalOpen(false)} className="p-1 text-gray-400 hover:text-white rounded-lg transition">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Form Body */}
                        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0 overflow-hidden">
                            <div className="p-6 overflow-y-auto space-y-6 text-xs flex-1 text-gray-900">
                                {/* SECTION 1: PRODUCT CORE INFORMATION */}
                                <div>
                                    <div className="text-[11px] font-bold text-[#DA7A31] uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <Layers className="w-4 h-4" />
                                        <span>1. Core Specifications</span>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">
                                                Product Title <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder="e.g. Enterprise Logistics & Fleet Intelligence Suite"
                                                required
                                                className="w-full px-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                            />
                                        </div>

                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">
                                                Executive Summary <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={data.summary}
                                                onChange={(e) => setData('summary', e.target.value)}
                                                placeholder="One sentence value proposition..."
                                                required
                                                className="w-full px-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                            />
                                        </div>

                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">
                                                Full Description <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                rows={4}
                                                value={data.description}
                                                onChange={(e) => setData('description', e.target.value)}
                                                required
                                                placeholder="Comprehensive overview of architecture, capabilities, and business applications..."
                                                className="w-full p-3 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION 2: ARCHITECTURAL FEATURES & BENEFITS */}
                                <div className="pt-4 border-t border-gray-100">
                                    <div className="text-[11px] font-bold text-[#DA7A31] uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <Code className="w-4 h-4" />
                                        <span>2. Features & Business Benefits</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">Features (One per line)</label>
                                            <textarea
                                                rows={3}
                                                value={data.features}
                                                onChange={(e) => setData('features', e.target.value)}
                                                placeholder="Multi-tenant architecture&#10;Automated sync&#10;Role-based permissions"
                                                className="w-full p-3 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                            />
                                        </div>

                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">Business Benefits (One per line)</label>
                                            <textarea
                                                rows={3}
                                                value={data.benefits}
                                                onChange={(e) => setData('benefits', e.target.value)}
                                                placeholder="Reduces turnaround by 40%&#10;Zero data loss"
                                                className="w-full p-3 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION 3: TECHNICAL STACK & STATUS */}
                                <div className="pt-4 border-t border-gray-100 space-y-4">
                                    <div className="text-[11px] font-bold text-[#DA7A31] uppercase tracking-wider mb-1 flex items-center gap-2">
                                        <Cpu className="w-4 h-4" />
                                        <span>3. Tech Stack & Deployment Status</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">Technologies (Comma separated)</label>
                                            <input
                                                type="text"
                                                value={data.tech_stack}
                                                onChange={(e) => setData('tech_stack', e.target.value)}
                                                placeholder="Laravel, React, PostgreSQL, Docker"
                                                className="w-full px-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                            />
                                        </div>

                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">Production Status</label>
                                            <CustomDropdown
                                                value={data.status}
                                                onChange={(val) => setData('status', val as ProductItem['status'])}
                                                options={modalStatusOptions}
                                                variant="white"
                                                className="w-full"
                                            />
                                        </div>

                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">Display Order</label>
                                            <input
                                                type="number"
                                                value={data.display_order}
                                                onChange={(e) => setData('display_order', parseInt(e.target.value) || 0)}
                                                className="w-full px-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 shadow-2xs"
                                            />
                                        </div>

                                        <div className="flex items-center pt-6">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={data.is_demo}
                                                    onChange={(e) => setData('is_demo', e.target.checked)}
                                                    className="w-4 h-4 rounded text-[#DA7A31] focus:ring-[#DA7A31] border-gray-300"
                                                />
                                                <span className="text-xs font-semibold text-[#0B1C30]">Feature as Interactive Demo Suite</span>
                                            </label>
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
                                    <span>{processing ? 'Saving...' : editingProduct ? 'Update Product' : 'Save Product'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* VIEW SPECIFICATION MODAL */}
            {viewingProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-gray-200 relative">
                        <div className="bg-[#0B1C30] p-6 text-white relative">
                            <button
                                onClick={() => setViewingProduct(null)}
                                className="absolute top-4 right-4 p-1 text-gray-400 hover:text-white rounded-lg"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-[#DA7A31] text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0">
                                    {viewingProduct.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">{viewingProduct.name}</h3>
                                    <div className="text-xs text-gray-300 mt-0.5">
                                        {viewingProduct.is_demo ? 'Interactive Demo System' : 'Core Architecture Suite'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 space-y-4 text-xs text-gray-900">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <div className="text-gray-400 text-[10px] font-bold uppercase">Deployment Status</div>
                                    <span
                                        className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                                            viewingProduct.status === 'Available'
                                                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                                : 'bg-blue-100 text-blue-900 border-blue-300'
                                        }`}
                                    >
                                        {viewingProduct.status}
                                    </span>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <div className="text-gray-400 text-[10px] font-bold uppercase">Display Priority</div>
                                    <div className="font-semibold text-[#0B1C30] mt-1">Order #{viewingProduct.display_order}</div>
                                </div>
                            </div>

                            <div>
                                <div className="font-bold text-[#0B1C30] mb-1">Executive Summary</div>
                                <p className="p-3 bg-slate-50 rounded-xl text-gray-700 border border-slate-100 font-medium">
                                    {viewingProduct.summary}
                                </p>
                            </div>

                            {viewingProduct.features && viewingProduct.features.length > 0 && (
                                <div>
                                    <div className="font-bold text-[#0B1C30] mb-1">Key Architecture Features</div>
                                    <div className="space-y-1">
                                        {viewingProduct.features.map((f, i) => (
                                            <div key={i} className="flex items-center gap-1.5 text-gray-700">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-[#DA7A31] shrink-0" />
                                                <span>{f}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                <button
                                    onClick={() => {
                                        const p = viewingProduct;
                                        setViewingProduct(null);
                                        openEdit(p);
                                    }}
                                    className="px-4 py-2 text-xs font-bold text-[#0B1C30] bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-300 transition"
                                >
                                    <Edit2 className="w-3.5 h-3.5 inline mr-1.5" />
                                    <span>Edit Product</span>
                                </button>
                                <button
                                    onClick={() => setViewingProduct(null)}
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
            {deletingProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-200 text-center">
                        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="w-6 h-6" />
                        </div>
                        <h3 className="text-base font-bold text-[#0B1C30] mb-2">Delete Product Suite?</h3>
                        <p className="text-xs text-gray-500 mb-6">
                            Are you sure you want to remove <span className="font-bold text-[#0B1C30]">{deletingProduct.name}</span>? This action cannot be undone.
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <button
                                onClick={() => setDeletingProduct(null)}
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
