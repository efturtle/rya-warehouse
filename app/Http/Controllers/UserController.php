<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function usuarios(Request $request)
    {
        return response()->json([
            'usuarios' => User::all(),
        ]);
    }
}
