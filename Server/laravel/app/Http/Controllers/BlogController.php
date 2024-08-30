<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::all();
        return response()->json(['blogs' => $blogs]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'blog_image' => 'required|string',
            'blog_title' => 'required|string|max:255',
            'description' => 'required|string',
            'author' => 'required|string|max:255',
            'tags' => 'nullable|string',
        ]);

        $blog = Blog::create($validatedData);

        return response()->json(['blog' => $blog], 201);
    }

    public function show($id)
    {
        $blog = Blog::findOrFail($id);
        return response()->json(['blog' => $blog]);
    }

    public function update(Request $request, $id)
    {
        $blog = Blog::findOrFail($id);

        $validatedData = $request->validate([
            'blog_image' => 'sometimes|string',
            'blog_title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'author' => 'sometimes|string|max:255',
            'tags' => 'nullable|string',
        ]);

        $blog->update($validatedData);

        return response()->json(['blog' => $blog]);
    }

    public function destroy($id)
    {
        $blog = Blog::findOrFail($id);
        $blog->delete();

        return response()->json(null, 204);
    }
}
