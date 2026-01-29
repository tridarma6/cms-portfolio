<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Profile;
use App\Http\Requests\Admin\UpdateProfileRequest;

class ProfilesController extends Controller
{
  public function edit(Request $request)
  {
    $profile = Profile::firstOrNew([
      'user_id' => $request->user()->id
    ]);

    return Inertia::render('Admin/Profiles/Edit', [
      'profile' => $profile,
      'user' => $request->user()->only(['id', 'name', 'email', 'role']),
    ]);
  }

  public function update(UpdateProfileRequest $request)
  {
    $profile = Profile::firstOrNew([
      'user_id' => $request->user()->id
    ]);

    $profile->fill($request->validated());
    $profile->save();

    return back()->with('success', 'Profile updated.');
  }

  public function updateAll(Request $request)
  {
      return redirect('/admin/profile/edit', 303);
  }
}
