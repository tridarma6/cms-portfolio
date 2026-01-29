<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\ProjectImage;
use App\Http\Requests\Admin\StoreProjectRequest;
use App\Http\Requests\Admin\UpdateProjectRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class ProjectsController extends Controller
{
    public function index(Request $request)
    {
        $projects = Project::latest()->paginate(10)->withQueryString();

        return Inertia::render('Admin/Projects', [
            'projects' => $projects,
            'user' => $request->user()?->only(['id', 'name', 'email', 'role']),
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('Admin/Projects/Create', [
            'user' => $request->user()?->only(['id', 'name', 'email', 'role']),
        ]);
    }

    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();

        $project = Project::create($data);

        if ($request->has('images')) {
            foreach ($request->images as $index => $image) {
                if (!isset($image['file'])) continue;

                $file = $image['file'];
                $path = $file->store('projects', 'public');

                ProjectImage::create([
                    'project_id' => $project->id,
                    'filename'   => $path,
                    'caption'    => $image['caption'] ?? null,
                    'position'   => $index,
                    'is_primary' => $image['is_primary'] ?? false,
                ]);
            }
        }

        return redirect()
            ->route('admin.projects.index')
            ->with('success', 'Project created.');
    }



    public function show(Request $request, Project $project)
    {
        $image = $project->images()->where('is_primary', true)->first();
        return Inertia::render('Admin/Projects/Show', [
            'project' => $project,
            'primaryImage' => $image,
            'user' => $request->user()?->only(['id', 'name', 'email', 'role']),
        ]);
    }

    public function edit(Request $request, Project $project)
    {
        return Inertia::render('Admin/Projects/Edit', [
            'project' => $project->load('images'),
            'user' => $request->user()?->only(['id', 'name', 'email', 'role']),
        ]);
    }

    public function update(UpdateProjectRequest $request, Project $project)
    {
        $project->update($request->validated());

        return redirect()->route('admin.projects.index')
            ->with('success', 'Project updated');
    }

    public function updateAll(Request $request)
    {
        return redirect('/admin/projects', 303);
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return redirect()->route('admin.projects.index')->with('success', 'Project deleted.');
    }

    public function storeImages(Request $request, Project $project)
    {
        $request->validate([
            'images' => 'required|array',
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
        ]);

        if (!$request->hasFile('images')) {
            return back()->withErrors(['images' => 'No images uploaded']);
        }

        $startPosition = $project->images()->count();

        foreach ($request->file('images') as $index => $file) {

            $path = $file->store('projects', 'public');

            $project->images()->create([
                'filename'   => $path,
                'caption'    => null,
                'position'   => $startPosition + $index,
                'is_primary' => false,
            ]);
        }

        return redirect()
            ->back(303)
            ->with('success', 'Images uploaded successfully.');
    }


    public function updateImage(Request $request, Project $project, ProjectImage $image)
    {
        $request->validate([
            'caption' => 'nullable|string|max:255',
        ]);

        $image->update($request->only(['caption']));

        return redirect()->back(303)->with('success', 'Image updated.');
    }

    public function setPrimaryImage(Request $request, Project $project, ProjectImage $image)
    {
        $project->images()->update(['is_primary' => false]);
        $image->update(['is_primary' => true]);

        return redirect()->back(303)->with('success', 'Primary image updated.');
    }


    public function deleteImage(Request $request, Project $project, ProjectImage $image)
    {
        // Delete file from storage
        Storage::disk('public')->delete($image->filename);

        // Delete record
        $image->delete();

        return redirect()->back(303)->with('success', 'Image deleted.');
    }

    public function destroyAll(Request $request)
    {
        return redirect('/admin/projects', 303);
    }
}
