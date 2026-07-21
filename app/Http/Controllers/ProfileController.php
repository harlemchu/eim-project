<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Profile;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    // public function update(ProfileUpdateRequest $request): RedirectResponse
    // {
    //     $request->user()->fill($request->validated());

    //     if ($request->user()->isDirty('email')) {
    //         $request->user()->email_verified_at = null;
    //     }

    //     $request->user()->save();

    //     return Redirect::route('profile.edit');
    // }
    public function update(Request $request, Profile $profile)
    {
        // Authorization check (optional)
        $this->authorize('update', $profile);

        $validated = $request->validate([
            'bio' => 'nullable|string|max:1000',
            'graduation_year' => 'required|integer|min:1900|max:2100',
            'class_name' => 'nullable|string|max:100',
            'quote' => 'nullable|string|max:255',
            'interests' => 'nullable|array',
        ]);

        $profile->update($validated);

        return redirect()->back()->with('success', 'Profile updated.');
    }

    public function uploadAvatar(Request $request, Profile $profile)
    {
        $this->authorize('update', $profile);

        $request->validate([
            'avatar' => 'required|image|max:2048', // 2MB max
        ]);

        // Delete old avatar if exists
        if ($profile->avatar) {
            Storage::disk('public')->delete($profile->avatar);
        }

        $path = $request->file('avatar')->store('avatars', 'public');
        $profile->update(['avatar' => $path]);

        return redirect()->back()->with('success', 'Avatar updated.');
    }
    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
