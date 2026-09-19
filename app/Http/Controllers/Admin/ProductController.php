<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $products = Product::orderBy('display_order')->get();

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'summary' => 'required|string|max:300',
            'description' => 'required|string',
            'features' => 'nullable|array',
            'benefits' => 'nullable|array',
            'tech_stack' => 'nullable|array',
            'is_demo' => 'boolean',
            'status' => 'required|in:Available,In Development,Beta',
            'display_order' => 'integer',
        ]);

        $validated['slug'] = Str::slug($validated['name']) . '-' . rand(100, 999);

        Product::create($validated);

        return back()->with('success', 'Product registered successfully.');
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'summary' => 'required|string|max:300',
            'description' => 'required|string',
            'features' => 'nullable|array',
            'benefits' => 'nullable|array',
            'tech_stack' => 'nullable|array',
            'is_demo' => 'boolean',
            'status' => 'required|in:Available,In Development,Beta',
            'display_order' => 'integer',
        ]);

        $product->update($validated);

        return back()->with('success', 'Product updated successfully.');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return back()->with('success', 'Product deleted.');
    }
}
