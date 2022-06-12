<template>
    <div class="overflow-hidden overflow-x-auto min-w-full align-middle sm:rounded-md">
        <span v-bind="mensaje_de_error"></span>
        <div class="flex place-content-start mb-4">
            <router-link :to="{ name: 'herramientas.carrito' }">
                <div class="flex p-3 pt-3 rounded-full bg-green-500 text-white text-center">
                    Articulos en el carrito: &nbsp;
                    <span>
                        {{ total_products }}
                    </span>
                </div>
            </router-link>
            <div class="px-4 py-2 text-white bg-orange-600 hover:bg-orange-700 cursor-pointer" v-if="admin">
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
                <th class="px-6 py-3 bg-gray-50">
                    <span
                        class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500">Acciones</span>
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
                            {{ herramienta.descripcion.substring(0,10) }}
                        </td>
                        <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                            {{ herramienta.inventario }}
                        </td>

                        <!-- Actions -->
                        <td class="grid grid-cols-2 gap-4 justify-items-center px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">

                            <!-- Edit -->
                            <button class="btn bg-gray-500 text-white p-1 rounded hover:bg-gray-400 mr-2" v-show="admin" @click="editarHerramienta(herramienta.id)">
                                <icons name="edit" width="21px" height="21px" />
                            </button>

                            <!-- Delete -->
                            <button class="btn bg-gray-500 text-white p-1 rounded hover:bg-gray-400 mr-2" v-show="admin" @click="eliminarHerramienta(herramienta.id)">
                                <icons name="trash" width="21px" height="21px" />
                            </button>

                            <!-- Sumar inventario -->
                            <button class="btn bg-gray-500 text-white p-1 rounded hover:bg-gray-400 mr-2" v-show="admin" @click="sumarInventario(herramienta.id)">
                                <icons name="plus" width="21px" height="21px" />
                            </button>

                            <!-- Restar inventario -->
                            <button class="btn bg-gray-500 text-white p-1 rounded hover:bg-gray-400 mr-2" v-show="admin" @click="restarInventario(herramienta.id)">
                                <icons name="minus" width="21px" height="21px" />
                            </button>

                            <!-- Solicitar esta herramienta -->
                            <SolicitarHerramienta
                                :herramienta="herramienta" />

                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>

        <!-- Editar Herramienta -->
        <div class="mt-5">
            <div id="defaultModal" v-if="quiereEditarHerramienta" tabindex="-1" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
                <div class="bg-slate-50 relative p-4 w-full max-w-2xl h-full md:h-auto shadow dark:bg-gray-700">
                    <!-- Modal content -->
                    <div class="bg-slate-50 relative bg-white rounded-lg">
                        <!-- Modal header -->
                        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                Editar Herramienta
                            </h3>
                            <button type="button" @click="noQuiereEditarHerramienta" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                        <!-- Modal body -->
                        <div class="grid grid-cols-1 gap-4 place-items-center">
                            <div>
                                <label for="nombre" class="block text-sm font-medium text-gray-700">Tarea</label>
                                <input type="text" v-model="form.nombre" id="nombre"
                                    class="mb-3 rounded-md shadow-sm border-gray-300 focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50">
                            </div>
                            <div>
                                <label for="descripcion" class="block text-sm font-medium text-gray-700">Descripcion</label>
                                <input type="text" v-model="form.descripcion" id="descripcion"
                                    class="mb-3 rounded-md shadow-sm border-gray-300 focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50">
                            </div>
                        </div>
                        <!-- Modal footer -->
                        <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                            <button type="button" @click="confirmarYEditarHerramienta" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cambiar</button>
                            <button type="button" @click="noQuiereEditarHerramienta" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Sumar inventario -->
        <div class="mt-5">
            <div id="defaultModal" v-if="quiereSumarInventario" tabindex="-1" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
                <div class="bg-slate-50 relative p-4 w-full max-w-2xl h-full md:h-auto shadow dark:bg-gray-700">
                    <!-- Modal content -->
                    <div class="bg-slate-50 relative bg-white rounded-lg">
                        <!-- Modal header -->
                        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                Sumar inventario
                            </h3>
                            <button type="button" @click="noQuiereSumarInventario" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                        <!-- Modal body -->
                        <div class="grid grid-cols-1 gap-4 place-items-center">
                            <div>
                                <label for="nombre" class="block text-sm font-medium text-gray-700">Cantidad a sumar</label>
                                <input type="number" v-model="formInventario.cantidad" placeholder="ingrese una cantidad" id="cantidadInputParaSumar"
                                    class="mb-3 rounded-md shadow-sm border-gray-300 focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50">
                            </div>
                        </div>
                        <!-- Modal footer -->
                        <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                            <button type="button" @click="confirmarYSumarInventario" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cambiar</button>
                            <button type="button" @click="noQuiereSumarInventario" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Restar inventario -->
        <div class="mt-5">
            <div id="defaultModal" v-if="quiereRestarInventario" tabindex="-1" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
                <div class="bg-slate-50 relative p-4 w-full max-w-2xl h-full md:h-auto shadow dark:bg-gray-700">
                    <!-- Modal content -->
                    <div class="bg-slate-50 relative bg-white rounded-lg">
                        <!-- Modal header -->
                        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                Restar inventario
                            </h3>
                            <button type="button" @click="noQuiereRestarInventario" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                        <!-- Modal body -->
                        <div class="grid grid-cols-1 gap-4 place-items-center">
                            <div>
                                <label for="nombre" class="block text-sm font-medium text-gray-700">Cantidad a Restar</label>
                                <input type="number" v-model="formInventario.cantidad" placeholder="ingrese una cantidad" id="cantidadInputParaRestar"
                                    class="mb-3 rounded-md shadow-sm border-gray-300 focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50">
                            </div>
                        </div>
                        <!-- Modal footer -->
                        <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                            <button type="button" @click="confirmarYRestarInventario" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cambiar</button>
                            <button type="button" @click="noQuiereRestarInventario" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import icons from 'v-svg-icons';
