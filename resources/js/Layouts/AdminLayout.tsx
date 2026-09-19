import React, { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import LmcBrandLogo from '@/components/LmcBrandLogo';
import { Toaster, toast } from 'sonner';
import {
    LayoutDashboard,
    Users,
    UserCheck,
    Briefcase,
    CheckSquare,
    GraduationCap,
    Clock,
    Star,
    Layers,
    Server,
    Mail,
    Shield,
    LogOut,
    Menu,
    X,
    ExternalLink,
    ChevronRight,
    User,
    CalendarCheck,
} from 'lucide-react';

interface AdminLayoutProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
}

export default function AdminLayout({ children, title, subtitle }: AdminLayoutProps) {
    const { auth, flash } = usePage<PageProps>().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const userRoles = auth.user?.roles || [];
    const isAdmin = userRoles.includes('Admin');
    const isStaff = userRoles.includes('Staff');

    const navigationGroups = [
        {
            label: 'Executive Overview',
            items: [
                {
                    name: 'Admin Dashboard',
                    href: route('admin.dashboard'),
                    icon: LayoutDashboard,
                    active: route().current('admin.dashboard'),
                    show: isAdmin,
                },
                {
                    name: 'Staff Workspace',
                    href: route('staff.dashboard'),
                    icon: LayoutDashboard,
                    active: route().current('staff.dashboard'),
                    show: isStaff && !isAdmin,
                },
            ],
        },
        {
            label: 'Enterprise CRM',
            items: [
                {
                    name: 'Customers',
                    href: route('admin.crm.customers'),
                    icon: Users,
                    active: route().current('admin.crm.customers'),
                    show: true,
                },
                {
                    name: 'Sales Leads',
                    href: route('admin.crm.leads'),
                    icon: Briefcase,
                    active: route().current('admin.crm.leads'),
                    show: true,
                },
                {
                    name: 'Follow-ups',
                    href: route('admin.crm.followups'),
                    icon: CalendarCheck,
                    active: route().current('admin.crm.followups'),
                    show: true,
                },
                {
                    name: 'Operational Tasks',
                    href: route('admin.crm.tasks'),
                    icon: CheckSquare,
                    active: route().current('admin.crm.tasks'),
                    show: true,
                },
            ],
        },
        {
            label: 'Talent & Internships',
            items: [
                {
                    name: 'Internship Records',
                    href: route('admin.internships.index'),
                    icon: GraduationCap,
                    active: route().current('admin.internships.*') && !route().current('admin.attendance.*'),
                    show: true,
                },
                {
                    name: 'Attendance Log',
                    href: route('admin.attendance.index'),
                    icon: Clock,
                    active: route().current('admin.attendance.*'),
                    show: true,
                },
            ],
        },
        {
            label: 'Content & Moderation',
            items: [
                {
                    name: 'Review Moderation',
                    href: route('admin.reviews.index'),
                    icon: Star,
                    active: route().current('admin.reviews.*'),
                    show: isAdmin,
                },
                {
                    name: 'Corporate Services',
                    href: route('admin.services.index'),
                    icon: Server,
                    active: route().current('admin.services.*'),
                    show: true,
                },
                {
                    name: 'Platform Products',
                    href: route('admin.products.index'),
                    icon: Layers,
                    active: route().current('admin.products.*'),
                    show: true,
                },
                {
                    name: 'Contact Inquiries',
                    href: route('admin.contacts.index'),
                    icon: Mail,
                    active: route().current('admin.contacts.*'),
                    show: true,
                },
            ],
        },
        {
            label: 'System Governance',
            items: [
                {
                    name: 'Users & Permissions',
                    href: route('admin.users.index'),
                    icon: Shield,
                    active: route().current('admin.users.*'),
                    show: isAdmin,
                },
            ],
        },
    ];

    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <div className="min-h-screen bg-[#F0F0F1] flex">
            <Toaster position="top-right" richColors />

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar Navigation */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0B1C30] text-white flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
                    sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
                }`}
            >
                {/* Brand Header */}
                <div className="p-5 border-b border-white/10 flex items-center justify-between">
                    <LmcBrandLogo variant="light" size="sm" href={route('dashboard')} />
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-1 text-gray-400 hover:text-white rounded"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Role indicator badge */}
                <div className="px-5 py-3 bg-[#071220] border-b border-white/5 flex items-center justify-between text-xs">
                    <span className="text-gray-400">Authenticated Portal:</span>
                    <span className="bg-[#DA7A31]/20 text-[#DA7A31] border border-[#DA7A31]/40 px-2 py-0.5 rounded font-semibold text-[11px] uppercase tracking-wider">
                        {userRoles[0] || 'User'}
                    </span>
                </div>

                {/* Navigation Links Scrollable */}
                <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
                    {navigationGroups.map((group) => {
                        const visibleItems = group.items.filter((item) => item.show);
                        if (visibleItems.length === 0) return null;

                        return (
                            <div key={group.label}>
                                <div className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                                    {group.label}
                                </div>
                                <div className="space-y-1">
                                    {visibleItems.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                onClick={() => setSidebarOpen(false)}
                                                className={`flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                                                    item.active
                                                        ? 'bg-[#DA7A31] text-white font-semibold shadow-sm'
                                                        : 'text-gray-300 hover:bg-[#162A45] hover:text-white'
                                                }`}
                                            >
                                                <Icon className="w-4 h-4 flex-shrink-0" />
                                                <span>{item.name}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* User footer & Logout */}
                <div className="p-4 border-t border-white/10 bg-[#071220]">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-[#162A45] border border-white/10 flex items-center justify-center text-xs font-bold text-[#DA7A31]">
                            {auth.user?.name.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-xs font-semibold text-white truncate">
                                {auth.user?.name}
                            </div>
                            <div className="text-[10px] text-gray-400 truncate">
                                {auth.user?.email}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Link
                            href={route('public.home')}
                            target="_blank"
                            className="flex-1 text-center text-[11px] bg-white/5 hover:bg-white/10 text-gray-300 py-1.5 rounded transition flex items-center justify-center gap-1"
                        >
                            <span>Live Site</span>
                            <ExternalLink className="w-3 h-3" />
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="flex-1 text-center text-[11px] bg-red-950/40 hover:bg-red-900/50 text-red-300 border border-red-800/30 py-1.5 rounded transition flex items-center justify-center gap-1"
                        >
                            <LogOut className="w-3 h-3" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Pane */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Admin Topbar */}
                <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between shadow-xs sticky top-0 z-30">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                            aria-label="Open sidebar"
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        <div>
                            {title && (
                                <h1 className="text-lg font-bold text-[#0B1C30] tracking-tight flex items-center gap-2">
                                    <span>{title}</span>
                                    {subtitle && (
                                        <span className="text-xs font-normal text-gray-500 hidden sm:inline">
                                            &bull; {subtitle}
                                        </span>
                                    )}
                                </h1>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href={route('public.home')}
                            target="_blank"
                            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#0B1C30] hover:text-[#DA7A31] font-medium transition"
                        >
                            <span>Public Website</span>
                            <ExternalLink className="w-3.5 h-3.5 text-[#DA7A31]" />
                        </Link>

                        <div className="h-4 w-px bg-gray-200 hidden sm:block" />

                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-[#0B1C30] text-white flex items-center justify-center text-xs font-bold">
                                {auth.user?.name.charAt(0)}
                            </div>
                            <span className="text-xs font-semibold text-[#0B1C30] hidden md:inline">
                                {auth.user?.name}
                            </span>
                        </div>
                    </div>
                </header>

                {/* Main Body */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">{children}</div>
                </main>
            </div>
        </div>
    );
}
