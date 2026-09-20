import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { TaskItem, User } from '@/types';
import {
    CheckSquare,
    Plus,
    Calendar,
    UserCheck,
    AlertCircle,
    X,
    Trash2,
    Edit2,
    CheckCircle2,
    Clock,
} from 'lucide-react';

interface TasksProps {
    tasks: {
        data: TaskItem[];
        links: any[];
        total: number;
    };
    staffUsers: User[];
    filters: {
        status?: string;
        priority?: string;
    };
}

export default function Tasks({ tasks, staffUsers, filters }: TasksProps) {
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [priorityFilter, setPriorityFilter] = useState(filters.priority || '');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<TaskItem | null>(null);
    const [deletingTask, setDeletingTask] = useState<TaskItem | null>(null);

    const { data, setData, post, put, processing, reset, errors, clearErrors } = useForm({
        title: '',
        description: '',
        assigned_to: '' as string | number,
        due_date: '',
        priority: 'Medium' as TaskItem['priority'],
        status: 'Pending' as TaskItem['status'],
    });

    const handleFilterChange = (statusVal: string, prioVal: string) => {
        router.get(
            route('admin.crm.tasks'),
            { status: statusVal, priority: prioVal },
            { preserveState: true }
        );
    };

    const openCreate = () => {
        setEditingTask(null);
        clearErrors();
        reset();
        setModalOpen(true);
    };

    const openEdit = (task: TaskItem) => {
        setEditingTask(task);
        clearErrors();
        setData({
            title: task.title,
            description: task.description || '',
            assigned_to: task.assigned_to || '',
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

            {/* Filter toolbar */}
            <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-2xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3 text-xs w-full sm:w-auto">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#0B1C30]">Status:</span>
                        <select
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value);
                                handleFilterChange(e.target.value, priorityFilter);
                            }}
                            className="text-xs rounded-lg border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] py-2 px-3 bg-white text-gray-900 cursor-pointer"
                        >
                            <option value="">All Statuses</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#0B1C30]">Priority:</span>
                        <select
                            value={priorityFilter}
                            onChange={(e) => {
                                setPriorityFilter(e.target.value);
                                handleFilterChange(statusFilter, e.target.value);
                            }}
                            className="text-xs rounded-lg border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] py-2 px-3 bg-white text-gray-900 cursor-pointer"
                        >
                            <option value="">All Priorities</option>
                            <option value="Urgent">Urgent</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                </div>

                <button
                    onClick={openCreate}
                    className="w-full sm:w-auto lmc-btn lmc-btn-primary lmc-btn-sm shrink-0 shadow-2xs"
                >
                    <Plus className="w-4 h-4" />
                    <span>Create Task</span>
                </button>
            </div>

            {/* Task Kanban / Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {tasks.data.length === 0 ? (
                    <div className="col-span-full bg-white p-12 text-center text-xs text-gray-500 rounded-xl border border-gray-200/80 shadow-2xs">
                        <CheckSquare className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                        <div className="font-bold text-gray-700">No Operational Tasks Found</div>
                        <p className="text-gray-400 mt-1">Create a new task to dispatch workload to staff.</p>
                    </div>
                ) : (
                    tasks.data.map((task) => (
                        <div
                            key={task.id}
                            className={`p-5 rounded-xl border transition-all shadow-2xs flex flex-col justify-between bg-white ${
                                task.status === 'Completed'
                                    ? 'border-emerald-200/80 opacity-90'
                                    : 'border-gray-200 hover:border-[#DA7A31]/40'
                            }`}
                        >
                            <div>
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${priorityBadge(task.priority)}`}>
                                        {task.priority} Priority
                                    </span>
                                    <span
                                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                            task.status === 'Completed'
                                                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                                : task.status === 'In Progress'
                                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                                : 'bg-slate-100 text-slate-800 border border-slate-300'
                                        }`}
                                    >
                                        {task.status}
                                    </span>
                                </div>

                                <h4 className="font-bold text-sm text-[#0B1C30] mb-2">{task.title}</h4>
                                {task.description && (
                                    <p className="text-xs text-gray-600 mb-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                        {task.description}
                                    </p>
                                )}

                                <div className="space-y-1.5 text-[11px] text-gray-500 mb-4">
                                    <div className="flex items-center gap-1.5">
                                        <UserCheck className="w-3.5 h-3.5 text-[#DA7A31]" />
                                        <span>Assigned: {task.assigned_user ? task.assigned_user.name : 'Unassigned'}</span>
                                    </div>
                                    {task.due_date && (
                                        <div className="flex items-center gap-1.5 text-gray-600">
                                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                            <span>Due: {task.due_date}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                                <button
                                    onClick={() => toggleStatus(task)}
                                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                                        task.status === 'Completed'
                                            ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                                            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs'
                                    }`}
                                >
                                    {task.status === 'Completed' ? 'Reopen Task' : 'Complete Task'}
                                </button>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => openEdit(task)}
                                        className="p-1.5 text-gray-600 hover:text-[#DA7A31] hover:bg-orange-50 rounded-lg transition"
                                        title="Edit Task"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setDeletingTask(task)}
                                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                                        title="Delete Task"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* CREATE / EDIT MODAL WITH STICKY FOOTER */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-gray-200 relative max-h-[85vh] flex flex-col">
                        <div className="bg-[#0B1C30] px-6 py-4 flex items-center justify-between text-white shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#DA7A31]/20 border border-[#DA7A31]/40 flex items-center justify-center text-[#DA7A31]">
                                    <CheckSquare className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold tracking-tight">
                                        {editingTask ? 'Edit Operational Task' : 'Create New Operational Task'}
                                    </h3>
                                    <p className="text-xs text-gray-300">Set task details, priority, and staff assignment</p>
                                </div>
                            </div>
                            <button onClick={() => setModalOpen(false)} className="p-1 text-gray-400 hover:text-white rounded-lg transition">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0 overflow-hidden">
                            <div className="p-6 overflow-y-auto space-y-4 text-xs flex-1 text-gray-900">
                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1">Task Title <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="e.g. Conduct security penetration test on payment gateway"
                                        required
                                        className="w-full p-2 text-xs rounded-lg border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400"
                                    />
                                </div>

                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1">Detailed Description</label>
                                    <textarea
                                        rows={3}
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="e.g. Review OWASP compliance checklist and patch staging environment..."
                                        className="w-full p-3 text-xs rounded-lg border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 placeholder:text-gray-400"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block font-semibold text-[#0B1C30] mb-1">Assign Staff</label>
                                        <select
                                            value={data.assigned_to}
                                            onChange={(e) => setData('assigned_to', e.target.value)}
                                            className="w-full p-2 text-xs rounded-lg border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 cursor-pointer"
                                        >
                                            <option value="">-- Unassigned --</option>
                                            {staffUsers.map((u) => (
                                                <option key={u.id} value={u.id}>
                                                    {u.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block font-semibold text-[#0B1C30] mb-1">Due Date</label>
                                        <input
                                            type="date"
                                            value={data.due_date}
                                            onChange={(e) => setData('due_date', e.target.value)}
                                            className="w-full p-2 text-xs rounded-lg border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block font-semibold text-[#0B1C30] mb-1">Priority</label>
                                        <select
                                            value={data.priority}
                                            onChange={(e) => setData('priority', e.target.value as TaskItem['priority'])}
                                            className="w-full p-2 text-xs rounded-lg border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 cursor-pointer"
                                        >
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                            <option value="Urgent">Urgent</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block font-semibold text-[#0B1C30] mb-1">Status</label>
                                        <select
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value as TaskItem['status'])}
                                            className="w-full p-2 text-xs rounded-lg border border-gray-300 focus:border-[#DA7A31] focus:ring-1 focus:ring-[#DA7A31] bg-white text-gray-900 cursor-pointer"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* ALWAYS VISIBLE STICKY FOOTER */}
                            <div className="shrink-0 bg-gray-50 border-t border-gray-200 p-4 flex items-center justify-end gap-3 z-20">
                                <button type="button" onClick={() => setModalOpen(false)} className="lmc-btn lmc-btn-secondary lmc-btn-sm">
                                    Cancel
                                </button>
                                <button type="submit" disabled={processing} className="lmc-btn lmc-btn-primary lmc-btn-sm shadow-2xs">
                                    {processing ? 'Saving...' : editingTask ? 'Update Task' : 'Save Task'}
                                </button>
                            </div>
                        </form>
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
                            Are you sure you want to remove task <span className="font-bold text-[#0B1C30]">{deletingTask.title}</span>?
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <button onClick={() => setDeletingTask(null)} className="lmc-btn lmc-btn-secondary lmc-btn-sm flex-1">
                                Cancel
                            </button>
                            <button onClick={confirmDelete} className="lmc-btn lmc-btn-danger lmc-btn-sm flex-1">
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
