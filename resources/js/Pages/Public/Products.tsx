import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/PublicLayout';
import { ProductItem } from '@/types';
import {
    Layers,
    CheckCircle2,
    ArrowRight,
    Sparkles,
    Shield,
    Database,
    Zap,
    X,
    Laptop,
} from 'lucide-react';

interface ProductsProps {
    products: ProductItem[];
}

export default function Products({ products }: ProductsProps) {
    const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

    return (
        <PublicLayout>
            <Head title="Platform Software & Business Systems" />

            {/* Header */}
            <div className="bg-[#0B1C30] text-white py-20 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DA7A31] uppercase tracking-widest mb-3">
                            <span>Platform Solutions</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                            LMC Enterprise Software Platforms
                        </h1>
                        <p className="mt-4 text-base sm:text-lg text-gray-300 leading-relaxed">
                            Modular, cloud-ready software platforms engineered for rapid enterprise customization.
                            Deployable on private cloud or on-premise infrastructure.
                        </p>
                    </div>
                </div>
            </div>

            {/* Mandatory Demo / Placeholder Notice Banner */}
            <div className="bg-amber-500/10 border-b border-amber-500/30 text-amber-900 py-3.5 px-4">
                <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs font-medium">
                    <span className="font-bold uppercase tracking-wider bg-amber-200 text-amber-900 px-2 py-0.5 rounded text-[10px]">
                        Demo / Placeholder Notice
                    </span>
                    <span>
                        All products listed below represent modular technology blueprints available for licensing,
                        white-labeling, and corporate customization.
                    </span>
                </div>
            </div>

            {/* Product Grid */}
            <section className="py-20 bg-[#F0F0F1]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-lg border border-gray-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
                            >
                                <div className="p-8">
                                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                                        <span className="text-[10px] font-extrabold px-2.5 py-1 rounded bg-[#0B1C30] text-white tracking-wider uppercase">
                                            DEMO SYSTEM
                                        </span>
                                        <span className="text-xs font-semibold text-[#DA7A31] bg-[#DA7A31]/10 px-2.5 py-0.5 rounded">
                                            Status: {product.status}
                                        </span>
                                    </div>

                                    <h2 className="text-2xl font-bold text-[#0B1C30] mb-2">{product.name}</h2>
                                    <p className="text-xs sm:text-sm text-[#4D4B55] leading-relaxed mb-6">
                                        {product.summary}
                                    </p>

                                    {/* Key Features */}
                                    <div className="mb-6">
                                        <div className="text-xs font-bold text-[#0B1C30] uppercase tracking-wider mb-2">
                                            Key Capabilities:
                                        </div>
                                        <div className="space-y-1.5">
                                            {product.features?.map((feat, i) => (
                                                <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#DA7A31] flex-shrink-0" />
                                                    <span>{feat}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Tech Stack */}
                                    {product.tech_stack && (
                                        <div className="mb-6">
                                            <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                                                Technology Foundation:
                                            </div>
                                            <div className="flex flex-wrap gap-1.5">
                                                {product.tech_stack.map((t, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="text-[10px] font-medium bg-gray-100 text-gray-700 px-2 py-0.5 rounded border border-gray-200"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="p-6 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                                    <button
                                        onClick={() => setSelectedProduct(product)}
                                        className="text-xs font-semibold text-[#0B1C30] hover:text-[#DA7A31] inline-flex items-center gap-1"
                                    >
                                        <span>View Architectural Benefits</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={route('public.contact')}
                                            className="px-4 py-2 bg-[#DA7A31] hover:bg-[#C2631D] text-white text-xs font-bold rounded shadow-xs transition"
                                        >
                                            Request Demo Access
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Product Deep Dive Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                    <div className="bg-white rounded-lg max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative">
                        <button
                            onClick={() => setSelectedProduct(null)}
                            className="absolute top-5 right-5 p-1 text-gray-400 hover:text-gray-700 rounded-full"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-200 text-gray-800 uppercase">
                                DEMO SYSTEM BLUEPRINT
                            </span>
                            <span className="text-xs text-[#DA7A31] font-semibold">
                                {selectedProduct.status}
                            </span>
                        </div>

                        <h3 className="text-2xl font-bold text-[#0B1C30] mb-3">{selectedProduct.name}</h3>

                        <p className="text-xs sm:text-sm text-[#4D4B55] leading-relaxed mb-6">
                            {selectedProduct.description}
                        </p>

                        {/* Benefits section */}
                        {selectedProduct.benefits && (
                            <div className="mb-6 bg-[#0B1C30] text-white p-5 rounded-md">
                                <h4 className="text-xs font-bold text-[#DA7A31] uppercase tracking-wider mb-3">
                                    Enterprise Business Outcomes:
                                </h4>
                                <div className="space-y-2">
                                    {selectedProduct.benefits.map((benefit, i) => (
                                        <div key={i} className="flex items-center gap-2 text-xs text-gray-200">
                                            <Zap className="w-4 h-4 text-[#DA7A31] flex-shrink-0" />
                                            <span>{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-900"
                            >
                                Close
                            </button>
                            <Link
                                href={route('public.contact')}
                                className="px-5 py-2.5 bg-[#DA7A31] hover:bg-[#C2631D] text-white text-xs font-bold rounded shadow transition"
                            >
                                Schedule Demo Session
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}
