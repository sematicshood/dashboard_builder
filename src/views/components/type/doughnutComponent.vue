<template>
    <div id="doughnutComponent">
        <doughnut-chart :chart-data="datacollection" :styles="{height: `${ height }px`}" :options="chartOptions"></doughnut-chart>
    </div>
</template>

<script>
    import DoughnutChart from './chart/DoughnutChart.js'
    import { mapGetters, mapState } from 'vuex'

    export default {
        name: 'doughnut-component',

        components: {
            DoughnutChart
        },

        props: ['vuecolumn', 'vuerow'],

        data () {
            return {
                datacollection: null,
                chartOptions: {
                    responsive: true,
                    maintainAspectRatio: false
                },
            }
        },
        mounted() {
            this.fillData()
        },

        computed: {
            ...mapState(['rows', 'data']),

            column: {
                get() {
                    return this.rows.rows[this.vuerow][this.vuecolumn]
                }
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
            datas: {
                get() {
                    // return this.data.data[this.rows.rows[this.vuerow][this.vuecolumn]['model']]
                    return this.rows.rows[this.vuerow][this.vuecolumn]['datas']
                }
            }
        },

        watch: {
            titles(newv, oldv) {
                this.fillData()

                console.log(newv, oldv)
            }
        },

        methods: {
            fillData () {
                this.$store.dispatch('chart/renderChartTwo', {'titles': this.titles, 'datas': this.datas})
                    .then(res => {
                        this.datacollection = res
                    })
            },
        }
    }
</script>