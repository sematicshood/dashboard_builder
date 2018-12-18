<template>
    <div id="rowOption" v-if="rowOptionShow">
        <b-btn v-show="type == 'edit'" size="sm" 
                variant="warning" 
                @click="deleteRow(rowOp)">Hapus Row</b-btn>
        <br><br>
        <b-form-input size="sm" type="text" v-model="rows[rowOp][0]['height']"
                        placeholder="Tinggi row dalam px (default 300px)"/>
        <br>
        <b-btn v-show="type == 'edit'" size="sm" 
                variant="danger" 
                @click="save()">Save</b-btn> &nbsp;
        <b-btn v-show="type == 'edit'" size="sm" 
                variant="danger" 
                @click="loadTemplate()">Cancel</b-btn>

        <br><br>
        <br><br>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'row-option',

        computed: {
            ...mapGetters('rows', {
                rowOptionShow: 'getRowOptionShow',
                rowOp: 'getRowOp',
                rows: 'getRows'
            }),

            ...mapGetters('workspace', {
                type: 'getType'
            })
        },

        methods: {
            deleteRow(rowOp) {
                this.$store.dispatch('rows/deleteRow', rowOp)
            },

            loadTemplate() {
                this.$store.dispatch('rows/loadTemplate')
            },

            save() {
                this.$store.dispatch('rows/save')
            }
        }
    }
</script>