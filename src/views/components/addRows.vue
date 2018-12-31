<template>
    <div id="addRows">
        <b-modal id="modalRow" 
                 centered 
                 title="Add New Row" 
                 button-size="sm"
                 @ok="addRow">
            <b-form-input size="sm" type="number" v-model="height"
                          placeholder="Tinggi row dalam px (default 300px)"/>
        </b-modal>
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex'

    export default {
        name: 'add-rows',

        methods: {
            addRow() {
                let height = 0

                if(this.height != '')
                    height = this.height
                else
                    height = 300

                let row = [{
                    height: height,
                    edited: false
                }]

                this.$store.dispatch('rows/addRows', row)
                this.$store.dispatch('rows/save')
                this.$store.dispatch('rows/reset')
            },
        },

        computed: {
            ...mapGetters('rows', {
                rows: 'getRows',
            }),

            ...mapState(['rows']),
            height: {
                set(height) {
                    this.$store.commit('rows/SET_HEIGHT', height)
                },
                get() {
                    return this.rows.height
                }
            }
        },
    }
</script>