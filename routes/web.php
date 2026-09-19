<?php

use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\CrmController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\InternshipController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ReviewController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\InternDashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\StaffDashboardController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Corporate Website Routes
|--------------------------------------------------------------------------
*/
Route::get('/', [PublicController::class, 'home'])->name('public.home');
Route::get('/about', [PublicController::class, 'about'])->name('public.about');
Route::get('/services', [PublicController::class, 'services'])->name('public.services');
Route::get('/products', [PublicController::class, 'products'])->name('public.products');
Route::get('/reviews', [PublicController::class, 'reviews'])->name('public.reviews');
Route::post('/reviews', [PublicController::class, 'storeReview'])->name('public.reviews.store');
Route::get('/internship', [PublicController::class, 'internship'])->name('public.internship');
Route::get('/verify-internship', [PublicController::class, 'verifyInternship'])->name('public.verify-internship');
Route::get('/verify-attendance', [PublicController::class, 'verifyAttendance'])->name('public.verify-attendance');
Route::get('/certificate/download/{code}', [PublicController::class, 'downloadCertificate'])->name('public.certificate.download');
Route::get('/contact', [PublicController::class, 'contact'])->name('public.contact');
Route::post('/contact', [PublicController::class, 'storeContact'])->name('public.contact.store');

/*
|--------------------------------------------------------------------------
| Authenticated Multi-Role Routing
|--------------------------------------------------------------------------
*/
Route::middleware(['auth'])->group(function () {
    // Smart role-based dashboard router
    Route::get('/dashboard', function () {
        $user = auth()->user();
        if ($user->hasRole('Admin')) {
            return redirect()->route('admin.dashboard');
        } elseif ($user->hasRole('Staff')) {
            return redirect()->route('staff.dashboard');
        } elseif ($user->hasRole('Intern')) {
            return redirect()->route('intern.dashboard');
        }
        return redirect()->route('admin.dashboard');
    })->name('dashboard');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Staff Portal
    Route::prefix('staff')->name('staff.')->group(function () {
        Route::get('/dashboard', [StaffDashboardController::class, 'index'])->name('dashboard');
    });

    // Intern Portal
    Route::prefix('intern')->name('intern.')->group(function () {
        Route::get('/dashboard', [InternDashboardController::class, 'index'])->name('dashboard');
        Route::get('/certificate', [InternDashboardController::class, 'downloadMyCertificate'])->name('certificate');
    });

    // Admin & Staff Management Portal
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

        // CRM: Customers
        Route::get('/crm/customers', [CrmController::class, 'customers'])->name('crm.customers');
        Route::post('/crm/customers', [CrmController::class, 'storeCustomer'])->name('crm.customers.store');
        Route::put('/crm/customers/{customer}', [CrmController::class, 'updateCustomer'])->name('crm.customers.update');
        Route::delete('/crm/customers/{customer}', [CrmController::class, 'destroyCustomer'])->name('crm.customers.destroy');

        // CRM: Leads
        Route::get('/crm/leads', [CrmController::class, 'leads'])->name('crm.leads');
        Route::post('/crm/leads', [CrmController::class, 'storeLead'])->name('crm.leads.store');
        Route::put('/crm/leads/{lead}', [CrmController::class, 'updateLead'])->name('crm.leads.update');
        Route::delete('/crm/leads/{lead}', [CrmController::class, 'destroyLead'])->name('crm.leads.destroy');

        // CRM: Follow-ups & Tasks
        Route::get('/crm/follow-ups', [CrmController::class, 'followUps'])->name('crm.followups');
        Route::post('/crm/follow-ups', [CrmController::class, 'storeFollowUp'])->name('crm.followups.store');
        Route::put('/crm/follow-ups/{followUp}', [CrmController::class, 'updateFollowUp'])->name('crm.followups.update');

        Route::get('/crm/tasks', [CrmController::class, 'tasks'])->name('crm.tasks');
        Route::post('/crm/tasks', [CrmController::class, 'storeTask'])->name('crm.tasks.store');
        Route::put('/crm/tasks/{task}', [CrmController::class, 'updateTask'])->name('crm.tasks.update');
        Route::delete('/crm/tasks/{task}', [CrmController::class, 'destroyTask'])->name('crm.tasks.destroy');

        // Internships & Attendance
        Route::get('/internships', [InternshipController::class, 'index'])->name('internships.index');
        Route::post('/internships', [InternshipController::class, 'store'])->name('internships.store');
        Route::put('/internships/{intern}', [InternshipController::class, 'update'])->name('internships.update');
        Route::delete('/internships/{intern}', [InternshipController::class, 'destroy'])->name('internships.destroy');
        Route::post('/internships/{intern}/toggle-verification', [InternshipController::class, 'toggleVerification'])->name('internships.toggle-verification');
        Route::get('/internships/{intern}/pdf', [InternshipController::class, 'downloadPdf'])->name('internships.pdf');

        Route::get('/attendance', [InternshipController::class, 'attendance'])->name('attendance.index');
        Route::post('/attendance', [InternshipController::class, 'storeAttendance'])->name('attendance.store');

        // Review Moderation Workflow
        Route::get('/reviews', [ReviewController::class, 'index'])->name('reviews.index');
        Route::post('/reviews/{review}/approve', [ReviewController::class, 'approve'])->name('reviews.approve');
        Route::post('/reviews/{review}/reject', [ReviewController::class, 'reject'])->name('reviews.reject');
        Route::post('/reviews/{review}/toggle-verified', [ReviewController::class, 'toggleVerified'])->name('reviews.toggle-verified');
        Route::delete('/reviews/{review}', [ReviewController::class, 'destroy'])->name('reviews.destroy');

        // Products & Services
        Route::get('/products', [ProductController::class, 'index'])->name('products.index');
        Route::post('/products', [ProductController::class, 'store'])->name('products.store');
        Route::put('/products/{product}', [ProductController::class, 'update'])->name('products.update');
        Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');

        Route::get('/services', [ServiceController::class, 'index'])->name('services.index');
        Route::post('/services', [ServiceController::class, 'store'])->name('services.store');
        Route::put('/services/{service}', [ServiceController::class, 'update'])->name('services.update');
        Route::delete('/services/{service}', [ServiceController::class, 'destroy'])->name('services.destroy');

        // Users & Roles
        Route::get('/users', [UserController::class, 'index'])->name('users.index');
        Route::post('/users', [UserController::class, 'store'])->name('users.store');
        Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
        Route::post('/users/{user}/toggle-active', [UserController::class, 'toggleActive'])->name('users.toggle-active');
        Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');

        // Contact Messages
        Route::get('/contacts', [ContactController::class, 'index'])->name('contacts.index');
        Route::put('/contacts/{message}', [ContactController::class, 'updateStatus'])->name('contacts.update');
        Route::delete('/contacts/{message}', [ContactController::class, 'destroy'])->name('contacts.destroy');
    });
});

require __DIR__.'/auth.php';
