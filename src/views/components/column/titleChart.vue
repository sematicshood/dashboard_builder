<template lang="">
    <div v-if="colOptionShow && type == 'edit'">
        <b-form-group>
            <b-form-checkbox id="checkbox1"
                            v-model="display"
                            value="true"
                            unchecked-value="false">
            <label class="label-form">Display legend</label>
            </b-form-checkbox>
        </b-form-group>

        <b-form-group>
            <label class="label-form">Postion Legend</label>
            <b-form-radio-group id="radios2" v-model="position" name="radioSubComponent">
                <b-form-radio value="top">Top</b-form-radio>
                <b-form-radio value="bottom">Bottom</b-form-radio>
                <b-form-radio value="left">Left</b-form-radio>
                <b-form-radio value="right">Right</b-form-radio>
            </b-form-radio-group>
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

            position: {
                get() {
                    return this.rows.rows[this.rowOp][this.colOp]['options_chart']['legend']['position']
                },

                set(position) {
                    this.$store.commit('rows/SET_POSITION', position)
                }
            },
        },

        created() {
            this.$store.dispatch('rows/cekLegend', {'row': this.rowOp, 'col': this.colOp})
        }
    }
</script>