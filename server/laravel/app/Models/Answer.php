<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Answer extends Model
{
    protected $fillable = [
        'question_id',
        'choice',
        'isCorrect',
    ];

    public function question() : BelongsTo{
        return $this->belongsTo(Question::class);
    }
}
