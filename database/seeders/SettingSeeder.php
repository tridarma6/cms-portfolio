<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Setting;

class SettingSeeder extends Seeder
{
    public function run()
    {
        $defaults = [
            ['key' => 'site_title', 'value' => 'My Portfolio', 'autoload' => true],
            ['key' => 'site_description', 'value' => 'A developer portfolio showcasing projects and experience.', 'autoload' => true],
            ['key' => 'contact_email', 'value' => 'hello@example.com', 'autoload' => true],
            ['key' => 'social_links', 'value' => json_encode(['github' => 'https://github.com/yourname', 'linkedin' => 'https://linkedin.com/in/yourname']), 'autoload' => true],
            ['key' => 'homepage_intro', 'value' => 'Hi — I build web apps and interfaces.\nI focus on React, Laravel, and clean UX.', 'autoload' => true],
            ['key' => 'logo_path', 'value' => '/storage/logo.png', 'autoload' => true],
            ['key' => 'favicon_path', 'value' => '/favicon.ico', 'autoload' => true],
            ['key' => 'maintenance_mode', 'value' => '0', 'autoload' => true],
        ];

        foreach ($defaults as $row) {
            Setting::updateOrCreate(['key' => $row['key']], $row);
        }
    }
}
