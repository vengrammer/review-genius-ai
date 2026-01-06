<?php

namespace App\Services\History;

use App\Models\Quiz;

class showHistory
{
    public function show($user_id){
        $quizzes = Quiz::where('user_id', $user_id)->get();
        return $quizzes;
    }
}
