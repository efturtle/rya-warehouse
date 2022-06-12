<template>
<div>
    <button class="btn bg-gray-500 text-white p-1 rounded hover:bg-gray-400 mr-2"
        @click="addToCart">
        <icons name="shopping-cart" width="20px" height="20px" />
    </button>
</div>
</template>

<script>
import icons from 'v-svg-icons';
export default {
    props: ['herramienta'],
    components:{icons},
    data(){
        return {

        }
    },
    mounted(){
        console.log(this.herramienta);
    },
    methods:{
        addToCart(){
            // verificar que alla suficiente inventario
            if (this.herramienta.inventario < 1) {
                this.sweetAlertToast('warning', 'no hay suficiente inventario', 'Error');
                return;
            }

            let item = this.herramienta;
            // reduce inventario en el front
            this.herramienta.inventario --;
            this.$store.commit('addToCart', item)
        },
        sweetAlertToast(title, text, icon){
            this.$swal({
                title: title,
                text: text,
                icon: icon,
                toast: true,
            })
        },
    }
}
</script>

<style>

</style>
