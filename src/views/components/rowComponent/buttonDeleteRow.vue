<template>
    <div id="buttonDeleteRow">
         <b-btn size="sm" 
                variant="info" 
                @click="deleteRow"><font-awesome-icon icon="trash"/></b-btn>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'button-delete-row',

        props: ['vuerow'],

        methods: {
            deleteRow() {
                this.$store.dispatch('rows/deleteRow', this.vuerow)
            }
        },

        computed: {
            ...mapGetters('workspace', {
                type: 'getType'
            })
        }
    }
</script>