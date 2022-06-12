<template>
<div class="border-t border-gray-200 py-6 px-4 sm:px-6">
    <div class="flex justify-between text-base font-medium text-gray-900">
        <div v-if="this.$store.getters.totalItems < 1" class="text-xl">No hay articulos en el carrito</div>
        <p>Subtotal</p>
        <p>{{ cantidadSolicitadas }}</p>
    </div>

    <div class="mt-6">
        <a @click="solicitarCarrito" class="flex items-center justify-center rounded-md border border-transparent bg-orange-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-orange-700">Solicitar</a>
    </div>

    <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
        <p>
            or <button type="button" @click="this.$router.push({name: 'herramientas.index'})" class="font-medium text-orange-600 hover:text-orange-500">Regresar<span> &rarr;</span></button>
        </p>
    </div>
</div>
</template>

<script>
export default {
    computed: {
        cantidadSolicitadas(){
            return this.$store.getters.totalItems;
        }
    },
    methods:{
        solicitarCarrito(){
            // validar por carrito vacio
            if (this.$store.getters.totalItems == 0) {
                this.$swal('Error', 'Carrito Vacio', 'warning');
                return;
            }

            axios.post('/api/v1/peticiones', this.$store.getters.cartItems)
            .then((response) => {
                let message = response.data.data;
                this.$swal('Exito', 'Herramientas Solicitadas', 'success');
                this.$store.commit('deleteItemsFromCart');

                // return user to herramientas
                this.$router.push({name: 'herramientas.index'})
            })
        }
    }
}
</script>

<style>

</style>
