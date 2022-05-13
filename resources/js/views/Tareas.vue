<template>
    <div>
        <h3>Tareas</h3>
        <div class="grid grid-cols-5 grid-flow-col mb-2">
            <div class="col-span-2">
                <p class="text-bold text-xs md:text-lg">Nombre</p>
            </div>
            <div class="col-span-2">
                <p class="text-bold text-xs md:text-lg">Estatus</p>
            </div>
            <div class="col-span-1">
                <p class="text-bold text-xs md:text-lg">Acciones</p>
            </div>
        </div>
        <FilaParaTarea
        v-for="tarea in tareas" :key="tarea.id"
        :tarea="tarea"/>

    </div>
</template>

<script>
import FilaParaTarea from '../components/tareas/FilaParaTabla.vue';
import axios from 'axios';
export default {
    components: {
        FilaParaTarea
    },
    data(){
        return {
            tareas: [],
        }
    },
    mounted(){
        axios.get('http://127.0.0.1:8000/api/v1/tareas')
        .then((data) => {
            this.tareas = data.data.tareas;
        });
    },
}
</script>

<style>

</style>
