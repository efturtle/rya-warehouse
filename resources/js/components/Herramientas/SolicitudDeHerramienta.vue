<template>
<div>

    <button class="btn bg-gray-500 text-white p-1 rounded hover:bg-gray-400 mr-2"
        v-show="!isAdmin"
        @click="addToCart">
        <icons name="shopping-cart" width="20px" height="20px" />
    </button>
</div>
</template>

<script>
import icons from 'v-svg-icons';
export default {
    props: ['herramienta', 'isAdmin'],
    components:{icons},
    methods:{
        addToCart(){
            let item = this.herramienta;
            this.$store.commit('addToCart', item)
        }
    }
}
</script>

<style>

</style>
