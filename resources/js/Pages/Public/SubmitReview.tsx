import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { PageProps } from '@/types';
import {
    Star,
    CheckCircle2,
    MessageSquarePlus,
    Send,
    ShieldCheck,
    ArrowLeft,
    ChevronDown,
    Check,
    Briefcase,
    Code2,
    Smartphone,
    Cloud,
    Shield,
    GraduationCap,
    LayoutGrid,
    Users,
    Activity,
    ShoppingBag,
    Sparkles,
    Lock,
    HelpCircle,
    ThumbsUp,
} from 'lucide-react';

interface SubmitReviewProps {
    metrics: {
        total_approved: number;
        average_rating: number;
    };
}

interface ServiceProductOption {
    id: string;
    label: string;
    type: 'Service' | 'Platform';
    icon: React.ElementType;
    desc: string;
}

interface ServiceProductGroup {
    category: string;
    items: ServiceProductOption[];
}

const SERVICE_PRODUCT_GROUPS: ServiceProductGroup[] = [
    {
        category: 'Enterprise Technology Services',
        items: [
            {
                id: 'Web Application Development',
                label: 'Web Application Development',
                type: 'Service',
                icon: Code2,
                desc: 'Full-stack cloud architectures & SPA systems',
            },
            {
                id: 'Mobile Application Development',
                label: 'Mobile Application Development',
                type: 'Service',
                icon: Smartphone,
                desc: 'Cross-platform iOS & Android mobile solutions',
            },
            {
                id: 'Cloud Services & DevOps',
                label: 'Cloud Services & DevOps',
                type: 'Service',
                icon: Cloud,
                desc: 'AWS/Azure orchestration & CI/CD automation',
            },
            {
                id: 'Cybersecurity Services',
                label: 'Cybersecurity Services',
                type: 'Service',
                icon: Shield,
                desc: 'SOC-2, penetration testing & compliance audits',
            },
            {
                id: 'IT Consulting',
                label: 'IT Consulting',
                type: 'Service',
                icon: Briefcase,
                desc: 'Strategic architecture & digital transformation',
            },
            {
                id: 'Internship Programs',
                label: 'Internship Programs',
                type: 'Service',
                icon: GraduationCap,
                desc: 'Industrial engineering training & academy',
            },
        ],
    },
    {
        category: 'Enterprise Software Products',
        items: [
            {
                id: 'LMC CRM System',
                label: 'LMC CRM System',
                type: 'Platform',
                icon: LayoutGrid,
                desc: 'Enterprise pipeline management & customer analytics',
            },
            {
                id: 'LMC HR Management System',
                label: 'LMC HR Management System',
                type: 'Platform',
                icon: Users,
                desc: 'Workforce management & automated payroll',
            },
            {
                id: 'LMC Hospital Management System',
                label: 'LMC Hospital Management System',
                type: 'Platform',
                icon: Activity,
                desc: 'Clinical workflows, EHR & patient administration',
            },
            {
                id: 'LMC Point of Sale System',
                label: 'LMC Point of Sale System',
                type: 'Platform',
                icon: ShoppingBag,
                desc: 'Multi-outlet retail & inventory synchronisation',
            },
        ],
    },
];

const RATING_LABELS: Record<number, string> = {
    5: '5 / 5 - Exceptional Partnership',
    4: '4 / 5 - Exceeded Expectations',
    3: '3 / 5 - Meets High Standards',
    2: '2 / 5 - Areas for Improvement',
    1: '1 / 5 - Unsatisfactory',
};

