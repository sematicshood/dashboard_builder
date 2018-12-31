<template>
    <div id="syncButton">
        <a href="#">
            <font-awesome-icon icon="sync" class="icon-badge-navbar" @click="sync"/>
            
            <b-badge v-if="edited" pill variant="danger" class="badge-navbar">1</b-badge>
        </a>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'button-sync',

        methods: {
            sync() {
                this.$store.dispatch('rows/syncDatabase')
            }
        },

        computed: {
            ...mapGetters('rows', {
                edited: 'getEdited'
            })
        },

        created() {
            this.$store.dispatch('rows/setEdited')
        }
    }
</script>