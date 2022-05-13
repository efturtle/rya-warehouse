<template>
    <div class="grid grid-cols-5 grid-flow-col mb-2 hover:bg-gray-200 border-b-2">
        <div class="col-span-2 ">
             <span class="text-sm md:text-md">{{ tarea.nombre }} </span>
        </div>
        <div class="col-span-2 flex justify-start">
             <span class="text-sm md:text-md"> {{ estatus }} </span>
        </div>
        <div class="col-span-1">
            <button class="btn bg-gray-500 text-white p-1 rounded hover:bg-gray-400 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
            </button>
            <button class="btn bg-gray-500 text-white p-1 rounded hover:bg-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            </button>
        </div>
    </div>
</template >

<script>
export default {
props: ['tarea'],
computed: {
    estatus(){
        switch (this.tarea.estatus) {
            case 1:
                return 'pendiente'
                break;
            case 2:
                return 'revisado'
                break;
            case 3:
                return 'en proceso'
                break;
            case 3:
                return 'terminado'
                break;

            default:
                return 'error'
                break;
        }
    }
}
}
</script>

<style>

</style>
