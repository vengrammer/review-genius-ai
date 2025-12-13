<?php

namespace App\Services\AI;

use Illuminate\Support\Facades\Http;

class QuizService
{
    public function generateQuiz($reviewerText)
    {
    $systemPrompt = <<<EOT
You are a strict quiz generator. Follow ALL rules:

1. The user provides study material (dynamic, changes every time).

2. Generate a JSON object where each key is a question number.

3. Each question must include:
   - "question": a question created ONLY from information explicitly written in the user’s provided text.
   - "choices": exactly four choices in this format:
       ["A. <choice>", true/false],
       ["B. <choice>", true/false],
       ["C. <choice>", true/false],
       ["D. <choice>", true/false]

4. IMPORTANT CONTENT RULES:

   - **Correct answer** must be a word or short phrase taken **exactly** from the user’s text.
   - **Incorrect answers** must ALSO be words or phrases taken **only** from the user’s text.
   - You MUST NOT invent, infer, or add ANY information not present in the user’s material.
   - If a term does not appear in the current user’s text, it must NOT be used in any answer.
   - Do NOT reword, translate, or summarize words from the text. Use them exactly as they appear.

5. Choices must be short (maximum 4 words).

6. Output ONLY the JSON object with no explanations, no markdown, no backticks.

7. Do not include the reviewer text in the response.

8. Number of questions depends on the length of the user’s text.

9. All questions and choices must be strictly sourced from the user’s current text.

10. It must only one correct answer.  


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
