<template>
    <div class="overflow-hidden overflow-x-auto min-w-full align-middle sm:rounded-md">
        <span v-bind="mensaje_de_error"></span>
        <div class="flex place-content-end mb-4" v-if="admin">
            <div class="px-4 py-2 text-white bg-pink-600 hover:bg-pink-700 cursor-pointer">
                <router-link :to="{ name: 'usuarios.create'}" class="text-sm font-medium">Crear Usuario</router-link>
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
                        class="text-xs tracking-wider leading-4 text-left text-gray-500">Correo</span>
                </th>
                <th class="px-6 py-3 bg-gray-50" v-if="admin">
                    <span
                        class="text-xs tracking-wider leading-4 text-left text-gray-500">Acciones</span>
                </th>
            </tr>
            </thead>

            <tbody class="bg-white divide-y divide-gray-200 divide-solid">
                <template v-for="user in users" :key="user.id">
                    <tr class="bg-white">
                        <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                            {{ user.name }}
                        </td>
                        <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                            {{ user.email.substring(0,10) }}
                        </td>

                        <!-- Actions -->
                        <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">

                            <!-- Edit -->
                            <button class="btn bg-gray-500 text-white p-1 rounded hover:bg-gray-400 mr-2" v-show="admin" @click="editarUsuario(user.id)">
                                <icons name="edit" width="21px" height="21px" />
                            </button>

                            <!-- Delete -->
                            <button class="btn bg-gray-500 text-white p-1 rounded hover:bg-gray-400 mr-2" v-show="admin" @click="eliminarUsuario(user.id)">
                                <icons name="trash" width="21px" height="21px" />
                            </button>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>

    <!-- Editar Usuario -->
    <div class="mt-5">
        <div id="defaultModal" v-if="quiereEditarUsuario" tabindex="-1" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
            <div class="bg-slate-50 relative p-4 w-full max-w-2xl h-full md:h-auto shadow dark:bg-gray-700">
                <!-- Modal content -->
                <div class="bg-slate-50 relative bg-white rounded-lg">
                    <!-- Modal header -->
                    <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Editar Usuario
                        </h3>
                        <button type="button" @click="noQuiereEditarUsuario" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                    <!-- Modal body -->
                    <div class="grid grid-cols-1 gap-4 place-items-center">
                        <div>
                            <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre</label>
                            <input type="text" v-model="form.name" id="nombre"
                                class="mb-3 rounded-md shadow-sm border-gray-300 focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50">
                        </div>
                        <div>
                            <label for="descripcion" class="block text-sm font-medium text-gray-700">Correo</label>
                            <input type="email" v-model="form.email" id="email"
                                class="mb-3 rounded-md shadow-sm border-gray-300 focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50">
                        </div>
                    </div>
                    <!-- Modal footer -->
                    <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                        <button type="button" @click="confirmarYEditarHerramienta" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cambiar</button>
                        <button type="button" @click="noQuiereEditarUsuario" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>
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
    data(){
        return {
            users: [],
            user: [],
            mensaje_de_error: '',
            quiereEditarUsuario: false,
            activeEditUserId: '',
            form: {
                name: '',
                email: ''
            }
        }
    },
    methods:{
        noQuiereEditarUsuario(){
            this.quiereEditarUsuario = false;
        },
        editarUsuario(user_id){
            this.quiereEditarUsuario = true;
            this.activeEditUserId = user_id;

            let user = this.getUser(user_id);
            this.form.name = user.name;
            this.form.email = user.email;

        },
        eliminarUsuario(user_id){
            let user = this.getUser(user_id);
            this.$swal({
                title: `Eliminar <span class="text-orange-300"> ${user.name} </span>? `,
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Si',
                cancelButtonText: 'No',
                showCloseButton: true,
                showLoaderOnConfirm: true
            })
            .then((result) => {
                if (result.value) {
                    axios.delete(`/api/v1/eliminar-usuario/${user_id}`)
                    .then(() => {
                        this.sweetAlertToast('Exito', 'Se elimino un usuario', 'success');

                        this.users.splice(this.users.findIndex(function(user){
                            return user.id == user_id;
                        }), 1);
                    })
                    .catch(error => {
                        this.sweetAlertToast('Error', error, 'error');
                    })
                }
            })
        },
        confirmarYEditarHerramienta(){

            // validate for null inputs
            if (this.form.name == '') {
                this.sweetAlertToast('campo vacio', 'Nombre', 'warning');
                return;
            }
            if (this.form.email == '') {
                this.sweetAlertToast('campo vacio', 'Email', 'warning');
                return;
            }

            let user = this.getUser(this.activeEditUserId);

            if (user.id == this.user.id) {
                this.sweetAlertToast('auto eliminacion', 'No se permite eliminar el usuario activo', 'warning');
                return;
            }

            // edit the user
            axios.put(`/api/v1/editar-usuario/${this.activeEditUserId}`, this.form)
            .then(() => {
                this.sweetAlertToast('Exito', 'Usuario se actualizo', 'success')

                // actualizar usuario local

                user.name = this.form.name;
                user.email = this.form.email;


                // esconder modals
                this.quiereEditarUsuario = false;
            })
            .catch((error) => {
                let errorOnName = error.response.data.errors.name;
                let errorOnEmail = error.response.data.errors.email;
                if (errorOnName == null) {
                    errorOnName = '';
                }
                if (errorOnEmail == null) {
                    errorOnEmail = '';
                }
                this.$swal('Error', `${errorOnName} <br> ${errorOnEmail}`, 'error');
                this.quiereEditarUsuario = false;
            })
        },
        getUser(user_id){
            return this.users.find(user => user.id == user_id);
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
        axios.get('api/v1/users')
        .then((data) => {
            this.users = data.data.usuarios;
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
    }
}
</script>

<style>

</style>
