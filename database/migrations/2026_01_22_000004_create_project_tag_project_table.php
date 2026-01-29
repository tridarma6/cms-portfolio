<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('project_tag_project', function (Blueprint $table) {
            $table->unsignedBigInteger('project_id');
            $table->unsignedBigInteger('project_tag_id');
            $table->primary(['project_id', 'project_tag_id']);

            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
            $table->foreign('project_tag_id')->references('id')->on('project_tags')->onDelete('cascade');
            $table->index(['project_tag_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('project_tag_project');
    }
};
