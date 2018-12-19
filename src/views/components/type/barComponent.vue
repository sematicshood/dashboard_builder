<template>
    <div id="barComponent">
        <bar-chart :chart-data="datacollection" :height="height" :options="chartOptions"></bar-chart>
    </div>
</template>

<script>
    import barChart from './chart/BarChart.js'

    export default {
        name: 'bar-component',

        components: {
            barChart
        },

        props: ['vueheight', 'vuedata', 'vuetitles'],

        data () {
            return {
                datacollection: null,
                chartOptions: {
                    responsive: true,
                    maintainAspectRatio: false
                },
                height: this.vueheight,
                data: this.vuedata,
                titles: this.vuetitles
            }
        },
        mounted () {
            this.fillData()
        },
        methods: {
            inArray(all, newed) {
                var length = all.length;
                for(var i = 0; i < length; i++) {
                    if(all[i] == newed) return true;
                }
                return false;
            },
            fillData () {
                let xaxis   = this.$data.titles[0]['prop'],
                    labels  = []
                console.log(this.$data.titles)

                this.$data.data.forEach(el => {
                    if(this.inArray(labels, el[xaxis]) == false)
                        labels.push(el[xaxis])
                })

                this.datacollection = {
                    labels: labels,
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