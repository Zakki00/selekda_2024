<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class CaptchaController extends Controller
{
    public function getCaptcha()
    {
        $captcha = QrCode::generate(uniqid());
        $key = 'captcha_' . uniqid();
        Cache::put($key, $captcha, 300); // 5 minutes

        return response()->json(['captcha_key' => $key, 'captcha_image' => $captcha]);
    }

    public function validateCaptcha(Request $request)
    {
        $request->validate([
            'captcha_key' => 'required|string',
            'captcha_value' => 'required|string',
        ]);

        $storedCaptcha = Cache::get($request->input('captcha_key'));

        if ($storedCaptcha && $storedCaptcha === $request->input('captcha_value')) {
            return response()->json(['message' => 'Captcha valid']);
        }

        return response()->json(['message' => 'Captcha invalid'], 400);
    }
}
