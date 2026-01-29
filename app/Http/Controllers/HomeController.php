<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Setting;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $projects = Project::where('is_featured', true)
            ->with('images')
            ->orderBy('published_at', 'desc')
            ->take(6)
            ->get();

        $settings = Setting::whereIn('key', ['site_title', 'site_description'])
            ->where('autoload', true)
            ->pluck('value', 'key')
            ->toArray();

        return Inertia::render('Home', [
            'projects' => $projects,
            'settings' => $settings,
        ]);
    }
}