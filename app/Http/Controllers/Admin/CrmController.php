<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\FollowUp;
use App\Models\Lead;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CrmController extends Controller
{
    // Customers
    public function customers(Request $request): Response
    {
        $query = Customer::query()->with('followUps');

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('company', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('industry', 'like', "%{$search}%");
            });
        }

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        $customers = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Admin/Crm/Customers', [
            'customers' => $customers,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function storeCustomer(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'company' => 'nullable|string|max:150',
            'email' => 'nullable|email|max:150',
            'phone' => 'nullable|string|max:50',
            'address' => 'nullable|string|max:255',
            'industry' => 'nullable|string|max:100',
            'status' => 'required|in:active,inactive',
            'notes' => 'nullable|string',
        ]);

        Customer::create($validated);

        return back()->with('success', 'Customer record created successfully.');
    }

    public function updateCustomer(Request $request, Customer $customer)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'company' => 'nullable|string|max:150',
            'email' => 'nullable|email|max:150',
            'phone' => 'nullable|string|max:50',
            'address' => 'nullable|string|max:255',
            'industry' => 'nullable|string|max:100',
            'status' => 'required|in:active,inactive',
            'notes' => 'nullable|string',
        ]);

        $customer->update($validated);

        return back()->with('success', 'Customer record updated successfully.');
    }

    public function destroyCustomer(Customer $customer)
    {
        $customer->delete();
        return back()->with('success', 'Customer deleted successfully.');
    }

    // Leads
    public function leads(Request $request): Response
    {
        $query = Lead::query()->with(['assignedUser', 'followUps']);

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('company', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        $leads = $query->latest()->paginate(10)->withQueryString();
        $staffUsers = User::where('is_active', true)->select('id', 'name', 'email')->get();

        return Inertia::render('Admin/Crm/Leads', [
            'leads' => $leads,
            'staffUsers' => $staffUsers,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function storeLead(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'company' => 'nullable|string|max:150',
            'email' => 'nullable|email|max:150',
            'phone' => 'nullable|string|max:50',
            'source' => 'required|string|max:50',
            'status' => 'required|in:New,Contacted,Qualified,Proposal,Won,Lost',
            'estimated_value' => 'nullable|numeric|min:0',
            'assigned_to' => 'nullable|exists:users,id',
            'notes' => 'nullable|string',
        ]);

        Lead::create($validated);

        return back()->with('success', 'Lead created successfully.');
    }

    public function updateLead(Request $request, Lead $lead)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'company' => 'nullable|string|max:150',
            'email' => 'nullable|email|max:150',
            'phone' => 'nullable|string|max:50',
            'source' => 'required|string|max:50',
            'status' => 'required|in:New,Contacted,Qualified,Proposal,Won,Lost',
            'estimated_value' => 'nullable|numeric|min:0',
            'assigned_to' => 'nullable|exists:users,id',
            'notes' => 'nullable|string',
        ]);

        $lead->update($validated);

        return back()->with('success', 'Lead updated successfully.');
    }

    public function destroyLead(Lead $lead)
    {
        $lead->delete();
        return back()->with('success', 'Lead removed successfully.');
    }

    // Follow-ups & Tasks
    public function followUps(Request $request): Response
    {
        $query = FollowUp::query()->with(['lead', 'customer', 'user']);

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        $followUps = $query->orderBy('follow_up_date')->paginate(12)->withQueryString();
        $leads = Lead::select('id', 'name', 'company')->get();
        $customers = Customer::select('id', 'name', 'company')->get();

        return Inertia::render('Admin/Crm/FollowUps', [
            'followUps' => $followUps,
            'leads' => $leads,
            'customers' => $customers,
            'filters' => $request->only(['status']),
        ]);
    }

    public function storeFollowUp(Request $request)
    {
        $validated = $request->validate([
            'lead_id' => 'nullable|exists:leads,id',
            'customer_id' => 'nullable|exists:customers,id',
            'follow_up_date' => 'required|date',
            'notes' => 'required|string',
            'status' => 'required|in:Pending,Completed,Cancelled',
        ]);

        $validated['user_id'] = auth()->id();

        FollowUp::create($validated);

        return back()->with('success', 'Follow-up scheduled successfully.');
    }

    public function updateFollowUp(Request $request, FollowUp $followUp)
    {
        $validated = $request->validate([
            'follow_up_date' => 'required|date',
            'notes' => 'required|string',
            'status' => 'required|in:Pending,Completed,Cancelled',
        ]);

        $followUp->update($validated);

        return back()->with('success', 'Follow-up updated.');
    }

    public function tasks(Request $request): Response
    {
        $query = Task::query()->with('assignedUser');

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        if ($priority = $request->input('priority')) {
            $query->where('priority', $priority);
        }

        $tasks = $query->orderBy('due_date')->paginate(15)->withQueryString();
        $staffUsers = User::where('is_active', true)->select('id', 'name')->get();

        return Inertia::render('Admin/Crm/Tasks', [
            'tasks' => $tasks,
            'staffUsers' => $staffUsers,
            'filters' => $request->only(['status', 'priority']),
        ]);
    }

    public function storeTask(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:200',
            'description' => 'nullable|string',
            'assigned_to' => 'nullable|exists:users,id',
            'due_date' => 'nullable|date',
            'priority' => 'required|in:Low,Medium,High,Urgent',
            'status' => 'required|in:Pending,In Progress,Completed',
        ]);

        Task::create($validated);

        return back()->with('success', 'Task created successfully.');
    }

    public function updateTask(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:200',
            'description' => 'nullable|string',
            'assigned_to' => 'nullable|exists:users,id',
            'due_date' => 'nullable|date',
            'priority' => 'required|in:Low,Medium,High,Urgent',
            'status' => 'required|in:Pending,In Progress,Completed',
        ]);

        $task->update($validated);

        return back()->with('success', 'Task updated successfully.');
    }

    public function destroyTask(Task $task)
    {
        $task->delete();
        return back()->with('success', 'Task deleted.');
    }
}
