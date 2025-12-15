<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AI\QuizService;
use App\Models\Quiz;
use App\Models\Question;
use App\Models\Answer;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Throwable;

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
            'title' => 'string|required|max:40',
            'reviewer_text' => 'string|required',
        ]);

        $title = $validated['title'];
        $reviewer_text = $validated['reviewer_text']; 
        $user = $request->user();

        $aiResponse = $this->quizService->generateQuiz($reviewer_text);

        $quiz = [];

        if (isset($aiResponse['choices'][0]['text'])) {
            $rawText = $aiResponse['choices'][0]['text'];

            // Clean text
            $cleanText = str_replace('<|eot_id|>', '', $rawText);
            $cleanText = trim($cleanText);

            // Extract JSON substring
            $start = strpos($cleanText, '{');
            $end = strrpos($cleanText, '}');

            if ($start !== false && $end !== false && $end > $start) {
                $jsonString = substr($cleanText, $start, $end - $start + 1);

                $quiz = json_decode($jsonString, true);

                if ($quiz === null) {
                    $quiz = [];
                }
            } else {
                return response()->json([
                    'error' => 'There was an error parsing the AI quiz.'
                ], 400);
            }
        } else {
            return response()->json([
                'error' => 'AI did not return any quiz text.'
            ], 400);
        }

        //bago ipasok sa database check muna kung meron bang laman quiz
       if (!isset($quiz['questions']) || !is_array($quiz['questions']) || count($quiz['questions']) === 0) {
            return response()->json([
                'error' => 'Invalid AI quiz format or empty questions'
            ], 422);
        }


        try{
            DB::transaction(function() use ($title, $quiz, $user){
                //insert quiz
                $quizModel = Quiz::create([
                    'user_id' => $user->id,
                    'title' => $title,
                    'last_score' => 0, 
                ]);

                foreach($quiz['questions'] as $q){
                    $question = $quizModel->questions()->create([
                        'question' => $q['question'],
                    ]);

                    $question->answers()->createMany(
                        collect($q['choices'])->map(fn($choice) => [
                            'answer_text' => $choice[0],
                            'is_correct' => (bool) $choice[1],
                        ])->toArray()
                    );
                }
            });

            return response()->json([
                'success' => true,
                'message' => 'Quiz generated and saved successfully',
            ]);
        }catch(\Throwable $e){
             return response()->json([
                'success' => false,
                'message' => 'Failed to save quiz',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
