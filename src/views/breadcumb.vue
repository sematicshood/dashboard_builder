<template>
    <div id="breadcumb">
        <div class="container-2">
            <h6 v-for="(bread, i) in breadcumb" style="display: inline-block;" :key="i">
                <router-link style="color: #117a8b !important;" v-if="i == 0" :to="{ name: 'gallery' }">{{ bread }}</router-link>
                <span v-if="i != 0">{{ bread }}</span>
                <span v-if="i < breadcumb.length - 1">&nbsp; / &nbsp;</span>
            </h6>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'breadcumb',

        data() {
            return {
                breadcumb: this.$route.meta.breadcumb
            }
        },

        methods: {
            convertBreadcumb() {
                let route  = this.$route.meta.breadcumb,
                    splits = route.split('/')

                if(splits[2] == ' :name') {
                    splits[2] = ' ' + this.$route.params.name.toString().replace(/-/g, ' ')
                }

                this.$data.breadcumb = splits
            }
        },

        created() {
            this.convertBreadcumb()
        },

        computed: {
            ...mapGetters('style', {
                sidebar: 'getSidebar'
            })
        }
    }
</script>

<style>
    @import '../../public/style/breadcumb.css'
</style>
