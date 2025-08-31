<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NameController;

// Main page - serves the React application with form and table
Route::get('/', function () {
    return view('app');
});

// API routes for the name entry functionality
Route::post('/api/names', [NameController::class, 'store']);
Route::get('/api/names', [NameController::class, 'index']);
