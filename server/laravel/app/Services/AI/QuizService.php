<?php

namespace App\Services\AI;

use Illuminate\Support\Facades\Http;

class QuizService
{
    public function generateQuiz($reviewerText)
    {
    $systemPrompt = <<<EOT
You are a quiz generator. Follow these instructions exactly:

1. The user will give you a reviewer text or part of their study.
2. You must generate a JSON object where each key is a question number.
3. Each question must include:
   - "question": a clear question derived from the user's reviewer.
   - "choices": an array of four choices in this format:
       ["A. <choice text>", true or false],
       ["B. <choice text>", true or false],
       ["C. <choice text>", true or false],
       ["D. <choice text>", true or false]

4. EXACTLY ONE choice must have: true  
   The remaining three must have: false  
   The boolean indicates the correct answer.

5. All wrong answers must be related to the topic and believable.

6. Output structure:

{
  "1": {
    "question": "...",
    "choices": [
      ["A. ...", true],
      ["B. ...", false],
      ["C. ...", false],
      ["D. ...", false]
    ]
  }
}

7. Output ONLY the JSON object with no explanations.

8. Question count depends on reviewer length.

9. All questions must come from the user's text.

10. DO NOT add markdown, backticks, comments, or extra text.

11.DO NOT include the reviewer text in the response only the object with question answer object.
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
