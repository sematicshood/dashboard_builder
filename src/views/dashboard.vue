<template>
    <div id="gallery">           
        <!-- Navbar -->
        <b-navbar toggleable="md" type="dark" variant="info">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand href="#">Dashboard Studio</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

            <b-navbar-nav>
                <b-nav-item-dropdown text="File" left>
                    <b-dropdown-item href="#"><i class="fa fa-file" style="padding-right:15px;"></i>New File</b-dropdown-item>
                    <b-dropdown-item href="#"><i class="fa fa-folder-open" style="padding-right:15px;"></i>Open</b-dropdown-item>
                    <b-dropdown-item href="#"><i class="fa fa-save" style="padding-right:15px;"></i>Save</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item-dropdown text="Export" left>
                    <b-dropdown-item href="#"><i class="fa fa-file-excel-o" style="padding-right:15px;"></i>Excel</b-dropdown-item>
                    <b-dropdown-item href="#"><i class="fa fa-file-pdf-o" style="padding-right:15px;"></i>Pdf</b-dropdown-item>
                </b-nav-item-dropdown>            
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

            </b-nav-item-dropdown>
            </b-navbar-nav>

        </b-collapse>
        </b-navbar>



        <!-- Sidebar -->
        <b-row>
            <b-col cols="9" align-self="start">
                <b-row>
                    <b-col cols="12">
                        <b-container>
                            <router-link to="/">Back</router-link>
                            <button-changed :vuetype="type" :vuename="name"></button-changed>
                            <canvasWorkspace :vuetype="type" :vuename="name" :vuedata.sync="data" :vueloading="loading" :vuetotal="total" :vuetitles="titles"></canvasWorkspace>
                        </b-container>
                    </b-col>                    
                </b-row>   
            </b-col>
            <b-col cols="3" align-self="end">
                <b-card no-body style="height: 90vh; max-height: 90vh; overflow: auto;">
                    <b-tabs pills card>
                        <b-tab title="Model" active>
                            <selectModels v-if="type == 'edit'" :vuedata.sync="data" :vueloading="loading" :vuetotal="total" :vuetitles="titles"></selectModels>           
                        </b-tab>
                        <b-tab title="Field">
                            Tab Contents 2
                        </b-tab>
                        <b-tab title="Field">
                            Tab Contents 3
                        </b-tab>
                    </b-tabs>
                    <b-tabs pills card>
                        <b-tab title="Model" active>
                            Tab Contents 1
                        </b-tab>
                        <b-tab title="Field">
                            Tab Contents 2
                        </b-tab>
                        <b-tab title="Field">
                            Tab Contents 3
                        </b-tab>
                    </b-tabs>
                </b-card>
            </b-col>
        </b-row>       
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
