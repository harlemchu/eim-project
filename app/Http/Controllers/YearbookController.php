<?php

// app/Http/Controllers/YearbookController.php
namespace App\Http\Controllers;

use App\Models\Profile;
use Inertia\Inertia;

class YearbookController extends Controller
{
    public function index()
    {
        $profiles = Profile::with('user')
            ->orderBy('graduation_year', 'desc')
            ->get();

        return Inertia::render('Yearbook', [
            'profiles' => $profiles,
        ]);
    }
}