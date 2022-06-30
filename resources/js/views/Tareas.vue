<template>
    <div class="overflow-hidden overflow-x-auto min-w-full align-middle sm:rounded-md">
        <div class="flex place-content-end mb-4" v-show="isAdmin">
            <div class="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer">
                <router-link :to="{ name: 'tarea.create'}" class="text-sm font-medium">Crear Tarea</router-link>
            </div>
        </div>

        <table class="table-fixed w-full border divide-y divide-gray-200">
            <thead>
            <tr>
                <th class="px-6 py-3 bg-gray-50">
                    <span
                        class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500">Nombre</span>
                </th>
                <th class="px-6 py-3 bg-gray-50">
                    <span
                        class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500">Estatus</span>
                </th>
                <th class="px-6 py-3 bg-gray-50">
                    <span
                        class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500">Usuario</span>
                </th>
                <th class="px-6 py-3 bg-gray-50">
                    <span
                        class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500">Acciones</span>
                </th>
            </tr>
            </thead>

            <tbody class="bg-white divide-y divide-gray-200 divide-solid">
                <template v-for="tarea in tareas" :key="tarea.id">
                    <tr class="bg-white" v-bind:class="tarea.estatus == 2 ? 'bg-green-200 text-white':''">
                        <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                            {{ tarea.nombre }}
                        </td>
                        <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                            <span v-if="tarea.estatus == 1">Creada</span>
                            <span v-if="tarea.estatus == 2">Terminada</span>
                        </td>
                        <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                            {{ tarea.usuario }}
                        </td>

                        <!-- Actions -->
                        <td class="grid grid-cols-2 gap-2 justify-items-center px-4 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">

                            <!-- Edit -->
                            <button v-show="isAdmin" class="btn bg-gray-500 text-white p-1 rounded hover:bg-gray-400 mr-2" @click="editarTarea(tarea.id)">
                                <icons name="edit" width="30px" height="30px" class=""/>
                            </button>

                            <!-- Delete -->
                            <button v-show="isAdmin" class="btn bg-gray-500 text-white p-1 rounded hover:bg-gray-400 mr-2" @click="eliminarTarea(tarea.id)">
                                <icons name="trash" width="30px" height="30px" />
                            </button>

                            <!-- Finish -->
                            <button v-show="!isAdmin && notDone(tarea.id)" class="btn bg-gray-500 text-white p-1 rounded hover:bg-gray-400" @click="tareaTerminada(tarea.id)">
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


    <!-- Editar Tarea -->
        <div class="mt-5">
            <div id="defaultModal" v-if="quiereEditarTarea" tabindex="-1" class="wegotamodalhere overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
                <div class="bg-slate-50 relative p-4 w-full max-w-2xl h-full md:h-auto shadow dark:bg-gray-700">
                    <!-- Modal content -->
                    <div class="bg-slate-50 relative bg-white rounded-lg">
                        <!-- Modal header -->
                        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                Editar Tarea
                            </h3>
                            <button type="button" @click="noQuiereEditarTarea" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
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
                            <div>
                                <label for="asignado" class="block text-sm font-medium text-gray-700">Asignado</label>
                                <select v-model="form.user" class="mb-3 rounded-md shadow-sm border-gray-300 focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50">
                                    <option v-for="user in users" v-bind:value="{ id: user.id, text: user.name }" :key="user.id" id="optionSelected"> {{ user.name }}</option>
                                </select>
                            </div>
                        </div>
                        <!-- Modal footer -->
                        <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                            <button type="button" @click="confirmarYEditarTarea" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cambiar</button>
                            <button type="button" @click="noQuiereEditarTarea" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import icons from 'v-svg-icons';

