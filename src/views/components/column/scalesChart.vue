<template lang="">
    <div v-if="colOptionShow && type == 'edit'">
        <b-form-group>
            <b-form-checkbox id="checkbox-xaxis"
                            v-model="xuang"
                            value="true"
                            unchecked-value="false">
            X Axis rupiah format
            </b-form-checkbox>
        </b-form-group>
        <b-form-group>
            <b-form-checkbox id="checkbox-yaxis"
                            v-model="yuang"
                            value="true"
                            unchecked-value="false">
            Y Axis rupiah format
            </b-form-checkbox>
        </b-form-group>
    </div>
</template>

<script>
    import { mapState, mapGetters } from 'vuex'

    export default {
        name: 'scales-chart',

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

            xuang: {
                get() {
                    return this.rows.rows[this.rowOp][this.colOp]['options_chart']['scales']['xuang']
                },

                set(xuang) {
                    let dis = (xuang === 'true')

                    this.$store.commit('rows/SET_XUANG_SCALES', dis)
                }
            },

            yuang: {
                get() {
                    return this.rows.rows[this.rowOp][this.colOp]['options_chart']['scales']['yuang']
                },

                set(yuang) {
                    let dis = (yuang === 'true')

                    this.$store.commit('rows/SET_YUANG_SCALES', dis)
                }
            },
        },

        created() {
            this.$store.dispatch('rows/cekScales', {'row': this.rowOp, 'col': this.colOp})
        }
    }
</script>