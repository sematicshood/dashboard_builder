<template>
    <div id="lineComponent">
        <line-chart :chart-data="datacollection" :styles="{height: `${ height }px`}" :options="chartOptions"></line-chart>
    </div>
</template>

<script>
    import LineChart from './chart/LineChart.js'
    import { mapGetters, mapState } from 'vuex'

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
                    // return this.data.data[this.rows.rows[this.vuerow][this.vuecolumn]['model']]
                    return this.rows.rows[this.vuerow][this.vuecolumn]['datas']
                }
            }
        },

        watch: {
            titles(newv, oldv) {
                this.fillData()
            },
            row: {
                handler(val){
                    this.fillData()
                },
                deep: true
            },
        },

        methods: {
            inArray(all, newed) {
                if(all != undefined) {
                    var length = all.length;
                    for(var i = 0; i < length; i++) {
                        if(all[i] == newed) return true;
                    }
                    return false;
                }
            },

            cekWeek(date) { 
                var target = new Date(date.valueOf()),
                    dayNumber = (date.getUTCDay() + 6) % 7,
                    firstThursday;

                target.setUTCDate(target.getUTCDate() - dayNumber + 3);
                firstThursday = target.valueOf();
                target.setUTCMonth(0, 1);

                if (target.getUTCDay() !== 4) {
                    target.setUTCMonth(0, 1 + ((4 - target.getUTCDay()) + 7) % 7);
                }

                return [date.getFullYear(), Math.ceil((firstThursday - target) /  (7 * 24 * 3600 * 1000)) + 1];
            },

            fillData () {
                let xaxis       = (this.titles[0]) ? this.titles[0]['prop'] : [],
                    type        = (this.titles[0]) ? this.titles[0]['type'] : [],
                    key         = (this.titles[1]) ? this.titles[1]['prop'] : [],
                    value       = (this.titles[2]) ? this.titles[2]['prop'] : [],
                    labels      = [],
                    datasets    = [],
                    keys        = [],
                    values      = {}

                this.datas.forEach(el => {
                    if(el[xaxis] != undefined) {
                        if(el[xaxis].length == 2) {
                            if(this.inArray(labels, el[xaxis][1]) == false)
                                labels.push(el[xaxis][1])
                        } else {
                            let x    = el[xaxis]

                            if(typeof el[xaxis] == 'number') {
                                x = el[xaxis]
                            } else {
                                let dat  = el[xaxis].split(' ')[0]

                                if (type == 'datetime') {
                                    x    = dat
                                }
                            }
                            
                            if(this.inArray(labels, x) == false)
                                labels.push(x)
                        }
                    }
                })

                if(this.group != '' && this.group != 'Hari' && this.group != undefined) {
                    let newl = []

                    labels.sort((a,b) => {
                        if(a < b) { return -1; }
                        if(a > b) { return 1; }
                        return 0;
                    })

                    labels.forEach(la => {
                        let dat  = la

                        if(typeof la != 'number') {
                            dat = la.split(' ')[0].split('-')
                        }
                        
                        if(this.group == 'Tahun') {
                            if(this.inArray(newl, dat[0]) == false)
                                newl.push(dat[0])
                        } else if(this.group == 'Bulan') {
                            let bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

                            if(this.inArray(newl, `${bulan[parseInt(dat[1]) - 1]} #${dat[0]}`) == false)
                                newl.push(`${bulan[parseInt(dat[1]) - 1]} #${dat[0]}`)
                        } else if(this.group == 'Minggu') {
                            let minggu = this.cekWeek(new Date(dat[0],parseInt(dat[1]) - 1,dat[2]))

                            if(this.inArray(newl, `Minggu #${minggu[1]} - ${minggu[0]}`) == false)
                                newl.push(`Minggu #${minggu[1]} - ${minggu[0]}`)
                        }
                    })

                    labels = newl
                }

                labels.forEach(el => {
                    let datas = this.datas.filter((data) => {
                        if(data[xaxis] != undefined) {
                            if(data[xaxis].length == 2) {
                                return data[xaxis][1] == el
                            } else {
                                if(this.group != '' && this.group != 'Hari' && this.group != undefined) {
                                    let dat  = data[xaxis]

                                    if(typeof data[xaxis] != 'number')
                                        dat  = data[xaxis].split(' ')[0].split('-')

                                    if(this.group == 'Tahun') {
                                        return dat[0] == el
                                    } else if(this.group == 'Bulan') {
                                        let bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

                                        return `${bulan[parseInt(dat[1]) - 1]} #${dat[0]}` == el
                                    } else if(this.group == 'Minggu') {
                                        let minggu = this.cekWeek(new Date(dat[0],parseInt(dat[1]) - 1,dat[2]))

                                        return `Minggu #${minggu[1]} - ${minggu[0]}` == el
                                    }
                                } else {
                                    let dat  = data[xaxis].split(' ')[0],
                                        x    = data[xaxis]

                                    if (type == 'datetime') {
                                        x    = dat
                                    }

                                    return x == el
                                }
                            }
                        }
                    })

                    datas.forEach(e => {
                        if(e[key] != undefined) {
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
                            if(dat[key].length == 2)
                                return dat[key][1] == e
                            else
                                return dat[key] == e
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