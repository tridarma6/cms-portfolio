<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use App\Models\Setting;

class SettingsServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        try {
            $autoload = Setting::where('autoload', true)->get()->pluck('value', 'key')->toArray();

            // Share with Inertia so frontend components can access settings
            Inertia::share('settings', $autoload);

            // Also set into config for backend usage
            config(['settings' => array_merge(config('settings', []), $autoload)]);
        } catch (\Throwable $e) {
            // If migrations haven't run yet, avoid breaking boot (e.g., during artisan migrate)
        }
    }

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
