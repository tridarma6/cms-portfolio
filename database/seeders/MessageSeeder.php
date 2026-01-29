<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Message;
use Illuminate\Support\Str;

class MessageSeeder extends Seeder
{
    public function run()
    {
        $samples = [
            [
                'name' => 'Alice',
                'email' => 'alice@example.com',
                'subject' => 'Hello — project inquiry',
                'body' => "Hi, I saw your portfolio and would like to discuss a potential project. Can we schedule a call?\n\nThanks,\nAlice",
            ],
            [
                'name' => 'Bob',
                'email' => 'bob@example.com',
                'subject' => 'Short question',
                'body' => "Do you offer consulting for React + Laravel projects?",
            ],
            [
                'name' => 'Charlie',
                'email' => 'charlie@example.com',
                'subject' => 'Collaboration',
                'body' => "Love your work — would you be open to collaborating on an open-source tool?",
            ],
        ];

        foreach ($samples as $s) {
            Message::create(array_merge($s, [
                'is_read' => false,
                'ip_address' => '127.0.0.1',
                'user_agent' => 'Seeder',
            ]));
        }

        // Add a few random messages
        for ($i = 0; $i < 12; $i++) {
            Message::create([
                'name' => 'Visitor ' . ($i + 1),
                'email' => 'visitor' . ($i + 1) . '@example.com',
                'subject' => 'Message from visitor ' . ($i + 1),
                'body' => 'This is a sample message to populate the admin inbox.',
                'is_read' => (bool) rand(0,1),
                'ip_address' => '127.0.0.' . ($i + 2),
                'user_agent' => 'Seeder',
            ]);
        }
    }
}
