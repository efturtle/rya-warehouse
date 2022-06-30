<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class UserController extends Controller
{
    public function usuarios()
    {
        $users = User::all();

        return response()->json([
            'usuarios' => $users,
        ]);
    }

    public function indexTareas(User $user)
    {
        $tareas = DB::table('tareas')
        ->join('users', 'tareas.user_id', 'users.id')
        ->select('users.name as usuario', 'tareas.nombre', 'tareas.descripcion',
        'tareas.estatus', 'tareas.actualizador_id')
        ->where('user_id', $user->id)
        ->get();

        return response()->json([
            'tareas' => $tareas,
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

    public function modificarClave(Request $request, User $user)
    {
        $request->validate([
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'updatedPassword' => true,
        ]);
    }

    public function modificarUsuario(Request $request, User $user)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        return response()->json([
            'updatedUser' => true,
        ]);
    }

    public function eliminiarUsuario(Request $request, User $user)
    {
        User::destroy($user->id);

        return response()->json([
            'deletedAUser' => true
        ]);
    }
}
