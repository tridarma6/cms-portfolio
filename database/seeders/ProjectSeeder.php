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
                'title' => 'Semaai Mascot Project',
                'project_type' => 'UX Illustration',
                'position' => 'Full-time',
                'slug' => 'semaai-mascot-project',
                'description' => 'UX illustration project for Semaai mascot design representing brand identity.',
                'project_url' => null,
                'published_at' => now()->subYears(1),
                'is_featured' => true,
            ],
            [
                'title' => 'Semaai Calendar 2024 - 2026',
                'project_type' => 'Design & Illustration',
                'position' => 'Full-time',
                'slug' => 'semaai-calendar-2024-2026',
                'description' => 'Calendar design and illustration project for Semaai from 2024 to 2026.',
                'project_url' => null,
                'published_at' => now()->subYears(1),
                'is_featured' => false,
            ],
            [
                'title' => 'Animation Series Zenius',
                'project_type' => 'Illustration',
                'position' => 'Full-time',
                'slug' => 'animation-series-zenius',
                'description' => 'Illustration project for Zenius animation series production.',
                'project_url' => null,
                'published_at' => now()->subYears(3),
                'is_featured' => false,
            ],
            [
                'title' => 'Sajian Nusantara Boardgame Design',
                'project_type' => 'Design & Illustration',
                'position' => 'Freelance',
                'slug' => 'sajian-nusantara-boardgame-design',
                'description' => 'Boardgame design and illustration project for Sajian Nusantara.',
                'project_url' => null,
                'published_at' => now()->subMonths(8),
                'is_featured' => true,
            ],
            [
                'title' => 'YHP Social Media Content Creator',
                'project_type' => 'Graphic Design',
                'position' => 'Part-time',
                'slug' => 'yhp-social-media-content-creator',
                'description' => 'Social media graphic design content creation for YHP Indonesia.',
                'project_url' => null,
                'published_at' => now()->subMonths(6),
                'is_featured' => false,
            ],
            [
                'title' => 'Marketing Designs of Semaai Agritech',
                'project_type' => 'Graphic Design',
                'position' => 'Full-time',
                'slug' => 'marketing-designs-semaai-agritech',
                'description' => 'Marketing and promotional design materials for Semaai Agritech.',
                'project_url' => null,
                'published_at' => now()->subYears(2),
                'is_featured' => true,
            ],
            [
                'title' => 'Good Agricultural Practice Booklets',
                'project_type' => 'Design & Illustration',
                'position' => 'Full-time',
                'slug' => 'good-agricultural-practice-booklets',
                'description' => 'Booklet design and illustration for agricultural education materials.',
                'project_url' => null,
                'published_at' => now()->subYears(2),
                'is_featured' => false,
            ],
            [
                'title' => 'Character Design',
                'project_type' => 'Illustration',
                'position' => 'Freelance',
                'slug' => 'character-design',
                'description' => 'Character design illustration projects for various freelance clients.',
                'project_url' => null,
                'published_at' => now()->subYears(1),
                'is_featured' => true,
            ],
            [
                'title' => 'Portrait Illustration',
                'project_type' => 'Illustration',
                'position' => 'Freelance',
                'slug' => 'portrait-illustration',
                'description' => 'Portrait illustration works for freelance and personal projects.',
                'project_url' => null,
                'published_at' => now()->subYears(5),
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
