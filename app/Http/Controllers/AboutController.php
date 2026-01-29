<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\Setting;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function index()
    {
        $profile = Profile::first(); // Assuming single profile for the site
        $settings = Setting::whereIn('key', ['site_title', 'site_description'])
            ->where('autoload', true)
            ->pluck('value', 'key')
            ->toArray();

        return Inertia::render('About', [
            'profile' => $profile,
            'settings' => $settings,
        ]);
    }
}