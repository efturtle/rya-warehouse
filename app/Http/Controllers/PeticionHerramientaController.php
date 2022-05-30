<?php

namespace App\Http\Controllers;

use App\Models\PeticionHerramienta;
use App\Models\Herramienta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PeticionHerramientaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $peticiones = DB::table('peticion_herramientas')
            ->join('users', 'peticion_herramientas.solicitador_id', 'users.id')
            ->select(
                'peticion_herramientas.id', 'users.name as nombre', 'peticion_herramientas.estatus',
                'peticion_herramientas.comentario', 'peticion_herramientas.cantidad'
            )
            ->get();

        return response()->json([
            'peticiones' => PeticionHerramienta::all(),
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
        // validate incoming request
        $request->validate([
            'herramienta_id' => 'required|min:1|numeric',
            'solicitador_id' => 'required|min:1|numeric',
            'comentario' => 'required|min:1|string',
            'cantidad' => 'required|min:1|numeric',
        ]);

        // crear peticion
        PeticionHerramienta::create([
            'herramienta_id' => $request->herramienta_id,
            'solicitador_id' => $request->solicitador_id,
            'comentario' => $request->comentario,
            'cantidad' => $request->cantidad,
        ]);

        return response()->json([
            'created' => true,
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\PeticionHerramienta  $peticionHerramienta
     * @return \Illuminate\Http\Response
     */
    public function show(PeticionHerramienta $peticione)
    {
        return response()->json([
            'peticion' => $peticione,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\PeticionHerramienta  $peticionHerramienta
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PeticionHerramienta $peticione)
    {
        // validar que sea el mismo usuario de la peticion
        if ($peticione->solicitador_id != $request->solicitador_id) {
            return response()->json([
                'usuarioIncorrecto' => true,
            ]);
        }


        // validar que la peticion no alla sido aceptada o cancelada
        if ($peticione->estatus != 1) {
            return response()->json([
                'aceptadaOCancelada' => true
            ]);
        }

        // sumar la cantidad de la peticion al inventario
        $herramienta = Herramienta::find($request->herramienta_id);
        $herramienta->inventario += $peticione->cantidad;

        // verificar que el inventario tenga suficiente cantidad entrante
        if ($request->cantidad > $herramienta->inventario) {
            return response()->json([
                'insuficiente' => true,
            ]);
        }

        // update peticion
        $peticione->update([
            'herramienta_id' => $request->herramienta_id,
            'solicitador_id' => $request->solicitador_id,
            'comentario' => $request->comentario,
            'cantidad' => $request->cantidad,
        ]);

        // reducir inventario
        $herramienta->inventario -= $request->cantidad;
        $herramienta->save();

        return response()->json([
            'updated' => true,
            'inventario' => $herramienta->inventario,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\PeticionHerramienta  $peticionHerramienta
     * @return \Illuminate\Http\Response
     */
    public function destroy(PeticionHerramienta $peticione)
    {
        $peticione->delete();

        return response()->json([
            'eliminado' => true,
        ]);
    }

    public function aceptarPeticion(PeticionHerramienta $peticion)
    {
        // verify that there is enough inventory in the database
        $herramienta = Herramienta::find($peticion->herramienta_id);
        if ($peticion->cantidad > $herramienta->inventario) {
            return response()->json([
                'insuficiente' => true,
            ]);
        }

        // reducir inventario
        $herramienta->inventario -= $peticion->cantidad;
        $herramienta->save();

        $peticion->update([
            'estatus' => 2,
        ]);

        return response()->json([
            'aceptado' => true,
        ]);
    }

    public function rechazarPeticion(PeticionHerramienta $peticion)
    {
        $peticion->update([
            'estatus' => 3,
        ]);

        return response()->json([
            'rechazada' => true,
        ]);
    }

    public function regresarPeticion(PeticionHerramienta $peticion)
    {
        // sumar al inventario de la herramienta
        $herramienta = Herramienta::find($peticion->herramienta_id);
        $herramienta->inventario -= $peticion->cantidad;

        // actualizar estatus
        $peticion->update([
            'estatus' => 4,
        ]);

        return response()->json([
            'regresado' => true,
            'inventario' => $herramienta->inventario,
        ]);
    }

    public function getAmountOfPeticiones(User $user)
    {
        $peticionesCount = DB::table('peticiones')
            ->where('solicitador_id', $user->id)
            ->count('id');


        return response()->json([
            'peticionesCount' => $peticionesCount,
        ]);
    }
}
