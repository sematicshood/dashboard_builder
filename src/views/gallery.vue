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
                <div class="col-xs-12 col-md-3 bottom">
                    <button-create></button-create>
                </div>
                <div class="col-xs-12 col-md-3 bottom" v-for="dashboard in dashboards">
                    <router-link tag="div" :to="{ name: 'dashboard', params: { name: dashboard['name'].replace(/ /g, '-'), type: 'view' } }" class="bg bg-left">
                        <h2 v-text="dashboard['name']"></h2>
                    </router-link>
                </div>
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
                let dashboard = Object.keys(localStorage),
                    total     = 0

                for (let index = 0; index < dashboard.length; index++) {
                    let d = dashboard[index].split('-')
                    
                    if(d[0] == 'template' && d[1] == 'dashboard') {
                        total += 1

                        let data = JSON.parse(localStorage.getItem(dashboard[index])) 

                        this.$store.dispatch('workspace/addDashboards', data)
                    }
                }

                if(total == 0) {
                    this.$store.dispatch('workspace/getDataDashboard')
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
