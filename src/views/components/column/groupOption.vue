<template>
    <div style="position: absolute; z-index: 9999; right: 20px;">
        <b-button-group size="sm">
            <b-button v-for="option in options" :variant="(select == option) ? 'success': ''" @click="changeGroup(option)" v-text="option"></b-button>
        </b-button-group>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: 'group-option',

        props: ['vuecolumn', 'vuerow'],

        data() {
            return {
                options: ['Tahun', 'Bulan', 'Minggu', 'Hari']
            }
        },

        methods: {
            changeGroup(group) {
                this.$store.dispatch('rows/setGroupData', group)
                console.log(group)
            },

            removeGroup() {
                this.$store.dispatch('rows/setGroupData', '')
            }
        },

        computed: {
            ...mapState(['rows']),

            select: {
                get() {
                    return this.rows.rows[this.vuerow][this.vuecolumn]['group_data']
                }
            }
        },

        created() {
            this.$store.dispatch('rows/cekGroupOption', {'row': this.vuerow, 'column': this.vuecolumn})
        }
    }
</script>