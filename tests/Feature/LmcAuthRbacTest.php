<?php

namespace Tests\Feature;

use App\Models\Review;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LmcAuthRbacTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(DatabaseSeeder::class);
    }

    public function test_admin_can_access_management_portal(): void
    {
        $admin = User::where('email', 'admin@lmcglobal.tech')->first();

        $this->actingAs($admin)->get('/admin/dashboard')->assertStatus(200);
        $this->actingAs($admin)->get('/admin/crm/customers')->assertStatus(200);
        $this->actingAs($admin)->get('/admin/crm/leads')->assertStatus(200);
        $this->actingAs($admin)->get('/admin/internships')->assertStatus(200);
        $this->actingAs($admin)->get('/admin/reviews')->assertStatus(200);
        $this->actingAs($admin)->get('/admin/products')->assertStatus(200);
        $this->actingAs($admin)->get('/admin/services')->assertStatus(200);
        $this->actingAs($admin)->get('/admin/users')->assertStatus(200);
        $this->actingAs($admin)->get('/admin/contacts')->assertStatus(200);
    }

    public function test_admin_can_approve_pending_review(): void
    {
        $admin = User::where('email', 'admin@lmcglobal.tech')->first();
        $review = Review::where('status', 'Pending')->first();
        $this->assertNotNull($review);

        $response = $this->actingAs($admin)->post("/admin/reviews/{$review->id}/approve");
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('reviews', [
            'id' => $review->id,
            'status' => 'Approved',
            'is_verified_client' => true,
        ]);
    }

    public function test_staff_can_access_staff_workspace(): void
    {
        $staff = User::where('email', 'staff@lmcglobal.tech')->first();

        $this->actingAs($staff)->get('/staff/dashboard')->assertStatus(200);
        $this->actingAs($staff)->get('/admin/crm/customers')->assertStatus(200);
        $this->actingAs($staff)->get('/admin/crm/leads')->assertStatus(200);
    }

    public function test_intern_can_access_intern_portal(): void
    {
        $internUser = User::where('email', 'intern@lmcglobal.tech')->first();

        $this->actingAs($internUser)->get('/intern/dashboard')->assertStatus(200);
        $this->actingAs($internUser)->get('/intern/certificate')->assertStatus(200);
    }
}
