import React, { useState, useEffect, useRef } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { TaskItem, User } from '@/types';
import CustomDropdown, { CustomDropdownOption } from '@/Components/CustomDropdown';
import {
    CheckSquare,
    Plus,
    Calendar,
    UserCheck,
    AlertCircle,
    X,
    Trash2,
    Edit2,
    Filter,
    Layers,
    Search,
    Clock,
    CheckCircle2,
    MoreVertical,
    Eye,
    Tag,
    FileText,
    Activity,
} from 'lucide-react';

interface TasksProps {
    tasks: {
        data: TaskItem[];
        links: any[];
        total: number;
        from?: number;
        to?: number;
    };
    staffUsers: User[];
    filters: {
        search?: string;
        status?: string;
        priority?: string;
    };
}

export default function Tasks({ tasks, staffUsers, filters }: TasksProps) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [priorityFilter, setPriorityFilter] = useState(filters.priority || '');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<TaskItem | null>(null);
    const [viewingTask, setViewingTask] = useState<TaskItem | null>(null);
    const [deletingTask, setDeletingTask] = useState<TaskItem | null>(null);

    // Active row action dropdown state
    const [openActionId, setOpenActionId] = useState<number | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close action menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenActionId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const { data, setData, post, put, processing, reset, errors, clearErrors } = useForm({
        title: '',
        description: '',
        assigned_to: '' as string | number,
        due_date: '',
        priority: 'Medium' as TaskItem['priority'],
        status: 'Pending' as TaskItem['status'],
    });

    const statusFilterOptions: CustomDropdownOption[] = [
        { value: '', label: 'All Task Statuses' },
        { value: 'Pending', label: 'Pending' },
        { value: 'In Progress', label: 'In Progress' },
        { value: 'Completed', label: 'Completed' },
    ];

    const priorityFilterOptions: CustomDropdownOption[] = [
        { value: '', label: 'All Priorities' },
        { value: 'Urgent', label: 'Urgent Priority' },
        { value: 'High', label: 'High Priority' },
        { value: 'Medium', label: 'Medium Priority' },
        { value: 'Low', label: 'Low Priority' },
    ];

    const staffOptions: CustomDropdownOption[] = [
        { value: '', label: '-- Unassigned --' },
        ...staffUsers.map((u) => ({
            value: String(u.id),
            label: `${u.name} (${u.email})`,
        })),
    ];

    const modalPriorityOptions: CustomDropdownOption[] = [
        { value: 'Low', label: 'Low Priority' },
        { value: 'Medium', label: 'Medium Priority' },
        { value: 'High', label: 'High Priority' },
        { value: 'Urgent', label: 'Urgent Priority' },
    ];

    const modalStatusOptions: CustomDropdownOption[] = [
        { value: 'Pending', label: 'Pending' },
        { value: 'In Progress', label: 'In Progress' },
        { value: 'Completed', label: 'Completed' },
    ];

    // Dynamic metrics calculation
    const totalTasks = tasks.total || 0;
    const urgentHighCount = tasks.data.filter((t) => ['Urgent', 'High'].includes(t.priority)).length;
    const inProgressCount = tasks.data.filter((t) => t.status === 'In Progress').length;
    const completedCount = tasks.data.filter((t) => t.status === 'Completed').length;

    const handleSearch = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        router.get(
            route('admin.crm.tasks'),
            { search: searchTerm, status: statusFilter, priority: priorityFilter },
            { preserveState: true }
        );
    };

    const openCreate = () => {
        setEditingTask(null);
        clearErrors();
        reset();
        setData({
            title: '',
            description: '',
            assigned_to: '',
            due_date: '',
            priority: 'Medium',
            status: 'Pending',
        });
        setModalOpen(true);
    };

    const openEdit = (task: TaskItem) => {
        setEditingTask(task);
        clearErrors();
        setData({
            title: task.title,
            description: task.description || '',
            assigned_to: task.assigned_to ? String(task.assigned_to) : '',
            due_date: task.due_date || '',
            priority: task.priority,
            status: task.status,
        });
        setModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingTask) {
            put(route('admin.crm.tasks.update', editingTask.id), {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        } else {
            post(route('admin.crm.tasks.store'), {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        }
    };

    const confirmDelete = () => {
        if (deletingTask) {
            router.delete(route('admin.crm.tasks.destroy', deletingTask.id), {
                onSuccess: () => setDeletingTask(null),
            });
        }
    };

    const toggleStatus = (task: TaskItem) => {
        const nextStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
        router.put(route('admin.crm.tasks.update', task.id), {
            title: task.title,
            description: task.description,
            assigned_to: task.assigned_to,
            due_date: task.due_date,
            priority: task.priority,
            status: nextStatus,
        });
    };

    const priorityBadge = (priority: TaskItem['priority']) => {
        switch (priority) {
            case 'Urgent':
                return 'bg-red-100 text-red-900 border-red-300';
            case 'High':
                return 'bg-amber-100 text-amber-900 border-amber-300';
            case 'Medium':
                return 'bg-blue-100 text-blue-900 border-blue-300';
            case 'Low':
            default:
                return 'bg-slate-100 text-slate-800 border-slate-300';
        }
    };

    return (
        <AdminLayout title="Operational Tasks" subtitle="Team Sprint Workload & Dispatch">
            <Head title="Operational Tasks - CRM" />

            <div className="space-y-6">
                {/* 1. EXECUTIVE METRICS SUMMARY */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Total Tasks
                            </div>
                            <div className="text-2xl font-bold text-[#0B1C30] mt-1">{totalTasks}</div>
                            <div className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
                                <CheckSquare className="w-3.5 h-3.5 text-[#DA7A31]" />
                                <span>Sprint Backlog</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-[#0B1C30]/5 border border-[#0B1C30]/10 flex items-center justify-center text-[#0B1C30]">
                            <CheckSquare className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                High & Urgent Priority
                            </div>
                            <div className="text-2xl font-bold text-amber-600 mt-1">{urgentHighCount}</div>
                            <div className="text-[11px] text-amber-700/80 mt-1 flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                                <span>Immediate Attention</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                            <AlertCircle className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                In Progress
                            </div>
                            <div className="text-2xl font-bold text-blue-600 mt-1">{inProgressCount}</div>
                            <div className="text-[11px] text-blue-700/80 mt-1 flex items-center gap-1">
                                <Activity className="w-3.5 h-3.5 text-blue-500" />
                                <span>Active Execution</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                            <Activity className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Completed Tasks
                            </div>
                            <div className="text-2xl font-bold text-emerald-600 mt-1">{completedCount}</div>
                            <div className="text-[11px] text-emerald-700/80 mt-1 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                <span>Resolved & Verified</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {/* 2. FILTER TOOLBAR & CREATE BUTTON */}
                <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-2xs">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                        <form onSubmit={handleSearch} className="flex flex-1 flex-col sm:flex-row items-center gap-3 w-full">
                            {/* Search Bar */}
                            <div className="relative flex-1 w-full">
                                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search by task title, description, or staff..."
                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                />
                            </div>

                            {/* Status Filter Dropdown */}
                            <CustomDropdown
                                value={statusFilter}
                                onChange={(val) => {
                                    setStatusFilter(val);
                                    router.get(
                                        route('admin.crm.tasks'),
                                        { search: searchTerm, status: val, priority: priorityFilter },
                                        { preserveState: true }
                                    );
                                }}
                                options={statusFilterOptions}
                                variant="navy"
                            />

                            {/* Priority Filter Dropdown */}
                            <CustomDropdown
                                value={priorityFilter}
                                onChange={(val) => {
                                    setPriorityFilter(val);
                                    router.get(
                                        route('admin.crm.tasks'),
                                        { search: searchTerm, status: statusFilter, priority: val },
                                        { preserveState: true }
                                    );
                                }}
                                options={priorityFilterOptions}
                                variant="navy"
                            />

                            <button
                                type="submit"
                                className="lmc-btn lmc-btn-navy lmc-btn-sm shrink-0 w-full sm:w-auto justify-center rounded-xl"
                            >
                                <Filter className="w-3.5 h-3.5" />
                                <span>Filter</span>
                            </button>
                        </form>

                        <button
                            onClick={openCreate}
                            className="lmc-btn lmc-btn-primary lmc-btn-sm shrink-0 shadow-2xs w-full lg:w-auto justify-center rounded-xl"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Create New Task</span>
                        </button>
                    </div>
                </div>

                {/* 3. TABLE WITH UN-CLIPPED ACTIONS (⋮) DROPDOWN */}
                <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs overflow-visible" ref={menuRef}>
                    <div className="overflow-x-auto overflow-y-visible">
                        <table className="w-full text-left text-xs text-[#4D4B55] table-fixed">
                            <thead className="bg-[#0B1C30] text-white font-bold uppercase tracking-wider text-[10px]">
                                <tr>
                                    <th className="py-3.5 px-5 w-[30%]">Task Details & Description</th>
                                    <th className="py-3.5 px-5 w-[14%]">Priority</th>
                                    <th className="py-3.5 px-5 w-[18%]">Assigned Specialist</th>
                                    <th className="py-3.5 px-5 w-[14%]">Due Date</th>
                                    <th className="py-3.5 px-5 w-[14%]">Status</th>
                                    <th className="py-3.5 px-5 w-[10%] text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {tasks.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="h-[340px] text-center text-gray-500">
                                            <div className="max-w-xs mx-auto text-center space-y-2">
                                                <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                                                    <CheckSquare className="w-6 h-6" />
                                                </div>
                                                <div className="font-bold text-gray-700">No Operational Tasks Found</div>
                                                <p className="text-xs text-gray-400">
                                                    Try adjusting your search criteria or create a new operational task.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    <>
                                        {tasks.data.map((task, idx) => {
                                            const isMenuOpen = openActionId === task.id;
                                            const openUpward = idx >= tasks.data.length - 1 || idx >= 2;

                                            return (
                                                <tr key={task.id} className="hover:bg-slate-50/80 transition-colors h-[68px]">
                                                    {/* Task Title & Description */}
                                                    <td className="py-3.5 px-5">
                                                        <div className="flex items-start gap-3">
                                                            <div className="w-9 h-9 rounded-lg bg-[#0B1C30] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs mt-0.5">
                                                                {task.title.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <div
                                                                    className="font-bold text-[#0B1C30] text-sm hover:text-[#DA7A31] transition-colors cursor-pointer truncate"
                                                                    onClick={() => setViewingTask(task)}
                                                                >
                                                                    {task.title}
                                                                </div>
                                                                {task.description && (
                                                                    <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5 font-medium truncate">
                                                                        {task.description}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Priority Badge */}
                                                    <td className="py-3.5 px-5">
                                                        <span
                                                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                                                                task.priority === 'Urgent'
                                                                    ? 'bg-rose-100 text-rose-900 border border-rose-300'
                                                                    : task.priority === 'High'
                                                                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                                                    : task.priority === 'Medium'
                                                                    ? 'bg-blue-100 text-blue-900 border border-blue-300'
                                                                    : 'bg-slate-100 text-slate-800 border border-slate-300'
                                                            }`}
                                                        >
                                                            <span
                                                                className={`w-1.5 h-1.5 rounded-full ${
                                                                    task.priority === 'Urgent'
                                                                        ? 'bg-rose-600 animate-pulse'
                                                                        : task.priority === 'High'
                                                                        ? 'bg-amber-600'
                                                                        : 'bg-blue-500'
                                                                }`}
                                                            />
                                                            {task.priority}
                                                        </span>
                                                    </td>

                                                    {/* Assigned Specialist */}
                                                    <td className="py-3.5 px-5">
                                                        <div className="text-xs font-semibold text-gray-800 truncate">
                                                            {task.assigned_user?.name || 'Unassigned'}
                                                        </div>
                                                        <div className="text-[11px] text-gray-400 truncate">
                                                            {task.assigned_user ? 'Assigned' : 'Open Ticket'}
                                                        </div>
                                                    </td>

                                                    {/* Due Date */}
                                                    <td className="py-3.5 px-5">
                                                        <div className="flex items-center gap-1.5 text-gray-700 text-xs truncate">
                                                            <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                                            <span className="truncate">
                                                                {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No date set'}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    {/* Status Badge */}
                                                    <td className="py-3.5 px-5">
                                                        <span
                                                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                                                                task.status === 'Completed'
                                                                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                                                    : task.status === 'In Progress'
                                                                    ? 'bg-blue-100 text-blue-900 border border-blue-300'
                                                                    : 'bg-slate-100 text-slate-800 border border-slate-300'
                                                            }`}
                                                        >
                                                            <span
                                                                className={`w-1.5 h-1.5 rounded-full ${
                                                                    task.status === 'Completed'
                                                                        ? 'bg-emerald-600'
                                                                        : task.status === 'In Progress'
                                                                        ? 'bg-blue-600 animate-pulse'
                                                                        : 'bg-slate-500'
                                                                }`}
                                                            />
                                                            {task.status}
                                                        </span>
                                                    </td>

                                                    {/* UN-CLIPPED ACTIONS (⋮) DROPDOWN */}
                                                    <td className="py-3.5 px-5 text-right relative">
                                                        <div className="relative inline-block text-left">
                                                            <button
                                                                type="button"
                                                                onClick={() => setOpenActionId(isMenuOpen ? null : task.id)}
                                                                className={`p-2 rounded-lg transition-colors border ${
                                                                    isMenuOpen
                                                                        ? 'bg-[#0B1C30] text-white border-[#0B1C30]'
                                                                        : 'text-gray-600 hover:text-[#0B1C30] hover:bg-gray-100 border-gray-200'
                                                                }`}
                                                                title="Task Actions"
                                                            >
                                                                <MoreVertical className="w-4 h-4" />
                                                            </button>

                                                            {isMenuOpen && (
                                                                <div
                                                                    className={`absolute right-0 w-44 bg-white rounded-xl shadow-2xl border border-gray-200 py-1.5 z-50 animate-fadeIn text-left font-normal ${
                                                                        openUpward ? 'bottom-full mb-1.5' : 'top-full mt-1.5'
                                                                    }`}
                                                                >
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setOpenActionId(null);
                                                                            setViewingTask(task);
                                                                        }}
                                                                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-gray-700 hover:bg-slate-50 hover:text-[#0B1C30] transition font-medium"
                                                                    >
                                                                        <Eye className="w-4 h-4 text-slate-500" />
                                                                        <span>View Details</span>
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setOpenActionId(null);
                                                                            toggleComplete(task);
                                                                        }}
                                                                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-emerald-700 hover:bg-emerald-50 hover:text-emerald-900 transition font-medium"
                                                                    >
                                                                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                                                        <span>{task.status === 'Completed' ? 'Reopen Task' : 'Mark Completed'}</span>
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setOpenActionId(null);
                                                                            openEdit(task);
                                                                        }}
                                                                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-amber-800 hover:bg-amber-50 hover:text-amber-900 transition font-medium"
                                                                    >
                                                                        <Edit2 className="w-4 h-4 text-amber-600" />
                                                                        <span>Edit</span>
                                                                    </button>
                                                                    <div className="my-1 border-t border-gray-100" />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setOpenActionId(null);
                                                                            setDeletingTask(task);
                                                                        }}
                                                                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-rose-700 hover:bg-rose-50 hover:text-rose-900 transition font-medium"
                                                                    >
                                                                        <Trash2 className="w-4 h-4 text-rose-600" />
                                                                        <span>Delete</span>
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        {Array.from({ length: Math.max(0, 5 - tasks.data.length) }).map((_, i) => (
                                            <tr key={`empty-${i}`} className="h-[68px]">
                                                <td colSpan={6} className="py-3.5 px-5">&nbsp;</td>
                                            </tr>
                                        ))}
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Footer */}
                    <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
                        <div>
                            Showing <span className="font-semibold text-[#0B1C30]">{tasks.from || (tasks.total > 0 ? 1 : 0)}</span> to{' '}
                            <span className="font-semibold text-[#0B1C30]">{tasks.to || tasks.data.length}</span> of{' '}
                            <span className="font-semibold text-[#0B1C30]">{tasks.total}</span> operational tasks
                        </div>
                        {tasks.links && tasks.links.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                                {tasks.links
                                    .filter((link) => link.active || link.label.includes('Previous') || link.label.includes('&laquo;') || link.label.includes('Next') || link.label.includes('&raquo;'))
                                    .map((link, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => link.url && router.get(link.url, {}, { preserveScroll: true, preserveState: true })}
                                        disabled={!link.url}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-3 py-1.5 rounded-md text-xs transition-all ${
                                            link.active
                                                ? 'bg-[#0B1C30] text-white font-bold shadow-2xs'
                                                : link.url
                                                ? 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                                        }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* CREATE / EDIT MODAL WITH CUSTOMERS PAGE STANDARD */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-gray-200 relative max-h-[90vh] flex flex-col">
                        {/* Modal Header */}
                        <div className="bg-[#0B1C30] px-6 py-4 flex items-center justify-between text-white shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#DA7A31]/20 border border-[#DA7A31]/40 flex items-center justify-center text-[#DA7A31]">
                                    <CheckSquare className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold tracking-tight">
                                        {editingTask ? 'Edit Operational Task' : 'Create New Operational Task'}
                                    </h3>
                                    <p className="text-xs text-gray-300">
                                        {editingTask ? `Updating specifications for "${editingTask.title}"` : 'Define deliverables, deadlines, and staff allocation'}
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => setModalOpen(false)} className="p-1 text-gray-400 hover:text-white rounded-lg transition">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Form Body */}
                        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0 overflow-hidden">
                            <div className="p-6 overflow-y-auto space-y-6 text-xs flex-1 text-gray-900">
                                {/* SECTION 1: TASK SPECIFICATION */}
                                <div>
                                    <div className="text-[11px] font-bold text-[#DA7A31] uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <CheckSquare className="w-4 h-4" />
                                        <span>1. Task Specification</span>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">
                                                Task Title <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <CheckSquare className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                                                <input
                                                    type="text"
                                                    value={data.title}
                                                    onChange={(e) => setData('title', e.target.value)}
                                                    placeholder="e.g. Conduct security penetration test on payment gateway"
                                                    required
                                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                                />
                                            </div>
                                            {errors.title && <p className="text-red-500 text-[11px] mt-1">{errors.title}</p>}
                                        </div>

                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">Detailed Description</label>
                                            <textarea
                                                rows={3}
                                                value={data.description}
                                                onChange={(e) => setData('description', e.target.value)}
                                                placeholder="e.g. Review OWASP compliance checklist and patch staging environment..."
                                                className="w-full p-3 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION 2: ALLOCATION & PRIORITY */}
                                <div className="pt-4 border-t border-gray-100">
                                    <div className="text-[11px] font-bold text-[#DA7A31] uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <UserCheck className="w-4 h-4" />
                                        <span>2. Allocation & Execution Terms</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">Assigned Specialist</label>
                                            <CustomDropdown
                                                value={String(data.assigned_to)}
                                                onChange={(val) => setData('assigned_to', val)}
                                                options={staffOptions}
                                                variant="white"
                                                className="w-full"
                                            />
                                        </div>

                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">Due Date</label>
                                            <div className="relative">
                                                <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                                                <input
                                                    type="date"
                                                    value={data.due_date}
                                                    onChange={(e) => setData('due_date', e.target.value)}
                                                    onClick={(e) => {
                                                        try {
                                                            e.currentTarget.showPicker();
                                                        } catch (err) {}
                                                    }}
                                                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 shadow-2xs cursor-pointer"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">Priority Level <span className="text-red-500">*</span></label>
                                            <CustomDropdown
                                                value={data.priority}
                                                onChange={(val) => setData('priority', val as TaskItem['priority'])}
                                                options={modalPriorityOptions}
                                                variant="white"
                                                className="w-full"
                                            />
                                        </div>

                                        <div>
                                            <label className="block font-semibold text-[#0B1C30] mb-1">Execution Status <span className="text-red-500">*</span></label>
                                            <CustomDropdown
                                                value={data.status}
                                                onChange={(val) => setData('status', val as TaskItem['status'])}
                                                options={modalStatusOptions}
                                                variant="white"
                                                className="w-full"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* STICKY FOOTER */}
                            <div className="shrink-0 bg-gray-50 border-t border-gray-200 p-4 flex items-center justify-end gap-3 z-20">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-5 py-2.5 text-xs font-bold text-[#0B1C30] bg-gray-200 hover:bg-gray-300 border border-gray-300 rounded-xl transition-all shadow-2xs"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2.5 text-xs font-bold text-white bg-[#DA7A31] hover:bg-[#c66a27] rounded-xl shadow-md transition-all flex items-center gap-2"
                                >
                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                    <span>{processing ? 'Saving Task...' : editingTask ? 'Update Task' : 'Save Task'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* VIEW TASK MODAL */}
            {viewingTask && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-gray-200 relative">
                        <div className="bg-[#0B1C30] p-6 text-white relative">
                            <button
                                onClick={() => setViewingTask(null)}
                                className="absolute top-4 right-4 p-1 text-gray-400 hover:text-white rounded-lg"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-[#DA7A31] text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0">
                                    <CheckSquare className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">{viewingTask.title}</h3>
                                    <div className="text-xs text-gray-300 flex items-center gap-1.5 mt-0.5">
                                        <Calendar className="w-3.5 h-3.5 text-[#DA7A31]" />
                                        <span>Due: {viewingTask.due_date || 'No deadline specified'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 space-y-4 text-xs text-gray-900">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <div className="text-gray-400 text-[10px] font-bold uppercase">Task Status</div>
                                    <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                                        viewingTask.status === 'Completed'
                                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                            : viewingTask.status === 'In Progress'
                                            ? 'bg-blue-100 text-blue-900 border-blue-300'
                                            : 'bg-slate-100 text-slate-800 border-slate-300'
                                    }`}>
                                        {viewingTask.status}
                                    </span>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <div className="text-gray-400 text-[10px] font-bold uppercase">Priority Level</div>
                                    <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${priorityBadge(viewingTask.priority)}`}>
                                        {viewingTask.priority}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2 pt-2 border-t border-gray-100">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <UserCheck className="w-4 h-4 text-[#DA7A31] shrink-0" />
                                    <span className="font-semibold shrink-0">Assigned Specialist:</span>
                                    <span>{viewingTask.assigned_user ? viewingTask.assigned_user.name : 'Unassigned'}</span>
                                </div>
                                {viewingTask.due_date && (
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Calendar className="w-4 h-4 text-[#DA7A31] shrink-0" />
                                        <span className="font-semibold shrink-0">Target Due Date:</span>
                                        <span>{viewingTask.due_date}</span>
                                    </div>
                                )}
                            </div>

                            {viewingTask.description && (
                                <div className="pt-2 border-t border-gray-100">
                                    <div className="font-bold text-[#0B1C30] mb-1">Detailed Description</div>
                                    <p className="p-3 bg-slate-50 rounded-xl text-gray-600 border border-slate-100 whitespace-pre-wrap font-medium">
                                        {viewingTask.description}
                                    </p>
                                </div>
                            )}

                            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                <button
                                    onClick={() => {
                                        const t = viewingTask;
                                        setViewingTask(null);
                                        openEdit(t);
                                    }}
                                    className="px-4 py-2 text-xs font-bold text-[#0B1C30] bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-300 transition"
                                >
                                    <Edit2 className="w-3.5 h-3.5 inline mr-1.5" />
                                    <span>Edit Task</span>
                                </button>
                                <button
                                    onClick={() => setViewingTask(null)}
                                    className="px-4 py-2 text-xs font-bold text-white bg-[#0B1C30] hover:bg-[#081423] rounded-xl transition"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* DELETE CONFIRMATION MODAL */}
            {deletingTask && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-200 text-center">
                        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="w-6 h-6" />
                        </div>
                        <h3 className="text-base font-bold text-[#0B1C30] mb-2">Delete Operational Task?</h3>
                        <p className="text-xs text-gray-500 mb-6">
                            Are you sure you want to remove <span className="font-bold text-[#0B1C30]">{deletingTask.title}</span>? This action cannot be undone.
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <button
                                onClick={() => setDeletingTask(null)}
                                className="px-4 py-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl border border-gray-300 flex-1 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl flex-1 transition shadow-xs"
                            >
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
