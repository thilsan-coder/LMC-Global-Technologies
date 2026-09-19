<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'summary',
        'description',
        'features',
        'benefits',
        'tech_stack',
        'is_demo',
        'status',
        'display_order',
    ];

    protected $casts = [
        'features' => 'array',
        'benefits' => 'array',
        'tech_stack' => 'array',
        'is_demo' => 'boolean',
    ];
}
