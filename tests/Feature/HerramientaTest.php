<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use App\Models\Herramienta;
use Tests\TestCase;

class HerramientaTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_indexHerramientas()
    {
        $response = $this->getJson('/api/v1/herramientas');


        $response->assertStatus(200);
    }

    public function test_storeHerramientas()
    {
        $response = $this->postJson('/api/v1/herramientas', [
            'nombre' => 'Sally',
            'descripcion' => 'beto',
        ]);
        $herramienta = Herramienta::find(1);

        $this->assertModelExists($herramienta);

        $response
            ->assertStatus(201)
            ->assertExactJson([
            'created' => true,
        ]);
    }

    public function test_showHerramienta()
    {
        $herramienta = Herramienta::factory()->create();
        $response = $this->getJson('/api/v1/herramientas/'.$herramienta->id);

        $response->assertStatus(200)
        ->assertJsonStructure([
            'herramienta' => [
                'nombre',
                'descripcion',
                'inventario',
            ],
        ]);
    }

    public function test_updateHerramienta()
    {
        $herramienta = Herramienta::factory()->create();

        $response = $this->putJson('api/v1/herramientas/'.$herramienta->id, [
            'nombre' => 'beto',
            'descripcion' => 'descripcion de beto',
        ]);

        $response->assertStatus(200)
        ->assertExactJson([
            'updated' => true,
        ]);
    }

    public function test_deleteHerramienta()
    {
        $herramienta = Herramienta::factory()->create();

        $response = $this->deleteJson('/api/v1/herramientas/'.$herramienta->id);
        $response->assertStatus(200);
    }

    public function test_sumarHerramienta()
    {
        $herramienta = Herramienta::factory()->create();

        $response = $this->patchJson('/api/v1/herramientas/sumar/'.$herramienta->id, [
            'cantidad' => 34,
        ]);

        $response->assertStatus(200)
        ->assertJson([
            'inventario' => $herramienta->inventario += 34,
            'sumado' => true,
        ]);
    }

    public function test_restarHerramienta()
    {
        $herramienta = Herramienta::factory()->create([
            'inventario' => 35,
        ]);

        $response = $this->patchJson('/api/v1/herramientas/restar/'.$herramienta->id, [
            'cantidad' => 34,
        ]);

        $response->assertStatus(200)
        ->assertJson([
            'inventario' => $herramienta->inventario -= 34,
            'restado' => true,
        ]);
    }
}
