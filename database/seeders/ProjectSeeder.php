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
                'body' => 'Full case study content for Aurora Dashboard project.',
                'website_url' => 'https://aurora.example.com',
                'repo_url' => 'https://github.com/example/aurora-dashboard',
                'published_at' => now()->subMonths(6),
                'is_featured' => true,
            ],
            [
                'title' => 'Stellar CMS',
                'slug' => 'stellar-cms',
                'description' => 'A lightweight CMS for marketing sites using Laravel and Inertia.',
                'body' => 'Full case study content for Stellar CMS.',
                'website_url' => 'https://stellar.example.com',
                'repo_url' => 'https://github.com/example/stellar-cms',
                'published_at' => now()->subYear(),
                'is_featured' => false,
            ],
            [
                'title' => 'Nebula Portfolio',
                'slug' => 'nebula-portfolio',
                'description' => 'Personal portfolio showcasing creative coding projects.',
                'body' => 'Full case study content for Nebula Portfolio.',
                'website_url' => null,
                'repo_url' => null,
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
