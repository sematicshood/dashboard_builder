<template>
    <div id="lineComponent">
        <line-chart :chart-data="datacollection" :height="height" :options="chartOptions"></line-chart>
    </div>
</template>

<script>
    import LineChart from './chart/LineChart.js'

    export default {
        name: 'line-component',

        components: {
            LineChart
        },

        props: ['vueheight'],

        data () {
            return {
                datacollection: null,
                chartOptions: {
                    responsive: true,
                    maintainAspectRatio: false
                },
                height: this.vueheight
            }
        },
        mounted () {
            this.fillData()
        },
        methods: {
            fillData () {
                this.datacollection = {
                    labels: [this.getRandomInt(), this.getRandomInt()],
                    datasets: [
                        {
                        label: 'Data One',
                        backgroundColor: '#f87979',
                        data: [this.getRandomInt(), this.getRandomInt()]
                        }, {
                        label: 'Data One',
                        backgroundColor: '#f87979',
                        data: [this.getRandomInt(), this.getRandomInt()]
                        }
                    ]
                }
            },
            getRandomInt () {
                return Math.floor(Math.random() * (50 - 5 + 1)) + 5
            }
        }
    }
</script>