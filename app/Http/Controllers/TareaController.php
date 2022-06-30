<?php

namespace App\Http\Controllers;

use App\Models\Tarea;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TareaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tareas = DB::table('tareas')
        ->join('users', 'tareas.user_id', 'users.id')
        ->select('users.name as usuario', 'tareas.id', 'tareas.nombre', 'tareas.descripcion',
        'tareas.estatus', 'tareas.actualizador_id')
        ->get();

        return response()->json([
            'tareas' => $tareas,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|min:1|string|max:255',
            'user_id' => 'required|numeric',
        ]);

        Tarea::create([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'user_id' => $request->user_id,
            'actualizador_id' => Auth::user()->id
        ]);

        return response()->json([
            'created' => true,
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Tarea  $tarea
     * @return \Illuminate\Http\Response
     */
    public function show(Tarea $tarea)
    {
        return response()->json([
            'tarea' => $tarea,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Tarea  $tarea
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Tarea $tarea)
    {
        $request->validate([
            'nombre' => 'required|min:1|string|max:255',
            'descripcion' => 'required|min:1|string',
            'user_id' => 'required|numeric',
        ]);

        $tarea->update([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'user_id'  => $request->user_id,
            'actualizador_id'  => Auth::user()->id,
        ]);

        return response()->json([
            'updated' => true,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tarea  $tarea
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tarea $tarea)
    {
        $tarea->delete();

        return response()->json([
            'deleted' => true,
        ], 200);
    }

    public function cambiarEstatus(Tarea $tarea)
    {
        $tarea->update([
            'estatus' => 2,
        ]);

        return response()->json([
            'estatusCambiado' => true,
        ]);
    }
}
