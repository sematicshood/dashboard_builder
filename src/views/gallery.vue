<template>
    <div id="gallery">
        <navbar/>

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
                    <b-card no-body class="bg-info">
                        <router-link tag="div" :to="{ name: 'dashboard', params: { name: dashboard['name'].replace(/ /g, '-'), type: 'view' } }" class="bg">
                            <center><h4 v-text="dashboard['name']"></h4></center>
                        </router-link>
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
                let dashboard = Object.keys(localStorage)

                for (let index = 0; index < dashboard.length; index++) {
                    let d = dashboard[index].split('-')
                    
                    if(d[0] == 'template' && d[1] == 'dashboard') {
                        let data = JSON.parse(localStorage.getItem(dashboard[index])) 

                        this.$store.dispatch('workspace/addDashboards', data)
                    }
                }
            }
        },

        created() {
            this.loadTemplate()
        },

        computed: {
            ...mapGetters('workspace', {
                dashboards: 'getDashboards',
            }),
        }
    }
</script>

<style>
    @import '../../public/style/gallery.css';
</style>
