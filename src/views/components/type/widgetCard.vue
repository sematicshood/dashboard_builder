<template>
    <div id="widget-card">
        <b-card no-body class="">
            <b-card-body class="pb-0">
                <!-- <p>Members online</p> -->
                <h4 class="mb-0">Rp. {{ sum | rupiah }}</h4>
                <p class="span-widget">
                    <font-awesome-icon v-if="percentage > 0" icon="long-arrow-alt-up"/> 
                    <font-awesome-icon v-if="percentage < 0" icon="long-arrow-alt-down"/> 
                    {{ percentage | rupiah }} %</p>
                <p class="span-widget">Rp. {{ last | rupiah }}</p>
            </b-card-body>
        </b-card>
    </div>
</template>


<script>
    import { mapState } from 'vuex'

    export default {
        name: "widget-card",

        props: ['vuecolumn', 'vuerow'],

        data() {
            return {
                sum: 0,
                last: 0,
                percentage: 0
            }
        },

        watch: {
            date: {
                handler(){
                    this.fillData()
                },
                deep: true
            },
            row: {
                handler(){
                    this.fillData()
                },
                deep: true
            },
        },

        computed: {
            ...mapState(['rows', 'data']),

            datas: {
                get() {
                    return this.rows.rows[this.vuerow][this.vuecolumn]['datas']
                },
            },
            row: {
                get() {
                    return this.rows.rows[this.vuerow]
                }
            },
            height: {
                get() {
                    return this.rows.rows[this.vuerow][0]['height'] - 135
                }
            },
            titles: {
                get() {
                    return this.rows.rows[this.vuerow][this.vuecolumn]['titles']
                }
            },
            model: {
                get() {
                    return this.rows.rows[this.vuerow][this.vuecolumn]['model']
                }
            },
            date: {
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

        filters: {
            rupiah(bilangan){
                var	reverse = bilangan.toString().split('').reverse().join(''),
                    ribuan 	= reverse.match(/\d{1,3}/g);
                    ribuan	= ribuan.join('.').split('').reverse().join('');

                return ribuan
            },
        },

        methods: {
            getDays(date1, date2) {
                let ONE_DAY  = 1000 * 60 * 60 * 24,
                    date1_ms = '',
                    date2_ms = '',
                    dated1   = '',
                    dated2   = ''

                
                if(typeof date1 == 'object') {
                    // Convert both dates to milliseconds
                    date1_ms = new Date(date1.getUTCFullYear(), date1.getUTCMonth(), date1.getUTCDate());
                    date2_ms = new Date(date2.getUTCFullYear(), date2.getUTCMonth(), date2.getUTCDate());
                } else {
                    dated1 = date1.split('T')[0].split('-')
                    dated2 = date2.split('T')[0].split('-')

                    // Convert both dates to milliseconds
                    date1_ms = new Date(dated1[0], dated1[1], dated1[2]);
                    date2_ms = new Date(dated2[0], dated2[1], dated2[2]);
                }

                // Calculate the difference in milliseconds
                let difference_ms = Math.abs(date1_ms - date2_ms);

                // Convert back to days and return
                return difference_ms/ONE_DAY;
            },

            rupiah(bilangan) {
                var	reverse = bilangan.toString().split('').reverse().join(''),
                    ribuan 	= reverse.match(/\d{1,3}/g);
                    ribuan	= ribuan.join('.').split('').reverse().join('');

                return ribuan
            },

            fillData() {
                let key         = (this.titles[0]) ? this.titles[0].prop : []
                this.$data.sum  = 0
                
                let start       = this.getDays(this.date.start, this.date.end)
                let start_date  = this.date.start.split('T')[0].split('-')

                let d = new Date(start_date[0], start_date[1], start_date[2])
                let next = new Date(d.setDate(d.getDate() - start))
                
                let date_start = `${next.getUTCFullYear()}-${next.getUTCMonth()}-${next.getUTCDate()}`

                let dated = {
                    end: `${start_date[0]}-${start_date[1]}-${start_date[2]}`,
                    start: date_start
                }

                this.datas.forEach(el => {
                    if(typeof el[key] != 'string')
                        this.$data.sum += Math.floor(el[key])
                })

                this.$store.dispatch('data/getDatas', {'date': dated, 'filters': this.filterData, 'model': this.model})
                    .then(res => {
                        this.$data.last = 0

                        res.forEach(el => {
                            this.$data.last += Math.floor(el[key])
                        })
                    })
                    .catch(() => {
                        this.$data.last = 0
                    })
                
                this.$data.percentage = (((this.$data.sum - this.$data.last) / this.$data.sum) * 100).toFixed(2)
                
                if(this.$data.percentage == 'NaN') this.$data.percentage = 0
            }
        },

        mounted() {
            this.fillData()
        }
    }
</script>

