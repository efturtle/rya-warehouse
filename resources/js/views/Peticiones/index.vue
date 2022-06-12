<template>
    <div class="overflow-hidden overflow-x-auto min-w-full align-middle sm:rounded-md">
        <span v-bind="mensaje_de_error"></span>

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
                    <tr :class="[isAccepted(peticion.estatus) ? 'bg-green-300' : 'bg-white']">
                        <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                            {{ peticion.name }}
                        </td>
                        <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                            {{ peticion.total_herramientas_en_peticion }}
                        </td>
                        <td v-show="isReturned(peticion.estatus)">
                            Devultas
                        </td>
                        <td v-show="isRejected(peticion.estatus)" class="bg-red-300">
                            {{ peticion.comentario }}
                        </td>
                        <td v-show="!isReturned(peticion.estatus) && !isRejected(peticion.estatus)" class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                            <button v-show="!isAccepted(peticion.estatus)" @click="aceptarEstaPeticion(peticion.id)" class="btn bg-gray-500 text-white p-1 rounded hover:bg-gray-400 mr-2">
                                <icons name="check" width="35px" height="35px" />
                            </button>
                            <button @click="devolverHerramientas(peticion.id)" v-show="isAccepted(peticion.estatus) && !isReturned(peticion.estatus)" class="btn bg-gray-500 text-white p-1 rounded hover:bg-gray-400 mr-2">
                                <icons name="redo-alt" width="35px" height="35px" />
                            </button>
                            <button @click="rechazarPeticion(peticion.id)" v-show="!isAccepted(peticion.estatus)" class="btn bg-gray-500 text-white p-1 rounded hover:bg-gray-400 mr-2">
                                <icons name="times" width="35px" height="35px" />
                            </button>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>

    <!-- aceptar peticion -->
        <div class="mt-5">
            <div id="defaultModal" v-if="quiereAceptarUnaPeticion" tabindex="-1" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
                <div class="bg-slate-50 relative p-4 w-full max-w-2xl h-full md:h-auto shadow dark:bg-gray-700">
                    <!-- Modal content -->
                    <div class="bg-slate-50 relative bg-white rounded-lg">
                        <!-- Modal header -->
                        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                Aceptar Una Peticion
                            </h3>
                        <button type="button" @click="noQuiereAceptarUnaPeticion" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                        <!-- Modal body -->
                        <div class="grid grid-cols-1 gap-4 place-items-center">
                            <PeticionItem
                                v-for="peticionItem in peticionItems"
                                :key="peticionItem.id"
                                :peticionItem="peticionItem"/>
                        </div>
                        <!-- Modal footer -->
                        <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                            <button type="button" @click="confirmarYAceptarPeticion" class="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Aceptar</button>
                            <button type="button" @click="noQuiereAceptarUnaPeticion" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    <!-- rechazar peticion -->
        <div class="mt-5">
            <div id="defaultModal" v-if="quiereRechazarUnaPeticion" tabindex="-1" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
                <div class="bg-slate-50 relative p-4 w-full max-w-2xl h-full md:h-auto shadow dark:bg-gray-700">
                    <!-- Modal content -->
                    <div class="bg-slate-50 relative bg-white rounded-lg">
                        <!-- Modal header -->
                        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                Rechazar Una Peticion
                            </h3>
                        <button type="button" @click="noQuiereRechazarUnaPeticion" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                        <!-- Modal body -->
                        <div class="grid grid-cols-1 gap-4 place-items-center">
                            <label for="rechazo" class="block text-sm font-medium text-gray-700">Motivo de Rechazo</label>
                                <input type="text" v-model="formRechazar.comentario" id="rechazo"
                                    class="mb-3 rounded-md shadow-sm border-gray-300 focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50">
                        </div>
                        <!-- Modal footer -->
                        <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                            <button type="button" @click="confirmarYRechazarPeticion" class="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Rechazar</button>
                            <button type="button" @click="noQuiereRechazarUnaPeticion" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import icons from 'v-svg-icons';
