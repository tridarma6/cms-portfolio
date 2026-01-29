<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use App\Models\Setting;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Load autoload settings and share with Inertia + config
        try {
            $autoload = Setting::where('autoload', true)->get()->pluck('value', 'key')->toArray();
            Inertia::share('settings', $autoload);
            config(['settings' => array_merge(config('settings', []), $autoload)]);
        } catch (\Throwable $e) {
            // ignore when DB/migrations aren't ready
        }
    }
}
