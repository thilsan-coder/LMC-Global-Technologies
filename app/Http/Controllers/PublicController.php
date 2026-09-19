<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use App\Models\Intern;
use App\Models\Product;
use App\Models\Review;
use App\Models\Service;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublicController extends Controller
{
    public function home(): Response
    {
        $services = Service::where('status', 'Active')->orderBy('display_order')->take(6)->get();
        $products = Product::where('status', 'Available')->orderBy('display_order')->take(6)->get();
        $reviews = Review::approved()->orderBy('created_at', 'desc')->take(6)->get();

        $stats = [
            'total_clients' => '120+',
            'projects_delivered' => '250+',
            'interns_trained' => '180+',
            'client_satisfaction' => '99.4%',
        ];

        return Inertia::render('Public/Home', [
            'services' => $services,
            'products' => $products,
            'reviews' => $reviews,
            'stats' => $stats,
        ]);
    }

    public function about(): Response
    {
        return Inertia::render('Public/About');
    }

    public function services(): Response
    {
        $services = Service::where('status', 'Active')->orderBy('display_order')->get();
        return Inertia::render('Public/Services', [
            'services' => $services,
        ]);
    }

    public function serviceDetail(Service $service): Response
    {
        $allServices = Service::where('status', 'Active')
            ->select('id', 'name', 'slug', 'icon')
            ->orderBy('display_order')
            ->get();

        return Inertia::render('Public/ServiceDetail', [
            'service' => $service,
            'allServices' => $allServices,
        ]);
    }

    public function products(): Response
    {
        $products = Product::orderBy('display_order')->get();
        return Inertia::render('Public/Products', [
            'products' => $products,
        ]);
    }

    public function productArchitecture(Product $product): Response
    {
        $allProducts = Product::select('id', 'name', 'slug', 'status')
            ->orderBy('display_order')
            ->get();

        return Inertia::render('Public/ProductArchitecture', [
            'product' => $product,
            'allProducts' => $allProducts,
        ]);
    }

    public function reviews(): Response
    {
        $reviews = Review::approved()->orderBy('created_at', 'desc')->paginate(12);
        $totalApproved = Review::approved()->count();
        $averageRating = $totalApproved > 0 ? round(Review::approved()->avg('rating'), 1) : 5.0;

        return Inertia::render('Public/Reviews', [
            'reviews' => $reviews,
            'metrics' => [
                'total_approved' => $totalApproved,
                'average_rating' => $averageRating,
                'five_star_percentage' => $totalApproved > 0 ? round((Review::approved()->where('rating', 5)->count() / $totalApproved) * 100) : 100,
            ],
        ]);
    }

    public function createReview(): Response
    {
        $totalApproved = Review::approved()->count();
        $averageRating = $totalApproved > 0 ? round(Review::approved()->avg('rating'), 1) : 5.0;

        return Inertia::render('Public/SubmitReview', [
            'metrics' => [
                'total_approved' => $totalApproved,
                'average_rating' => $averageRating,
            ],
        ]);
    }

    public function storeReview(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:150',
            'company' => 'required|string|max:150',
            'role' => 'nullable|string|max:100',
            'rating' => 'required|integer|min:1|max:5',
            'service_or_product' => 'required|string|max:150',
            'review' => 'required|string|min:10|max:2000',
        ]);

        $validated['status'] = 'Pending'; // ALWAYS Pending until Admin moderates
        $validated['is_verified_client'] = false;

        Review::create($validated);

        return back()->with('success', 'Thank you for your review! It has been submitted for administrative verification and will appear once approved.');
    }

    public function internship(): Response
    {
        $activeInternsCount = Intern::where('status', 'Active')->count();
        $completedCount = Intern::where('status', 'Completed')->count();

        return Inertia::render('Public/Internship', [
            'active_interns' => $activeInternsCount,
            'graduated_interns' => $completedCount,
        ]);
    }

    public function verifyInternship(Request $request): Response
    {
        $query = trim($request->input('query', ''));
        $result = null;
        $searched = false;

        if (!empty($query)) {
            $searched = true;
            $intern = Intern::where('intern_id', $query)
                ->orWhere('verification_code', $query)
                ->orWhere('email', $query)
                ->first();

            if ($intern) {
                $result = [
                    'intern_id' => $intern->intern_id,
                    'name' => $intern->name,
                    'university' => $intern->university,
                    'course' => $intern->course,
                    'department' => $intern->department,
                    'period' => $intern->start_date->format('M Y') . ' - ' . $intern->end_date->format('M Y'),
                    'status' => $intern->status,
                    'verification_status' => $intern->verification_status,
                    'verification_code' => $intern->verification_code,
                    'attendance_percentage' => $intern->attendance_percentage,
                    'performance_score' => $intern->performance_score,
                ];
            }
        }

        return Inertia::render('Public/VerifyInternship', [
            'searched' => $searched,
            'query' => $query,
            'intern' => $result,
        ]);
    }

    public function verifyAttendance(Request $request): Response
    {
        $query = trim($request->input('query', ''));
        $result = null;
        $searched = false;

        if (!empty($query)) {
            $searched = true;
            $intern = Intern::where('intern_id', $query)
                ->orWhere('verification_code', $query)
                ->first();

            if ($intern) {
                $result = [
                    'intern_id' => $intern->intern_id,
                    'name' => $intern->name,
                    'department' => $intern->department,
                    'period' => $intern->start_date->format('M d, Y') . ' to ' . $intern->end_date->format('M d, Y'),
                    'attendance_percentage' => $intern->attendance_percentage,
                    'total_days' => $intern->total_attendance_days,
                    'present_days' => $intern->present_days,
                    'attendance_status' => $intern->attendance_percentage >= 85 ? 'Verified Satisfactory' : 'Under Review',
                    'verification_status' => $intern->verification_status,
                ];
            }
        }

        return Inertia::render('Public/VerifyAttendance', [
            'searched' => $searched,
            'query' => $query,
            'attendance' => $result,
        ]);
    }

    public function downloadCertificate(string $code)
    {
        $intern = Intern::where('verification_code', $code)
            ->orWhere('intern_id', $code)
            ->firstOrFail();

        $pdf = Pdf::loadView('pdf.internship_certificate', compact('intern'))
            ->setPaper('a4', 'portrait');

        return $pdf->download("LMC-Certificate-{$intern->intern_id}.pdf");
    }

    public function contact(): Response
    {
        return Inertia::render('Public/Contact');
    }

    public function storeContact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:150',
            'phone' => 'nullable|string|max:50',
            'subject' => 'required|string|max:200',
            'message' => 'required|string|min:10|max:3000',
        ]);

        $validated['status'] = 'Unread';

        ContactMessage::create($validated);

        return back()->with('success', 'Your message has been received! Our enterprise technology team will respond shortly.');
    }
}
