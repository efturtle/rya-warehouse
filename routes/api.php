<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HerramientaController;
use App\Http\Controllers\TareaController;
use App\Http\Controllers\PeticionHerramientaController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::resource('v1/herramientas', HerramientaController::class);
Route::controller(HerramientaController::class)->group(function (){
    Route::patch('/v1/herramientas/sumar/{herramienta}', 'sumarInventario');
    Route::patch('/v1/herramientas/restar/{herramienta}', 'restarInventario');
});

Route::resource('v1/tareas', TareaController::class);
Route::controller(TareaController::class)->group(function(){
    Route::patch('/v1/tareas/cambiar-estado/{tarea}/{estatus}', 'cambiarEstatus');
});


Route::resource('v1/peticiones', PeticionHerramientaController::class);
Route::controller(PeticionHerramientaController::class)->group(function(){
    Route::patch('/v1/peticiones/aceptar/{peticion}', 'aceptarPeticion');
    Route::patch('/v1/peticiones/rechazar/{peticion}', 'rechazarPeticion');
    Route::patch('/v1/peticiones/regresar/{peticion}', 'regresarPeticion');
});
