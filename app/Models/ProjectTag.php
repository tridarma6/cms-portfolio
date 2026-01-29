<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectTag extends Model
{
    use HasFactory;

    protected $table = 'project_tags';

    protected $fillable = [
        'name',
        'slug',
    ];

    public function projects()
    {
        return $this->belongsToMany(Project::class, 'project_tag_project', 'project_tag_id', 'project_id');
    }
}
