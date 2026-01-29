<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Skill;
use App\Http\Requests\Admin\StoreSkillRequest;
use App\Http\Requests\Admin\UpdateSkillRequest;

class SkillsController extends Controller
{
    public function index(Request $request)
    {
        $skills = Skill::orderBy('order')->paginate(20)->withQueryString();

        return Inertia::render('Admin/Skills', [
            'skills' => $skills,
            'user' => $request->user()?->only(['id', 'name', 'email', 'role']),
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('Admin/Skills/Create', ['user' => $request->user()?->only(['id', 'name'])]);
    }

    public function store(StoreSkillRequest $request)
    {
        Skill::create($request->validated());

        return redirect()->route('admin.skills.index')->with('success', 'Skill created.');
    }

    public function edit(Request $request, Skill $skill)
    {
        return Inertia::render('Admin/Skills/Edit', [
            'skill' => $skill,
            'user' => $request->user()?->only(['id', 'name']),
        ]);
    }

    public function show(Request $request, Skill $skill)
    {
        return Inertia::render('Admin/Skills/Show', [
            'skill' => $skill,
            'user' => $request->user()?->only(['id', 'name', 'role']),
        ]);
    }

    public function update(UpdateSkillRequest $request, Skill $skill)
    {
        $skill->update($request->validated());

        return redirect()->route('admin.skills.index')->with('success', 'Skill updated.');
    }

    public function updateAll(Request $request)
    {
        return redirect('/admin/skills', 303);
    }

    public function destroy(Skill $skill)
    {
        $skill->delete();

        return redirect()->route('admin.skills.index')->with('success', 'Skill deleted.');
    }

    public function destroyAll(Request $request)
    {
        return redirect('/admin/skills', 303);
    }
}
