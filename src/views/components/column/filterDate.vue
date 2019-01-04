<template lang="">
    <div id="filterDate" style="position: absolute; z-index: 999;">
        <vue-rangedate-picker :configs="selectedDate" @selected="onDateSelected" :captions="captions" i18n="ID" ></vue-rangedate-picker>
        <span v-for="(select, i) in selectedDate">{{ select | dateFilter }}<span v-if="i == 'start'"> sampai </span></span>
    </div>
</template>

<script>
    import VueRangedatePicker from 'vue-rangedate-picker'
    import { mapGetters, mapState } from 'vuex'

    export default {
        name: 'filter-date',

        components: {
            VueRangedatePicker
        },

        props: ['vuecolumn', 'vuerow'],

        filters: {
            dateFilter(value) {
                if(typeof value == 'string') {
                    let dated = value.split('T')[0].split('-')
                    
                    return `${dated[2]}/${dated[1]}/${dated[0]}`
                } else {
                    return `${value.getUTCFullYear()}/${value.getUTCMonth() + 1}/${value.getUTCDate()}`
                }
            }
        },

        data () {
            return {
                captions: {
                    'title': 'Pilih Tanggal Filter',
                    'ok_button': 'Apply'
                }
            }
        },

        methods: {
            onDateSelected: function (daterange) {
                let start = daterange.start,
                    end   = daterange.end,
                    from  = `${start.getUTCFullYear()}-${start.getUTCMonth() + 1}-${start.getUTCDate()}`,
                    to    = `${end.getUTCFullYear()}-${end.getUTCMonth() + 1}-${end.getUTCDate()}`
                
                this.$store.commit('rows/SET_DATE', { 'type': 'start', 'value': from })
                this.$store.commit('rows/SET_DATE', { 'type': 'end', 'value': to })

                let date = ''

                if(from == to) {
                    date = `('write_date','=','${ from }')`
                } else {
                    date = `('write_date','>=','${ from }'),('write_date','<=','${ to }')`
                }

                this.$store.dispatch('data/getDatas', {'date': date, 'filters': this.filterData})
                    .then(res => {
                        this.$store.dispatch('rows/setDataRow', res)
                    })
                    .catch(err => {
                        this.$store.dispatch('rows/setDataRow', [])
                    })

                this.$store.dispatch('rows/save', false)
            }
        },

        computed: {
            ...mapState(['rows']),

            selectedDate: {
                get() {
                    return this.rows.rows[this.vuerow][this.vuecolumn]['filter_date']
                }
            },

            filterData: {
                get() {
                    return this.rows.rows[this.vuerow][this.vuecolumn]['filters_data']
                }
            }
        },

        created() {
            this.$store.dispatch('rows/cekDateProperty', {'row': this.vuerow, 'column': this.vuecolumn})
        },
    }
</script>