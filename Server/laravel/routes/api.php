<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\BlogCommentController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\LeaderboardController;
use App\Http\Controllers\CaptchaController;

Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);
Route::get('profile', [UserController::class, 'profile'])->middleware('auth:sanctum');
Route::put('profile', [UserController::class, 'updateProfile'])->middleware('auth:sanctum');

Route::resource('comments', BlogCommentController::class)->middleware('auth:sanctum');
Route::resource('banners', BannerController::class)->middleware('auth:sanctum');
Route::resource('blogs', BlogController::class)->middleware('auth:sanctum');
Route::resource('portfolios', PortfolioController::class)->middleware('auth:sanctum');

Route::get('leaderboard', [LeaderboardController::class, 'index']);
Route::post('leaderboard', [LeaderboardController::class, 'store']);

Route::get('captcha', [CaptchaController::class, 'getCaptcha']);
Route::post('captcha/validate', [CaptchaController::class, 'validateCaptcha']);

