<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isAdmin() ?? false;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'title' => ['required', 'string', 'max:255'],
            'bio' => ['nullable', 'string'],
            'avatar' => ['nullable', 'url'],
            'social_links' => ['nullable', 'array'],
            'social_links.*' => ['url'],
        ];
    }
}