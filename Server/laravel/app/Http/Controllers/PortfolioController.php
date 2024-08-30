<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    public function index()
    {
        $portfolios = Portfolio::all();
        return response()->json(['portfolios' => $portfolios]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'portfolio_title' => 'required|string|max:255',
            'portfolio_image' => 'required|string',
            'description' => 'required|string',
            'author' => 'required|string|max:255',
        ]);

        $portfolio = Portfolio::create($validatedData);

        return response()->json(['portfolio' => $portfolio], 201);
    }

    public function show($id)
    {
        $portfolio = Portfolio::findOrFail($id);
        return response()->json(['portfolio' => $portfolio]);
    }

    public function update(Request $request, $id)
    {
        $portfolio = Portfolio::findOrFail($id);

        $validatedData = $request->validate([
            'portfolio_title' => 'sometimes|string|max:255',
            'portfolio_image' => 'sometimes|string',
            'description' => 'sometimes|string',
            'author' => 'sometimes|string|max:255',
        ]);

        $portfolio->update($validatedData);

        return response()->json(['portfolio' => $portfolio]);
    }

    public function destroy($id)
    {
        $portfolio = Portfolio::findOrFail($id);
        $portfolio->delete();

        return response()->json(null, 204);
    }
}
