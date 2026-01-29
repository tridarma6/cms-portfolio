<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Setting;
use App\Models\ProjectTag;
use Inertia\Inertia;

class ProjectsController extends Controller
{
    public function index()
    {
        $projects = Project::where('is_featured', true)
            ->with(['images', 'tags'])
            ->orderBy('published_at', 'desc')
            ->get();
        
        $tags = ProjectTag::withCount('projects')
            ->having('projects_count', '>', 0)
            ->orderBy('name')
            ->get();
        
        $settings = Setting::whereIn('key', ['site_title', 'site_description'])
            ->where('autoload', true)
            ->pluck('value', 'key')
            ->toArray();

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
            'tags' => $tags,
            'settings' => $settings,
        ]);
    }

    public function show(Project $project)
    {
        $project->load(['images', 'tags']);

        return Inertia::render('Projects/Show', [
            'project' => $project,
        ]);
    }
}