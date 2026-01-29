<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Experience;

class DashboardController extends Controller
{
    /**
     * Show the admin dashboard.
     */
    public function index(Request $request)
    {
        $experiences = Experience::orderBy('order', 'asc')
            ->get(['id', 'company', 'role', 'start_date', 'end_date', 'is_current']);

        return Inertia::render('Admin/Dashboard', [
            'user' => $request->user()?->only(['id', 'name', 'email', 'role']),
            'experiences' => $experiences,
        ]);
    }
}
