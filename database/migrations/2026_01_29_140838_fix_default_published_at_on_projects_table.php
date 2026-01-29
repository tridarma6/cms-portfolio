<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        // 1. Isi data NULL dulu dengan waktu sekarang
        DB::table('projects')
            ->whereNull('published_at')
            ->update(['published_at' => now()]);

        // 2. Baru ubah kolom jadi NOT NULL + default CURRENT_TIMESTAMP
        Schema::table('projects', function (Blueprint $table) {
            $table->timestamp('published_at')
                  ->default(DB::raw('CURRENT_TIMESTAMP'))
                  ->change();
        });
    }

    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->timestamp('published_at')->nullable()->change();
        });
    }
};
