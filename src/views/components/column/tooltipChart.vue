<template lang="">
    <div v-if="colOptionShow && type == 'edit'">
        <b-form-group>
            <b-form-checkbox id="checkbox-enable"
                            v-model="enabled"
                            value="true"
                            unchecked-value="false">
            <label class="label-form">Display tooltip</label>
            </b-form-checkbox>
        </b-form-group>
        <b-form-group>
            <b-form-checkbox id="checkbox-rupiah"
                            v-model="uang"
                            value="true"
                            unchecked-value="false">
            <label class="label-form">Format rupiah</label>
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

            enabled: {
                get() {
                    return this.rows.rows[this.rowOp][this.colOp]['options_chart']['tooltip']['enabled']
                },

                set(enabled) {
                    let dis = (enabled === 'true')

                    this.$store.commit('rows/SET_ENABLED_TOOLTIP', dis)
                }
            },

            uang: {
                get() {
                    return this.rows.rows[this.rowOp][this.colOp]['options_chart']['tooltip']['uang']
                },

                set(uang) {
                    let dis = (uang === 'true')

                    this.$store.commit('rows/SET_UANG_TOOLTIP', dis)
                }
            },
        },

        created() {
            this.$store.dispatch('rows/cekTooltip', {'row': this.rowOp, 'col': this.colOp})
        }
    }
</script>