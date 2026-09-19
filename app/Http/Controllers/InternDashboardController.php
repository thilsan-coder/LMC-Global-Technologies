<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Intern;
use Barryvdh\DomPDF\Facade\Pdf;
use Inertia\Inertia;
use Inertia\Response;

class InternDashboardController extends Controller
{
    public function index(): Response
    {
        $user = auth()->user();

        // Match intern by user_id or email
        $intern = Intern::where('user_id', $user->id)
            ->orWhere('email', $user->email)
            ->with('attendances')
            ->first();

        $recentAttendances = $intern
            ? Attendance::where('intern_id', $intern->id)->latest('date')->take(15)->get()
            : [];

        return Inertia::render('Intern/Dashboard', [
            'intern' => $intern,
            'recentAttendances' => $recentAttendances,
        ]);
    }

    public function downloadMyCertificate()
    {
        $user = auth()->user();
        $intern = Intern::where('user_id', $user->id)
            ->orWhere('email', $user->email)
            ->firstOrFail();

        $pdf = Pdf::loadView('pdf.internship_certificate', compact('intern'))
            ->setPaper('a4', 'portrait');

        return $pdf->download("LMC-Certificate-{$intern->intern_id}.pdf");
    }
}
