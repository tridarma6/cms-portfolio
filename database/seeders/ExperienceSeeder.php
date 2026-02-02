<?php

namespace Database\Seeders;

use App\Models\Experience;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExperienceSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $experiences = [
            [
                'company' => 'Semaai Agritech',
                'role' => 'Graphic Designer & Illustrator',
                'description' => 'Created marketing designs, brand illustrations, mascot characters, and educational booklets to support Semaai Agritech branding and communication strategy.',
                'start_date' => '2022-01-01',
                'end_date' => '2026-12-31',
                'is_current' => true,
                'order' => 1,
            ],
            [
                'company' => 'Zenius',
                'role' => 'Illustrator (Animation Series)',
                'description' => 'Produced illustration assets for Zenius animation series, contributing to visual storytelling and educational content development.',
                'start_date' => '2021-01-01',
                'end_date' => '2022-12-31',
                'is_current' => false,
                'order' => 2,
            ],
        ];


        foreach ($experiences as $s) {
            Experience::updateOrCreate([
                'company' => $s['company'],
                'role' => $s['role'],
            ], $s);
        }
    }
}
