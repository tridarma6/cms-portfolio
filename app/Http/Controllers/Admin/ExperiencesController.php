<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Experience;
use App\Http\Requests\Admin\StoreExperienceRequest;
use App\Http\Requests\Admin\UpdateExperienceRequest;

class ExperiencesController extends Controller
{
    public function index(Request $request)
    {
        $items = Experience::orderBy('start_date', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('Admin/Experiences', [
            'experiences' => $items,
            'user' => $request->user()?->only(['id', 'name', 'email', 'role']),
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('Admin/Experiences/Create', ['user' => $request->user()?->only(['id', 'name'])]);
    }

    public function store(StoreExperienceRequest $request)
    {
        Experience::create($request->validated());

        return redirect()->route('admin.experiences.index')->with('success', 'Experience created.');
    }

    public function edit(Request $request, Experience $experience)
    {
        return Inertia::render('Admin/Experiences/Edit', [
            'experience' => $experience,
            'user' => $request->user()?->only(['id', 'name']),
        ]);
    }

    /**
     * Display the specified experience.
     */
    public function show(Request $request, Experience $experience)
    {
        return Inertia::render('Admin/Experiences/Show', [
            'experience' => $experience,
            'user' => $request->user()?->only(['id', 'name', 'email']),
        ]);
    }

    public function update(UpdateExperienceRequest $request, Experience $experience)
    {
        $experience->update($request->validated());

        return redirect()->route('admin.experiences.index')->with('success', 'Experience updated.');
    }

    public function updateAll(Request $request)
    {
        return redirect('/admin/experiences', 303);
    }




    public function destroy(Experience $experience)
    {
        $experience->delete();

        return redirect()->route('admin.experiences.index')->with('success', 'Experience deleted.');
    }

    public function destroyAll(Request $request)
    {
        return redirect('/admin/experiences', 303);
    }
}
