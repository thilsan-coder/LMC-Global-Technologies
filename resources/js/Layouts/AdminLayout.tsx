import React, { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import LmcBrandLogo from '@/Components/LmcBrandLogo';
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
    ChevronDown,
    CalendarCheck,
    Building2,
    MessageSquare,
    TrendingUp,
} from 'lucide-react';

interface AdminLayoutProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
}

interface NavGroupItem {
    name: string;
    href: string;
    icon: React.ElementType;
    active: boolean;
    show: boolean;
}

interface NavGroup {
    id: string;
    label: string;
    icon: React.ElementType;
    show: boolean;
    items: NavGroupItem[];
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

    const overviewItems: NavGroupItem[] = [
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
    ];

    const navigationGroups: NavGroup[] = [
        {
            id: 'crm',
            label: 'Enterprise CRM',
            icon: Briefcase,
            show: true,
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
                    icon: TrendingUp,
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
            id: 'talent',
            label: 'Talent',
            icon: UserCheck,
            show: true,
            items: [
                {
                    name: 'Staff Roster & Users',
                    href: route('admin.users.index'),
                    icon: Users,
                    active: route().current('admin.users.*'),
                    show: isAdmin,
                },
                {
                    name: 'Staff Workspace',
                    href: route('staff.dashboard'),
                    icon: Building2,
                    active: route().current('staff.dashboard'),
                    show: isStaff || isAdmin,
                },
            ],
        },
        {
            id: 'internship',
            label: 'Internship',
            icon: GraduationCap,
            show: true,
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
            id: 'contact',
            label: 'Contact',
            icon: Mail,
            show: true,
            items: [
                {
                    name: 'Contact Inquiries',
                    href: route('admin.contacts.index'),
                    icon: MessageSquare,
                    active: route().current('admin.contacts.*'),
                    show: true,
                },
            ],
        },
        {
            id: 'moderation',
            label: 'Moderation System',
            icon: Star,
            show: true,
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
            ],
        },
        {
            id: 'governance',
            label: 'Governance',
            icon: Shield,
            show: isAdmin,
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

    // Initialize open sections based on which group contains the current active route
    const getInitialOpenSections = () => {
        const initial: Record<string, boolean> = {};
        navigationGroups.forEach((group) => {
            const hasActiveChild = group.items.some((item) => item.show && item.active);
            if (hasActiveChild) {
                initial[group.id] = true;
            }
        });
        return initial;
    };

    const [openSections, setOpenSections] = useState<Record<string, boolean>>(getInitialOpenSections);

    // Expand section automatically when route changes to an item inside it
    useEffect(() => {
        navigationGroups.forEach((group) => {
            const hasActiveChild = group.items.some((item) => item.show && item.active);
            if (hasActiveChild) {
                setOpenSections((prev) => ({ ...prev, [group.id]: true }));
            }
        });
    }, [route().current()]);

    const toggleSection = (groupId: string) => {
        setOpenSections((prev) => ({
            ...prev,
            [groupId]: !prev[groupId],
        }));
    };

    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <div className="h-screen w-screen overflow-hidden bg-[#F0F0F1] flex">
            <Toaster position="top-right" richColors />

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar Navigation - INDEPENDENT FIXED SIDEBAR */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 h-full bg-[#0B1C30] text-white flex flex-col transition-transform duration-200 ease-in-out flex-shrink-0 border-r border-white/10 lg:static lg:translate-x-0 ${
                    sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
                }`}
            >
                {/* Brand Header */}
                <div className="p-4 border-b border-white/10 flex items-center justify-between flex-shrink-0 bg-[#071220]">
                    <LmcBrandLogo variant="light" size="sm" href={route('dashboard')} />
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-1 text-gray-400 hover:text-white rounded"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Role indicator badge */}
                <div className="px-4 py-2 bg-[#071220]/80 border-b border-white/5 flex items-center justify-between text-xs flex-shrink-0">
                    <span className="text-gray-400 text-[11px]">Authenticated Portal:</span>
                    <span className="bg-[#DA7A31]/20 text-[#DA7A31] border border-[#DA7A31]/40 px-2 py-0.5 rounded font-semibold text-[10px] uppercase tracking-wider">
                        {userRoles[0] || 'User'}
                    </span>
                </div>

                {/* Navigation Links Scrollable Area - INDEPENDENT SCROLLBAR */}
                <div className="flex-1 overflow-y-auto py-3 px-3 space-y-3">
                    {/* Overview Items */}
                    <div>
                        <div className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                            Overview
                        </div>
                        <div className="space-y-1">
                            {overviewItems.filter((item) => item.show).map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                                            item.active
                                                ? 'bg-[#DA7A31] text-white font-semibold shadow-xs'
                                                : 'text-gray-300 hover:bg-[#162A45] hover:text-white'
                                        }`}
                                    >
                                        <Icon className="w-4 h-4 flex-shrink-0" />
                                        <span className="truncate">{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Collapsible Accordion Navigation Groups */}
                    <div className="space-y-1.5">
                        <div className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                            Management Modules
                        </div>

