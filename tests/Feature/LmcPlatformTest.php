<?php

namespace Tests\Feature;

use App\Models\Intern;
use App\Models\Review;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LmcPlatformTest extends TestCase
{
    public function test_public_corporate_pages_render_successfully(): void
    {
        $this->get('/')->assertStatus(200);
        $this->get('/about')->assertStatus(200);
        $this->get('/services')->assertStatus(200);
        $this->get('/products')->assertStatus(200);
        $this->get('/reviews')->assertStatus(200);
        $this->get('/internship')->assertStatus(200);
        $this->get('/verify-internship')->assertStatus(200);
        $this->get('/verify-attendance')->assertStatus(200);
        $this->get('/contact')->assertStatus(200);
    }

    public function test_internship_verification_lookup_works(): void
    {
        $response = $this->get('/verify-internship?query=LMC-INT-2026-001');
        $response->assertStatus(200);
        $response->assertSee('Nimesh Fernando');
        $response->assertSee('University of Colombo');
    }

    public function test_attendance_verification_lookup_works(): void
    {
        $response = $this->get('/verify-attendance?query=LMC-INT-2026-001');
        $response->assertStatus(200);
        $response->assertSee('Nimesh Fernando');
    }

    public function test_review_submission_defaults_to_pending(): void
    {
        $response = $this->post('/reviews', [
            'name' => 'Kavindu Senaratne',
            'email' => 'kavindu@testcorp.lk',
            'company' => 'Test Corp PLC',
            'role' => 'VP Technology',
            'rating' => 5,
            'service_or_product' => 'Web Application Development',
            'review' => 'Exceptional architectural delivery by LMC Global Technologies.',
        ]);

        $response->assertSessionHas('success');

        $this->assertDatabaseHas('reviews', [
            'email' => 'kavindu@testcorp.lk',
            'status' => 'Pending',
        ]);
    }

    public function test_contact_message_submission_works(): void
    {
        $response = $this->post('/contact', [
            'name' => 'Saman Perera',
            'email' => 'saman@partner.lk',
            'phone' => '+94 77 111 2233',
            'subject' => 'Cloud Migration Consultation',
            'message' => 'We require assistance migrating our legacy database to AWS.',
        ]);

        $response->assertSessionHas('success');

        $this->assertDatabaseHas('contact_messages', [
            'email' => 'saman@partner.lk',
            'status' => 'Unread',
        ]);
    }

    public function test_pdf_certificate_generation(): void
    {
        $intern = Intern::first();
        if ($intern) {
            $response = $this->get("/certificate/download/{$intern->verification_code}");
            $response->assertStatus(200);
            $response->assertHeader('content-type', 'application/pdf');
        }
    }
}
