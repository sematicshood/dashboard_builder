<template>
    <div id="gallery">
        <div class="container">
            <router-link to="/">Back</router-link>
            <selectModels></selectModels>
        </div>
    </div>
</template>

<script>
    import selectModels from './components/selectModels.vue'

    export default {
        name: 'gallery',
        components: {
            selectModels
        }
    }
</script>

<style>
    @import '../../public/style/gallery.css';
    @import '../../node_modules/vue-multiselect/dist/vue-multiselect.min.css';
</style>
