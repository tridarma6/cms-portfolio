<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSkillRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isAdmin() ?? false;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'proficiency' => ['nullable', 'integer', 'between:0,100'],
            'category' => ['nullable', 'string', 'max:255'],
            'order' => ['sometimes', 'integer'],
        ];
    }
}
