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
        // Validate the request
        $validated = $request->validate([
            'reviewer_text' => 'string|required',
        ]);

        $reviewer_text = $validated['reviewer_text'];

        // Call the AI service
        $aiResponse = $this->quizService->generateQuiz($reviewer_text);

        // Default quiz array if extraction fails
        $quiz = [];

        // Step 1: Check if choices[0].text exists
        if (isset($aiResponse['choices'][0]['text'])) {
            $rawText = $aiResponse['choices'][0]['text'];

            // Step 2: Clean unwanted tokens or whitespace
            $cleanText = str_replace('<|eot_id|>', '', $rawText);
            $cleanText = trim($cleanText);

            // Step 3: Extract JSON from the text
            $start = strpos($cleanText, '{');
            $end = strrpos($cleanText, '}');

            if ($start !== false && $end !== false && $end > $start) {
                $jsonString = substr($cleanText, $start, $end - $start + 1);

                // Decode JSON safely
                $quiz = json_decode($jsonString, true);

                // If decoding fails, fallback to empty array
                if ($quiz === null) {
                    $quiz = [];
                }
            }
        }


        // Return the quiz to frontend
        return response()->json([
            'questions' => $quiz
        ]);
    }
}
