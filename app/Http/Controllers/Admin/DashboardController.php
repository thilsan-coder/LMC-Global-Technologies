<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\Customer;
use App\Models\Intern;
use App\Models\Lead;
use App\Models\Product;
use App\Models\Review;
use App\Models\Service;
use App\Models\Task;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $stats = [
            'total_users' => User::count(),
            'customers' => Customer::count(),
            'interns' => Intern::count(),
            'active_internships' => Intern::where('status', 'Active')->count(),
            'completed_internships' => Intern::where('status', 'Completed')->count(),
            'pending_reviews' => Review::where('status', 'Pending')->count(),
            'approved_reviews' => Review::where('status', 'Approved')->count(),
            'crm_leads' => Lead::count(),
            'unread_contacts' => ContactMessage::where('status', 'Unread')->count(),
            'open_tasks' => Task::where('status', '!=', 'Completed')->count(),
        ];

        // Chart 1: Leads by status
        $leadsByStatus = Lead::selectRaw('status, count(*) as count, sum(coalesce(estimated_value, 0)) as total_value')
            ->groupBy('status')
            ->get();

        // Chart 2: Interns by Department
        $internsByDepartment = Intern::selectRaw('department, count(*) as count')
            ->groupBy('department')
            ->get();

        // Chart 3: Monthly trend demo metrics for Recharts
        $performanceTrends = [
            ['month' => 'Jan', 'leads' => 8, 'interns' => 4, 'revenue' => 42000],
            ['month' => 'Feb', 'leads' => 12, 'interns' => 6, 'revenue' => 58000],
            ['month' => 'Mar', 'leads' => 15, 'interns' => 9, 'revenue' => 74000],
            ['month' => 'Apr', 'leads' => 18, 'interns' => 12, 'revenue' => 89000],
            ['month' => 'May', 'leads' => 24, 'interns' => 16, 'revenue' => 112000],
            ['month' => 'Jun', 'leads' => 29, 'interns' => 20, 'revenue' => 135000],
        ];

        // Recent items
        $recentLeads = Lead::with('assignedUser')->latest()->take(5)->get();
        $pendingReviews = Review::where('status', 'Pending')->latest()->take(4)->get();
        $recentContacts = ContactMessage::latest()->take(4)->get();
        $pendingTasks = Task::with('assignedUser')->where('status', '!=', 'Completed')->orderBy('due_date')->take(5)->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'leadsByStatus' => $leadsByStatus,
            'internsByDepartment' => $internsByDepartment,
            'performanceTrends' => $performanceTrends,
            'recentLeads' => $recentLeads,
            'pendingReviews' => $pendingReviews,
            'recentContacts' => $recentContacts,
            'pendingTasks' => $pendingTasks,
        ]);
    }
}
