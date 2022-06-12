<template>
<div class="bg-white shadow-xl">
    <div class="py-2 px-auto sm:px-6">
        <div class="mt-2">
            <ul class="my-1">
                <li class="py-6">
                    <div class="ml-4">
                        <a class="text-lg font-medium text-gray-900" href="#"> {{ peticionItem.nombre }}</a>
                        <p class="text-gray-500">{{ peticionItem.cantidad }}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ['peticionItem']
}
</script>

<style>

</style>
