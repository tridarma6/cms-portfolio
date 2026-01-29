<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Setting;
use App\Http\Requests\Admin\UpdateSettingRequest;

class SettingsController extends Controller
{
    public function index(Request $request)
    {
        $settings = Setting::orderBy('id')->get();

        return Inertia::render('Admin/Settings', [
            'settings' => $settings,
            'user' => $request->user()?->only(['id', 'name', 'email', 'role']),
        ]);
    }

    public function edit(Request $request, Setting $setting)
    {
        return Inertia::render('Admin/Settings/Edit', [
            'setting' => $setting,
            'user' => $request->user()?->only(['id', 'name', 'email', 'role']),
        ]);
    }

    public function update(UpdateSettingRequest $request, Setting $setting)
    {
        $setting->update($request->validated());

        return redirect()->route('admin.settings.index')->with('success', 'Setting updated.');
    }

    public function updateAll(Request $request)
    {
        return redirect('/admin/settings', 303);
    }
}
