import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    Briefcase,
    CheckSquare,
    CalendarCheck,
    Users,
    ArrowRight,
    CheckCircle2,
    Calendar,
} from 'lucide-react';

interface StaffDashboardProps {
    stats: {
        my_leads: number;
        my_tasks: number;
        pending_follow_ups: number;
        total_customers: number;
    };
    myLeads: any[];
    myTasks: any[];
    upcomingFollowUps: any[];
}

export default function StaffDashboard({
    stats,
    myLeads,
    myTasks,
    upcomingFollowUps,
}: StaffDashboardProps) {
    return (
        <AdminLayout title="Staff Operational Workspace" subtitle="Assigned CRM Deals & Sprints">
            <Head title="Staff Dashboard - LMC Portal" />

            {/* KPI Cards - Matching Customer Page Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                    <div>
                        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                            My Assigned Leads
                        </div>
                        <div className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30] mt-1">
                            {stats.my_leads}
                        </div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-[#0B1C30]/5 text-[#DA7A31] flex items-center justify-center">
                        <Briefcase className="w-6 h-6" />
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                    <div>
                        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                            Pending Tasks
                        </div>
                        <div className="text-2xl sm:text-3xl font-extrabold text-[#DA7A31] mt-1">
                            {stats.my_tasks}
                        </div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-[#DA7A31]/10 text-[#DA7A31] flex items-center justify-center">
                        <CheckSquare className="w-6 h-6" />
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                    <div>
                        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                            Upcoming Follow-ups
                        </div>
                        <div className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30] mt-1">
                            {stats.pending_follow_ups}
                        </div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-[#0B1C30]/5 text-[#0B1C30] flex items-center justify-center">
                        <CalendarCheck className="w-6 h-6" />
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                    <div>
                        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                            Total Accounts
                        </div>
                        <div className="text-2xl sm:text-3xl font-extrabold text-[#0B1C30] mt-1">
                            {stats.total_customers}
                        </div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                        <Users className="w-6 h-6" />
                    </div>
                </div>
            </div>

            {/* Content Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* My Assigned Tasks */}
                <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs overflow-hidden">
                    <div className="p-4 bg-slate-50 border-b border-gray-200/80 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <CheckSquare className="w-4 h-4 text-[#DA7A31]" />
                            <h3 className="text-xs font-bold text-[#0B1C30] uppercase tracking-wider">
                                My Active Tasks
                            </h3>
                        </div>
                        <Link
                            href={route('admin.crm.tasks')}
                            className="text-xs font-semibold text-[#DA7A31] hover:underline inline-flex items-center gap-1"
                        >
                            <span>Task Board</span>
                            <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {myTasks.length === 0 ? (
                            <div className="p-8 text-center text-xs text-gray-500 font-medium">
                                No active tasks assigned to you.
                            </div>
                        ) : (
                            myTasks.map((task) => (
                                <div key={task.id} className="p-3.5 hover:bg-slate-50/80 transition flex items-center justify-between text-xs">
                                    <div>
                                        <div className="font-bold text-[#0B1C30]">{task.title}</div>
                                        <div className="text-[11px] text-gray-400 font-medium">
                                            Due: {task.due_date || 'Ongoing'}
                                        </div>
                                    </div>
                                    <span
                                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                                            task.priority === 'Urgent'
                                                ? 'bg-red-100 text-red-900 border-red-300'
                                                : task.priority === 'High'
                                                ? 'bg-amber-100 text-amber-900 border-amber-300'
                                                : 'bg-blue-100 text-blue-900 border-blue-300'
                                        }`}
                                    >
                                        {task.priority}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* My Leads */}
                <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs overflow-hidden">
                    <div className="p-4 bg-slate-50 border-b border-gray-200/80 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-[#DA7A31]" />
                            <h3 className="text-xs font-bold text-[#0B1C30] uppercase tracking-wider">
                                My Pipeline Leads
                            </h3>
                        </div>
                        <Link
                            href={route('admin.crm.leads')}
                            className="text-xs font-semibold text-[#DA7A31] hover:underline inline-flex items-center gap-1"
                        >
                            <span>View Pipeline</span>
                            <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {myLeads.length === 0 ? (
                            <div className="p-8 text-center text-xs text-gray-500 font-medium">
                                No leads currently assigned.
                            </div>
                        ) : (
                            myLeads.map((lead) => (
                                <div key={lead.id} className="p-3.5 hover:bg-slate-50/80 transition flex items-center justify-between text-xs">
                                    <div>
                                        <div className="font-bold text-[#0B1C30]">{lead.name}</div>
                                        <div className="text-[11px] text-gray-500 font-medium">{lead.company}</div>
                                    </div>
                                    <span
                                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                                            lead.status === 'Won'
                                                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                                : 'bg-blue-100 text-blue-900 border-blue-300'
                                        }`}
                                    >
                                        {lead.status}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
