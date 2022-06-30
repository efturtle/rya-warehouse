<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HerramientaController;
use App\Http\Controllers\TareaController;
use App\Http\Controllers\UserController;
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

// gets the logged in user
Route::middleware('auth')->get('/user', function (Request $request) {
    return $request->user();
});

// todos los usuarios que esten iniciados session
Route::group(['middleware' => 'auth'], function(){

    // usuarios
    Route::controller(UserController::class)->group(function () {
        Route::get('/v1/users/{user}', 'usuario');
        Route::get('/v1/users', 'usuarios');

        //user tareas
        Route::get('/v1/user/tareas/{user}', 'indexTareas');

        Route::post('/v1/usuarios', 'guardarUsuario');
        Route::patch('/v1/cambiar-clave/{user}', 'modificarClave');
        Route::put('/v1/editar-usuario/{user}', 'modificarUsuario');
        Route::delete('/v1/eliminar-usuario/{user}', 'eliminiarUsuario');
    });

    // herramientas
    Route::resource('v1/herramientas', HerramientaController::class);
    Route::controller(HerramientaController::class)->group(function (){
        Route::patch('/v1/herramientas/sumar/{herramienta}', 'sumarInventario');
        Route::patch('/v1/herramientas/restar/{herramienta}', 'restarInventario');
    });

    // Tareas
    Route::resource('v1/tareas', TareaController::class);
    Route::controller(TareaController::class)->group(function(){
        // terminar tarea
        Route::patch('/v1/tareas/cambiar-estado/{id}', 'cambiarEstatus');
    });


    // peticiones
    Route::resource('v1/peticiones', PeticionHerramientaController::class);
    Route::controller(PeticionHerramientaController::class)->group(function(){
        Route::patch('/v1/peticiones/aceptar/{peticion}', 'aceptarPeticion');
        Route::patch('/v1/peticiones/rechazar/{peticion}', 'rechazarPeticion');
        Route::patch('/v1/peticiones/regresar/{peticion}', 'regresarPeticion');
        Route::get('/v1/peticiones/cantidad-de-peticiones-de-usuario/{user}', 'getAmountOfPeticiones');
        Route::get('/v1/peticiones/peticion-items/{peticione}', 'peticionItems');
    });
});

