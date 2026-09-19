import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { ProductItem } from '@/types';
import {
    Layers,
    CheckCircle2,
    ArrowRight,
} from 'lucide-react';

interface ProductsProps {
    products: ProductItem[];
}

export default function Products({ products }: ProductsProps) {

    return (
        <PublicLayout>
            <Head title="Platform Software & Business Systems" />

            {/* Header */}
            <div className="bg-[#0B1C30] text-white py-20 border-b border-white/10 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl reveal-on-scroll">
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
            <div className="bg-amber-500/10 border-b border-amber-500/30 text-amber-300 py-3.5 px-4 reveal-on-scroll delay-100">
                <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs font-medium">
                    <span className="font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded text-[10px]">
                        Demo / Placeholder Notice
                    </span>
                    <span>
                        All products listed below represent modular technology blueprints available for licensing,
                        white-labeling, and corporate customization.
                    </span>
                </div>
            </div>

            {/* Product Grid */}
            <section className="py-20 bg-[#071220] border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {products.map((product, idx) => {
                            const delayClasses = ['delay-100', 'delay-200', 'delay-150', 'delay-250'];
                            const staggerClass = delayClasses[idx % delayClasses.length];
                            return (
                                <div
                                    key={product.id}
                                    className={`lmc-dark-card reveal-on-scroll ${staggerClass} rounded-2xl overflow-hidden flex flex-col justify-between group relative`}
                                >
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#DA7A31] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="p-8">
                                        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                                            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-md bg-[#0B1C30] text-white border border-white/15 tracking-wider uppercase">
                                                <Layers className="w-3 h-3 text-[#DA7A31]" />
                                                DEMO SYSTEM
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                                Available Blueprint
                                            </span>
                                        </div>

                                        <h2 className="text-2xl font-bold text-white group-hover:text-[#DA7A31] transition-colors mb-2">
                                            {product.name}
                                        </h2>
                                        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                                            {product.summary}
                                        </p>

                                        {/* Key Features */}
                                        <div className="mb-6">
                                            <div className="text-xs font-bold text-gray-200 uppercase tracking-wider mb-2.5">
                                                Key Capabilities:
                                            </div>
                                            <div className="space-y-2">
                                                {product.features?.map((feat, i) => (
                                                    <div key={i} className="flex items-start gap-2.5 text-xs text-gray-300">
                                                        <CheckCircle2 className="w-4 h-4 text-[#DA7A31] shrink-0 mt-0.5" />
                                                        <span>{feat}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Tech Stack */}
                                        {product.tech_stack && (
                                            <div className="mb-6">
                                                <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                                    Technology Foundation:
                                                </div>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {product.tech_stack.map((t, bIdx) => (
                                                        <span
                                                            key={bIdx}
                                                            className="text-[10px] font-medium bg-[#0B1C30] text-gray-300 px-2.5 py-0.5 rounded border border-white/10 hover:border-[#DA7A31]/40 transition-colors"
                                                        >
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6 bg-[#0B1C30]/40 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                                        <Link
                                            href={route('public.products.architecture', product.slug)}
                                            className="lmc-btn lmc-btn-secondary lmc-btn-sm w-full sm:w-auto flex-1 justify-center"
                                        >
                                            <span>View Architectural Benefits</span>
                                            <ArrowRight className="w-3.5 h-3.5 text-[#DA7A31]" />
                                        </Link>
                                        <Link
                                            href={route('public.contact')}
                                            className="lmc-btn lmc-btn-primary lmc-btn-sm w-full sm:w-auto flex-1 justify-center"
                                        >
                                            <span>Request Demo Access</span>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
