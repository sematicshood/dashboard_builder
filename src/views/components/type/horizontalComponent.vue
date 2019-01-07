<template>
    <div id="horizontalComponent">
        <horizontal-chart :chart-data="datacollection" :styles="{height: `${ height }px`}" :options="chartOptions"></horizontal-chart>
    </div>
</template>

<script>
    import HorizontalChart from './chart/HorizontalChart.js'
    import { mapGetters, mapState } from 'vuex'

    export default {
        name: 'horizontal-component',

        components: {
            HorizontalChart
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
                let xaxis       = (this.titles[0]) ? this.titles[0]['prop'] : [],
                    key         = (this.titles[1]) ? this.titles[1]['prop'] : [],
                    value       = (this.titles[2]) ? this.titles[2]['prop'] : [],
                    labels      = [],
                    datasets    = [],
                    keys        = [],
                    values      = {}

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
                    let datas = this.datas.filter((data) => {
                        if(data[xaxis]) {
                            if(data[xaxis].length == 2)
                                return data[xaxis][1] == el
                            else
                                return data[xaxis] == el
                        }
                    })

                    datas.forEach(e => {
                        if(e[key]) {
                            if(e[key].length == 2) {
                                if(this.inArray(keys, e[key][1]) == false)
                                    keys.push(e[key][1])
                            } else {
                                if(this.inArray(keys, e[key]) == false)
                                    keys.push(e[key])
                            }
                        }
                    })

                    keys.forEach(e => {
                        let amount = 0

                        let list_amount = datas.filter(dat => {
                            if(dat[key]) {
                                if(dat[key].length == 2)
                                    return dat[key][1] == e
                                else
                                    return dat[key] == e
                            }
                        })

                        try {
                            list_amount.forEach(li => {
                                amount += li[value]
                            })
                        } catch (error) {
                            amount = 0   
                        }

                        if(values[e] == undefined) {
                            values[e] = [amount]
                        } else {
                            values[e].push(amount)
                        }
                    })
                })

                keys.forEach(e => {
                    datasets.push({
                        label: e,
                        backgroundColor: this.getRandomColor(),
                        data: values[e]
                    })
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