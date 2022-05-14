<template>
<div>
    <div v-if="mensajeDelBack">
        <p>{{ mensajeDelBack }}</p>
    </div>
    <form class="space-y-6" @submit.prevent="guardarTarea">
        <div class="space-y-4 rounded-md shadow-sm">
            <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Tarea</label>
                <div class="mt-1">
                    <input type="text" name="nombre" id="nombre"
                           class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                           v-model="form.nombre">
                </div>
            </div>

            <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Descripcion</label>
                <div class="mt-1">
                    <input type="text" name="descripcion" id="descripcion"
                           class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                           v-model="form.descripcion">
                </div>
            </div>

            <div>
                <label for="address" class="block text-sm font-medium text-gray-700">Usuario</label>
                <div class="mt-1">
                    <select name="user" id="user" v-model="form.user_id" class="block mt-1 w-1/3 rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50">
                        <option v-for="user in users" :key="user.id" :value="user.id"> {{ user.name }}</option>
                    </select>
                </div>
            </div>
        </div>

        <button type="submit"
                class="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase bg-gray-800 rounded-md border border-transparent ring-gray-300 transition duration-150 ease-in-out hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring disabled:opacity-25">
            Asignar
        </button>
    </form>
</div>
</template>

<script>
export default {
    data(){
        return{
            users: [],
            form: {
                nombre: '',
                descripcion: '',
                user_id: '',
            },
            mensajeDelBack: '',
        }
    },
    mounted() {
        axios.get('/api/v1/users')
        .then((data) => {
            this.users = data.data.usuarios
        });
    },
    methods: {
        guardarTarea (){
            axios.post('/api/v1/tareas', this.form)
            .then((data) => {
                this.mensajeDelBack = data.data.mensaje
                this.$router.push({name: 'tarea'})
            })
            .catch(e => {
                this.mensajeDelBack = e;
            });

        }
    }
}
</script>

<style>

</style>
