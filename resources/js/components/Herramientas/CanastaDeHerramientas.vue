<template>
    <div>
        <div class="flex items-start justify-between">
            <h2 class="text-lg font-medium text-gray-900">Carrito</h2>
            <div class="flex h-7 items-center">
                <button type="button" class="-m-2 p-2 text-gray-400 hover:text-gray-500">
                <span class="sr-only">Close panel</span>
                <!-- Heroicon name: outline/x -->
                <svg @click="this.$router.push({name: 'herramientas.index'})" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>
            </div>
        </div>
        <ArticuloEnCarrito
            v-for="herramienta in herramientas"
            :key="herramienta.id"
            :herramienta="herramienta" />


        <TotalDelCarrito />
    </div>
</template>

<script>
import ArticuloEnCarrito from './ArticuloEnElCarrito.vue';
import TotalDelCarrito from './TotalDelCarrito.vue';
export default {
    components: { ArticuloEnCarrito, TotalDelCarrito },
    computed: {
        herramientas(){
            return this.$store.getters.cartItems;
        }
    },
    mounted(){
        this.$store.commit('updateCartFromLocalStorage')
    }
}
</script>

<style>

</style>
