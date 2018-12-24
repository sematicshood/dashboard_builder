<template>
    <div id="breadcumb">
        <div class="container-2">
            <h6 v-text="breadcumb"></h6>
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
                    splits[2] = ' ' + this.$route.params.name
                }

                this.$data.breadcumb = splits.toString().replace(/,/g, '/')
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
    @import '../assets/css/breadcumb.css'
</style>
