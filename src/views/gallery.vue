<template>
    <div id="gallery">
        <div class="container">
            <div class="text-center">
                <hr>
                <h1>List Dashboard</h1>
                <button-create></button-create>
                <hr>
            </div>

            <div class="row">
                <div class="col-xs-12 col-md-6" v-for="dashboard in dashboards">
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
    import { mapGetters } from 'vuex'

    export default {
        name: 'gallery',

        components: {
            ButtonCreate
        },

        methods: {
            loadTemplate() {
                let dashboard = Object.keys(localStorage)

                for (let index = 0; index < dashboard.length; index++) {
                    let d = dashboard[index].split('-')
                    
                    if(d[0] == 'template' && d[1] == 'dashboard') {
                        let data = JSON.parse(localStorage.getItem(dashboard[index])) 

                        this.$store.dispatch('workspace/setDashboards', data)
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
