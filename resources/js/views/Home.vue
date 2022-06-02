<template>
    <div class="overflow-hidden align-middle sm:rounded-md">
        <!-- Content -->
        <div>
            <div class="flex place-content-start mb-4">
                <div class="px-4 py-2 text-md lg:text-lg text-gray-600">
                    Mis Datos
                </div>
            </div>
            <div class="divide-y divide-gray-200 border-b">
                <div>
                    <span class="text-gray-400"> Nombre: &nbsp; </span>
                    <span class="font-semibold text-md uppercase"> {{ user.name }}</span>
                </div>
                <div>
                    <span class="text-gray-400"> Correo: &nbsp; </span>
                    <span class="font-semibold text-md uppercase"> {{ user.email }}</span>
                </div>
                <div>
                    <span class="text-gray-400"> Telefono: &nbsp; </span>
                    <span class="font-semibold text-md uppercase"> {{ user.telefono }}</span>
                </div>
                <div>
                    <span class="text-gray-400"> Puesto: &nbsp; </span>
                    <span class="font-semibold text-md uppercase"> {{ puesto }}</span>
                </div>

            </div>
        </div>



        <!-- Cambiar Clave -->
        <div class="mt-5">
            <button @click="cambiarClave" class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150">Cambiar Contraseña</button>
            <div id="defaultModal" v-if="quiereCambiarClave" tabindex="-1" class="wegotamodalhere overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
                <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
                    <!-- Modal content -->
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <!-- Modal header -->
                        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                Cambiar Contraseña
                            </h3>
                            <button type="button" @click="noQuiereCambiarClave" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                        <!-- Modal body -->
                        <div class="grid grid-cols-1 gap-4 place-items-center">
                            <div>
                                <input type="password" v-model="form.password"
                                    placeholder="nueva contraseña" class="mb-3 rounded-md shadow-sm border-gray-300 focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50">
                            </div>
                            <div>
                                <input type="password" v-model="form.password_confirmation"
                                    placeholder="confirmar" class="mb-3 rounded-md shadow-sm border-gray-300 focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50">
                            </div>
                        </div>
                        <!-- Modal footer -->
                        <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                            <button type="button" @click="confirmarYCambiarClave" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cambiar</button>
                            <button type="button" @click="noQuiereCambiarClave" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>
                        </div>
                    </div>
                </div>
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
            form: {
                password: '',
                password_confirmation: '',
            },
            quiereCambiarClave: false,
        }
    },
    computed: {
        puesto(){
            switch (this.user.puesto) {
                case '1':
                    return 'Administrador Almancen';
                case '2':
                    return 'Administrador General';
                case '3':
                    return 'Tecnico';
                default:
                    return '?'
            }
        }
    },
    mounted() {
        axios.get('/api/user')
        .then((data) => {
            this.user = data.data;
        });
    },
    methods:{
        cambiarClave(){
            this.quiereCambiarClave = true;
        },
        noQuiereCambiarClave(){
            this.quiereCambiarClave = false;
        },
        confirmarYCambiarClave(){
            this.$swal({
                title: 'Cambiar Contraseña',
                showCancelButton: true,
                confirmButtonText: 'Si',
                cancelButtonText: 'No',
                showCloseButton: true,
                showLoaderOnConfirm: true
            })
            .then((result) => {
                if (result.value) {
                    axios.patch(`/api/v1/cambiar-clave/${this.user.id}`, this.form)
                    .then((response) => {
                        this.$swal('Exito', 'gracias', 'success')
                        this.quiereCambiarClave = false;
                    })
                    .catch(error => {
                        this.$swal('Error', error, 'error')
                    })
                }
            })
        }
    },
}
</script>

<style>
    .wegotamodalhere{
        position: absolute;
        top: 25%;
        left: 5%;
    }
</style>
