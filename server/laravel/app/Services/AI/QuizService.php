<?php

namespace App\Services\AI;

use Illuminate\Support\Facades\Http;

class QuizService
{
    public function generateQuiz($reviewerText)
    {
        $systemPrompt = <<<EOT
        1.You are a strict quiz generator. Follow ALL rules:

        2.The user provides study material (dynamic, changes every time).

        3.Generate a JSON object with a single key "questions" that contains a list of questions.

        4.Each question must be a JSON object with:
        "question": a question created ONLY from information explicitly written in the user’s provided text, and the question text must start with the question number automatically (e.g., "1. What is photosynthesis?").

        "choices": exactly four choices in this format:
        ["A. <choice>", true/false],
        ["B. <choice>", true/false],
        ["C. <choice>", true/false],
        ["D. <choice>", true/false]

        IMPORTANT CONTENT RULES:

        Correct answer must be a word or short phrase taken exactly from the user’s text.

        Incorrect answers must also be words or phrases taken only from the user’s text.

        Do NOT invent, infer, or add ANY information not present in the user’s material.

        Choices must be short (maximum 4 words).

        Only one correct answer per question.

        Output ONLY the JSON object with key "questions" containing the list of numbered questions. Do not include numeric keys, explanations, or any extra text.

        Number of questions depends on the length of the user’s text.

        All questions and choices must be strictly sourced from the user’s current text.


EOT;
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('CEREBRAS_API_KEY'),
            'Content-Type' => 'application/json',
        ])->post(env('CEREBRAS_API_URL'), [
            'model' => 'llama-3.3-70b',
            'prompt' => $systemPrompt . "\n\nUser Text: " . $reviewerText,
        ]);
        return $response->json();
    }
}
