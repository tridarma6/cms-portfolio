<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateExperienceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isAdmin() ?? false;
    }

    public function rules(): array
    {
        return [
            'company' => ['required', 'string', 'max:255'],
            'role' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpg,png,jpeg', 'max:2048'],
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date'],
            'is_current' => ['sometimes', 'boolean'],
            'order' => ['sometimes', 'integer'],
        ];
    }
}
