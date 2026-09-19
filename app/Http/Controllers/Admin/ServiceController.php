<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function index(): Response
    {
        $services = Service::orderBy('display_order')->get();

        return Inertia::render('Admin/Services/Index', [
            'services' => $services,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'summary' => 'required|string|max:300',
            'description' => 'required|string',
            'features' => 'nullable|array',
            'technologies' => 'nullable|array',
            'icon' => 'required|string|max:50',
            'status' => 'required|in:Active,Inactive',
            'display_order' => 'integer',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        Service::create($validated);

        return back()->with('success', 'Service offering created.');
    }

    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'summary' => 'required|string|max:300',
            'description' => 'required|string',
            'features' => 'nullable|array',
            'technologies' => 'nullable|array',
            'icon' => 'required|string|max:50',
            'status' => 'required|in:Active,Inactive',
            'display_order' => 'integer',
        ]);

        $service->update($validated);

        return back()->with('success', 'Service updated successfully.');
    }

    public function destroy(Service $service)
    {
        $service->delete();
        return back()->with('success', 'Service deleted.');
    }
}
