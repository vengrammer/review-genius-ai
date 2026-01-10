<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    public function userSignup(Request $request){
        $user_data = $request->validate([
            'fullname' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'fullname' => $user_data['fullname'],
            'username' => $user_data['username'],
            'password' => Hash::make($user_data['password']),
        ]);

        $token = JWTAuth::fromUser($user);
        return response()->json([
            'message' => 'User registered successfully',
            'token' => $token,
            'user' => $user,
        ],201);
    }
}
