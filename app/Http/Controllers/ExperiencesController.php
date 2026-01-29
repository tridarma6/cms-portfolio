<?php

namespace App\Http\Controllers;

use App\Models\Experience;
use App\Models\Setting;
use Inertia\Inertia;

class ExperiencesController extends Controller
{
    public function index()
    {
        $experiences = Experience::orderBy('order')
            ->orderBy('start_date', 'desc')
            ->get();
        $settings = Setting::whereIn('key', ['site_title', 'site_description'])
            ->where('autoload', true)
            ->pluck('value', 'key')
            ->toArray();

        return Inertia::render('Experiences', [
            'experiences' => $experiences,
            'settings' => $settings,
        ]);
    }
}