export default function SubmitReview({ metrics }: SubmitReviewProps) {
    const { flash } = usePage<PageProps>().props;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [hoverRating, setHoverRating] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { data, setData, post, processing, reset, errors, recentlySuccessful } = useForm({
        name: '',
        email: '',
        company: '',
        role: '',
        rating: 5,
        service_or_product: 'Web Application Development',
        review: '',
    });

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('public.reviews.store'), {
            onSuccess: () => {
                setIsSubmitted(true);
                reset();
            },
        });
    };

    // Locate active selected item metadata
    const selectedItem =
        SERVICE_PRODUCT_GROUPS.flatMap((g) => g.items).find(
            (item) => item.id === data.service_or_product
        ) || SERVICE_PRODUCT_GROUPS[0].items[0];
    const SelectedItemIcon = selectedItem.icon;

    return (
        <PublicLayout>
            <Head title="Submit Client Review - LMC Global Technologies" />

            {/* Header with Breadcrumbs */}
            <div className="bg-[#0B1C30] text-white py-16 sm:py-20 border-b border-white/10 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Breadcrumbs */}
                    <div className="flex items-center space-x-2 text-xs text-gray-400 mb-6 reveal-on-scroll">
                        <Link href={route('public.home')} className="hover:text-white transition-colors">
                            Home
                        </Link>
                        <span>/</span>
                        <Link href={route('public.reviews')} className="hover:text-white transition-colors">
                            Verified Reviews
                        </Link>
                        <span>/</span>
                        <span className="text-[#DA7A31] font-semibold">Submit Review</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 reveal-on-scroll">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DA7A31] uppercase tracking-widest mb-3">
                                <MessageSquarePlus className="w-4 h-4" />
                                <span>Corporate Governance Portal</span>
                            </div>
                            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                                Submit Enterprise Review
                            </h1>
                            <p className="mt-3 text-base text-gray-300 leading-relaxed">
                                Share your partnership experience with LMC Global Technologies. All submissions are moderated
                                to ensure authentic corporate standards.
                            </p>
                        </div>

                        <div className="shrink-0">
                            <Link href={route('public.reviews')} className="lmc-btn lmc-btn-secondary inline-flex items-center gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                <span>Back to All Reviews</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Form & Information Grid */}
            <section className="py-12 sm:py-20 bg-[#071220] min-h-[70vh]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {isSubmitted || recentlySuccessful || flash?.success ? (
                        /* Success View */
                        <div className="max-w-3xl mx-auto lmc-dark-card p-8 sm:p-12 rounded-3xl text-center relative overflow-hidden border border-emerald-500/30 animate-page-enter">
                            <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/10">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>

                            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Submission Confirmed</span>
                            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2">
                                Thank You for Your Feedback!
                            </h2>
                            <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl mx-auto">
                                Your review has been recorded under our corporate verification registry. To maintain high enterprise integrity, our quality assurance team will review and publish your testimonial shortly.
                            </p>

                            <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href={route('public.reviews')} className="lmc-btn lmc-btn-primary w-full sm:w-auto justify-center">
                                    <span>Return to Verified Reviews</span>
                                </Link>
                                <Link href={route('public.services')} className="lmc-btn lmc-btn-secondary w-full sm:w-auto justify-center">
                                    <span>Explore Enterprise Services</span>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        /* Main Form Layout */
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                            {/* Left Column: Form (8 Cols) */}
                            <div className="lg:col-span-8">
                                <div className="lmc-dark-card p-6 sm:p-10 rounded-2xl relative overflow-hidden border border-white/15 shadow-2xl">
                                    {/* Top Orange Gradient Bar */}
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#DA7A31] to-transparent" />

                                    {/* Form Subheader */}
                                    <div className="mb-8">
                                        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                                            <span>Client Review Information</span>
                                        </h2>
                                        <p className="text-xs sm:text-sm text-gray-400 mt-1">
                                            Please provide your corporate details and feedback below. Fields marked with an asterisk (*) are required.
                                        </p>

                                        {/* Policy Banner */}
                                        <div className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 leading-relaxed flex items-start gap-3">
                                            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                                            <div>
                                                <strong>Administrative Verification:</strong> To ensure all published testimonials reflect real system deployments, our team verifies submitter credentials prior to public listing.
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submission Form */}
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Name & Email */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-2">
                                                    Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="submit-review-name"
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    required
                                                    className="w-full text-sm rounded-lg border border-white/15 bg-[#0B1C30] px-4 py-3 text-white placeholder:text-gray-500 focus:border-[#DA7A31] focus:ring-2 focus:ring-[#DA7A31]/20 transition-all"
                                                    placeholder="e.g. Ruwan Silva"
                                                />
                                                {errors.name && (
                                                    <p className="text-xs text-red-400 mt-1">{errors.name}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-2">
                                                    Corporate Email *
                                                </label>
                                                <input
                                                    type="email"
                                                    id="submit-review-email"
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    required
                                                    className="w-full text-sm rounded-lg border border-white/15 bg-[#0B1C30] px-4 py-3 text-white placeholder:text-gray-500 focus:border-[#DA7A31] focus:ring-2 focus:ring-[#DA7A31]/20 transition-all"
                                                    placeholder="ruwan@company.lk"
                                                />
                                                {errors.email && (
                                                    <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Company & Role */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-2">
                                                    Company / Organization *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="submit-review-company"
                                                    value={data.company}
                                                    onChange={(e) => setData('company', e.target.value)}
                                                    required
                                                    className="w-full text-sm rounded-lg border border-white/15 bg-[#0B1C30] px-4 py-3 text-white placeholder:text-gray-500 focus:border-[#DA7A31] focus:ring-2 focus:ring-[#DA7A31]/20 transition-all"
                                                    placeholder="e.g. Apex Holdings PLC"
                                                />
                                                {errors.company && (
                                                    <p className="text-xs text-red-400 mt-1">{errors.company}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-2">
                                                    Role / Job Title
                                                </label>
                                                <input
                                                    type="text"
                                                    id="submit-review-role"
                                                    value={data.role}
                                                    onChange={(e) => setData('role', e.target.value)}
                                                    className="w-full text-sm rounded-lg border border-white/15 bg-[#0B1C30] px-4 py-3 text-white placeholder:text-gray-500 focus:border-[#DA7A31] focus:ring-2 focus:ring-[#DA7A31]/20 transition-all"
                                                    placeholder="e.g. Chief Technology Officer"
                                                />
                                            </div>
                                        </div>

                                        {/* Redesigned Custom Dropdown & Rating */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            {/* Custom Dropdown Component */}
                                            <div className="relative" ref={dropdownRef}>
                                                <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-2">
                                                    Service or Product Engaged *
                                                </label>

                                                <button
                                                    type="button"
                                                    id="service-product-dropdown-trigger"
                                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                                    className={`w-full flex items-center justify-between p-3 rounded-lg border text-left transition-all duration-200 ${
                                                        dropdownOpen
                                                            ? 'border-[#DA7A31] ring-2 ring-[#DA7A31]/25 bg-[#0E223D]'
                                                            : 'border-white/15 hover:border-white/30 bg-[#0B1C30]'
                                                    }`}
                                                    aria-haspopup="listbox"
                                                    aria-expanded={dropdownOpen}
                                                >
                                                    <div className="flex items-center gap-3 min-w-0">
                                                        <div className="w-8 h-8 rounded-lg bg-[#DA7A31]/15 border border-[#DA7A31]/30 flex items-center justify-center shrink-0 text-[#DA7A31]">
                                                            <SelectedItemIcon className="w-4 h-4" />
                                                        </div>
                                                        <div className="min-w-0 pr-1">
                                                            <div className="text-xs sm:text-sm font-semibold text-white truncate">
                                                                {selectedItem.label}
                                                            </div>
                                                            <div className="text-[10px] text-gray-400 truncate">
                                                                <span className="text-[#DA7A31] font-semibold">{selectedItem.type}</span> &bull; {selectedItem.desc}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <ChevronDown
                                                        className={`w-4 h-4 text-gray-400 shrink-0 ml-1.5 transition-transform duration-200 ${
                                                            dropdownOpen ? 'rotate-180 text-[#DA7A31]' : ''
                                                        }`}
                                                    />
                                                </button>

                                                {/* Dropdown Menu Popover */}
                                                {dropdownOpen && (
                                                    <div
                                                        id="service-product-dropdown-menu"
                                                        className="absolute left-0 right-0 z-30 mt-2 max-h-64 overflow-y-auto rounded-xl border border-white/20 bg-[#0B1C30] shadow-2xl shadow-black p-2 animate-dropdown-enter"
                                                        role="listbox"
                                                    >
                                                        {SERVICE_PRODUCT_GROUPS.map((group, gIdx) => (
                                                            <div key={group.category} className={gIdx > 0 ? 'mt-2 pt-2 border-t border-white/10' : ''}>
                                                                <div className="px-3 py-1 text-[10px] font-extrabold tracking-wider text-gray-400 uppercase">
                                                                    {group.category}
                                                                </div>
                                                                <div className="space-y-1 mt-1">
                                                                    {group.items.map((opt) => {
                                                                        const OptIcon = opt.icon;
                                                                        const isSelected = data.service_or_product === opt.id;
                                                                        return (
                                                                            <button
                                                                                key={opt.id}
                                                                                type="button"
                                                                                role="option"
                                                                                aria-selected={isSelected}
                                                                                onClick={() => {
                                                                                    setData('service_or_product', opt.id);
                                                                                    setDropdownOpen(false);
                                                                                }}
                                                                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all ${
                                                                                    isSelected
                                                                                        ? 'bg-[#DA7A31]/20 text-white font-medium border border-[#DA7A31]/40'
                                                                                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                                                                }`}
                                                                            >
                                                                                <div className="flex items-center gap-3 min-w-0">
                                                                                    <div
                                                                                        className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${
                                                                                            isSelected
                                                                                                ? 'bg-[#DA7A31] text-white shadow-sm'
                                                                                                : 'bg-white/5 text-gray-400'
                                                                                        }`}
                                                                                    >
                                                                                        <OptIcon className="w-3.5 h-3.5" />
                                                                                    </div>
                                                                                    <div className="min-w-0">
                                                                                        <div className="text-xs sm:text-sm font-medium text-white truncate">
                                                                                            {opt.label}
                                                                                        </div>
                                                                                        <div className="text-[10px] text-gray-400 truncate">
                                                                                            {opt.desc}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                {isSelected && (
                                                                                    <Check className="w-4 h-4 text-[#DA7A31] shrink-0 ml-2" />
                                                                                )}
                                                                            </button>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Rating Selector */}
                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider">
                                                        Overall Rating *
                                                    </label>
                                                    <span className="text-[11px] font-semibold text-[#DA7A31]">
                                                        {RATING_LABELS[hoverRating || data.rating]}
                                                    </span>
                                                </div>

                                                <div className="bg-[#0B1C30] p-3 rounded-lg border border-white/15 flex items-center justify-between">
                                                    <div className="flex items-center space-x-2">
                                                        {[1, 2, 3, 4, 5].map((star) => {
                                                            const active = star <= (hoverRating || data.rating);
                                                            return (
                                                                <button
                                                                    key={star}
                                                                    type="button"
                                                                    onMouseEnter={() => setHoverRating(star)}
                                                                    onMouseLeave={() => setHoverRating(null)}
                                                                    onClick={() => setData('rating', star)}
                                                                    className="focus:outline-none hover:scale-125 transition-transform p-1 cursor-pointer"
                                                                    aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                                                                >
                                                                    <Star
                                                                        className={`w-6 h-6 transition-colors duration-150 ${
                                                                            active
                                                                                ? 'fill-[#DA7A31] text-[#DA7A31] drop-shadow-[0_0_8px_rgba(218,122,49,0.5)]'
                                                                                : 'text-gray-600 hover:text-gray-400'
                                                                        }`}
                                                                    />
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                    <span className="text-xs font-bold text-white bg-[#132B4A] px-2.5 py-1 rounded-md border border-white/10">
                                                        {data.rating} / 5
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Review Feedback Textarea */}
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider">
                                                    Your Detailed Feedback *
                                                </label>
                                                <span className="text-xs text-gray-400">Min 10 characters</span>
                                            </div>
                                            <textarea
                                                rows={5}
                                                id="submit-review-text"
                                                value={data.review}
                                                onChange={(e) => setData('review', e.target.value)}
                                                required
                                                className="w-full text-sm rounded-lg border border-white/15 bg-[#0B1C30] p-4 text-white placeholder:text-gray-500 focus:border-[#DA7A31] focus:ring-2 focus:ring-[#DA7A31]/20 transition-all leading-relaxed"
                                                placeholder="Describe the architectural quality, team professionalism, adherence to deadlines, and operational outcomes of your collaboration with LMC Global Technologies..."
                                            />
                                            {errors.review && (
                                                <p className="text-xs text-red-400 mt-1">{errors.review}</p>
                                            )}
                                            <p className="text-xs text-gray-400 mt-1.5">
                                                Tip: Mention specific engineering deliverables, software reliability, performance benchmarks, or communication efficiency.
                                            </p>
                                        </div>

                                        {/* Form Actions */}
                                        <div className="pt-4 border-t border-white/10 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4">
                                            <Link
                                                href={route('public.reviews')}
                                                className="lmc-btn lmc-btn-secondary justify-center text-sm"
                                            >
                                                <ArrowLeft className="w-4 h-4" />
                                                <span>Cancel</span>
                                            </Link>
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                id="submit-review-form-btn"
                                                className="lmc-btn lmc-btn-primary justify-center text-sm"
                                            >
                                                <Send className="w-4 h-4" />
                                                <span>{processing ? 'Submitting...' : 'Submit Review For Verification'}</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Right Column: Information & Guidelines (4 Cols) */}
                            <div className="lg:col-span-4 space-y-6">
                                {/* Governance Card */}
                                <div className="lmc-dark-card p-6 rounded-2xl border border-white/10">
                                    <div className="w-10 h-10 rounded-xl bg-[#DA7A31]/10 border border-[#DA7A31]/20 text-[#DA7A31] flex items-center justify-center mb-4">
                                        <ShieldCheck className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-base font-bold text-white">Why We Moderated Reviews</h3>
                                    <p className="text-xs text-gray-300 leading-relaxed mt-2">
                                        As an enterprise software provider, LMC Global Technologies ensures all public testimonials reflect verified enterprise partnerships and system deployments.
                                    </p>
                                    <ul className="mt-4 space-y-2 text-xs text-gray-400">
                                        <li className="flex items-center gap-2">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                            <span>Corporate Email Verification</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                            <span>Deployment Scope Cross-Reference</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                            <span>Protection Against Unverified Spam</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Platform Metric Card */}
                                <div className="lmc-dark-card p-6 rounded-2xl border border-white/10 text-center">
                                    <div className="text-3xl font-extrabold text-white flex items-center justify-center gap-2">
                                        <span>{metrics.average_rating}</span>
                                        <span className="text-sm font-normal text-gray-400">/ 5.0</span>
                                    </div>
                                    <div className="flex justify-center mt-2 space-x-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-[#DA7A31] text-[#DA7A31]" />
                                        ))}
                                    </div>
                                    <div className="text-xs text-gray-400 mt-2">
                                        Across {metrics.total_approved} Published Enterprise Reviews
                                    </div>
                                </div>

                                {/* Need Assistance Card */}
                                <div className="lmc-dark-card p-6 rounded-2xl border border-white/10">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                                            <HelpCircle className="w-4 h-4" />
                                        </div>
                                        <h4 className="text-sm font-bold text-white">Need Direct Support?</h4>
                                    </div>
                                    <p className="text-xs text-gray-400 leading-relaxed mb-4">
                                        If you require technical assistance or wish to speak with our engineering management directly:
                                    </p>
                                    <Link href={route('public.contact')} className="text-xs font-semibold text-[#DA7A31] hover:underline flex items-center gap-1">
                                        <span>Contact Executive Desk</span>
                                        <span>&rarr;</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
