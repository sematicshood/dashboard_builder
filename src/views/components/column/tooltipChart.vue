<template lang="">
    <div v-if="colOptionShow && type == 'edit'">
        <b-form-group>
            <b-form-checkbox id="checkbox1"
                            v-model="enable"
                            value="true"
                            unchecked-value="false">
            Display legend chart
            </b-form-checkbox>
        </b-form-group>
    </div>
</template>

<script>
    import { mapState, mapGetters } from 'vuex'

    export default {
        name: 'tooltip-chart',

        computed: {
            ...mapState(['rows']),

            ...mapGetters('rows', {
                colOp: 'getColOp',
                rowOp: 'getRowOp',
                colOptionShow: 'getColOptionShow'
            }),

            ...mapGetters('workspace', {
                type: 'getType'
            }),

            enable: {
                get() {
                    return this.rows.rows[this.rowOp][this.colOp]['options_chart']['tooltip']['enable']
                },

                set(enable) {
                    let dis = (enable === 'true')

                    this.$store.commit('rows/SET_ENABLE_TOOLTIP', dis)
                }
            },

            position: {
                get() {
                    return this.rows.rows[this.rowOp][this.colOp]['options_chart']['tooltip']['position']
                },

                set(position) {
                    this.$store.commit('rows/SET_POSITION', position)
                }
            },
        },

        created() {
            this.$store.dispatch('rows/cekTooltip', {'row': this.rowOp, 'col': this.colOp})
        }
    }
</script>