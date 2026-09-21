import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    Users,
    Briefcase,
    GraduationCap,
    Clock,
    Star,
    Mail,
    CheckSquare,
    ArrowUpRight,
    TrendingUp,
    AlertCircle,
    CheckCircle2,
    Calendar,
    ArrowRight,
} from 'lucide-react';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
} from 'recharts';

interface DashboardProps {
    stats: {
        total_users: number;
        customers: number;
        interns: number;
        active_internships: number;
        completed_internships: number;
        pending_reviews: number;
        approved_reviews: number;
        crm_leads: number;
        unread_contacts: number;
        open_tasks: number;
    };
    leadsByStatus: Array<{ status: string; count: number; total_value: number }>;
    internsByDepartment: Array<{ department: string; count: number }>;
    performanceTrends: Array<{ month: string; leads: number; interns: number; revenue: number }>;
    recentLeads: any[];
    pendingReviews: any[];
    recentContacts: any[];
    pendingTasks: any[];
}

export default function Dashboard({
    stats,
    leadsByStatus,
    internsByDepartment,
    performanceTrends,
    recentLeads,
    pendingReviews,
    recentContacts,
    pendingTasks,
}: DashboardProps) {
    const COLORS = ['#0B1C30', '#DA7A31', '#132842', '#E88B44', '#6C6A76', '#34323A'];

    return (
        <AdminLayout title="Admin Master Dashboard" subtitle="Enterprise Operations & Analytics">
            <Head title="Admin Master Dashboard" />

            {/* Pending Moderation Alert (if pending reviews or unread contacts exist) */}
            {(stats.pending_reviews > 0 || stats.unread_contacts > 0) && (
                <div className="mb-6 bg-amber-50 border-l-4 border-[#DA7A31] p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
                    <div className="flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-[#DA7A31] flex-shrink-0" />
                        <div>
                            <div className="text-xs font-bold text-[#0B1C30]">
                                Administrative Attention Required
                            </div>
                            <div className="text-[11px] text-[#4D4B55] mt-0.5">
                                {stats.pending_reviews > 0 && (
                                    <span>
                                        <strong className="text-[#DA7A31]">{stats.pending_reviews} client reviews</strong>{' '}
                                        awaiting public moderation.{' '}
                                    </span>
                                )}
                                {stats.unread_contacts > 0 && (
                                    <span>
                                        <strong className="text-[#0B1C30]">{stats.unread_contacts} unread enquiries</strong>{' '}
                                        in contact triage.
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {stats.pending_reviews > 0 && (
                            <Link
                                href={route('admin.reviews.index')}
                                className="lmc-btn lmc-btn-primary h-[36px] py-0 px-3.5 text-xs font-semibold rounded-xl inline-flex items-center justify-center shadow-2xs"
                            >
                                Moderate Reviews
                            </Link>
                        )}
                        {stats.unread_contacts > 0 && (
                            <Link
                                href={route('admin.contacts.index')}
                                className="lmc-btn lmc-btn-navy h-[36px] py-0 px-3.5 text-xs font-semibold rounded-xl inline-flex items-center justify-center shadow-2xs"
                            >
                                View Messages
                            </Link>
                        )}
                    </div>
                </div>
            )}

            {/* KPI Metric Cards Grid - Matching Customer Page Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Card 1 */}
                <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                    <div>
                        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                            CRM Leads
                        </div>
                        <div className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30] mt-1">
                            {stats.crm_leads}
                        </div>
                        <div className="text-[10px] text-gray-500 mt-1 flex items-center gap-1 font-medium">
                            <span>{stats.customers} Active Corporate Clients</span>
                        </div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-[#0B1C30]/5 text-[#DA7A31] flex items-center justify-center">
                        <Briefcase className="w-6 h-6" />
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                    <div>
                        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                            Active Internships
                        </div>
                        <div className="text-2xl sm:text-3xl font-extrabold text-[#DA7A31] mt-1">
                            {stats.active_internships}
                        </div>
                        <div className="text-[10px] text-gray-500 mt-1 font-medium">
                            <span>{stats.completed_internships} Certified Alumni</span>
                        </div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-[#DA7A31]/10 text-[#DA7A31] flex items-center justify-center">
                        <GraduationCap className="w-6 h-6" />
                    </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                    <div>
                        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                            Verified Reviews
                        </div>
                        <div className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30] mt-1">
                            {stats.approved_reviews}
                        </div>
                        <div className="text-[10px] text-[#DA7A31] font-semibold mt-1">
                            <span>{stats.pending_reviews} in Pending Queue</span>
                        </div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-[#0B1C30]/5 text-[#DA7A31] flex items-center justify-center">
                        <Star className="w-6 h-6" />
                    </div>
                </div>

                {/* Card 4 */}
                <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                    <div>
                        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                            System Users
                        </div>
                        <div className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30] mt-1">
                            {stats.total_users}
                        </div>
                        <div className="text-[10px] text-gray-500 mt-1 font-medium">
                            <span>{stats.open_tasks} Tasks in Progress</span>
                        </div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-[#0B1C30]/5 text-[#0B1C30] flex items-center justify-center">
                        <Users className="w-6 h-6" />
                    </div>
                </div>
            </div>

            {/* Visual Analytics Charts Section (Recharts) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Growth Trends Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200/80 shadow-2xs">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-sm font-bold text-[#0B1C30]">
                                Performance Trajectory & Lead Volume
                            </h2>
                            <p className="text-[11px] text-gray-500">Monthly new pipeline volume vs. talent intake</p>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 uppercase">
                            Live Metrics
                        </span>
                    </div>

                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={performanceTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#DA7A31" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#DA7A31" stopOpacity={0.0} />
                                    </linearGradient>
                                    <linearGradient id="colorInterns" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0B1C30" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#0B1C30" stopOpacity={0.0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#4D4B55' }} />
                                <YAxis tick={{ fontSize: 11, fill: '#4D4B55' }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#0B1C30',
                                        color: '#fff',
                                        borderRadius: '8px',
                                        fontSize: '11px',
                                        border: 'none',
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="leads"
                                    name="Leads"
                                    stroke="#DA7A31"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorLeads)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="interns"
                                    name="Talent Cohort"
                                    stroke="#0B1C30"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorInterns)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Interns by Department Breakdown */}
                <div className="bg-white p-6 rounded-xl border border-gray-200/80 shadow-2xs flex flex-col justify-between">
                    <div>
                        <h2 className="text-sm font-bold text-[#0B1C30] mb-1">
                            Talent Department Allocation
                        </h2>
                        <p className="text-[11px] text-gray-500 mb-4">Engineers active across specialized units</p>

                        <div className="h-44 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={internsByDepartment}
                                        dataKey="count"
                                        nameKey="department"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={65}
                                        innerRadius={40}
                                        paddingAngle={4}
                                    >
                                        {internsByDepartment.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#0B1C30',
                                            color: '#fff',
                                            borderRadius: '8px',
                                            fontSize: '11px',
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="space-y-1.5 pt-3 border-t border-gray-100">
                        {internsByDepartment.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs">
                                <span className="flex items-center gap-1.5 text-gray-600 truncate max-w-[180px] font-medium">
                                    <span
                                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                        style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                                    />
                                    <span className="truncate">{item.department}</span>
                                </span>
                                <span className="font-bold text-[#0B1C30]">{item.count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Action Tables & Feeds */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent CRM Leads Table */}
                <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs overflow-hidden">
                    <div className="p-4 bg-slate-50 border-b border-gray-200/80 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-[#DA7A31]" />
                            <h3 className="text-xs font-bold text-[#0B1C30] uppercase tracking-wider">
                                Recent CRM Opportunities
                            </h3>
                        </div>
                        <Link
                            href={route('admin.crm.leads')}
                            className="text-xs font-semibold text-[#DA7A31] hover:underline inline-flex items-center gap-1"
                        >
                            <span>View All</span>
                            <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {recentLeads.length === 0 ? (
                            <div className="p-6 text-center text-xs text-gray-500 font-medium">No leads recorded.</div>
                        ) : (
                            recentLeads.map((lead) => (
                                <div key={lead.id} className="p-3.5 hover:bg-slate-50/80 transition flex items-center justify-between text-xs">
                                    <div>
                                        <div className="font-bold text-[#0B1C30]">{lead.name}</div>
                                        <div className="text-[11px] text-gray-500 font-medium">{lead.company || 'Direct'}</div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold text-gray-800">
                                            {lead.estimated_value ? `$${Number(lead.estimated_value).toLocaleString()}` : '-'}
                                        </span>
                                        <span
                                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                                                lead.status === 'Won'
                                                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                                    : lead.status === 'Proposal'
                                                    ? 'bg-blue-100 text-blue-900 border-blue-300'
                                                    : 'bg-amber-100 text-amber-900 border-amber-300'
                                            }`}
                                        >
                                            {lead.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Pending Reviews Moderation Queue */}
                <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs overflow-hidden">
                    <div className="p-4 bg-slate-50 border-b border-gray-200/80 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-[#DA7A31]" />
                            <h3 className="text-xs font-bold text-[#0B1C30] uppercase tracking-wider">
                                Reviews Awaiting Approval ({pendingReviews.length})
                            </h3>
                        </div>
                        <Link
                            href={route('admin.reviews.index')}
                            className="text-xs font-semibold text-[#DA7A31] hover:underline inline-flex items-center gap-1"
                        >
                            <span>Moderation Desk</span>
                            <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {pendingReviews.length === 0 ? (
                            <div className="p-8 text-center text-xs text-gray-500 flex flex-col items-center">
                                <CheckCircle2 className="w-6 h-6 text-emerald-500 mb-1" />
                                <span className="font-medium">No pending reviews. Moderation queue is clean.</span>
                            </div>
                        ) : (
                            pendingReviews.map((rev) => (
                                <div key={rev.id} className="p-3.5 hover:bg-slate-50/80 transition flex items-start justify-between gap-3 text-xs">
                                    <div>
                                        <div className="font-bold text-[#0B1C30]">
                                            {rev.name} ({rev.company})
                                        </div>
                                        <div className="text-[11px] text-gray-500 italic line-clamp-1 mt-0.5 font-medium">
                                            "{rev.review}"
                                        </div>
                                    </div>
                                    <Link
                                        href={route('admin.reviews.index')}
                                        className="lmc-btn lmc-btn-primary h-[32px] py-0 px-3 text-[11px] font-semibold rounded-lg shrink-0 shadow-2xs inline-flex items-center justify-center"
                                    >
                                        Inspect
                                    </Link>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
