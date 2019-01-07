<template>
    <div id="gallery">
        <navbar/>

        <div id="loading-page" v-show="loading">
            <h5>Loading . . .</h5>
            <p>Sematics© 2018 Dashboard Studio.</p>
        </div>

        <div class="container-3">
            <!-- <div class="text-center">
                <hr>
                <h1>List Dashboard</h1>
                <logout-button></logout-button>
                <hr>
            </div> -->

            <div class="row">
                <b-col sm="6" lg="3">
                    <b-card no-body class="bg-primary">
                        <button-create></button-create>
                    </b-card>
                </b-col>

                <b-col sm="6" lg="3" v-for="dashboard in dashboards">
                    <b-card no-body class="bg">
                        <router-link tag="div" :to="{ name: 'dashboard', params: { name: dashboard['name'].replace(/ /g, '-'), type: 'view' } }" class="bg-container">
                            <h4 v-text="dashboard['name']"></h4>                                                       
                        </router-link>
                        <b-button-group>
                            <b-button class="btn-dashboard" @click="deleteDashboard(dashboard['name'].replace(/ /g, '-'))"><font-awesome-icon icon="trash-alt"/></b-button>
                            <b-button class="btn-dashboard" @click="duplicate(dashboard['name'].replace(/ /g, '-'))"><font-awesome-icon icon="copy"/></b-button>
                        </b-button-group>
                        
                    </b-card>
                </b-col>
            </div>
        </div>
    </div>
</template>

<script>
    import ButtonCreate from './components/buttonCreate.vue'
    import logoutButton from './components/logoutButton.vue'
    import navbar from './navbar.vue'
    import { mapGetters } from 'vuex'

    export default {
        name: 'gallery',

        components: {
            ButtonCreate, logoutButton, navbar
        },

        methods: {
            loadTemplate() {
                this.$store.dispatch('workspace/getDataDashboard')
            },

            duplicate(template) {
                this.$store.dispatch('workspace/duplicateDashboard', template)
                    .then(res => {
                        this.loadTemplate()
                    })
            },

            deleteDashboard(template) {
                this.$store.dispatch('workspace/deleteDashboard', template)
                    .then(res => {
                        this.loadTemplate()
                    })
            }
        },

        created() {
            this.loadTemplate()
        },

        computed: {
            ...mapGetters('workspace', {
                dashboards: 'getDashboards',
            }),

            ...mapGetters('core', {
                loading: 'getLoading'
            })
        }
    }
</script>

<style>
    @import '../../public/style/gallery.css';
</style>
