<template>
    <div id="buttonDeleteRow">
         <b-btn size="sm" 
                variant="info" 
                @click="deleteRow(rowOp)"><font-awesome-icon icon="trash"/></b-btn>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'button-delete-row',

        methods: {
            deleteRow(rowOp) {
                this.$store.dispatch('rows/deleteRow', rowOp)
            }
        },

        computed: {
            ...mapGetters('rows', {
                rowOptionShow: 'getRowOptionShow',
                rowOp: 'getRowOp'
            }),

            ...mapGetters('workspace', {
                type: 'getType'
            })
        }
    }
</script>