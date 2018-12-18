<template>
    <div id="gallery">
        <div class="container">
            <router-link to="/">Back</router-link>
            <button-changed :vuetype="type" :vuename="name"></button-changed>
            <selectModels v-if="type == 'edit'" :vuedata.sync="data" :vueloading="loading" :vuetotal="total" :vuetitles="titles"></selectModels>
            <canvasWorkspace :vuetype="type" :vuename="name" :vuedata.sync="data" :vueloading="loading" :vuetotal="total" :vuetitles="titles"></canvasWorkspace>
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
                data: {},
                titles: [],
                loading: false,
                total: 0,
                type: this.$route.params.type,
                name: this.$route.params.name
            }
        },

        methods: {
            inArray(needle, haystack) {
                var length = haystack.length;
                for(var i = 0; i < length; i++) {
                    if(haystack[i] == needle) return true;
                }
                return false;
            },

            load() {
                let models = [],
                    modeling = JSON.parse(localStorage.getItem('models'))

                this.$data.data = JSON.parse(localStorage.getItem('data'))

                // modeling.forEach(element => {
                //     let model = element['model']

                //     if(this.inArray(model, models) == false) {
                //         models.push(model)
                //     }
                // });

                // models.forEach(model => {
                //     this.$store.dispatch('data/getDatas', model)
                //         .then(res => {
                //             this.$data.data[model] = res
                //         })
                // });
            }
        },

        created() {
            Event.$on('selectData', ({model, res}) => {
                localStorage.setItem('data', JSON.stringify(this.$data.data))
            }),

            this.$store.dispatch('workspace/setType', this.$route.params.type),
            this.$store.dispatch('workspace/setName', this.$route.params.name),

            this.load()
        },
    }
</script>

<style>
    @import '../../public/style/gallery.css';
    @import '../../node_modules/vue-multiselect/dist/vue-multiselect.min.css';
</style>
