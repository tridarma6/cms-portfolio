<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isAdmin() ?? false;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:projects,slug'],
            'description' => ['nullable', 'string'],
            'project_url' => ['nullable', 'url'],
            'published_at' => ['nullable', 'date'],
            'is_featured' => ['sometimes', 'boolean'],

            'images' => 'nullable|array',
            'images.*.file' => 'required|image|mimes:jpg,jpeg,png,webp|max:10240',
            'images.*.caption' => 'nullable|string|max:255',
            'images.*.is_primary' => 'boolean',
        ];
    }
}
