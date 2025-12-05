<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Question extends Model
{
    protected $fillable = [
        'quiz_id',
        'question'
    ];

    public function quiz(): BelongsTo{
        return $this->belongsTo(Quiz::class);
    }

    public function answers(): HasMany{
        return $this->hasMany(Answer::class);
    }
}
