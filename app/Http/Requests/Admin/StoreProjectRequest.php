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
            'body' => ['nullable', 'string'],
            'website_url' => ['nullable', 'url'],
            'repo_url' => ['nullable', 'url'],
            'published_at' => ['nullable', 'date'],
            'is_featured' => ['sometimes', 'boolean'],

            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:10240',
        ];
    }
}
