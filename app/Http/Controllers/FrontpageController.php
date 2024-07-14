<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class FrontpageController extends Controller
{
    public function index(Request $request)
    {
        $usePackage = true;

        return Inertia::render('Frontpage/Index', [
            'usePackage' => $usePackage
        ]);
    }

    public function test(Request $request)
    {
        return Inertia::render('Frontpage/Test');
    }
}
