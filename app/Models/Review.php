<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'company',
        'role',
        'rating',
        'service_or_product',
        'review',
        'is_verified_client',
        'status',
        'admin_notes',
    ];

    protected $casts = [
        'rating' => 'integer',
        'is_verified_client' => 'boolean',
    ];

    public function scopeApproved(Builder $query): Builder
    {
        return $query->where('status', 'Approved');
    }

    public function scopePending(Builder $query): Builder
    {
        return $query->where('status', 'Pending');
    }
}