export default {
    components:{icons},
    methods: {
        noQuiereEditarTarea(){
            this.quiereEditarTarea = false;
        },
        editarTarea(tarea_id){
            this.quiereEditarTarea = true;
            let tarea = this.tareas.find(tarea => tarea.id == tarea_id);

            // fill in current tarea
            this.form.nombre = tarea.nombre;
            this.form.descripcion = tarea.descripcion;
            this.form.user_id = tarea.user_id;
            this.activeEditTareaId = tarea.id;
        },
        confirmarYEditarTarea(){
            // validate for null inputs
            if (this.form.nombre == '') {
                this.sweetAlertToast('campo vacio', 'Nombre de la tarea', 'warning');
                return;
            }
            if (this.form.descripcion == '') {
                this.sweetAlertToast('campo vacio', 'Descripcion de la tarea', 'warning');
                return;
            }
            if (this.form.user_id == '') {
                this.sweetAlertToast('campo vacio', 'Asigngado de la tarea', 'warning');
                return;
            }

            // send the tarea to the backend
            axios.put(`/api/v1/tareas/${this.activeEditTareaId}`, this.form)
            .then(() => {
                this.sweetAlertToast('Exito', 'Tarea Actualizada', 'success')

                // actualiza las tarea
                let tarea = this.getTarea(this.activeEditTareaId);
                tarea.nombre = this.form.nombre;
                tarea.descripcion = this.form.descripcion;
                tarea.user_id = this.form.user_id;

                // esconder modals
                this.quiereEditarTarea = false;

            })
            .catch(error => {
                this.$swal('Error', error, 'error');
            })
        },
        getTarea(tarea_id){
            return this.tareas.find(tarea => tarea.id == tarea_id);
        },
        eliminarTarea(tarea_id){
            this.$swal({
                title: 'Eliminar Tarea?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Si',
                cancelButtonText: 'No',
                showCloseButton: true,
                showLoaderOnConfirm: true
            })
            .then((result) => {
                if (result.value) {
                    axios.delete(`/api/v1/tareas/${tarea_id}`)
                    .then(() => {
                        this.sweetAlertToast('Exito', 'Se elimino una tarea', 'success');

                        this.tareas.splice(this.tareas.findIndex(function(tarea){
                            return tarea.id == tarea_id;
                        }), 1);
                    })
                    .catch(error => {
                        this.sweetAlertToast('Error', error, 'error');
                    })
                }
            })
        },
        tareaTerminada(tarea_id){
            this.$swal({
                title: 'Terminar tarea?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Si',
                cancelButtonText: 'No',
                showCloseButton: true,
                showLoaderOnConfirm: true
            })
            .then((result) => {
                if (result.value) {
                    axios.patch(`/api/v1/tareas/cambiar-estado/${tarea_id}`)
                    .then((response) => {
                        this.sweetAlertToast('Exito', 'Ah Terminado una tarea!', 'success');
                        let tarea = this.getTarea(tarea_id);
                        tarea.estatus = '2';
                    })
                    .catch(error => {
                        this.sweetAlertToast('Error', error, 'error');
                    })
                }
            })
        },
        notDone(tarea_id){
            let tarea = this.getTarea(tarea_id);
            if (tarea.estatus != 2) {
                return true;
            }
            return false;
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
    data(){
        return {
            tareas: [],
            activeUser: [],
            users: [],
            quiereEditarTarea: false,
            activeEditTareaId: '',
            form: {
                nombre: '',
                descripcion: '',
                user_id: ''
            }
        }
    },
    created(){
        // get the current user
        axios.get('/api/user')
        .then((data) => {
            this.activeUser = data.data;
            if (data.data.puesto == '3') {
                axios.get(`/api/v1/user/tareas/${this.activeUser.id}`)
                .then((data) => {
                    this.tareas = data.data.tareas;
                })
            }else{
                axios.get('/api/v1/tareas')
                .then((data) => {
                    this.tareas = data.data.tareas;
                })
            }
        }).catch(error => {
            this.$swal('error', `Fallo en conseguir al usuario activo, reiniciar la app ${error}`, 'error');
            axios.get('/api/v1/tareas')
            .then((data) => {
                this.tareas = data.data.tareas;
            })
        })
    },
    mounted(){
        // get all the users
        axios.get('/api/v1/users')
        .then((response) => {
            this.users = response.data.usuarios;
        })
        .catch(error => {
            this.$swal('error', error, 'error')
        })
    },
    computed: {
        isAdmin(){
            if (this.activeUser.puesto != 3) {
                return true;
            }
            return false;
        }
    }
}
</script>

<style>

</style>
