<template>
    <div class="overflow-hidden overflow-x-auto min-w-full align-middle sm:rounded-md">
        <span v-bind="mensaje_de_error"></span>
        <div class="flex place-content-end mb-4" v-if="admin">
            <div class="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 cursor-pointer">
                <router-link :to="{ name: 'herramienta.create'}" class="text-sm font-medium">Crear Peticion</router-link>
            </div>
        </div>

        <table class="table-fixed w-full border divide-y divide-gray-200">
            <thead>
            <tr>
                <th class="px-6 py-3 bg-gray-50">
                    <span
                        class="text-xs tracking-wider leading-4 text-left text-gray-500">Usuario</span>
                </th>
                <th class="px-6 py-3 bg-gray-50">
                    <span
                        class="text-xs tracking-wider leading-4 text-left text-gray-500">Cantidad</span>
                </th>
                <th class="px-6 py-3 bg-gray-50" v-if="admin">
                    <span
                        class="text-xs tracking-wider leading-4 text-left text-gray-500">Acciones</span>
                </th>
            </tr>
            </thead>

            <tbody class="bg-white divide-y divide-gray-200 divide-solid">
                <template v-for="peticion in peticiones" :key="peticion.id">
                    <tr class="bg-white">
                        <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                            <!-- {{ nombreSolicitador(peticion.solicitador_id) }} -->
                            {{ peticion.solicitador_id }}
                        </td>
                        <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                            {{ peticion.cantidad }}
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
            peticiones: [],
            user: [],
            mensaje_de_error: '',
            solicitador: ''
        }
    },
    mounted(){
        // get the herramientas
        axios.get('api/v1/peticiones')
        .then((data) => {
            this.peticiones = data.data.peticiones;
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
    methods:{
        // nombreSolicitador(id){
        //     axios.get(`/api/v1/users/${id}`)
        //     .then((data) => {
        //         this.solicitador = data.data.user;
        //     })
        //     .catch(error => {
        //         this.mensaje_de_error = error;
        //     })
        // }
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
