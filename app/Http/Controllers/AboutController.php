<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\Setting;
use App\Models\Skill;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function index()
    {
        $profile = Profile::first(); // Assuming single profile for the site
        $settings = Setting::whereIn('key', ['site_title', 'site_description', 'philosophy'])
            ->where('autoload', true)
            ->pluck('value', 'key')
            ->toArray();
        $skills = Skill::orderByDesc('proficiency')->get();

        return Inertia::render('About', [
            'profile' => $profile,
            'settings' => $settings,
            'skills' => $skills
        ]);
    }
}