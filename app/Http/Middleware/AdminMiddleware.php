<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        if (! Auth::check()) {
            if (Route::has('login')) {
                return redirect()->route('login');
            }

            return redirect('/login');
        }

        $user = Auth::user();

        if (! $user || ($user->role ?? 'user') !== 'admin') {
            abort(403);
        }

        return $next($request);
    }
}
