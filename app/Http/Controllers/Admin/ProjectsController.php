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

        // Simpan project
        $project = Project::create($data);

        // 🔥 Simpan images ke tabel project_images
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $path = $file->store('projects', 'public');

                ProjectImage::create([
                    'project_id' => $project->id,
                    'filename'   => $path,
                    'position'   => $project->images()->count(),
                    'is_primary' => false,
                ]);
            }
        }

        return redirect()
            ->route('admin.projects.index')
            ->with('success', 'Project created.');
    }


    public function show(Request $request, Project $project)
    {
        return Inertia::render('Admin/Projects/Show', [
            'project' => $project,
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
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:10240', // 10MB max
        ]);

        $uploadedImages = [];

        foreach ($request->file('images') as $file) {
            $filename = $file->store('projects', 'public');

            $image = ProjectImage::create([
                'project_id' => $project->id,
                'filename' => $filename,
                'position' => $project->images()->count(),
            ]);

            $uploadedImages[] = $image;
        }

        return redirect()->back(303)->with('success', 'Images uploaded.')->with('uploadedImages', $uploadedImages);
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