import PeticionItem from '../../components/Peticiones/PeticionItem.vue';
export default {
    components:{icons, PeticionItem},
    data(){
        return {
            peticiones: [],
            user: [],
            mensaje_de_error: '',
            solicitador: '',
            quiereAceptarUnaPeticion: false,
            quiereRechazarUnaPeticion: false,
            activelyAcceptingPeticionId: 0,
            activelyRejectingPeticionId: 0,
            peticionItemsArray: [],
            form: {
                peticionItemsArray: [],
                peticion_id: ''
            },
            formRechazar: {
                comentario: '',
            },
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
        isAccepted(peticionStatus){
            if (peticionStatus == 2) {
                return true;
            }
            return false;
        },
        isReturned(peticionStatus){
            if (peticionStatus == 4) {
                return true;
            }
            return false;
        },
        isRejected(peticionStatus){
            if (peticionStatus == 3) {
                return true;
            }
            return false;
        },
        datosSolicitador(id){
            axios.get(`/api/v1/users/${id}`)
            .then((data) => {
                this.solicitador = data.data.user;
            })
            .catch(error => {
                this.mensaje_de_error = error;
            })
        },
        aceptarEstaPeticion(peticion_id){
            this.activelyAcceptingPeticionId = peticion_id;
            this.quiereAceptarUnaPeticion = true;
            axios.get(`/api/v1/peticiones/peticion-items/${peticion_id}`)
            .then((response) => {

                this.peticionItemsArray = response.data.peticionItems;
                this.form.peticionItemsArray = response.data.peticionItems;
                this.form.peticion_id = peticion_id;
            })

        },
        rechazarPeticion(peticion_id){
            this.quiereRechazarUnaPeticion = true;
            this.activelyRejectingPeticionId = peticion_id;
        },
        noQuiereRechazarUnaPeticion(){
            this.quiereRechazarUnaPeticion = false;
        },
        noQuiereAceptarUnaPeticion(){
            this.quiereAceptarUnaPeticion = false;
            this.peticionItemsArray = [];
        },

        confirmarYAceptarPeticion(){
            axios.patch(`/api/v1/peticiones/aceptar/${this.activelyAcceptingPeticionId}`, this.form)
            .then((response) =>{
                this.sweetAlertToast('Exito', 'Se acepto la peticion', 'success');

                this.quiereAceptarUnaPeticion = false;
                this.peticionItemsArray = [];
                this.$router.push({name: 'herramientas.index'})
            })
            .catch(error => {
                this.sweetAlertToast('Error', error, 'error');
            })
        },
        confirmarYRechazarPeticion(){
            axios.patch(`/api/v1/peticiones/rechazar/${this.activelyRejectingPeticionId}`, this.formRechazar)
            .then(() =>{
                this.sweetAlertToast('Exito', 'Se rechazo la peticion', 'success');
                this.quiereRechazarUnaPeticion = false;
                this.$router.push({name: 'herramientas.index'})
            });
        },
        devolverHerramientas(peticion_id){
            this.$swal({
                title: 'DevolverHerramientas?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Si',
                cancelButtonText: 'No',
                showCloseButton: true,
                showLoaderOnConfirm: true
            })
            .then((result) => {
                if (result.value) {
                    axios.patch(`/api/v1/peticiones/regresar/${peticion_id}`)
                    .then(() => {
                        this.sweetAlertToast('Exito', 'Se regresaron herramientas', 'success');
                        this.$router.push({name: 'herramientas.index'})
                    })
                    .catch(error => {
                        this.sweetAlertToast('Error', error, 'error');
                    })
                }
            })
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
    computed: {
        admin(){
            if (this.user.puesto != 3) {
                return true;
            }
            return false;
        },
        peticionItems(){
            return this.peticionItemsArray;
        }
    }
}
</script>

<style>

</style>
