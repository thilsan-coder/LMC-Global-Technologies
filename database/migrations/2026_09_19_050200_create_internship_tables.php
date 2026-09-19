<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('interns', function (Blueprint $table) {
            $table->id();
            $table->string('intern_id')->unique(); // e.g. LMC-INT-2026-001
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->string('university');
            $table->string('course');
            $table->string('department'); // e.g. Software Engineering, AI & Cloud, Cybersecurity
            $table->date('start_date');
            $table->date('end_date');
            $table->enum('status', ['Active', 'Completed', 'Terminated'])->default('Active');
            $table->enum('verification_status', ['Verified', 'Pending', 'Revoked'])->default('Verified');
            $table->string('verification_code')->unique(); // unique security hash for QR/Certificate
            $table->string('supervisor')->nullable();
            $table->string('project_title')->nullable();
            $table->decimal('performance_score', 4, 1)->nullable(); // e.g. 95.5%
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('intern_id')->constrained('interns')->cascadeOnDelete();
            $table->date('date');
            $table->time('check_in')->nullable();
            $table->time('check_out')->nullable();
            $table->enum('status', ['Present', 'Absent', 'Half-day', 'Leave'])->default('Present');
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->unique(['intern_id', 'date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('attendances');
        Schema::dropIfExists('interns');
    }
};
