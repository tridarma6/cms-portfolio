<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        // Create an admin user if none exists
        if (! User::where('role', 'admin')->exists()) {
            User::factory()->create([
                'name' => 'Surya Darmawan',
                'email' => 'admin.access@darmawansurya.com',
                'role' => 'admin',
                'password' => bcrypt('password'),
            ]);
        }
    }
}
