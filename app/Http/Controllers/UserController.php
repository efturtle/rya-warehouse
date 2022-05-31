<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function usuarios()
    {
        $users = User::all();

        return response()->json([
            'usuarios' => $users,
        ]);
    }

    public function usuario(User $user)
    {
        return response()->json([
            'user' => $user
        ]);
    }

    public function guardarUsuario(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'telefono' => ['required', 'numeric'],
            'puesto' => ['required', 'numeric', 'max:3', 'min:1'],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make('password'),
            'telefono' => $request->telefono,
            'puesto' => $request->puesto
        ]);

        return response()->json([
            'created' => true
        ], 201);
    }
}
