<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Herramienta;
use App\Models\User;
use App\Models\PeticionHerramienta;

class PeticionHerramientaTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_indexPeticiones()
    {
        $response = $this->getJson('/api/v1/peticiones');

        $response->assertStatus(200);
    }

    public function test_storePeticiones()
    {
        $herramienta = Herramienta::factory()->create([
            'inventario' => 3
        ]);
        $usuario = User::factory()->create();
        $response = $this->postJson('/api/v1/peticiones', [
            'herramienta_id' => $herramienta->id,
            'solicitador_id' => $usuario->id,
            'comentario' => 'comentario',
            'cantidad' => 3,
        ]);

        $response->assertStatus(201)
        ->assertExactJson([
            'created' => true,
        ]);

        // verify that it saved to database
        $peticion = PeticionHerramienta::find(1);

        $this->assertModelExists($peticion);
    }

    public function test_showPeticion()
    {
        $peticion = PeticionHerramienta::factory()->create();
        $response = $this->getJson('/api/v1/peticiones/'.$peticion->id);

        $response->assertStatus(200)
        ->assertJsonStructure([
            'peticion' => [
                'herramienta_id',
                'solicitador_id',
                'comentario',
                'cantidad',
                'aprovador_id',
            ]
        ]);
    }

    public function test_updatePeticion()
    {
        $herramienta = Herramienta::factory()->create();

        $user = User::factory()->create();
        $this->test_storePeticiones();
        $peticion = PeticionHerramienta::factory()->create([
            'solicitador_id' => $user->id,
            'cantidad' => 7,
        ]);

        $response = $this->putJson('/api/v1/peticiones/'.$peticion->id, [
            'herramienta_id' => $herramienta->id,
            'solicitador_id' => $user->id,
            'comentario' => 'comentario',
            'cantidad' => 4,
        ]);

        $response->assertStatus(200)
        ->assertExactJson([
            'updated' => true,
            'inventario' => 3
        ]);
    }

    public function test_deletePeticion()
    {
        $peticion = PeticionHerramienta::factory()->create();
        $response = $this->deleteJson('/api/v1/peticiones/'.$peticion->id);

        $response->assertStatus(200)
        ->assertExactJson([
            'eliminado' => true,
        ]);
    }

    public function test_aceptarPeticion()
    {
        $peticion = PeticionHerramienta::factory()->create([
            'herramienta_id' => Herramienta::factory()->create(['inventario' => 10]),
            'cantidad' => 5,
        ]);

        $response = $this->patchJson('/api/v1/peticiones/aceptar/'.$peticion->id);

        $response->assertStatus(200)
        ->assertExactJson([
            'aceptado' => true,
        ]);
    }

    public function test_rechazarPeticion()
    {
        $peticion = PeticionHerramienta::factory()->create([
            'cantidad' => 5,
        ]);

        $response = $this->patchJson('/api/v1/peticiones/rechazar/'.$peticion->id);

        $response->assertStatus(200)
        ->assertExactJson([
            'rechazada' => true,
        ]);
    }


    public function test_regresarPeticion()
    {
        $peticion = PeticionHerramienta::factory()->create([
            'herramienta_id' => Herramienta::factory()->create(['inventario' => 10]),
            'cantidad' => 6,
        ]);

        $response = $this->patchJson('/api/v1/peticiones/regresar/'.$peticion->id);

        $response->assertStatus(200)
        ->assertExactJson([
            'regresado' => true,
            'inventario' => 4
        ]);
    }
}
