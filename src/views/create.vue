<template>
    <div id="gallery">
        <div class="container">
            <router-link to="/">Back</router-link>
            <selectModels :vuedata.sync="data" :vueloading="loading" :vuetotal="total" :vuetitles="titles"></selectModels>
            <canvasWorkspace :vuedata.sync="data" :vueloading="loading" :vuetotal="total" :vuetitles="titles"></canvasWorkspace>
        </div>
    </div>
</template>

<script>
    import selectModels from './components/selectModels.vue'
    import canvasWorkspace from './components/canvasWorkspace.vue'
    import { Event } from '../event.js'

    export default {
        name: 'gallery',
        components: {
            selectModels, canvasWorkspace
        },
        
        data() {
            return {
                data: {},
                titles: [],
                loading: false,
                total: 0,
            }
        },

        methods: {
            load() {
                let data = JSON.parse(localStorage.getItem('data'))
            }
        },

        created() {
            Event.$on('selectData', ({model, res}) => {
                localStorage.setItem('data', JSON.stringify(this.$data.data))
            }),

            this.load()
        }
    }
</script>

<style>
    @import '../../public/style/gallery.css';
    @import '../../node_modules/vue-multiselect/dist/vue-multiselect.min.css';
</style>
