<template>
    <div id="lineComponent">
        <line-chart :chart-data="datacollection" :styles="{height: `${ height }px`}" :options="chartOptions"></line-chart>
    </div>
</template>

<script>
    import LineChart from './chart/LineChart.js'
    import { mapState } from 'vuex'

    export default {
        name: 'line-component',

        components: {
            LineChart
        },

        props: ['vuecolumn', 'vuerow'],

        data () {
            return {
                datacollection: null,
                chartOptions: {
                    responsive: true,
                    maintainAspectRatio: false,
                    elements: {
                        line: {
                                fill: false
                        }
                    }
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
            group: {
                get() {
                    return this.rows.rows[this.vuerow][this.vuecolumn]['group_data']
                }
            },
            datas: {
                get() {
                    return this.rows.rows[this.vuerow][this.vuecolumn]['datas']
                }
            },
            options: {
                get() {
                    let option = {
                            responsive: true, 
                            maintainAspectRatio: false,
                            scales: {}
                        }

                    return option
                }
            },
        },

        watch: {
            titles() {
                this.fillData()
            },
            row: {
                handler(){
                    this.fillData()
                },
                deep: true
            },
        },

        methods: {
            fillData () {
                this.$store.dispatch('chart/renderChartOne', {
                    'titles': this.titles, 
                    'datas': this.datas,
                    'group': this.group
                })
                .then(res => {
                    this.datacollection = res
                })

                this.$store.dispatch('chart/optionsChart', {'options': this.options, 'titles': this.titles, 'column': this.column})
                    .then(res => {
                        this.$data.chartOptions = res
                    })
            }
        },

        created() {
            this.$store.dispatch('rows/cekTableOptions', {'row': this.vuerow, 'column': this.vuecolumn})
        }
    }
</script>