<template lang="">
    <div v-if="colOptionShow && type == 'edit'">
        <b-form-group>
            <b-form-checkbox id="checkbox1"
                            v-model="display"
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
        name: 'title-chart',

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

            display: {
                get() {
                    return this.rows.rows[this.rowOp][this.colOp]['options_chart']['legend']['display']
                },

                set(display) {
                    let dis = (display === 'true')

                    this.$store.commit('rows/SET_DISPLAY', dis)
                }
            },
        },

        created() {
            this.$store.dispatch('rows/cekLegend')
        }
    }
</script>