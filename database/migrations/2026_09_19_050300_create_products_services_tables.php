<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('summary');
            $table->longText('description');
            $table->json('features')->nullable();
            $table->json('technologies')->nullable();
            $table->string('icon')->default('Code'); // Lucide icon name
            $table->enum('status', ['Active', 'Inactive'])->default('Active');
            $table->integer('display_order')->default(0);
            $table->timestamps();
        });

        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('summary');
            $table->longText('description');
            $table->json('features')->nullable();
            $table->json('benefits')->nullable();
            $table->json('tech_stack')->nullable();
            $table->boolean('is_demo')->default(true); // Demo/Placeholder marker
            $table->enum('status', ['Available', 'In Development', 'Beta'])->default('Available');
            $table->integer('display_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
        Schema::dropIfExists('services');
    }
};
