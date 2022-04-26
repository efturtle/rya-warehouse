<?php

namespace App\Http\Controllers;

use App\Models\Tarea;
use Illuminate\Http\Request;

class TareaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([
            'tareas' => Tarea::all(),
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
            'descripcion' => 'required|min:1|string',
            'user_id' => 'required|numeric',
        ]);

        Tarea::create([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'user_id' => $request->user_id,
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
            'actualizador_id' => 'required|numeric',
        ]);

        $tarea->update([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'actualizador_id'  => $request->actualizador_id
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

    public function cambiarEstatus(Tarea $tarea, $estatus)
    {
        if ($estatus <= 0 || $estatus >= 5 ) {
            return response()->json([
                'no existe ese estatus' => true
            ]);
        }

        $tarea->update([
            'estatus' => $estatus,
        ]);

        return response()->json([
            'estatusCambiado' => true,
            'estatus' => $tarea->estatus,
        ]);
    }
}
