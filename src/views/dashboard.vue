<template>
    <div id="gallery">
        <div class="container">
            <router-link to="/">Back</router-link>
            <button-changed></button-changed>
            <selectModels></selectModels>
            <canvasWorkspace></canvasWorkspace>
        </div>
    </div>
</template>

<script>
    import selectModels from './components/selectModels.vue'
    import canvasWorkspace from './components/canvasWorkspace.vue'
    import buttonChanged from './components/buttonChanged.vue'
    import { Event } from '../event.js'
    import { mapGetters } from 'vuex'

    export default {
        name: 'dashboard',
        components: {
            selectModels, canvasWorkspace,  buttonChanged
        },
        
        data() {
            return {
                type: this.$route.params.type,
                name: this.$route.params.name
            }
        },

        created() {
            this.$store.dispatch('workspace/setType', this.$route.params.type),
            this.$store.dispatch('workspace/setName', this.$route.params.name)
        },
    }
</script>

<style>
    @import '../../public/style/gallery.css';
    @import '../../node_modules/vue-multiselect/dist/vue-multiselect.min.css';
</style>
