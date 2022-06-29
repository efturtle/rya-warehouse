<?php

namespace App\Http\Controllers;

use App\Models\PeticionHerramienta;
use App\Models\Herramienta;
use App\Models\User;
use App\Models\PeticionSaleSlot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        $peticionesWithUserInfo = DB::table('peticion_herramientas')
            ->join('users', 'peticion_herramientas.solicitador_id', 'users.id')
            ->select('users.name', 'peticion_herramientas.estatus', 'peticion_herramientas.comentario',
             'peticion_herramientas.created_at', 'users.email', 'peticion_herramientas.total_herramientas_en_peticion',
             'peticion_herramientas.id', 'peticion_herramientas.estatus')
             ->get();

        return response()->json([
            'peticiones' => $peticionesWithUserInfo,
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
        $herramientas = $request->all();

        // validate that incoming is array
        if (!is_array($herramientas)) {
            return response()->json([
                'is not array' => 'error',
            ]);
        }

        $cantidades = array_column($herramientas, 'quantity');
        $ids = array_column($herramientas, 'id');

        // validate suficient inventory on each product
        foreach ($ids as $key => $herramienta_id) {
            $herramienta = Herramienta::find($herramienta_id);
            if ($herramienta->inventario < $cantidades[$key]) {
                return response()->json([
                    'insuficiente' => $herramienta->id,
                ]);
            }
        }

        $user = Auth::user();

        $peticion = PeticionHerramienta::create([
            'solicitador_id' => $user->id,
            'total_herramientas_en_peticion' => array_sum($cantidades),
        ]);

        foreach ($ids as $key => $herramienta_id) {
            // Se crea una slot por cada herramienta solicitada
            PeticionSaleSlot::create([
                'herramienta_id' => $ids[$key],
                'peticion_id' => $peticion->id,
                'cantidad' => $cantidades[$key],
            ]);

        }


        return response()->json([
            'requestStuff' => 'great',
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

    public function aceptarPeticion(Request $request, PeticionHerramienta $peticion)
    {
        // verify that there is enough inventory in the database
        $productItems = $request->input('peticionItemsArray');

        $cantidades = array_column($productItems, 'cantidad');
        $herramientasIds = array_column($productItems, 'herramienta_id');

        // validar por suficiente inventario
        foreach ($herramientasIds as $key => $herramientaId) {
            $herramienta = Herramienta::find($herramientaId);
            if ($herramienta->inventario < $cantidades[$key]) {
                return response()->json([
                    'insuficiente' => $herramienta->id
                ]);
            }
        }

        // reducir inventario
        foreach ($herramientasIds as $key => $herramientaId) {
            $herramienta = Herramienta::find($herramientaId);
            $herramienta->update([
                'inventario' => $herramienta->inventario -= $cantidades[$key],
            ]);
        }

        $peticion->update([
            'estatus' => 2,
        ]);

        return response()->json([
            'aceptado' => true,
        ]);
    }

    public function rechazarPeticion(Request $request, PeticionHerramienta $peticion)
    {
        $peticion->update([
            'estatus' => 3,
            'comentario' => $request->comentario,
        ]);

        return response()->json([
            'rechazada' => true,
        ]);
    }

    public function regresarPeticion(PeticionHerramienta $peticion)
    {
        // jalar todas las herramientas
        $peticionItems = DB::table('peticion_sale_slots')
        ->where('peticion_id', $peticion->id)
        ->get();

        foreach ($peticionItems as $key => $peticionItem) {
            // sumar al inventario de la herramienta
            $herramienta = Herramienta::find($peticionItem->herramienta_id);
            $herramienta->inventario += $peticion->cantidad;
            $herramienta->save();
        }


        // actualizar estatus
        $peticion->update([
            'estatus' => 4,
        ]);

        return response()->json([
            'regresado' => true,
        ]);
    }

    public function getAmountOfPeticiones(User $user)
    {
        $peticiones = DB::table('peticion_herramientas')
            ->where('solicitador_id', $user->id)
            ->get();


        return response()->json([
            'peticionesCount' => $peticionesCount->count(),
        ]);
    }

    public function peticionItems(PeticionHerramienta $peticione)
    {
        $peticionItems = DB::table('peticion_sale_slots')
            ->join('herramientas', 'peticion_sale_slots.herramienta_id', 'herramientas.id')
            ->select('peticion_sale_slots.cantidad', 'herramientas.nombre', 'peticion_sale_slots.id',
             'herramientas.id as herramienta_id')
            ->where('peticion_id', $peticione->id)
            ->get();

        return response()->json([
            'peticionItems' => $peticionItems,
        ]);
    }
}
