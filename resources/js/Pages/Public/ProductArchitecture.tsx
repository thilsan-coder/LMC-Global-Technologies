import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { ProductItem } from '@/types';
import {
    Layers,
    ShieldCheck,
    Cpu,
    Database,
    Zap,
    Server,
    GitBranch,
    ArrowLeft,
    ArrowRight,
    Lock,
    CheckCircle2,
    Activity,
    Cloud,
    Sliders,
    Code2,
    Shield,
    HardDrive,
    Network,
    RefreshCw,
} from 'lucide-react';

interface ProductArchitectureProps {
    product: ProductItem;
    allProducts: Array<{
        id: number;
        name: string;
        slug: string;
        status: string;
    }>;
}

export default function ProductArchitecture({ product, allProducts }: ProductArchitectureProps) {
    const architecturalPillars = [
        {
            icon: Database,
            title: 'Isolated Multi-Tenant Data Tier',
            highlight: 'Zero Data Contamination',
            description:
                'Engineered with row-level security (RLS) or dedicated tenant schemas ensuring strict cryptographic separation of enterprise databases. Read-heavy operations are seamlessly routed to read replicas to maintain sub-50ms query response times.',
            metrics: ['Row-Level Security (RLS)', 'Encrypted at Rest (AES-256)', 'Automated Read Replicas'],
        },
        {
            icon: Cpu,
            title: 'High-Concurrency Compute Engine',
            highlight: 'Sub-Millisecond Processing',
            description:
                'Stateless application tier orchestrated for dynamic horizontal auto-scaling. Heavy operations like report generation, bulk imports, and notifications are processed asynchronously via distributed Redis queues without blocking user threads.',
            metrics: ['Stateless Node/PHP Workers', 'Redis In-Memory Queue', 'Event-Driven Job Dispatch'],
        },
        {
            icon: Shield,
            title: 'Zero-Trust Security & Access Governance',
            highlight: 'SOC-2 Type II Compliance Ready',
            description:
                'Every endpoint mandates OAuth2/JWT token verification with granular role-based access control (RBAC). Comprehensive immutable audit trails record every system modification, compliant with enterprise compliance mandates.',
            metrics: ['Granular RBAC Policies', 'TLS 1.3 In-Transit', 'Immutable Audit Logs'],
        },
        {
            icon: Cloud,
            title: 'Cloud-Native & Hybrid Portability',
            highlight: 'Zero Vendor Lock-In',
            description:
                'Packaged with declarative Dockerfiles and Kubernetes Helm charts. Deployable into AWS, Azure, Google Cloud, private cloud, or air-gapped on-premise data centers with turnkey infrastructure-as-code manifests.',
            metrics: ['Kubernetes Helm Ready', 'Docker Compose Bundled', 'Air-Gapped On-Prem Support'],
        },
        {
            icon: RefreshCw,
            title: 'Resilience & Automated Failover',
            highlight: '99.99% Uptime SLA Target',
            description:
                'Continuous health-probe monitoring with automated circuit-breakers to isolate downstream failures. Includes hourly point-in-time database snapshots and automated multi-zone failover redundancy.',
            metrics: ['Circuit-Breaker Protection', 'Multi-Zone Redundancy', 'Automated Health Recovery'],
        },
        {
            icon: Network,
            title: 'OpenAPI & Enterprise Integration Fabric',
            highlight: 'Bidirectional Webhooks',
            description:
                'Fully documented RESTful JSON APIs compliant with OpenAPI 3.0 standards. Built-in idempotent webhook dispatcher with exponential backoff delivery allows instant integration with ERPs, CRMs, and accounting platforms.',
            metrics: ['OpenAPI 3.0 Specifications', 'Idempotent Webhook Dispatch', 'Enterprise SAML/SSO'],
        },
    ];

    const techSpecs = [
        { label: 'Core Architecture', value: 'Modular Monolith / Microservices-Ready' },
        { label: 'Application Runtime', value: product.tech_stack ? product.tech_stack.join(' • ') : 'Laravel 12 / React 19' },
        { label: 'Primary Datastore', value: 'PostgreSQL 16 / MySQL 8.0 (ACID Compliant)' },
        { label: 'In-Memory & Cache Tier', value: 'Redis Cluster (Sub-millisecond latency)' },
        { label: 'Security Standard', value: 'TLS 1.3, AES-256 encryption, OWASP ASVS Level 2' },
        { label: 'Authentication Fabric', value: 'OAuth2, JWT, Session-based multi-guard RBAC' },
        { label: 'API Protocols', value: 'RESTful JSON API (v1), OpenAPI 3.0, Webhooks' },
        { label: 'Deployment Options', value: 'Docker Container, Kubernetes, Bare-Metal Linux' },
    ];

    return (
        <PublicLayout>
            <Head title={`${product.name} - Architectural Benefits & Technical Specifications`} />

            {/* Breadcrumb Header Bar */}
            <div className="bg-[#0B1C30] border-b border-white/10 py-5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
                    <nav className="flex items-center gap-2 text-xs text-gray-400">
                        <Link href={route('public.home')} className="hover:text-white transition-colors">
                            Home
                        </Link>
                        <span>/</span>
                        <Link href={route('public.products')} className="hover:text-white transition-colors">
                            Products
                        </Link>
                        <span>/</span>
                        <span className="text-[#DA7A31] font-medium">{product.name}</span>
                        <span>/</span>
                        <span className="text-white font-semibold">Architectural Benefits</span>
                    </nav>

                    <Link
                        href={route('public.products')}
                        className="inline-flex items-center gap-2 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 text-[#DA7A31]" />
                        <span>Back to All Products</span>
                    </Link>
                </div>
            </div>

            {/* Hero Section */}
            <div className="bg-[#0B1C30] text-white py-16 lg:py-20 border-b border-white/10 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        <div className="lg:col-span-8 reveal-on-scroll">
                            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#DA7A31] uppercase tracking-widest mb-3 bg-[#DA7A31]/10 border border-[#DA7A31]/20 px-3 py-1 rounded-full">
                                <Layers className="w-3.5 h-3.5" />
                                <span>Platform System Architecture</span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                                {product.name}
                            </h1>
                            <p className="mt-2 text-base sm:text-lg text-[#DA7A31] font-semibold">
                                Complete Architectural Specifications & High-Availability Benefits
                            </p>

                            <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed max-w-3xl">
                                {product.description}
                            </p>

                            <div className="mt-8 flex flex-wrap items-center gap-4">
                                <Link
                                    href={route('public.contact')}
                                    className="lmc-btn lmc-btn-primary"
                                >
                                    <span>Schedule Technical Architecture Review</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href={route('public.contact')}
                                    className="lmc-btn lmc-btn-secondary"
                                >
                                    <span>Request Sandbox Access</span>
                                </Link>
                            </div>
                        </div>

                        {/* Quick Spec Card */}
                        <div className="lg:col-span-4 reveal-on-scroll delay-100">
                            <div className="lmc-dark-card p-6 rounded-2xl border border-white/15 bg-[#071220]/80">
                                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                                    <span className="text-xs font-bold text-gray-400 uppercase">Architecture Status</span>
                                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                        Production Blueprint
                                    </span>
                                </div>

                                <div className="space-y-3.5 py-4 text-xs text-gray-300">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">Target Availability:</span>
                                        <span className="font-mono text-white font-bold">99.99% Uptime</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">P95 Response Time:</span>
                                        <span className="font-mono text-[#DA7A31] font-bold">&lt; 45ms</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">Tenancy Isolation:</span>
                                        <span className="font-medium text-white">Full Cryptographic RLS</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">Compliance Standard:</span>
                                        <span className="font-medium text-white">SOC-2 / GDPR Ready</span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-white/10">
                                    <div className="text-[11px] font-semibold text-gray-400 uppercase mb-2">
                                        Included Tech Stack:
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {product.tech_stack?.map((t, idx) => (
                                            <span
                                                key={idx}
                                                className="text-[10px] font-mono bg-[#0B1C30] text-gray-200 px-2.5 py-1 rounded border border-white/10"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* System Architecture Topology Diagram */}
            <section className="py-16 bg-[#071220] border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12 reveal-on-scroll">
                        <span className="text-xs font-bold text-[#DA7A31] uppercase tracking-widest">
                            Topology Overview
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                            Enterprise Deployment & Data Flow Topology
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-300 mt-2">
                            End-to-end multi-layer architecture engineered for zero single point of failure (SPOF) and isolated data integrity.
                        </p>
                    </div>

                    {/* Visual Topology Diagram Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 relative">
                        {/* Layer 1 */}
                        <div className="lmc-dark-card p-6 rounded-2xl border border-white/15 flex flex-col justify-between reveal-on-scroll delay-100">
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-[#0B1C30] border border-white/10 flex items-center justify-center text-[#DA7A31] mb-4">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <div className="text-[10px] font-bold text-[#DA7A31] uppercase tracking-wider mb-1">
                                    Tier 1: Edge & Security
                                </div>
                                <h3 className="text-base font-bold text-white mb-2">Cloudflare Edge & Gateway</h3>
                                <p className="text-xs text-gray-300 leading-relaxed">
                                    TLS 1.3 termination, automatic DDoS mitigation, WAF rule enforcement, and static asset caching.
                                </p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-white/10 text-[11px] font-mono text-gray-400">
                                Port: 443 (HTTPS) • WAF Active
                            </div>
                        </div>

                        {/* Layer 2 */}
                        <div className="lmc-dark-card p-6 rounded-2xl border border-white/15 flex flex-col justify-between reveal-on-scroll delay-150">
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-[#0B1C30] border border-white/10 flex items-center justify-center text-[#DA7A31] mb-4">
                                    <Server className="w-5 h-5" />
                                </div>
                                <div className="text-[10px] font-bold text-[#DA7A31] uppercase tracking-wider mb-1">
                                    Tier 2: Compute Layer
                                </div>
                                <h3 className="text-base font-bold text-white mb-2">Stateless App Workers</h3>
                                <p className="text-xs text-gray-300 leading-relaxed">
                                    Autoscaling worker nodes processing business logic, OAuth2 authentication, and API endpoints.
                                </p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-white/10 text-[11px] font-mono text-gray-400">
                                Containerized • Zero Shared State
                            </div>
                        </div>

                        {/* Layer 3 */}
                        <div className="lmc-dark-card p-6 rounded-2xl border border-white/15 flex flex-col justify-between reveal-on-scroll delay-200">
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-[#0B1C30] border border-white/10 flex items-center justify-center text-[#DA7A31] mb-4">
                                    <Database className="w-5 h-5" />
                                </div>
                                <div className="text-[10px] font-bold text-[#DA7A31] uppercase tracking-wider mb-1">
                                    Tier 3: Persistence & Cache
                                </div>
                                <h3 className="text-base font-bold text-white mb-2">Partitioned SQL & Redis</h3>
                                <p className="text-xs text-gray-300 leading-relaxed">
                                    Primary read/write datastore with automated read replicas and sub-millisecond in-memory cache cluster.
                                </p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-white/10 text-[11px] font-mono text-gray-400">
                                ACID Compliant • Point-In-Time Backup
                            </div>
                        </div>

                        {/* Layer 4 */}
                        <div className="lmc-dark-card p-6 rounded-2xl border border-white/15 flex flex-col justify-between reveal-on-scroll delay-250">
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-[#0B1C30] border border-white/10 flex items-center justify-center text-[#DA7A31] mb-4">
                                    <GitBranch className="w-5 h-5" />
                                </div>
                                <div className="text-[10px] font-bold text-[#DA7A31] uppercase tracking-wider mb-1">
                                    Tier 4: Enterprise Fabric
                                </div>
                                <h3 className="text-base font-bold text-white mb-2">Webhooks & External APIs</h3>
                                <p className="text-xs text-gray-300 leading-relaxed">
                                    Bidirectional webhook listeners, SAML 2.0 corporate SSO, payment gateway bridges, and ERP integrations.
                                </p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-white/10 text-[11px] font-mono text-gray-400">
                                OpenAPI 3.0 • Exponential Retry
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Architectural Pillars */}
            <section className="py-20 bg-[#0B1C30] border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
                        <span className="text-xs font-bold text-[#DA7A31] uppercase tracking-widest">
                            Enterprise Architectural Benefits
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
                            Six Core Architectural Advantages
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-300 mt-3">
                            Engineered from the ground up for high-throughput enterprise workloads, strict compliance mandates, and mission-critical reliability.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {architecturalPillars.map((pillar, idx) => {
                            const Icon = pillar.icon;
                            return (
                                <div
                                    key={idx}
                                    className="lmc-dark-card p-8 rounded-2xl border border-white/15 flex flex-col justify-between group hover:border-[#DA7A31]/50 transition-all reveal-on-scroll"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-[#071220] border border-white/10 flex items-center justify-center text-[#DA7A31] group-hover:scale-110 transition-transform">
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <span className="text-[10px] font-bold text-[#DA7A31] bg-[#DA7A31]/10 px-2.5 py-1 rounded-md border border-[#DA7A31]/20 uppercase">
                                                {pillar.highlight}
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-[#DA7A31] transition-colors">
                                            {pillar.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                                            {pillar.description}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-white/10 space-y-2">
                                        {pillar.metrics.map((m, mIdx) => (
                                            <div key={mIdx} className="flex items-center gap-2 text-xs text-gray-300">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-[#DA7A31] shrink-0" />
                                                <span>{m}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Product-Specific Outcomes & Technical Features */}
            <section className="py-20 bg-[#071220] border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Key Capabilities */}
                        <div className="reveal-on-scroll">
                            <span className="text-xs font-bold text-[#DA7A31] uppercase tracking-widest">
                                Functional Capabilities
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-4">
                                Engineered Features & Operational Controls
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-300 mb-6 leading-relaxed">
                                {product.summary}
                            </p>

                            <div className="space-y-3">
                                {product.features?.map((feat, i) => (
                                    <div
                                        key={i}
                                        className="lmc-dark-card p-4 rounded-xl border border-white/10 flex items-start gap-3"
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-[#DA7A31] shrink-0 mt-0.5" />
                                        <div>
                                            <div className="text-xs sm:text-sm font-semibold text-white">{feat}</div>
                                            <div className="text-[11px] text-gray-400 mt-0.5">
                                                Verified enterprise modular module with unit & integration test coverage.
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Business & Architectural Outcomes */}
                        <div className="reveal-on-scroll delay-150">
                            <span className="text-xs font-bold text-[#DA7A31] uppercase tracking-widest">
                                Measurable ROI
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-4">
                                Enterprise Business Outcomes
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-300 mb-6 leading-relaxed">
                                Deploying this blueprint reduces engineering time-to-market by up to 75% while providing bulletproof stability.
                            </p>

                            <div className="space-y-3">
                                {product.benefits?.map((benefit, i) => (
                                    <div
                                        key={i}
                                        className="lmc-dark-card p-4 rounded-xl border border-white/10 flex items-start gap-3 bg-[#0E223D]/60"
                                    >
                                        <Zap className="w-5 h-5 text-[#DA7A31] shrink-0 mt-0.5" />
                                        <div>
                                            <div className="text-xs sm:text-sm font-semibold text-white">{benefit}</div>
                                            <div className="text-[11px] text-gray-400 mt-0.5">
                                                Audited and validated under corporate enterprise pilot implementations.
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Technical Specs Table */}
                            <div className="mt-8 lmc-dark-card p-6 rounded-2xl border border-white/15">
                                <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <Code2 className="w-4 h-4 text-[#DA7A31]" />
                                    <span>Technical Specification Matrix</span>
                                </h3>

                                <div className="divide-y divide-white/10 text-xs">
                                    {techSpecs.map((spec, sIdx) => (
                                        <div key={sIdx} className="py-2.5 flex justify-between items-center gap-4">
                                            <span className="text-gray-400 font-medium">{spec.label}</span>
                                            <span className="text-right text-gray-200 font-semibold">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Other Platform Blueprints Switcher */}
            <section className="py-16 bg-[#0B1C30] border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <span className="text-xs font-bold text-[#DA7A31] uppercase tracking-widest">
                                Explore Other Architectures
                            </span>
                            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                                Additional Enterprise Software Blueprints
                            </h2>
                        </div>
                        <Link
                            href={route('public.products')}
                            className="text-xs font-semibold text-[#DA7A31] hover:underline inline-flex items-center gap-1"
                        >
                            <span>View All 8 Platforms</span>
                            <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {allProducts
                            .filter((p) => p.slug !== product.slug)
                            .slice(0, 4)
                            .map((other) => (
                                <Link
                                    key={other.id}
                                    href={route('public.products.architecture', other.slug)}
                                    className="lmc-dark-card p-4 rounded-xl border border-white/10 hover:border-[#DA7A31]/50 transition-all block group"
                                >
                                    <div className="text-[10px] font-bold text-[#DA7A31] uppercase mb-1">
                                        Blueprint
                                    </div>
                                    <div className="text-sm font-bold text-white group-hover:text-[#DA7A31] transition-colors line-clamp-1">
                                        {other.name}
                                    </div>
                                    <div className="mt-3 flex items-center justify-between text-xs font-semibold text-[#DA7A31] group-hover:underline">
                                        <span>View Architecture</span>
                                        <ArrowRight className="w-3 h-3" />
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-b from-[#071220] to-[#0B1C30] text-center">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 reveal-on-scroll">
                    <span className="text-xs font-bold text-[#DA7A31] uppercase tracking-widest">
                        Custom Enterprise Customization
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4">
                        Need Custom Architectural Extensions?
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto mb-8 leading-relaxed">
                        LMC Global Technologies architects work directly with your engineering leads to deploy, customize, and integrate this platform blueprint to your exact enterprise specifications.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href={route('public.contact')}
                            className="lmc-btn lmc-btn-primary w-full sm:w-auto justify-center"
                        >
                            <span>Schedule Consultation with Lead Architect</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href={route('public.products')}
                            className="lmc-btn lmc-btn-secondary w-full sm:w-auto justify-center"
                        >
                            <span>Browse All Blueprints</span>
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
