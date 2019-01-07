<template>
    <div id="polarComponent">
        <polar-chart :chart-data="datacollection" :styles="{height: `${ height }px`}" :options="chartOptions"></polar-chart>
    </div>
</template>

<script>
    import PolarChart from './chart/PolarChart.js'
    import { mapGetters, mapState } from 'vuex'

    export default {
        name: 'polar-component',

        components: {
            PolarChart
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
            inArray(all, newed) {
                if(all) {
                    var length = all.length;
                    for(var i = 0; i < length; i++) {
                        if(all[i] == newed) return true;
                    }
                    return false;
                }
            },
            fillData () {
                let labels          = [],
                    datasets        = [],
                    values          = [],
                    backgroundColor = [],
                    counts          = {}

                if(this.titles) {
                    if(this.titles.length > 1) {
                        let xaxis           = (this.titles[0]) ? this.titles[0]['prop'] : [],
                            value           = (this.titles[1]) ? this.titles[1]['prop'] : []

                        this.datas.forEach(el => {
                            if(el[xaxis]) {
                                if(el[xaxis].length == 2) {
                                    if(this.inArray(labels, el[xaxis][1]) == false)
                                        labels.push(el[xaxis][1])
                                } else {
                                    if(this.inArray(labels, el[xaxis]) == false)
                                        labels.push(el[xaxis])
                                }
                            }
                        })

                        labels.forEach(el => {
                            let amount = 0

                            let datas = this.datas.filter((data) => {
                                if(data[xaxis]) {
                                    if(data[xaxis].length == 2)
                                        return data[xaxis][1] == el
                                    else
                                        return data[xaxis] == el
                                }
                            })

                            datas.forEach(e => {    
                                amount += e[value]   
                            })

                            values.push(amount)

                            backgroundColor.push(this.getRandomColor())
                        })
                    } else {
                        let xaxis           = (this.titles[0]) ? this.titles[0]['prop'] : [],
                            alls            = []

                        this.datas.forEach(el => {
                            if(el[xaxis]) {
                                if(el[xaxis].length == 2) {
                                    if(this.inArray(labels, el[xaxis][1]) == false)
                                        labels.push(el[xaxis][1])

                                    alls.push(el[xaxis][1])
                                } else {
                                    if(this.inArray(labels, el[xaxis]) == false)
                                        labels.push(el[xaxis])

                                    alls.push(el[xaxis])
                                }
                            }
                        })

                        alls.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });

                        labels.forEach(el => {
                            let amount = 0

                            values.push(counts[el])

                            backgroundColor.push(this.getRandomColor())
                        })
                    }
                }

                datasets.push({
                    label: 'hello',
                    backgroundColor: backgroundColor,
                    data: values
                })

                this.datacollection = {
                    labels: labels,
                    datasets: datasets
                }
            },

            getRandomColor() {
                var letters = '0123456789ABCDEF'.split('');
                var color = '#';
                for (var i = 0; i < 6; i++ ) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
            },

            getRandomInt () {
                return Math.floor(Math.random() * (50 - 5 + 1)) + 5
            }
        }
    }
</script>