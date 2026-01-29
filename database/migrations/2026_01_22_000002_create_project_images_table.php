<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('project_images', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('project_id');
            $table->string('filename');
            $table->string('caption')->nullable();
            $table->integer('position')->default(0)->index();
            $table->boolean('is_primary')->default(false)->index();
            $table->timestamps();

            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
            $table->index('project_id');
        });
    }

    public function down()
    {
        Schema::dropIfExists('project_images');
    }
};