import SolicitarHerramienta from '../components/Herramientas/SolicitudDeHerramienta.vue'
export default {
    components:{icons, SolicitarHerramienta},
    data(){
        return {
            herramientas: [],
            user: [],
            mensaje_de_error: '',
            quiereEditarHerramienta: false,
            quiereSumarInventario: false,
            quiereRestarInventario: false,
            activeEditHerramientaId: '',
            activeSumHerramientaId: '',
            activeRestaHerramientaId: '',
            form: {
                nombre: '',
                descripcion: '',
            },
            formInventario: {
                cantidad: 0
            }
        }
    },
    methods:{
        noQuiereEditarHerramienta(){
            this.quiereEditarHerramienta = false;
        },

        noQuiereSumarInventario(){
            this.quiereSumarInventario = false;
        },
        noQuiereRestarInventario(){
            this.quiereRestarInventario = false;
        },

        getHerramienta(herramienta_id){
            return this.herramientas.find(herramienta => herramienta.id == herramienta_id);
        },

        sumarInventario(herramienta_id){
            this.quiereSumarInventario = true;
            this.activeSumHerramientaId = herramienta_id;
        },

        confirmarYSumarInventario(){
            let herramienta = this.getHerramienta(this.activeSumHerramientaId);

            if (this.formInventario.cantidad == '') {
                this.sweetAlertToast('campo vacio', 'Cantidad', 'warning');
                return;
            }

            if (this.formInventario.cantidad < 1) {
                this.sweetAlertToast('numero invalido', 'Ingrese una cantidad positiva', 'info');
                this.formInventario.cantidad = 0;
                return;
            }

            axios.patch(`/api/v1/herramientas/sumar/${herramienta.id}`, this.formInventario)
            .then(() => {
                this.sweetAlertToast('Exito', `Se le sumo a ${herramienta.nombre}`, 'success')

                // local herramienta inventario
                let inventario = parseInt(herramienta.inventario);

                herramienta.inventario = inventario += this.formInventario.cantidad;

                this.formInventario.cantidad = 0;
                document.querySelector('#cantidadInputParaSumar').focus();

                // esconder modals
                this.quiereSumarInventario = false;

            })
            .catch(error => {
                this.$swal('Error', error, 'error');
            })
        },

        restarInventario(herramienta_id){
            this.quiereRestarInventario = true;
            this.activeRestaHerramientaId = herramienta_id;
        },

        confirmarYRestarInventario(){
            let herramienta = this.getHerramienta(this.activeRestaHerramientaId);

            let cantidad = this.formInventario.cantidad;

            if (cantidad == '') {
                this.sweetAlertToast('campo vacio', 'Cantidad', 'warning');
                return;
            }

            if (cantidad < 1) {
                this.formInventario.cantidad = Math.abs(cantidad);
            }

            if (cantidad > parseInt(herramienta.inventario)) {
                this.sweetAlertToast('inventario insuficiente', 'Se le quiere restar mas de lo que hay', 'info');
                this.formInventario.cantidad = 0;
                return;
            }

            axios.patch(`/api/v1/herramientas/restar/${herramienta.id}`, this.formInventario)
            .then(() => {
                this.sweetAlertToast('Exito', `Se le resto a ${herramienta.nombre}`, 'success')

                // local herramienta inventario
                herramienta.inventario -= this.formInventario.cantidad;
                this.formInventario.cantidad = 0;
                document.querySelector('#cantidadInputParaRestar').focus();

                // esconder modals
                this.quiereRestarInventario = false;

            })
            .catch(error => {
                this.$swal('Error', error, 'error');
            })
        },

        editarHerramienta(herramienta_id){
            this.quiereEditarHerramienta = true;
            let herramienta = this.herramientas.find(herramienta => herramienta.id == herramienta_id);

            // fill in current tarea
            this.form.nombre = herramienta.nombre;
            this.form.descripcion = herramienta.descripcion;
            this.activeEditHerramientaId = herramienta.id;
        },

        confirmarYEditarHerramienta(){
            // validate for null inputs
            if (this.form.nombre == '') {
                this.sweetAlertToast('campo vacio', 'Nombre', 'warning');
                return;
            }
            if (this.form.descripcion == '') {
                this.sweetAlertToast('campo vacio', 'Descripcion', 'warning');
                return;
            }

            // send the tarea to the backend
            axios.put(`/api/v1/herramientas/${this.activeEditHerramientaId}`, this.form)
            .then(() => {
                this.sweetAlertToast('Exito', 'Herramienta Actualizada', 'success')

                // actualiza las tarea
                let herramienta = this.getHerramienta(this.activeEditHerramientaId);
                herramienta.nombre = this.form.nombre;
                herramienta.descripcion = this.form.descripcion;

                // esconder modals
                this.quiereEditarHerramienta = false;

            })
            .catch(error => {
                this.$swal('Error', error, 'error');
            })
        },

        eliminarHerramienta(herramienta_id){
            let herramienta = this.getHerramienta(herramienta_id);
            this.$swal({
                title: `Eliminar ${herramienta.nombre}? <br>inv. actual <span class="text-orange-300"> ${herramienta.inventario} </span>`,
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Si',
                cancelButtonText: 'No',
                showCloseButton: true,
                showLoaderOnConfirm: true
            })
            .then((result) => {
                if (result.value) {
                    axios.delete(`/api/v1/herramientas/${herramienta_id}`)
                    .then(() => {
                        this.sweetAlertToast('Exito', 'Se elimino una Herramienta', 'success');

                        this.herramientas.splice(this.herramientas.findIndex(function(herramienta){
                            return herramienta.id == herramienta_id;
                        }), 1);
                    })
                    .catch(error => {
                        this.sweetAlertToast('Error', error, 'error');
                    })
                }
            })
        },

        getUserName(user_id){
            let user = this.users.find(user => user.id == user_id);
            return user.name
        },

        sweetAlertToast(title, text, icon){
            this.$swal({
                title: title,
                text: text,
                icon: icon,
                toast: true,
            })
        },
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
        },
        total_products(){
            return this.$store.getters.totalItems;
        }
    }
}
</script>

<style>

</style>
