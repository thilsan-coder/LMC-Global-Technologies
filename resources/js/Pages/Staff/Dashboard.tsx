import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
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

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs flex items-center justify-between">
                    <div>
                        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                            My Assigned Leads
                        </div>
                        <div className="text-2xl font-extrabold text-[#0B1C30] mt-1">
                            {stats.my_leads}
                        </div>
                    </div>
                    <div className="w-10 h-10 rounded-md bg-[#0B1C30]/5 text-[#DA7A31] flex items-center justify-center">
                        <Briefcase className="w-5 h-5" />
                    </div>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs flex items-center justify-between">
                    <div>
                        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                            Pending Tasks
                        </div>
                        <div className="text-2xl font-extrabold text-[#DA7A31] mt-1">
                            {stats.my_tasks}
                        </div>
                    </div>
                    <div className="w-10 h-10 rounded-md bg-[#DA7A31]/10 text-[#DA7A31] flex items-center justify-center">
                        <CheckSquare className="w-5 h-5" />
                    </div>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs flex items-center justify-between">
                    <div>
                        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                            Upcoming Follow-ups
                        </div>
                        <div className="text-2xl font-extrabold text-[#0B1C30] mt-1">
                            {stats.pending_follow_ups}
                        </div>
                    </div>
                    <div className="w-10 h-10 rounded-md bg-[#0B1C30]/5 text-[#0B1C30] flex items-center justify-center">
                        <CalendarCheck className="w-5 h-5" />
                    </div>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs flex items-center justify-between">
                    <div>
                        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                            Total Accounts
                        </div>
                        <div className="text-2xl font-extrabold text-[#0B1C30] mt-1">
                            {stats.total_customers}
                        </div>
                    </div>
                    <div className="w-10 h-10 rounded-md bg-gray-100 text-gray-700 flex items-center justify-center">
                        <Users className="w-5 h-5" />
                    </div>
                </div>
            </div>

            {/* Content Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* My Assigned Tasks */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                        <h3 className="text-xs font-bold text-[#0B1C30] uppercase tracking-wider">
                            My Active Tasks
                        </h3>
                        <Link
                            href={route('admin.crm.tasks')}
                            className="text-xs font-semibold text-[#DA7A31] hover:underline"
                        >
                            Task Board &rarr;
                        </Link>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {myTasks.length === 0 ? (
                            <div className="p-6 text-center text-xs text-gray-500">
                                No active tasks assigned to you.
                            </div>
                        ) : (
                            myTasks.map((task) => (
                                <div key={task.id} className="p-3.5 hover:bg-gray-50 flex items-center justify-between text-xs">
                                    <div>
                                        <div className="font-bold text-[#0B1C30]">{task.title}</div>
                                        <div className="text-[11px] text-gray-400">
                                            Due: {task.due_date || 'Ongoing'}
                                        </div>
                                    </div>
                                    <span
                                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                            task.priority === 'Urgent'
                                                ? 'bg-red-100 text-red-800'
                                                : task.priority === 'High'
                                                ? 'bg-amber-100 text-amber-800'
                                                : 'bg-blue-100 text-blue-800'
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
                <div className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                        <h3 className="text-xs font-bold text-[#0B1C30] uppercase tracking-wider">
                            My Pipeline Leads
                        </h3>
                        <Link
                            href={route('admin.crm.leads')}
                            className="text-xs font-semibold text-[#DA7A31] hover:underline"
                        >
                            View Pipeline &rarr;
                        </Link>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {myLeads.length === 0 ? (
                            <div className="p-6 text-center text-xs text-gray-500">
                                No leads currently assigned.
                            </div>
                        ) : (
                            myLeads.map((lead) => (
                                <div key={lead.id} className="p-3.5 hover:bg-gray-50 flex items-center justify-between text-xs">
                                    <div>
                                        <div className="font-bold text-[#0B1C30]">{lead.name}</div>
                                        <div className="text-[11px] text-gray-500">{lead.company}</div>
                                    </div>
                                    <span
                                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                            lead.status === 'Won'
                                                ? 'bg-emerald-100 text-emerald-800'
                                                : 'bg-blue-100 text-blue-800'
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
