<?php

namespace Database\Seeders;

use App\Models\Profile;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Profile::updateOrCreate(
            [
                'user_id' => 2,
                'name' => 'Gede Surya Darmawan',
                'title' => '',
                'bio' => 'Senior Illustrator and Graphic Designer based in Indonesia, specializing in UX Illustration, surrealism, and post-modern art approach. With experience working on full-time, part-time, and freelance projects, I focus on creating meaningful visual experiences that blend creativity with strong storytelling and modern design principles.',
                'avatar' => '',
                'social_links' => [
                    'https://www.instagram.com/drmwnsurya',
                    'https://www.linkedin.com/in/drmwnsurya',
                ],
            ]
        );
    }
}
