<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AI\QuizService;

class AIChatController extends Controller
{
    protected $quizService;

    public function __construct(QuizService $quizService)
    {
        $this->quizService = $quizService;
    }

    public function generate(Request $request)
    {
        $validated = $request->validate([
            'reviewer_text' => 'string|required',
        ]);

        $reviewer_text = $validated['reviewer_text'];

        $aiResponse = $this->quizService->generateQuiz($reviewer_text);

        $quiz = [];

        if (isset($aiResponse['choices'][0]['text'])) {
            $rawText = $aiResponse['choices'][0]['text'];

            $cleanText = str_replace('<|eot_id|>', '', $rawText);
            $cleanText = trim($cleanText);

            $start = strpos($cleanText, '{');
            $end = strrpos($cleanText, '}');

            if ($start !== false && $end !== false && $end > $start) {
                $jsonString = substr($cleanText, $start, $end - $start + 1);

                $quiz = json_decode($jsonString, true);

                if ($quiz === null) {
                    $quiz = [];
                }
            }else {
                return response()->json([
                    'error' => 'theres an error in regenerating the quiz.'
                ],400);
            }
        }

        // Return the quiz to frontend
        return response()->json([
            'questions' => $quiz
        ]);
    }
}
