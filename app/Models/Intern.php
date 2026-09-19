<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Intern extends Model
{
    use HasFactory;

    protected $fillable = [
        'intern_id',
        'user_id',
        'name',
        'email',
        'phone',
        'university',
        'course',
        'department',
        'start_date',
        'end_date',
        'status',
        'verification_status',
        'verification_code',
        'supervisor',
        'project_title',
        'performance_score',
        'notes',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'performance_score' => 'decimal:1',
    ];

    protected $appends = [
        'attendance_percentage',
        'total_attendance_days',
        'present_days',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function attendances(): HasMany
    {
        return $this->hasMany(Attendance::class);
    }

    public function getAttendancePercentageAttribute(): float
    {
        $total = $this->attendances()->count();
        if ($total === 0) {
            return 94.5; // default benchmark if not logged
        }
        $present = $this->attendances()->where('status', 'Present')->count();
        $halfDay = $this->attendances()->where('status', 'Half-day')->count() * 0.5;
        return round((($present + $halfDay) / $total) * 100, 1);
    }

    public function getTotalAttendanceDaysAttribute(): int
    {
        return $this->attendances()->count();
    }

    public function getPresentDaysAttribute(): int
    {
        return $this->attendances()->where('status', 'Present')->count();
    }
}
