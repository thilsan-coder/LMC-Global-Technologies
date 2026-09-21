<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\Intern;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class InternshipController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Intern::query()->with('attendances');

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('intern_id', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('university', 'like', "%{$search}%")
                    ->orWhere('department', 'like', "%{$search}%");
            });
        }

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        if ($verification = $request->input('verification_status')) {
            $query->where('verification_status', $verification);
        }

        $interns = $query->latest()->paginate(5)->withQueryString();

        return Inertia::render('Admin/Internships/Index', [
            'interns' => $interns,
            'filters' => $request->only(['search', 'status', 'verification_status']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'email' => 'required|email|unique:interns,email',
            'phone' => 'nullable|string|max:50',
            'university' => 'required|string|max:200',
            'course' => 'required|string|max:200',
            'department' => 'required|string|max:150',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'status' => 'required|in:Active,Completed,Terminated',
            'verification_status' => 'required|in:Verified,Pending,Revoked',
            'supervisor' => 'nullable|string|max:150',
            'project_title' => 'nullable|string|max:255',
            'performance_score' => 'nullable|numeric|min:0|max:100',
            'notes' => 'nullable|string',
        ]);

        // Generate unique intern_id and verification_code
        $count = Intern::count() + 1;
        $validated['intern_id'] = 'LMC-INT-2026-' . str_pad($count, 3, '0', STR_PAD_LEFT);
        $validated['verification_code'] = 'LMC-VER-' . strtoupper(Str::random(5)) . '-' . rand(10000, 99999);

        $intern = Intern::create($validated);

        return back()->with('success', "Intern record {$intern->intern_id} created successfully.");
    }

    public function update(Request $request, Intern $intern)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'email' => 'required|email|unique:interns,email,' . $intern->id,
            'phone' => 'nullable|string|max:50',
            'university' => 'required|string|max:200',
            'course' => 'required|string|max:200',
            'department' => 'required|string|max:150',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'status' => 'required|in:Active,Completed,Terminated',
            'verification_status' => 'required|in:Verified,Pending,Revoked',
            'supervisor' => 'nullable|string|max:150',
            'project_title' => 'nullable|string|max:255',
            'performance_score' => 'nullable|numeric|min:0|max:100',
            'notes' => 'nullable|string',
        ]);

        $intern->update($validated);

        return back()->with('success', "Intern record {$intern->intern_id} updated successfully.");
    }

    public function destroy(Intern $intern)
    {
        $id = $intern->intern_id;
        $intern->delete();
        return back()->with('success', "Intern {$id} deleted successfully.");
    }

    public function toggleVerification(Request $request, Intern $intern)
    {
        $newStatus = $intern->verification_status === 'Verified' ? 'Revoked' : 'Verified';
        $intern->update(['verification_status' => $newStatus]);

        return back()->with('success', "Verification status updated to {$newStatus}.");
    }

    // Attendance view and logging
    public function attendance(Request $request): Response
    {
        $query = Attendance::query()->with('intern');

        if ($date = $request->input('date')) {
            $query->whereDate('date', $date);
        }

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        $attendances = $query->latest('date')->paginate(5)->withQueryString();
        $interns = Intern::select('id', 'intern_id', 'name', 'department')->get();

        return Inertia::render('Admin/Internships/Attendance', [
            'attendances' => $attendances,
            'interns' => $interns,
            'filters' => $request->only(['date', 'status']),
        ]);
    }

    public function storeAttendance(Request $request)
    {
        $validated = $request->validate([
            'intern_id' => 'required|exists:interns,id',
            'date' => 'required|date',
            'check_in' => 'nullable',
            'check_out' => 'nullable',
            'status' => 'required|in:Present,Absent,Half-day,Leave',
            'notes' => 'nullable|string',
        ]);

        Attendance::updateOrCreate(
            ['intern_id' => $validated['intern_id'], 'date' => $validated['date']],
            $validated
        );

        return back()->with('success', 'Attendance recorded successfully.');
    }

    public function downloadPdf(Intern $intern)
    {
        $pdf = Pdf::loadView('pdf.internship_certificate', compact('intern'))
            ->setPaper('a4', 'portrait');

        return $pdf->download("LMC-Certificate-{$intern->intern_id}.pdf");
    }
}
