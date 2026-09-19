<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\FollowUp;
use App\Models\Lead;
use App\Models\Task;
use Inertia\Inertia;
use Inertia\Response;

class StaffDashboardController extends Controller
{
    public function index(): Response
    {
        $userId = auth()->id();

        $stats = [
            'my_leads' => Lead::where('assigned_to', $userId)->count(),
            'my_tasks' => Task::where('assigned_to', $userId)->where('status', '!=', 'Completed')->count(),
            'pending_follow_ups' => FollowUp::where('user_id', $userId)->where('status', 'Pending')->count(),
            'total_customers' => Customer::count(),
        ];

        $myLeads = Lead::where('assigned_to', $userId)->latest()->take(6)->get();
        $myTasks = Task::where('assigned_to', $userId)->orderBy('due_date')->take(6)->get();
        $upcomingFollowUps = FollowUp::with(['lead', 'customer'])->where('user_id', $userId)->where('status', 'Pending')->orderBy('follow_up_date')->take(5)->get();

        return Inertia::render('Staff/Dashboard', [
            'stats' => $stats,
            'myLeads' => $myLeads,
            'myTasks' => $myTasks,
            'upcomingFollowUps' => $upcomingFollowUps,
        ]);
    }
}
