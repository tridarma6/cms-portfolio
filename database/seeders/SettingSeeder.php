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
            ['key' => 'site_title', 'value' => 'Suryas Portfolio', 'autoload' => true],
            ['key' => 'site_description', 'value' => 'Senior Illustrator & Graphic Designer crafting market driven design experiences through creative design approach and unique surrealism illlustration style.', 'autoload' => true],
            ['key' => 'contact_email', 'value' => 'drmwn.surya@gmail.com', 'autoload' => true],
            ['key' => 'social_links', 'value' => json_encode(['instagram' => 'https://instagram.com/drmwnsurya', 'linkedin' => 'https://linkedin.com/in/drmwnsurya']), 'autoload' => true],
            ['key' => 'logo_path', 'value' => '/storage/logo.png', 'autoload' => true],
            ['key' => 'maintenance_mode', 'value' => '0', 'autoload' => true],
            ['key' => 'philosophy', 'value' => 'Art is not what you see, but what you make others see. Through abstract forms and surrealist narratives, I strive to create visual experiences that transcend the ordinary and invite viewers into worlds where imagination knows no bounds.', 'autoload' => true],
            ['key' => 'phone', 'value' => '+62 812-3969-3409', 'autoload' => true],
            ['key' => 'location', 'value' => 'Jakarta, Indonesia', 'autoload' => true],
        ];

        foreach ($defaults as $row) {
            Setting::updateOrCreate(['key' => $row['key']], $row);
        }
    }
}
