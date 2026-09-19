import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { ReviewItem } from '@/types';
import {
    Star,
    CheckCircle2,
    MessageSquarePlus,
    Sparkles,
} from 'lucide-react';

interface ReviewsProps {
    reviews: {
        data: ReviewItem[];
        links: any[];
        total: number;
    };
    metrics: {
        total_approved: number;
        average_rating: number;
        five_star_percentage: number;
    };
}

export default function Reviews({ reviews, metrics }: ReviewsProps) {
    return (
        <PublicLayout>
            <Head title="Client Testimonials & Corporate Reviews" />

            {/* Header */}
            <div className="bg-[#0B1C30] text-white py-20 border-b border-white/10 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 reveal-on-scroll">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DA7A31] uppercase tracking-widest mb-3">
                                <span>Corporate Reputation</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                                Verified Client Reviews
                            </h1>
                            <p className="mt-3 text-base text-gray-300 leading-relaxed">
                                Authentic feedback from technology leaders, CTOs, and institutional partners who have
                                deployed LMC systems.
                            </p>
                        </div>

                        <div>
                            <Link
                                href={route('public.reviews.create')}
                                id="submit-review-header-btn"
                                className="lmc-btn lmc-btn-primary inline-flex items-center gap-2"
                            >
                                <MessageSquarePlus className="w-4 h-4" />
                                <span>Submit Client Review</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ratings Summary Bar */}
            <div className="bg-[#0B1C30]/50 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
                        <div className="p-4 rounded-xl bg-white/[0.02] sm:bg-transparent border border-white/5 sm:border-none sm:border-r sm:border-white/10 reveal-on-scroll delay-100">
                            <div className="text-3xl sm:text-4xl font-extrabold text-white flex items-center justify-center gap-2">
                                <span>{metrics.average_rating}</span>
                                <span className="text-base font-normal text-gray-400">/ 5.0</span>
                            </div>
                            <div className="flex justify-center mt-1.5 space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-[#DA7A31] text-[#DA7A31]" />
                                ))}
                            </div>
                            <div className="text-xs text-gray-400 font-medium mt-1.5">Average Enterprise Rating</div>
                        </div>

                        <div className="p-4 rounded-xl bg-white/[0.02] sm:bg-transparent border border-white/5 sm:border-none sm:border-r sm:border-white/10 reveal-on-scroll delay-200">
                            <div className="text-3xl sm:text-4xl font-extrabold text-[#DA7A31]">
                                {metrics.total_approved}
                            </div>
                            <div className="text-xs text-gray-400 font-medium mt-1.5">
                                Verified Testimonials Published
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-white/[0.02] sm:bg-transparent border border-white/5 sm:border-none reveal-on-scroll delay-300">
                            <div className="text-3xl sm:text-4xl font-extrabold text-white">
                                {metrics.five_star_percentage}%
                            </div>
                            <div className="text-xs text-gray-400 font-medium mt-1.5">
                                5-Star Recommendation Ratio
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Approved Reviews Grid */}
            <section className="py-20 bg-[#071220] border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {reviews.data.length === 0 ? (
                        <div className="lmc-dark-card text-center py-16 rounded-2xl p-8 reveal-on-scroll">
                            <p className="text-sm text-gray-400">No approved reviews published yet.</p>
                            <div className="mt-4">
                                <Link href={route('public.reviews.create')} className="lmc-btn lmc-btn-primary">
                                    <MessageSquarePlus className="w-4 h-4" />
                                    <span>Submit First Client Review</span>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {reviews.data.map((review, rIdx) => {
                                const delayClasses = ['delay-100', 'delay-200', 'delay-300', 'delay-150', 'delay-250', 'delay-350'];
                                const staggerClass = delayClasses[rIdx % delayClasses.length];
                                return (
                                    <div
                                        key={review.id}
                                        className={`lmc-dark-card reveal-on-scroll ${staggerClass} rounded-2xl p-7 flex flex-col justify-between`}
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center space-x-1">
                                                    {[...Array(review.rating)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className="w-4 h-4 fill-[#DA7A31] text-[#DA7A31]"
                                                        />
                                                    ))}
                                                </div>
                                                {review.is_verified_client && (
                                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1">
                                                        <CheckCircle2 className="w-3 h-3" />
                                                        <span>Verified Client</span>
                                                    </span>
                                                )}
                                            </div>

                                            <div className="text-[11px] font-semibold text-[#DA7A31] mb-2">
                                                {review.service_or_product}
                                            </div>

                                            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed italic mb-6">
                                                "{review.review}"
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#DA7A31] to-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-[#DA7A31]/20">
                                                {review.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-white">{review.name}</div>
                                                <div className="text-[11px] text-gray-400">
                                                    {review.role ? `${review.role}, ` : ''}
                                                    {review.company}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Bottom CTA Card */}
                    <div className="mt-14 p-6 sm:p-8 rounded-2xl lmc-dark-card border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 reveal-on-scroll">
                        <div>
                            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DA7A31] uppercase tracking-wider mb-1">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Corporate Collaboration</span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-white">Have you deployed LMC enterprise solutions?</h3>
                            <p className="text-xs sm:text-sm text-gray-400 mt-1">We value honest feedback from enterprise CTOs, engineering leads, and institutional partners.</p>
                        </div>
                        <Link
                            href={route('public.reviews.create')}
                            id="submit-review-bottom-btn"
                            className="lmc-btn lmc-btn-primary shrink-0 w-full sm:w-auto justify-center inline-flex items-center gap-2"
                        >
                            <MessageSquarePlus className="w-4 h-4" />
                            <span>Submit Client Review</span>
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
