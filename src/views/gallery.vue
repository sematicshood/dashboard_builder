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
            },

            duplicate(template) {
                let temp = JSON.parse(localStorage.getItem('template-dashboard-' + template))

                temp['name'] = 'Duplicate ' + temp['name']

                localStorage.setItem('template-dashboard-Duplicate-' + template, JSON.stringify(temp))

                this.loadTemplate()
            },

            deleteDashboard(template) {
                localStorage.removeItem('template-dashboard-' + template)

                window.location.reload()
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
