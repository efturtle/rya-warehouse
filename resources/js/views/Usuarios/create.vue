<template>
<div>
    <div v-if="mensajeDelBack">
        <p>{{ mensajeDelBack }}</p>
    </div>

    <form class="space-y-6" @submit.prevent="guardarUsuario">
        <div class="space-y-4 rounded-md shadow-sm">
            <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
                <div class="mt-1">
                    <input type="text" name="name" id="name"
                           class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                           v-model="form.name">
                </div>
            </div>

            <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <div class="mt-1">
                    <input type="text" name="email" id="email"
                           class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                           v-model="form.email">
                </div>
            </div>

            <div>
                <label for="telefono" class="block text-sm font-medium text-gray-700">Telefono</label>
                <div class="mt-1">
                    <input type="number" name="telefono" id="telefono"
                           class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                           v-model="form.telefono">
                </div>
            </div>
            <div>
                <label for="puesto" class="block text-sm font-medium text-gray-700">Puesto</label>
                <div class="mt-1">

                    <select name="puesto" id="puesto"
                     class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                     v-model="form.puesto">
                        <option value="1">Administrador Almacen</option>
                        <option value="2">Administrador General</option>
                        <option value="3">Tecnico</option>
                    </select>

                </div>
            </div>
        </div>
        <button type="submit"
                class="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase bg-gray-800 rounded-md border border-transparent ring-gray-300 transition duration-150 ease-in-out hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring disabled:opacity-25">
            Crear
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
                name: '',
                email: '',
                telefono: '',
                puesto: '',
            },
            mensajeDelBack: '',
        }
    },
    methods: {
        guardarUsuario(){
            axios.post('/api/v1/usuarios', this.form)
            .then((data) => {
                this.mensajeDelBack = data.data.mensaje
                this.$router.push({name: 'usuarios.index'})
            })
            .catch(error => {
                this.mensajeDelBack = error
            })
        }
    }
}
</script>
