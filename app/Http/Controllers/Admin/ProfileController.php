<?php

// app/Http/Controllers/Admin/ProfileController.php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index(Request $request)
    {
        Gate::authorize('admin');

        $search = $request->input('search');
        $profiles = Profile::with('user')
            ->when($search, function ($query, $search) {
                return $query->whereHas('user', fn($q) => $q->where('name', 'like', "%{$search}%"))
                    ->orWhere('class_name', 'like', "%{$search}%");
            })
            ->orderBy('graduation_year', 'desc')
            ->paginate(15);

        return Inertia::render('Admin/Yearbook/Index', [
            'profiles' => $profiles,
            'filters' => ['search' => $search],
        ]);
    }

    public function create()
    {
        Gate::authorize('admin');
        $users = User::orderBy('name')->get(['id', 'name', 'email']);
        return Inertia::render('Admin/Yearbook/Create', [
            'users' => $users,
        ]);
    }

    public function store(Request $request)
    {
        Gate::authorize('admin');
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'graduation_year' => 'required|integer|min:1900|max:2100',
            'bio' => 'nullable|string|max:1000',
            'class_name' => 'nullable|string|max:100',
            'quote' => 'nullable|string|max:255',
            'interests' => 'nullable|array',
        ]);

        Profile::create($validated);

        return redirect()->route('admin.profiles.index')
            ->with('success', 'Yearbook entry created successfully.');
    }

    public function edit(Profile $profile)
    {
        Gate::authorize('admin');
        $users = User::orderBy('name')->get(['id', 'name', 'email']);
        return Inertia::render('Admin/Yearbook/Edit', [
            'profile' => $profile->load('user'),
            'users' => $users,
        ]);
    }

    public function update(Request $request, Profile $profile)
    {
        Gate::authorize('admin');
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'graduation_year' => 'required|integer|min:1900|max:2100',
            'bio' => 'nullable|string|max:1000',
            'class_name' => 'nullable|string|max:100',
            'quote' => 'nullable|string|max:255',
            'interests' => 'nullable|array',
        ]);

        $profile->update($validated);

        return redirect()->route('admin.profiles.index')
            ->with('success', 'Yearbook entry updated.');
    }

    public function destroy(Profile $profile)
    {
        Gate::authorize('admin');
        $profile->delete();
        return redirect()->route('admin.profiles.index')
            ->with('success', 'Entry deleted.');
    }
}