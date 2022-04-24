<?php

namespace App\Http\Controllers;

use App\Models\Herramienta;
use Illuminate\Http\Request;

class HerramientaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([
            'herramientas' => Herramienta::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // validate
        $request->validate([
            'nombre' => 'required|min:1|string',
        ]);


        Herramienta::create([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
        ]);

        return response()->json([
            'created' => true,
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Herramienta  $herramienta
     * @return \Illuminate\Http\Response
     */
    public function show(Herramienta $herramienta)
    {
        return response()->json([
            'herramienta' => $herramienta,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Herramienta  $herramienta
     * @return \Illuminate\Http\Response
     */
    public function edit(Herramienta $herramienta)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Herramienta  $herramienta
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Herramienta $herramienta)
    {
        $request->validate([
            'nombre' => 'required|min:1|string',
        ]);

        $herramienta->update([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
        ]);

        return response()->json([
            'updated' => true,
        ], 200);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Herramienta  $herramienta
     * @return \Illuminate\Http\Response
     */
    public function destroy(Herramienta $herramienta)
    {
        $herramienta->delete();

        return response()->json([
            'deleted' => true,
        ], 200);
    }

    public function sumarInventario(Request $request, Herramienta $herramienta)
    {
        $request->validate([
            'cantidad' => 'required|min:1|numeric',
        ]);

        $herramienta->inventario += $request->cantidad;
        $herramienta->save();

        return response()->json([
            'inventario' => $herramienta->inventario,
            'sumado' => true,
        ]);
    }


    public function restarInventario(Request $request, Herramienta $herramienta)
    {
        $request->validate([
            'cantidad' => 'required|min:1|numeric',
        ]);

        if ($request->cantidad > $herramienta->inventario) {
            return response()->json([
                'restado' => false,
                'insuficiente' => true,
            ]);
        }

        $herramienta->inventario -= $request->cantidad;
        $herramienta->save();

        return response()->json([
            'inventario' => $herramienta->inventario,
            'restado' => true,
        ]);

    }
}
