import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import PublicLayout from '@/layouts/PublicLayout';
import { ReviewItem } from '@/types';
import {
    Star,
    CheckCircle2,
    MessageSquarePlus,
    Send,
    ShieldCheck,
    ThumbsUp,
    Filter,
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
    const [showForm, setShowForm] = useState(false);

    const { data, setData, post, processing, reset, errors, recentlySuccessful } = useForm({
        name: '',
        email: '',
        company: '',
        role: '',
        rating: 5,
        service_or_product: 'Web Application Development',
        review: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('public.reviews.store'), {
            onSuccess: () => {
                reset();
                setShowForm(false);
            },
        });
    };

    return (
        <PublicLayout>
            <Head title="Client Testimonials & Corporate Reviews" />

            {/* Header */}
            <div className="bg-[#0B1C30] text-white py-20 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
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

                        {/* Review Action CTA */}
                        <div>
                            <button
                                onClick={() => setShowForm(!showForm)}
                                className="inline-flex items-center gap-2 bg-[#DA7A31] hover:bg-[#C2631D] text-white text-sm font-semibold px-6 py-3.5 rounded shadow-md transition"
                            >
                                <MessageSquarePlus className="w-4 h-4" />
                                <span>{showForm ? 'Close Review Form' : 'Submit Client Review'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ratings Summary Bar */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
                        <div>
                            <div className="text-4xl font-extrabold text-[#0B1C30] flex items-center justify-center gap-2">
                                <span>{metrics.average_rating}</span>
                                <span className="text-base font-normal text-gray-400">/ 5.0</span>
                            </div>
                            <div className="flex justify-center mt-1 space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-[#DA7A31] text-[#DA7A31]" />
                                ))}
                            </div>
                            <div className="text-xs text-gray-500 font-medium mt-1">Average Enterprise Rating</div>
                        </div>

                        <div className="pt-4 sm:pt-0">
                            <div className="text-4xl font-extrabold text-[#DA7A31]">
                                {metrics.total_approved}
                            </div>
                            <div className="text-xs text-gray-500 font-medium mt-1">
                                Verified Testimonials Published
                            </div>
                        </div>

                        <div className="pt-4 sm:pt-0">
                            <div className="text-4xl font-extrabold text-[#0B1C30]">
                                {metrics.five_star_percentage}%
                            </div>
                            <div className="text-xs text-gray-500 font-medium mt-1">
                                5-Star Recommendation Ratio
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Submission Form Modal/Section */}
            {showForm && (
                <section className="bg-white border-b border-gray-200 py-12 animate-in fade-in slide-in-from-top-4">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-[#F0F0F1] p-8 rounded-lg border border-gray-200">
                            <h2 className="text-xl font-bold text-[#0B1C30] mb-2">Submit Enterprise Review</h2>
                            <p className="text-xs text-[#4D4B55] mb-6">
                                Share your partnership experience with LMC Global Technologies. Note: To maintain
                                authenticity, all submissions undergo administrative verification before public
                                publication.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#0B1C30] mb-1">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                            className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                            placeholder="e.g. Ruwan Silva"
                                        />
                                        {errors.name && (
                                            <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-[#0B1C30] mb-1">
                                            Corporate Email *
                                        </label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                            className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                            placeholder="ruwan@company.lk"
                                        />
                                        {errors.email && (
                                            <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#0B1C30] mb-1">
                                            Company / Organization *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.company}
                                            onChange={(e) => setData('company', e.target.value)}
                                            required
                                            className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                            placeholder="e.g. Apex Holdings PLC"
                                        />
                                        {errors.company && (
                                            <p className="text-[11px] text-red-600 mt-1">{errors.company}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-[#0B1C30] mb-1">
                                            Role / Job Title
                                        </label>
                                        <input
                                            type="text"
                                            value={data.role}
                                            onChange={(e) => setData('role', e.target.value)}
                                            className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                            placeholder="e.g. Chief Technology Officer"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#0B1C30] mb-1">
                                            Service / Product Engaged *
                                        </label>
                                        <select
                                            value={data.service_or_product}
                                            onChange={(e) => setData('service_or_product', e.target.value)}
                                            className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                        >
                                            <option value="Web Application Development">Web Application Development</option>
                                            <option value="Mobile Application Development">Mobile Application Development</option>
                                            <option value="Cloud Services & DevOps">Cloud Services & DevOps</option>
                                            <option value="Cybersecurity Services">Cybersecurity Services</option>
                                            <option value="IT Consulting">IT Consulting</option>
                                            <option value="Internship Programs">Internship Programs</option>
                                            <option value="LMC CRM System">LMC CRM System</option>
                                            <option value="LMC HR Management System">LMC HR Management System</option>
                                            <option value="LMC Hospital Management System">LMC Hospital Management System</option>
                                            <option value="LMC Point of Sale System">LMC Point of Sale System</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-[#0B1C30] mb-1">
                                            Rating *
                                        </label>
                                        <div className="flex items-center space-x-2 pt-1.5">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setData('rating', star)}
                                                    className="focus:outline-none"
                                                >
                                                    <Star
                                                        className={`w-6 h-6 transition-colors ${
                                                            star <= data.rating
                                                                ? 'fill-[#DA7A31] text-[#DA7A31]'
                                                                : 'text-gray-300'
                                                        }`}
                                                    />
                                                </button>
                                            ))}
                                            <span className="text-xs font-bold text-[#0B1C30] ml-2">
                                                {data.rating} / 5 Stars
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-[#0B1C30] mb-1">
                                        Your Review & Feedback *
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={data.review}
                                        onChange={(e) => setData('review', e.target.value)}
                                        required
                                        className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                        placeholder="Describe the architectural quality, team professionalism, and outcomes of your collaboration..."
                                    />
                                    {errors.review && (
                                        <p className="text-[11px] text-red-600 mt-1">{errors.review}</p>
                                    )}
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-[#DA7A31] hover:bg-[#C2631D] text-white text-xs font-bold px-6 py-2.5 rounded shadow transition flex items-center gap-2"
                                    >
                                        <Send className="w-3.5 h-3.5" />
                                        <span>{processing ? 'Submitting...' : 'Submit for Moderation'}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            )}

            {/* Approved Reviews Grid */}
            <section className="py-20 bg-[#F0F0F1]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {reviews.data.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-lg border border-gray-200 p-8">
                            <p className="text-sm text-gray-500">No approved reviews published yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {reviews.data.map((review) => (
                                <div
                                    key={review.id}
                                    className="bg-white rounded-lg p-7 border border-gray-200 shadow-xs flex flex-col justify-between"
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
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
                                                    <CheckCircle2 className="w-3 h-3" />
                                                    <span>Verified Client</span>
                                                </span>
                                            )}
                                        </div>

                                        <div className="text-[11px] font-semibold text-[#DA7A31] mb-2">
                                            {review.service_or_product}
                                        </div>

                                        <p className="text-xs sm:text-sm text-[#4D4B55] leading-relaxed italic mb-6">
                                            "{review.review}"
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[#0B1C30] text-white flex items-center justify-center font-bold text-xs">
                                            {review.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-[#0B1C30]">{review.name}</div>
                                            <div className="text-[11px] text-gray-500">
                                                {review.role ? `${review.role}, ` : ''}
                                                {review.company}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
