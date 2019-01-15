<template>
    <div id="gallery">           
        <!-- Navbar -->
        <navbar/>
        <breadcumb/>
        
        <div class="col-md-12">
            <workspace/>

            <transition
            name="slide"
            enter-active-class="slideInRight"
            leave-active-class="slideOutRight">
                <sidebar v-if="sidebar"/>
            </transition>
        </div>
    </div>       
</template>

<script>
    import navbar from './navbar.vue'
    import breadcumb from './breadcumb.vue'
    import sidebar from './sidebar.vue'
    import workspace from './workspace.vue'
    import { mapGetters } from 'vuex'


    export default {
        name: 'dashboard',
        components: {
            navbar, breadcumb, sidebar, workspace
        },
        
        data() {
            return {
                type: this.$route.params.type,
                name: this.$route.params.name,
            }
        },

        created() {
            this.$store.dispatch('workspace/setType', this.$route.params.type),
            this.$store.dispatch('workspace/setName', this.$route.params.name),
            this.$store.dispatch('style/setSidebar', this.$route.params.type)
        },

        mounted() {
            this.$store.dispatch('rows/getRowsFromServer', this.$route.params.name)
        },

        computed: {
            ...mapGetters('style', {
                sidebar: 'getSidebar'
            }),
        }
    }
</script>

<style>
    @import '../../public/style/gallery.css';
    @import '../../node_modules/vue-multiselect/dist/vue-multiselect.min.css';
</style>
