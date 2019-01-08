function inArray(all, newed) {
    if(all != undefined) {
        var length = all.length;
        for(var i = 0; i < length; i++) {
            if(all[i] == newed) return true;
        }
        return false;
    }
}

function cekWeek(date) { 
    var target = new Date(date.valueOf()),
        dayNumber = (date.getUTCDay() + 6) % 7,
        firstThursday;

    target.setUTCDate(target.getUTCDate() - dayNumber + 3);
    firstThursday = target.valueOf();
    target.setUTCMonth(0, 1);

    if (target.getUTCDay() !== 4) {
        target.setUTCMonth(0, 1 + ((4 - target.getUTCDay()) + 7) % 7);
    }

    return [date.getFullYear(), Math.ceil((firstThursday - target) /  (7 * 24 * 3600 * 1000)) + 1]
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const state = {
    
}

const getters = {

}

const mutations = {

}

const actions = {
    optionsChart({dispatch}, options) {
        return new Promise((res, rej) => {
            let     optionsC    = (options.column['options_chart']) ? options.column['options_chart'] : [],
                    type        = options.column['type']

            options.options['legend'] = {
                display: optionsC['legend']['display'],
                position: optionsC['legend']['position']
            }

            if(type != 'pie' && type != 'doughnut' && type != 'polar') {
                options.options['scales']['yAxes'] = [
                    {
                        ticks: {
                            callback: function(label, index, labels) {
                                return (optionsC['scales']['yuang']) ? 'Rp. ' + label.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.") : label
                            }
                        },
                    }
                ]
    
                options.options['scales']['xAxes'] = [
                    {
                        ticks: {
                            callback: function(label, index, labels) {
                                return (optionsC['scales']['xuang']) ? 'Rp. ' + label.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.") : label
                            }
                        },
                    }
                ]
            }

            options.options['tooltips'] = {
                enabled: optionsC['tooltip']['enabled'],
                callbacks: {
                    label:function (tooltipItems, data) {
                        if(type == 'pie' || type == 'doughnut' || type == 'polar') {
                            var value     = data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index];
                            
                            return (optionsC['tooltip']['uang']) ? 'Rp. ' +  value.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.") : value
                        } else {
                            return (optionsC['tooltip']['uang']) ? 'Rp. ' +  tooltipItems.yLabel.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.") : tooltipItems.yLabel
                        }
                    }
                }
            }

            dispatch('rows/save', false, { root: true })

            res(options.options)
        })
    },

    renderChartOne({dispatch}, options) {
        return new Promise((res, rej) => {
            let xaxis       = (options.titles[0]) ? options.titles[0]['prop'] : [],
                type        = (options.titles[0]) ? options.titles[0]['type'] : [],
                key         = (options.titles[1]) ? options.titles[1]['prop'] : [],
                value       = (options.titles[2]) ? options.titles[2]['prop'] : [],
                labels      = [],
                datasets    = [],
                keys        = [],
                values      = {},
                datacollection  =   {}

            options.datas.forEach(el => {
                if(el[xaxis] != undefined) {
                    if(el[xaxis].length == 2) {
                        if(inArray(labels, el[xaxis][1]) == false)
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
                        
                        if(inArray(labels, x) == false)
                            labels.push(x)
                    }
                }
            })

            if(options.group != '' && options.group != 'Hari' && options.group != undefined) {
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
                    
                    if(options.group == 'Tahun') {
                        if(inArray(newl, dat[0]) == false)
                            newl.push(dat[0])
                    } else if(options.group == 'Bulan') {
                        let bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

                        if(inArray(newl, `${bulan[parseInt(dat[1]) - 1]} #${dat[0]}`) == false)
                            newl.push(`${bulan[parseInt(dat[1]) - 1]} #${dat[0]}`)
                    } else if(options.group == 'Minggu') {
                        let minggu = cekWeek(new Date(dat[0],parseInt(dat[1]) - 1,dat[2]))

                        if(inArray(newl, `Minggu #${minggu[1]} - ${minggu[0]}`) == false)
                            newl.push(`Minggu #${minggu[1]} - ${minggu[0]}`)
                    }
                })

                labels = newl
            }

            labels.forEach(el => {
                let datas = options.datas.filter((data) => {
                    if(data[xaxis] != undefined) {
                        if(data[xaxis].length == 2) {
                            return data[xaxis][1] == el
                        } else {
                            if(options.group != '' && options.group != 'Hari' && options.group != undefined) {
                                let dat  = data[xaxis]

                                if(typeof data[xaxis] != 'number')
                                    dat  = data[xaxis].split(' ')[0].split('-')

                                if(options.group == 'Tahun') {
                                    return dat[0] == el
                                } else if(options.group == 'Bulan') {
                                    let bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

                                    return `${bulan[parseInt(dat[1]) - 1]} #${dat[0]}` == el
                                } else if(options.group == 'Minggu') {
                                    let minggu = cekWeek(new Date(dat[0],parseInt(dat[1]) - 1,dat[2]))

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
                            if(inArray(keys, e[key][1]) == false)
                                keys.push(e[key][1])
                        } else {
                            if(inArray(keys, e[key]) == false)
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
                    backgroundColor: getRandomColor(),
                    data: values[e]
                })
            })

            datacollection = {
                labels: labels,
                datasets: datasets
            }

            res(datacollection)
        })
    },

    renderChartTwo({}, options) {
        return new Promise((res, rej) => {
            let labels          = [],
                datasets        = [],
                values          = [],
                backgroundColor = [],
                counts          = {},
                datacollection

            if(options.titles) {
                if(options.titles.length > 1) {
                    let xaxis           = (options.titles[0]) ? options.titles[0]['prop'] : [],
                        value           = (options.titles[1]) ? options.titles[1]['prop'] : []

                    options.datas.forEach(el => {
                        if(el[xaxis]) {
                            if(el[xaxis].length == 2) {
                                if(inArray(labels, el[xaxis][1]) == false)
                                    labels.push(el[xaxis][1])
                            } else {
                                if(inArray(labels, el[xaxis]) == false)
                                    labels.push(el[xaxis])
                            }
                        }
                    })

                    labels.forEach(el => {
                        let amount = 0

                        let datas = options.datas.filter((data) => {
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

                        backgroundColor.push(getRandomColor())
                    })
                } else {
                    let xaxis           = (options.titles[0]) ? options.titles[0]['prop'] : [],
                        alls            = []

                    options.datas.forEach(el => {
                        if(el[xaxis]) {
                            if(el[xaxis].length == 2) {
                                if(inArray(labels, el[xaxis][1]) == false)
                                    labels.push(el[xaxis][1])

                                alls.push(el[xaxis][1])
                            } else {
                                if(inArray(labels, el[xaxis]) == false)
                                    labels.push(el[xaxis])

                                alls.push(el[xaxis])
                            }
                        }
                    })

                    alls.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });

                    labels.forEach(el => {
                        let amount = 0

                        values.push(counts[el])

                        backgroundColor.push(getRandomColor())
                    })
                }
            }

            datasets.push({
                label: 'hello',
                backgroundColor: backgroundColor,
                data: values
            })

            datacollection = {
                labels: labels,
                datasets: datasets
            }

            res(datacollection)
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}