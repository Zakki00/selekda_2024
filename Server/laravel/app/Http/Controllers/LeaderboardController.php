<?php

namespace App\Http\Controllers;

use App\Models\Leaderboard;
use Illuminate\Http\Request;

class LeaderboardController extends Controller
{
    public function index()
    {
        $leaderboards = Leaderboard::orderBy('score', 'desc')->get();
        return response()->json(['leaderboards' => $leaderboards]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'username' => 'required|string|max:255',
            'score' => 'required|integer',
        ]);

        $leaderboard = Leaderboard::create($validatedData);

        return response()->json(['leaderboard' => $leaderboard], 201);
    }
}
