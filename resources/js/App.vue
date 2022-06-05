<template>
<div class="flex">
    <div class="flex flex-col items-center w-14 md:w-24 md:60 h-screen px-1 md:px-4 py-8 overflow-y-auto border-r">
        <Navigation />
    </div>
    <!-- <div class="w-full h-full p-1 md:p-2 lg:pd-4 m-4 md:m-6 lg:m-8 overflow-y-auto mt-6"> -->
        <!-- <div class="p-1 md:p-2 lg:p-4 border-2 shadow-lg shadow-orange-500/40"> -->
    <div class="w-full h-full overflow-y-auto">
        <router-view/>
    </div>
</div>
</template>
<script>
import Navigation from './components/Navigation.vue'

export default {
    components: {
        Navigation
    }
}
</script>
