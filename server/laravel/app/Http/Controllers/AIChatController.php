<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AI\QuizService;
use App\Services\History\showHistory;
use App\Models\Quiz;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Throwable;

class AIChatController extends Controller
{
    protected $quizService;
    protected $showHistoryService;

    public function __construct(QuizService $quizService, showHistory $showHistoryService)
    {
        $this->quizService = $quizService;
        $this->showHistoryService = $showHistoryService;
    }

    public function generate(Request $request)
    {
        $validated = $request->validate([
            'title' => 'string|required|max:40',
            'reviewer_text' => 'string|required',
        ]);

        $title = $validated['title'];
        $reviewer_text = $validated['reviewer_text'];
        $user = 1;

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
                $quiz = json_decode($jsonString, true) ?? [];
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

        //questions from AI response
        $questions = $quiz['questions'] ?? null;
        if (!is_array($questions) || count($questions) === 0) {
            return response()->json([
                'error' => 'Invalid AI quiz format or empty questions'
            ], 422);
        }

        $quizModel = null;

        try {
            DB::transaction(function () use ($title, $questions, $user, &$quizModel) {
                $quizModel = Quiz::create([
                    'user_id' => (int) $user,
                    'title' => $title,
                    'last_score' => 0,
                ]);

                foreach ($questions as $q) {
                    if (!isset($q['question'], $q['choices']) || !is_array($q['choices'])) {
                        Log::warning('Invalid question format', $q);
                        continue;
                    }

                    $question = $quizModel->questions()->create([
                        'question' => $q['question'],
                    ]);

                    $answersData = collect($q['choices'])->map(fn ($choice) => [
                        'choice' => $choice[0] ?? '',
                        'isCorrect' => isset($choice[1]) ? (bool) $choice[1] : false,
                    ])->toArray();

                    if (!empty($answersData)) {
                        $question->answers()->createMany($answersData);
                    }
                }

            });


            if (!$quizModel || !$quizModel->id) {
                throw new \Exception('Quiz creation failed.');
            }

            $quizModel = Quiz::with('questions.answers')
                ->findOrFail($quizModel->id);

            return response()->json([
                'success' => true,
                'message' => 'Quiz generated and saved successfully',
                'quiz' => $quizModel,
            ]);

        } catch (\Throwable $e) {
            Log::error('Failed to save quiz', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'Failed to save quiz',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function history(Request $request){
        $user_id =  $request['user_id'];
        try{
            $quizzes = $this->showHistoryService->show($user_id);
            return response()->json([
                'history' => $quizzes,
            ], 200);
        }catch(\Throwable $e){
            return response()->json([
                'Error' => $e,
            ], 500);
        }
    }
}
