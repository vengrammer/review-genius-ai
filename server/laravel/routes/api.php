<?php

use App\Http\Controllers\AIChatController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/hey', function () {
    return ['name' => "hello from api"];
});
Route::post('/ai/generatequiz', [AIChatController::class, 'generate']);
Route::get('/history', [AIChatController::class, 'history']);
Route::post('auth/register',[UserController::class,'userSignup']);