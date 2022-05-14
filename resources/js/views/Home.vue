<template>
    <div class="overflow-hidden overflow-x-auto min-w-full align-middle sm:rounded-md">
        <div class="flex place-content-start mb-4">
            <div class="px-4 py-2 text-md lg:text-lg text-gray-600">
                Mis Datos
            </div>
        </div>
        <div class="min-w-full divide-y divide-gray-200 border-b">
            <div>
                <span class="text-gray-400"> Nombre: &nbsp; </span>
                <span> {{ user.name }}</span>
            </div>
            <div>
                <span class="text-gray-400"> Correo: &nbsp; </span>
                <span> {{ user.email }}</span>
            </div>
            <div>
                <span class="text-gray-400"> Telefono: &nbsp; </span>
                <span> {{ user.telefono }}</span>
            </div>
            <div>
                <span class="text-gray-400"> Puesto: &nbsp; </span>
                <span> {{ puesto }}</span>
            </div>

        </div>
    </div>

</template>

<script>
import axios from "axios"

export default {
    data(){
        return {
            user: [],
        }
    },
    computed: {
        puesto(){
            switch (this.user.puesto) {
                case 1:
                    return 'Administrador Almancen';
                case 2:
                    return 'Administrador General';
                case 3:
                    return 'Tecnico';
                default:
                    break;
            }
        }
    },
    mounted() {
        axios.get('/api/user')
        .then((data) => {
            this.user = data.data;
        });
    }
}
</script>

<style>

</style>
