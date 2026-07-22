<?php

// app/Http/Controllers/YearbookController.php
namespace App\Http\Controllers;

use App\Models\Profile;
use Inertia\Inertia;
use Illuminate\Http\Request;

class YearbookController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $profiles = Profile::with('user')
            ->when($search, function ($query, $search) {
                return $query->whereHas('user', fn($q) => $q->where('name', 'like', "%{$search}%"))
                    ->orWhere('class_name', 'like', "%{$search}%");
            })
            ->orderBy('graduation_year', 'desc')
            ->get();

        return Inertia::render('Yearbook', [
            'profiles' => $profiles,
            'search' => $search ?? '', // pass to frontend
        ]);
    }
}