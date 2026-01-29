<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isAdmin() ?? false;
    }

    public function rules(): array
    {
        $projectId = $this->route('project')?->id;

        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:projects,slug,' . $projectId],
            'description' => ['nullable', 'string'],
            'body' => ['nullable', 'string'],
            'website_url' => ['nullable', 'url'],
            'repo_url' => ['nullable', 'url'],
            'published_at' => ['nullable', 'date'],
            'is_featured' => ['sometimes', 'boolean'],
        ];
    }
}
