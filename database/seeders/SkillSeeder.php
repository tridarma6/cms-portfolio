<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $samples = [
            ['name' => 'JavaScript', 'proficiency' => 90, 'category' => 'frontend', 'order' => 1],
            ['name' => 'PHP', 'proficiency' => 85, 'category' => 'backend', 'order' => 2],
            ['name' => 'React', 'proficiency' => 88, 'category' => 'frontend', 'order' => 3],
            ['name' => 'Laravel', 'proficiency' => 86, 'category' => 'backend', 'order' => 4],
            ['name' => 'Tailwind CSS', 'proficiency' => 70, 'category' => 'frontend', 'order' => 5],
        ];

        foreach ($samples as $s) {
            Skill::updateOrCreate(['name' => $s['name']], $s);
        }
    }
}
