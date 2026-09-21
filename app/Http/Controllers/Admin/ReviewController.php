<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReviewController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Review::query();

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('company', 'like', "%{$search}%")
                    ->orWhere('service_or_product', 'like', "%{$search}%");
            });
        }

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        $reviews = $query->latest()->paginate(5)->withQueryString();

        $counts = [
            'all' => Review::count(),
            'pending' => Review::where('status', 'Pending')->count(),
            'approved' => Review::where('status', 'Approved')->count(),
            'rejected' => Review::where('status', 'Rejected')->count(),
        ];

        return Inertia::render('Admin/Reviews/Index', [
            'reviews' => $reviews,
            'counts' => $counts,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function approve(Review $review)
    {
        $review->update([
            'status' => 'Approved',
            'is_verified_client' => true,
        ]);

        return back()->with('success', "Review from {$review->name} ({$review->company}) has been APPROVED and published to the public website.");
    }

    public function reject(Review $review, Request $request)
    {
        $review->update([
            'status' => 'Rejected',
            'admin_notes' => $request->input('admin_notes', 'Declined by administrator.'),
        ]);

        return back()->with('success', "Review from {$review->name} marked as REJECTED.");
    }

    public function toggleVerified(Review $review)
    {
        $review->update(['is_verified_client' => !$review->is_verified_client]);
        return back()->with('success', 'Verified client badge updated.');
    }

    public function destroy(Review $review)
    {
        $review->delete();
        return back()->with('success', 'Review deleted.');
    }
}
