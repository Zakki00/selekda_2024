<?php

namespace App\Http\Controllers;

use App\Models\BlogComment;
use Illuminate\Http\Request;

class BlogCommentController extends Controller
{
    public function index()
    {
        $comments = BlogComment::all();
        return response()->json(['comments' => $comments]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'subject' => 'required|string|max:255',
            'website' => 'nullable|string|max:255',
            'comment' => 'required|string',
            'captcha' => 'required|string',
        ]);

        $comment = BlogComment::create($validatedData);

        return response()->json(['comment' => $comment], 201);
    }

    public function show($id)
    {
        $comment = BlogComment::findOrFail($id);
        return response()->json(['comment' => $comment]);
    }

    public function update(Request $request, $id)
    {
        $comment = BlogComment::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255',
            'subject' => 'sometimes|string|max:255',
            'website' => 'nullable|string|max:255',
            'comment' => 'sometimes|string',
            'captcha' => 'sometimes|string',
        ]);

        $comment->update($validatedData);

        return response()->json(['comment' => $comment]);
    }

    public function destroy($id)
    {
        $comment = BlogComment::findOrFail($id);
        $comment->delete();

        return response()->json(null, 204);
    }
}
