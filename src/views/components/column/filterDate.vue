<template lang="">
    <div id="filterDate" style="position: absolute; z-index: 999;">
        <vue-rangedate-picker :configs="selectedDate" @selected="onDateSelected" :captions="captions" i18n="ID" ></vue-rangedate-picker>
        {{ selectedDate }}
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
                    from  = `${start.getFullYear()}-${start.getMonth()}-${start.getDate()}`,
                    to    = `${end.getFullYear()}-${end.getMonth()}-${end.getDate()}`
                
                this.$store.commit('rows/SET_DATE', { 'type': 'start', 'value': from })
                this.$store.commit('rows/SET_DATE', { 'type': 'end', 'value': to })

                let date = ''

                if(from == to) {
                    date = `('write_date','=','${ from }')`
                } else {
                    date = `('write_date','>=','${ from }'),('write_date','<=','${ to }')`
                }

                this.$store.dispatch('data/getDatas', {'date': date})
                    .then(res => {
                        this.$store.dispatch('rows/setDataRow', res)
                    })
                    .catch(err => {
                        this.$store.dispatch('rows/setDataRow', [])
                    })
            }
        },

        computed: {
            ...mapState(['rows']),

            selectedDate: {
                get() {
                    return this.rows.rows[this.vuerow][this.vuecolumn]['filter_date']
                }
            }
        },

        created() {
            this.$store.dispatch('rows/cekDateProperty')
        },
    }
</script>