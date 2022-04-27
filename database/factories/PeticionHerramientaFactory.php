<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Herramienta;
use App\Models\user;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PeticionHerramienta>
 */
class PeticionHerramientaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'herramienta_id' => Herramienta::factory()->create()->id,
            'solicitador_id' => User::factory()->create()->id,
            'comentario' => $this->faker->sentence(),
            'cantidad' => $this->faker->numberBetween(1, 5),
        ];
    }
}