                        {navigationGroups.map((group) => {
                            const visibleItems = group.items.filter((item) => item.show);
                            if (!group.show || visibleItems.length === 0) return null;

                            const isOpen = !!openSections[group.id];
                            const hasActiveChild = visibleItems.some((item) => item.active);
                            const GroupIcon = group.icon;

                            return (
                                <div key={group.id} className="rounded-lg overflow-hidden">
                                    {/* Collapsible Group Header Button */}
                                    <button
                                        type="button"
                                        onClick={() => toggleSection(group.id)}
                                        className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-md transition-all ${
                                            hasActiveChild
                                                ? 'bg-[#162A45] text-white border-l-4 border-[#DA7A31]'
                                                : 'text-gray-300 hover:bg-[#162A45]/70 hover:text-white'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2.5 min-w-0">
                                            <GroupIcon className={`w-4 h-4 flex-shrink-0 ${hasActiveChild ? 'text-[#DA7A31]' : 'text-gray-400'}`} />
                                            <span className="truncate">{group.label}</span>
                                            {hasActiveChild && (
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#DA7A31] flex-shrink-0" />
                                            )}
                                        </div>
                                        <ChevronDown
                                            className={`w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                                                isOpen ? 'transform rotate-180 text-white' : ''
                                            }`}
                                        />
                                    </button>

                                    {/* Submenu Items Dropdown */}
                                    {isOpen && (
                                        <div className="mt-1 ml-3 pl-2.5 border-l border-white/10 space-y-1 py-1 transition-all">
                                            {visibleItems.map((item) => {
                                                const ItemIcon = item.icon;
                                                return (
                                                    <Link
                                                        key={item.name}
                                                        href={item.href}
                                                        onClick={() => setSidebarOpen(false)}
                                                        className={`flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                                                            item.active
                                                                ? 'bg-[#DA7A31] text-white font-semibold shadow-xs'
                                                                : 'text-gray-300 hover:bg-[#162A45] hover:text-white'
                                                        }`}
                                                    >
                                                        <ItemIcon className="w-3.5 h-3.5 flex-shrink-0 opacity-80" />
                                                        <span className="truncate">{item.name}</span>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Compact User Footer & Logout */}
                <div className="p-3 border-t border-white/10 bg-[#071220] flex-shrink-0 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-full bg-[#162A45] border border-white/10 flex items-center justify-center text-xs font-bold text-[#DA7A31] shrink-0">
                            {auth.user?.name.charAt(0) || 'U'}
                        </div>
                        <div className="min-w-0">
                            <div className="text-xs font-semibold text-white truncate leading-tight">
                                {auth.user?.name}
                            </div>
                            <div className="text-[10px] text-gray-400 truncate leading-tight">
                                {auth.user?.email}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                        <Link
                            href={route('public.home')}
                            target="_blank"
                            className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition"
                            title="View Public Website"
                        >
                            <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-md transition"
                            title="Sign Out"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Pane - INDEPENDENT SCROLL */}
            <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
                {/* Admin Topbar */}
                <header className="flex-shrink-0 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between shadow-xs z-30">
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
                            <span className="px-2 py-0.5 rounded bg-slate-100 text-[#0B1C30] text-[11px] font-bold border border-slate-200 hidden md:inline-block uppercase tracking-wider">
                                {userRoles[0] || 'Admin'}
                            </span>
                        </div>
                    </div>
                </header>

                {/* Main Body - INDEPENDENT MAIN SCROLLBAR */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">{children}</div>
                </main>
            </div>
        </div>
    );
}

