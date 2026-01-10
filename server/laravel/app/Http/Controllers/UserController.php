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

    public function userLogin(Request $request){
        $user_data = $request->validate([
            'username' => 'required|string|max:255',
            'password' => 'required|string|min:8'
        ]);

        $user = User::where('username', $user_data['username'])->first();

        if(!$user || !Hash::check($user_data['password'], $user->password)){
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
        $token = JWTAuth::fromUser($user);
        return response()->json([
            'message' => 'User logged in successfully',
            'token' => $token,
            'user' => $user,
        ]);
    }

     public function userLogout(Request $request){
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }
}
