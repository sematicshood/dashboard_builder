<template lang="">
    <div id="filterDate">
        <vue-rangedate-picker @selected="onDateSelected" :captions="captions" i18n="ID"></vue-rangedate-picker>
    </div>
</template>

<script>
    import VueRangedatePicker from 'vue-rangedate-picker'

    export default {
        name: 'filter-date',

        components: {
            VueRangedatePicker
        },

        data () {
            return {
                selectedDate: {
                    start: '',
                    end: ''
                },
                captions: {
                    'title': 'Pilih Tanggal Filter',
                    'ok_button': 'Apply'
                }
            }
        },

        methods: {
            setDefaultDate() {
                var d       =  new Date(),
                    from    =  new Date(d.getFullYear(), d.getMonth(), 1),
                    to      =  new Date(d.getFullYear(), d.getMonth() + 1, 1)

                this.$data.selectedDate['start'] = from
                this.$data.selectedDate['end']   = to
            },

            onDateSelected: function (daterange) {
                this.selectedDate = daterange
            }
        },

        created() {
            this.setDefaultDate()
        },
    }
</script>