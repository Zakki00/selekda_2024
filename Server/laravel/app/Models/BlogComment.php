<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogComment extends Model
{
    protected $fillable = [
        'name', 
        'email', 
        'subject', 
        'website',
        'comment', 
        'captcha',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }}
