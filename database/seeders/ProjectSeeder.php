<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProjectSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $samples = [
            [
                'title' => 'Aurora Dashboard',
                'slug' => 'aurora-dashboard',
                'description' => 'A modern analytics dashboard built with React and Inertia.',
                'project_url' => 'https://aurora.example.com',
                'published_at' => now()->subMonths(6),
                'is_featured' => true,
            ],
            [
                'title' => 'Stellar CMS',
                'slug' => 'stellar-cms',
                'description' => 'A lightweight CMS for marketing sites using Laravel and Inertia.',
                'project_url' => 'https://stellar.example.com',
                'published_at' => now()->subYear(),
                'is_featured' => false,
            ],
            [
                'title' => 'Nebula Portfolio',
                'slug' => 'nebula-portfolio',
                'description' => 'Personal portfolio showcasing creative coding projects.',
                'project_url' => null,
                'published_at' => now()->subMonths(2),
                'is_featured' => false,
            ],
        ];

        foreach ($samples as $s) {
            Project::updateOrCreate([
                'slug' => $s['slug'],
            ], $s + ['slug' => $s['slug']]);
        }
    }
}
