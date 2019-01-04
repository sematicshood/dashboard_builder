<template>
    <div id="heightRow" v-if="colOptionShow && type == 'edit'">
        <b-form-group>
            <label  class="label-form">Tinggi Row</label>
            <b-form-input size="sm" type="text" v-model="height"
                        placeholder="Tinggi row dalam px (default 300px)"/>
        </b-form-group>
         
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex'

    export default {
        name: 'height-row',

        computed: {
            ...mapState(['rows']),

            ...mapGetters('rows', {
                rowOptionShow: 'getRowOptionShow',
                rowOp: 'getRowOp',
                colOptionShow: 'getColOptionShow'
            }),

            ...mapGetters('workspace', {
                type: 'getType'
            }),

            height: {
                get() {
                    return this.rows.rows[this.rowOp][0]['height']
                },

                set(width) {
                    this.$store.dispatch('rows/setRowHeight', width)
                }
            }
        }
    }
</script>