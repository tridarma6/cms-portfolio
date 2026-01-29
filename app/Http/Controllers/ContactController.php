<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        $settings = Setting::whereIn('key', ['contact_email', 'phone', 'location', 'site_title', 'site_description'])
            ->where('autoload', true)
            ->pluck('value', 'key')
            ->toArray();

        return Inertia::render('Contact', [
            'contactInfo' => $settings,
        ]);
    }
}