<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'summary',
        'description',
        'features',
        'technologies',
        'icon',
        'status',
        'display_order',
    ];

    protected $casts = [
        'features' => 'array',
        'technologies' => 'array',
    ];
}
