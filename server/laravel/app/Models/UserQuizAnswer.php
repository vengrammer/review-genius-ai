<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserQuizAnswer extends Model
{
    protected $fillable = [
        'user_id',
        'quiz_id',
        'question_id',
        'answer_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function quiz(): BelongsTo
    {
        return $this->belongsTo(Quiz::class);
    }
    public function question(): BelongsTo
    {
        return $this->belongsTo(Question::class);
    }
    public function answer(): BelongsTo
    {
        return $this->belongsTo(Answer::class);
    }
}
