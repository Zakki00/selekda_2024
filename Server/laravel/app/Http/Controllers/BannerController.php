<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use Illuminate\Http\Request;

class BannerController extends Controller
{
    public function index()
    {
        $banners = Banner::all();
        return response()->json(['banners' => $banners]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'banner_title' => 'required|string|max:255',
            'banner_image' => 'required|string',
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ]);

        $banner = Banner::create($validatedData);

        return response()->json(['banner' => $banner], 201);
    }

    public function show($id)
    {
        $banner = Banner::findOrFail($id);
        return response()->json(['banner' => $banner]);
    }

    public function update(Request $request, $id)
    {
        $banner = Banner::findOrFail($id);

        $validatedData = $request->validate([
            'banner_title' => 'sometimes|string|max:255',
            'banner_image' => 'sometimes|string',
            'description' => 'nullable|string',
            'status' => 'sometimes|in:active,inactive',
        ]);

        $banner->update($validatedData);

        return response()->json(['banner' => $banner]);
    }

    public function destroy($id)
    {
        $banner = Banner::findOrFail($id);
        $banner->delete();

        return response()->json(null, 204);
    }
}
