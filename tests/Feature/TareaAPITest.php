<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Tarea;
use App\Models\User;

class TareaAPITest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_indexTareas()
    {
        $response = $this->getJson('/api/v1/tareas');

        $response->assertStatus(200);
    }

    public function test_showTarea()
    {
        $tarea = Tarea::factory()->create();
        $response = $this->getJson('/api/v1/tareas/'.$tarea->id);

        $response->assertStatus(200)
        ->assertJsonStructure([
            'tarea' => [
                'nombre',
                'descripcion',
                'estatus',
            ],
        ]);
    }

    public function test_storeTarea()
    {
        $user = User::factory()->create();
        $response = $this->postJson('/api/v1/tareas', [
            'nombre' => 'Sally',
            'descripcion' => 'beto',
            'user_id' => $user->id,
        ]);
        $tarea = Tarea::find(1);

        $this->assertModelExists($tarea);

        $response
            ->assertStatus(201)
            ->assertExactJson([
            'created' => true,
        ]);
    }

    public function test_updateTarea()
    {
        $tarea = Tarea::factory()->create();
        $user = User::factory()->create();
        $response = $this->putJson('/api/v1/tareas/'.$tarea->id, [
            'nombre' => 'beto',
            'descripcion' => 'esta es una descripcion',
            'actualizador_id' => $user->id,
        ]);

        $response->assertStatus(200)
        ->assertExactJson([
            'updated' => true,
        ]);
    }

    public function test_deleteTarea()
    {
        $tarea = Tarea::factory()->create();
        $response = $this->deleteJson('/api/v1/tareas/'.$tarea->id);

        $response->assertStatus(200)
        ->assertExactJson([
            'deleted' => true
        ]);
    }

    public function test_changeEstatus()
    {
        $tarea = Tarea::factory()->create();
        // cambiar a estatus 2
        $response = $this->patchJson('/api/v1/tareas/cambiar-estado/'.$tarea->id.'/4');
        $response->assertStatus(200)
        ->assertJson([
            'estatusCambiado' => true,
            'estatus' => 4
        ]);
    }
}
