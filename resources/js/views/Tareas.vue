<template>
<div class="overflow-hidden overflow-x-auto min-w-full align-middle sm:rounded-md">
        <div class="flex place-content-end mb-4" v-if="admin">
            <div class="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer">
                <router-link :to="{ name: 'tarea.create'}" class="text-sm font-medium">Crear Tarea</router-link>
                <!-- <router-link :to="{ name: 'companies.create' }" class="text-sm font-medium">Create company</router-link> -->
            </div>
        </div>

        <table class="min-w-full border divide-y divide-gray-200">
            <thead>
            <tr>
                <th class="px-6 py-3 bg-gray-50">
                    <span
                        class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Nombre</span>
                </th>
                <th class="px-6 py-3 bg-gray-50">
                    <span
                        class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Estatus</span>
                </th>
                <th class="px-6 py-3 bg-gray-50">
                    <span
                        class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Acciones</span>
                </th>
            </tr>
            </thead>

            <tbody class="bg-white divide-y divide-gray-200 divide-solid">
                <template v-for="tarea in tareas" :key="tarea.id">
                    <tr class="bg-white">
                        <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                            {{ tarea.nombre }}
                        </td>
                        <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                            {{ estatus(tarea.estatus) }}
                        </td>
                        <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                            <button class="btn bg-gray-500 text-white p-1 rounded hover:bg-gray-400 mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>
                            <button class="btn bg-gray-500 text-white p-1 rounded hover:bg-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    methods: {
        estatus(tareaId){
            switch (tareaId) {
                case 1:
                    return 'pendiente'
                case 2:
                    return 'revisado'
                case 3:
                    return 'en proceso'
                case 4:
                    return 'terminado'
                default:
                    return 'error'
            }
        }
    },
    data(){
        return {
            tareas: [],
            user: [],
        }
    },
    mounted(){
        axios.get('/api/v1/tareas')
        .then((data) => {
            this.tareas = data.data.tareas;
        });
        axios.get('/api/user')
        .then((data) => {
            this.user = data.data;
        });
    },
    computed: {
        admin(){
            if (this.user.puesto != 3) {
                return true;
            }
            return false;
        }
    }
}
</script>

<style>

</style>
