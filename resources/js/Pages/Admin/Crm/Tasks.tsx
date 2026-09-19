import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
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

    const { data, setData, post, put, processing, reset, errors } = useForm({
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
        reset();
        setModalOpen(true);
    };

    const openEdit = (task: TaskItem) => {
        setEditingTask(task);
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

    const handleDelete = (id: number, title: string) => {
        if (confirm(`Delete task "${title}"?`)) {
            router.delete(route('admin.crm.tasks.destroy', id));
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

    return (
        <AdminLayout title="Operational Tasks" subtitle="Team Sprint Workload">
            <Head title="Tasks - LMC Management" />

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            handleFilterChange(e.target.value, priorityFilter);
                        }}
                        className="text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31] py-1.5"
                    >
                        <option value="">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>

                    <select
                        value={priorityFilter}
                        onChange={(e) => {
                            setPriorityFilter(e.target.value);
                            handleFilterChange(statusFilter, e.target.value);
                        }}
                        className="text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31] py-1.5"
                    >
                        <option value="">All Priorities</option>
                        <option value="Urgent">Urgent</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>

                <button
                    onClick={openCreate}
                    className="w-full sm:w-auto bg-[#DA7A31] hover:bg-[#C2631D] text-white text-xs font-bold px-4 py-2 rounded shadow-xs flex items-center justify-center gap-1.5"
                >
                    <Plus className="w-4 h-4" />
                    <span>Create Task</span>
                </button>
            </div>

            {/* Tasks List */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
                <div className="divide-y divide-gray-100">
                    {tasks.data.length === 0 ? (
                        <div className="p-8 text-center text-xs text-gray-500">
                            No operational tasks found matching filters.
                        </div>
                    ) : (
                        tasks.data.map((task) => (
                            <div
                                key={task.id}
                                className={`p-4 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                                    task.status === 'Completed' ? 'opacity-70 bg-gray-50/50' : ''
                                }`}
                            >
                                <div className="flex items-start gap-3">
                                    <button
                                        onClick={() => toggleStatus(task)}
                                        className="mt-0.5 text-gray-400 hover:text-emerald-600 transition"
                                    >
                                        <CheckCircle2
                                            className={`w-5 h-5 ${
                                                task.status === 'Completed'
                                                    ? 'text-emerald-600 fill-emerald-100'
                                                    : 'text-gray-300'
                                            }`}
                                        />
                                    </button>
                                    <div>
                                        <div
                                            className={`text-sm font-bold text-[#0B1C30] ${
                                                task.status === 'Completed' ? 'line-through text-gray-500' : ''
                                            }`}
                                        >
                                            {task.title}
                                        </div>
                                        {task.description && (
                                            <div className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                                                {task.description}
                                            </div>
                                        )}
                                        <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-gray-500">
                                            {task.due_date && (
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3 text-[#DA7A31]" />
                                                    <span>Due: {task.due_date}</span>
                                                </span>
                                            )}
                                            <span className="flex items-center gap-1">
                                                <UserCheck className="w-3 h-3 text-gray-400" />
                                                <span>Assigned: {task.assigned_user?.name || 'Unassigned'}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 self-end sm:self-center">
                                    <span
                                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                            task.priority === 'Urgent'
                                                ? 'bg-red-100 text-red-800'
                                                : task.priority === 'High'
                                                ? 'bg-amber-100 text-amber-800'
                                                : task.priority === 'Medium'
                                                ? 'bg-blue-100 text-blue-800'
                                                : 'bg-gray-100 text-gray-600'
                                        }`}
                                    >
                                        {task.priority}
                                    </span>

                                    <span
                                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                            task.status === 'Completed'
                                                ? 'bg-emerald-100 text-emerald-800'
                                                : task.status === 'In Progress'
                                                ? 'bg-blue-50 text-blue-700'
                                                : 'bg-gray-100 text-gray-600'
                                        }`}
                                    >
                                        {task.status}
                                    </span>

                                    <button
                                        onClick={() => openEdit(task)}
                                        className="p-1.5 text-gray-400 hover:text-[#0B1C30] rounded"
                                    >
                                        <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(task.id, task.title)}
                                        className="p-1.5 text-red-400 hover:text-red-600 rounded"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
                    <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl relative">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-700"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h3 className="text-base font-bold text-[#0B1C30] mb-4">
                            {editingTask ? 'Edit Task' : 'Create New Operational Task'}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                            <div>
                                <label className="block font-semibold text-[#0B1C30] mb-1">Task Title *</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    required
                                    className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold text-[#0B1C30] mb-1">Description</label>
                                <textarea
                                    rows={3}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1">Assign Staff</label>
                                    <select
                                        value={data.assigned_to}
                                        onChange={(e) => setData('assigned_to', e.target.value)}
                                        className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
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
                                        className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-semibold text-[#0B1C30] mb-1">Priority</label>
                                    <select
                                        value={data.priority}
                                        onChange={(e) => setData('priority', e.target.value as TaskItem['priority'])}
                                        className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
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
                                        className="w-full text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31]"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-3 py-1.5 text-xs text-gray-600 hover:text-gray-900"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-[#DA7A31] hover:bg-[#C2631D] text-white text-xs font-bold px-4 py-2 rounded shadow transition"
                                >
                                    {processing ? 'Saving...' : editingTask ? 'Update Task' : 'Save Task'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
