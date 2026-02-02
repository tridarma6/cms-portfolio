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
            ['name' => 'Adobe Illustrator', 'proficiency' => 90, 'category' => 'tools', 'order' => 1],
            ['name' => 'Adobe Photoshop', 'proficiency' => 88, 'category' => 'tools', 'order' => 2],
            ['name' => 'Figma', 'proficiency' => 85, 'category' => 'tools', 'order' => 3],
            ['name' => 'UX Illustration', 'proficiency' => 82, 'category' => 'design', 'order' => 4],
            ['name' => 'Brand Identity', 'proficiency' => 80, 'category' => 'design', 'order' => 5],
        ];


        foreach ($samples as $s) {
            Skill::updateOrCreate(['name' => $s['name']], $s);
        }
    }
}
