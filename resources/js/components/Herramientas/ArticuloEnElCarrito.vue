<template>
<div class="pointer-events-auto">
    <div class="flex h-full flex-col bg-white shadow-xl">
        <div class="flex-1 overflow-y-auto py-2 px-4 sm:px-6">
            <div class="mt-8">
                <div class="flow-root">
                    <ul role="list" class="my-1 divide-y divide-gray-200">
                        <li class="flex py-6">
                            <div class="ml-4 flex flex-1 flex-col">
                            <div>
                                <div class="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                    <a href="#"> {{ herramienta.nombre }}</a>
                                </h3>
                                </div>
                            </div>
                            <div class="flex items-end justify-between text-sm">
                                <p class="text-gray-500">{{ cantidadSolicitadas }}</p>
                                <div>
                                    <button type="button" @click="addToCart" class="font-medium text-white hover:text-green-500 bg-green-400 h-12 w-12 text-lg">+</button>
                                    <button type="button" @click="removeFromCart" class="font-medium text-white hover:text-red-500 bg-red-400 h-12 w-12 text-lg">-</button>
                                </div>
                            </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ['herramienta'],
    computed: {
        cantidadSolicitadas(){
            return this.$store.getters.herramientaQuantity(this.herramienta);
        }
    },
    methods:{
        addToCart(){
            if (this.herramienta.inventario < 1) {
                this.sweetAlertToast('warning', 'no hay suficiente inventario', 'Error');
                return;
            }

            let item = this.herramienta;
            // reduce inventario en el front
            this.herramienta.inventario --;
            this.$store.commit('addToCart', item);
        },
        sweetAlertToast(title, text, icon){
            this.$swal({
                title: title,
                text: text,
                icon: icon,
                toast: true,
            })
        },
        removeFromCart(){
            this.$store.commit('removeFromCart', this.herramienta);
        }
    }
}
</script>

<style>

</style>
