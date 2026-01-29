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
        $samples = [
            [
                'company' => 'Nebula Labs',
                'role' => 'Frontend Engineer',
                'description' => 'Built interactive dashboards and design systems using React and Tailwind.',
                'start_date' => '2022-01-01',
                'end_date' => '2023-06-30',
                'is_current' => false,
                'order' => 1,
            ],
            [
                'company' => 'Orbit Studio',
                'role' => 'Fullstack Developer',
                'description' => 'Implemented API integrations and CMS admin panels with Laravel and Inertia.',
                'start_date' => '2020-05-01',
                'end_date' => '2021-12-31',
                'is_current' => false,
                'order' => 2,
            ],
            [
                'company' => 'Photon Agency',
                'role' => 'UI Designer',
                'description' => 'Led design and prototyping efforts for client projects.',
                'start_date' => '2018-03-01',
                'end_date' => '2020-04-30',
                'is_current' => false,
                'order' => 3,
            ],
            [
                'company' => 'Solace Co',
                'role' => 'Engineering Lead',
                'description' => 'Leading product development and mentoring teams (current).',
                'start_date' => '2023-07-01',
                'end_date' => null,
                'is_current' => true,
                'order' => 0,
            ],
        ];

        foreach ($samples as $s) {
            Experience::updateOrCreate([
                'company' => $s['company'],
                'role' => $s['role'],
            ], $s);
        }
    }
}
