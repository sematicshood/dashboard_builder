<template>
    <div id="buttonDeleteRow" v-if="rowOptionShow && type == 'edit'">
         <b-btn v-show="type == 'edit'" size="sm" 
                variant="warning" 
                @click="deleteRow(rowOp)">Hapus Row</b-btn>
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