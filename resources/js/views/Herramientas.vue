<template>
    <div class="overflow-hidden overflow-x-auto min-w-full align-middle sm:rounded-md">
        <span v-bind="mensaje_de_error"></span>
        <div class="flex place-content-end mb-4" v-if="admin">
            <div class="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer">
                <router-link :to="{ name: 'herramienta.create'}" class="text-sm font-medium">Crear Herramienta</router-link>                
            </div>
        </div>

        <table class="table-fixed w-full border divide-y divide-gray-200">
            <thead>
            <tr>
                <th class="px-6 py-3 bg-gray-50">
                    <span
                        class="text-xs tracking-wider leading-4 text-left text-gray-500">Nombre</span>
                </th>
                <th class="px-6 py-3 bg-gray-50">
                    <span
                        class="text-xs tracking-wider leading-4 text-left text-gray-500">Sobre</span>
                </th>
                <th class="px-6 py-3 bg-gray-50">
                    <span
                        class="text-xs tracking-wider leading-4 text-left text-gray-500">Inv</span>
                </th>
                <th class="px-6 py-3 bg-gray-50" v-if="admin">
                    <span
                        class="text-xs tracking-wider leading-4 text-left text-gray-500">Acciones</span>
                </th>
            </tr>
            </thead>

            <tbody class="bg-white divide-y divide-gray-200 divide-solid">
                <template v-for="herramienta in herramientas" :key="herramienta.id">
                    <tr class="bg-white">
                        <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                            {{ herramienta.nombre }}
                        </td>
                        <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                            {{ herramienta.descripcion }}
                        </td>
                        <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                            {{ herramienta.inventario }}
                        </td>
                        <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                            <button class="btn bg-gray-500 text-white p-1 rounded hover:bg-gray-400 mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
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
    data(){
        return {
            herramientas: [],
            user: [],
            mensaje_de_error: ''
        }
    },
    mounted(){
        // get the herramientas
        axios.get('api/v1/herramientas')
        .then((data) => {
            this.herramientas = data.data.herramientas;
        })
        .catch(error => {
            this.mensaje_de_error = error
        })

        // get the user
        axios.get('/api/user')
        .then((data) => {
            this.user = data.data;
        })
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