<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\ProjectsController as PublicProjectsController;
use App\Http\Controllers\ExperiencesController as PublicExperiencesController;


// Admin routes: protected by auth + admin middleware
use App\Http\Middleware\AdminMiddleware;

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ProjectsController;
use App\Http\Controllers\Admin\ExperiencesController;
use App\Http\Controllers\Admin\SkillsController;
use App\Http\Controllers\Admin\MessagesController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\ProfilesController;
use App\Http\Controllers\Auth\LoginController;

Route::get('/', [HomeController::class, 'index']);
Route::get('/experiences', [PublicExperiencesController::class, 'index'])->name('experiences');
Route::get('/projects', [PublicProjectsController::class, 'index'])->name('projects.index');
Route::get('/projects/{project:slug}', [PublicProjectsController::class, 'show'])->name('projects.show');
Route::get('/about', [AboutController::class, 'index'])->name('about');
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/messages', [MessagesController::class, 'store'])->name('messages.store');
Route::middleware(['auth', AdminMiddleware::class])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Projects CRUD
    // Projects CRUD (manual routes)
    Route::get('/projects', [ProjectsController::class, 'index'])->name('projects.index');
    Route::get('/projects/create', [ProjectsController::class, 'create'])->name('projects.create');
    Route::post('/projects', [ProjectsController::class, 'store'])->name('projects.store');
    Route::put('/projects', [ProjectsController::class, 'updateAll'])->name('projects.updateAll');

    Route::get('/projects/{project}/edit', [ProjectsController::class, 'edit'])->name('projects.edit');
    Route::put('/projects/{project}', [ProjectsController::class, 'update'])->name('projects.update');

    Route::get('/projects/{project}', [ProjectsController::class, 'show'])->name('projects.show');
    Route::delete('/projects/{project}', [ProjectsController::class, 'destroy'])->name('projects.destroy');
    Route::delete('/projects', [ProjectsController::class, 'destroyAll'])->name('projects.destroyAll');

    // Project Images
    Route::post('/projects/{project}/images', [ProjectsController::class, 'storeImages'])->name('projects.images.store');
    Route::put('/projects/{project}/images/{image}', [ProjectsController::class, 'updateImage'])->name('projects.images.update');
    Route::put('/projects/{project}/images/{image}/primary', [ProjectsController::class, 'setPrimaryImage'])->name('projects.images.primary');
    Route::delete('/projects/{project}/images/{image}', [ProjectsController::class, 'deleteImage'])->name('projects.images.delete');

    // Experiences CRUD
    Route::resource('experiences', ExperiencesController::class)->names('experiences');
    Route::put('/experiences', [ExperiencesController::class, 'updateAll'])->name('experiences.updateAll');
    Route::delete('/experiences', [ExperiencesController::class, 'destroyAll'])->name('experiences.destroyAll');

    // Skills CRUD
    Route::resource('skills', SkillsController::class)->names('skills');
    Route::put('/skills', [SkillsController::class, 'updateAll'])->name('skills.updateAll');
    Route::delete('/skills', [SkillsController::class, 'destroyAll'])->name('skills.destroyAll');
    
    // Messages: index/show/destroy
    Route::resource('messages', MessagesController::class)->only(['index', 'show', 'destroy'])->names('messages');
    Route::delete('/messages', [MessagesController::class, 'destroyAll'])->name('messages.destroyAll');

    // Settings: index, edit + update (each setting updated via PUT/PATCH to /settings/{setting})
    Route::resource('settings', SettingsController::class)->only(['index', 'edit', 'update'])->names('settings');

    // Profile: edit + update
    Route::get('/profile/edit', [ProfilesController::class, 'edit'])->name('profile.edit');
    Route::put('/profile/edit', [ProfilesController::class, 'updateAll'])->name('profile.updateAll');
    Route::put('/profile', [ProfilesController::class, 'update'])->name('profile.update');
    Route::put('/settings', [SettingsController::class, 'updateAll'])->name('settings.updateAll');
});

// Simple login routes for admin
Route::get('/login', [LoginController::class, 'show'])->name('login');
Route::post('/login', [LoginController::class, 'login'])->name('login.attempt');
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

