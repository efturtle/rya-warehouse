<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('peticion_herramientas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('herramienta_id');
            $table->foreignId('aprovador_id')->nullable();
            $table->foreignId('solicitador_id');
            // 1 = creado, 2 = aceptado, 3 = rechazado, 4 = devuelto
            $table->tinyInteger('estatus')->default(1);
            $table->string('comentario');
            $table->integer('cantidad');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('peticion_herramientas');
    }
};
