<template>
    <div id="widget-table" :style="`max-height: ${height}px; height:auto; overflow: auto;`">
        <b-button-group v-if="type == 'edit'" size="sm" class="btn-group-widget-table">
            <b-button variant="info" @click="set_options('count')">Count</b-button>
            <b-button variant="info" @click="set_options('sum')">Sum</b-button>
            <b-button variant="info" @click="set_options('avg')">Average</b-button>
        </b-button-group>

        <input type="number" v-model="limit_table">
        <label for="">Limit Data: </label>
        
        <table class="widget-table" :height="height">
            <col width="10%"/>
            <thead>
                <tr>
                    <th><center>#</center></th>
                    <th v-for="(title, index) in titles" v-text="title.label" :class="{'col-right': (index == 1) ? true : false}"></th>
                    <th v-show="type == 'edit'">Options</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(data, i) in alls" v-if="alls.length > 0 && titles.length > 0 && limit_table > 0 && i < limit_table" :class="{ 'plus': isPlus(data), 'minus': isMinus(data) }">
                    <td v-text="i + 1" align="center"></td>
                    <td v-for="(title, index) in titles" :class="{'col-right': (index == 1) ? true : false}">
                        {{ magic(data[title.prop], title) }}
                    </td>
                    <td v-show="type == 'edit'">
                        <span v-for="(i, a) in table_options[data[key]]">
                            <span v-if="a == 'type'">
                                {{ i }}
                            </span>
                            <span v-else>
                                ({{ i }})
                            </span>
                        </span>
                        <button v-if="cekExistsHiddenLabel(data[key]) == false" class="btn btn-sm" @click="hidden(data[key])">Hide</button>

                        <button v-if="cekExistsHiddenLabel(data[key])" class="btn btn-sm" @click="show(data[key])">Show</button>

                        <button v-if="Object.keys(table_options).length != 0" class="btn btn-sm" @click="ChangeOperator(data)">(+/-)</button>
                    </td>
                </tr>
                <tr v-for="(data, i) in alls" v-if="alls.length > 0 && titles.length > 0 && limit_table == 0" :class="{ 'plus': isPlus(data), 'minus': isMinus(data) }">
                    <td v-text="i + 1" align="center"></td>
                    <td v-for="(title, index) in titles" :class="{'col-right': (index == 1) ? true : false}">
                        {{ magic(data[title.prop], title) }}
                    </td>
                    <td v-show="type == 'edit'">
                        <span v-for="(i, a) in table_options[data[key]]" :key="a">
                            <span v-if="a == 'type'">
                                {{ i }}
                            </span>
                            <span v-else>
                                ({{ i }})
                            </span>
                        </span>

                        <button v-if="cekExistsHiddenLabel(data[key]) == false" class="btn btn-sm btn-widiget-table" @click="hidden(data[key])">Hide</button>

                        <button v-if="cekExistsHiddenLabel(data[key])" class="btn btn-sm btn-widiget-table" @click="show(data[key])">Show</button>

                        <button v-if="Object.keys(table_options).length != 0" class="btn btn-sm btn-widiget-table" @click="ChangeOperator(data)">(+/-)</button>
                    </td>
                </tr>
                <tr v-if="alls.length == 0">
                    <td class="text-center" :colspan="titles.length + (type == 'edit') ? (titles.length + 2) : 1">Not Found Data</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td>Jumlah</td>
                    <td v-for="(title, index) in titles" :class="{'col-right': (index == 1) ? true : false}">
                        {{ magicFooter(title) }}
                    </td>
                    <td v-show="type == 'edit'">Options</td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>


<script>
import { mapState, mapGetters } from 'vuex'

export default {
    name: 'widget-table',
    props: ['vuecolumn', 'vuerow'],

    data() {
        return {
            alls: []
        }
    },

    methods: {
        isPlus(data) {
            if(this.table_options[data[this.key]])
                if(this.table_options[data[this.key]].operation == '+') return true
        },

        isMinus(data) {
            if(this.table_options[data[this.key]])
                if(this.table_options[data[this.key]].operation == '-') return true
        },

        ChangeOperator(data) {
            let keys  = (this.titles[0]) ? this.titles[0]['prop'] : [],
                op    = (this.table_options[data[keys]]) ? this.table_options[data[keys]]['operation'] : []

            op = (op == '+') ? '-' : '+'
            
            this.$store.dispatch('rows/changeTableOptions', {'row': this.vuerow, 'column': this.vuecolumn, 'keys': data[keys], 'op': op})
        },

        rupiah(bilangan) {
            var	reverse = bilangan.toString().split('').reverse().join(''),
                ribuan 	= reverse.match(/\d{1,3}/g);
                ribuan	= ribuan.join('.').split('').reverse().join('');

            return ribuan
        },

        set_options(type) {
            let keys  = (this.titles[0]) ? this.titles[0]['prop'] : []
            
            let datas = {}

            this.$data.alls.forEach(el => {
                datas[el[keys]] = {
                    type: type,
                    operation: '+'
                }
            })

            this.$store.dispatch('rows/updateTableOptions', {'data': datas, 'row': this.vuerow, 'col': this.vuecolumn})
        },

        magic(data, title) {
            if(typeof data == 'object') {
                return data[1]
            } else if(title['type'] == 'monetary' && typeof data == 'number') {
                return 'Rp. ' + this.rupiah(data)
            }

            return data
        },

        magicFooter(title) {
            if(title.type != 'monetary' && title.type != 'integer') {
                let re = ''

                if(this.limit_table > 0) {
                    re = this.$data.alls.slice(0, this.limit_table).length
                } else {
                    re = this.$data.alls.length
                }

                return re
            }

            if(title.type == 'monetary' || title.type == 'integer') {
                let duit = 0

                this.$data.alls.forEach((el, i) => {
                    if(this.inArray(this.hidden_label, el[this.key]) == false) {
                        if(this.limit_table > 0) {
                            if(i < this.limit_table) {
                                let option   = (this.table_options[el[this.key]]) ? this.table_options[el[this.key]].operation : undefined

                                if(option == '+' || option == undefined)
                                    duit += parseInt(el[title.prop])
                                else
                                    duit - parseInt(el[title.prop])

                                if(this.limit_table == 1 && option == '-')
                                    duit -= parseInt(el[title.prop])
                            }
                        } else {
                            let option   = (this.table_options[el[this.key]]) ? this.table_options[el[this.key]].operation : undefined

                            if(option == '+' || option == undefined)
                                duit += parseInt(el[title.prop])
                            else
                                duit - parseInt(el[title.prop])
                        }
                    }
                })

                if(title.type == 'monetary') return 'Rp. ' + this.rupiah(duit)

                if(title.type == 'integer') return duit
            }
        },

        inArray(all, newed) {
            if(all) {
                var length = all.length;
                for(var i = 0; i < length; i++) {
                    if(all[i] == newed) return true;
                }
                return false;
            }
        },

        magicBims() {
            if(this.titles[0] && this.titles[1]) {
                this.$data.alls = []

                let keys  = (this.titles[0]) ? this.titles[0]['prop'] : [],
                    value = (this.titles[1]) ? this.titles[1]['prop'] : [],
                    group = []

                this.datas.forEach(e => {
                    if(typeof e[keys] == 'object') {
                        if(this.inArray(group, e[keys][1]) == false)
                            group.push(e[keys][1])
                    } else {
                        if(this.inArray(group, e[keys]) == false)
                            group.push(e[keys])
                    }
                })

                group.forEach(el => {
                    let data = this.datas.filter(dat => {
                        if(typeof dat[keys] == 'object') {
                            return dat[keys][1] == el
                        } else {
                            return dat[keys] == el
                        }
                    })

                    let amount = 0
                    let type   = (this.table_options[el]) ? this.table_options[el].type : undefined
                    let total  = 0

                    data.forEach(e => {
                        if(type == 'sum') {
                            amount += e[value]
                        } else if(type == 'avg') {
                            amount += e[value]
                            total++
                        } else {
                            amount++
                        }
                    })

                    if(type == 'avg') {
                        amount = amount / total
                    }

                    let anu = {}

                    anu[keys]  = el

                    if(type == 'sum' || type == undefined)
                        anu[value] = Math.floor(amount)
                    else
                        anu[value] = `${Math.floor(amount)}`

                    this.$data.alls.push(anu)
                })

                if(this.type == 'view') {
                    this.$data.alls.forEach((el, x) => {
                        if(this.inArray(this.hidden_label, el[this.key])) {
                            this.$data.alls.splice(x, 1)
                        }
                    })
                }

                this.$data.alls.sort((a,b) => {
                    if(parseInt(a[value]) < parseInt(b[value])) { return 1; }
                    if(parseInt(a[value]) > parseInt(b[value])) { return -1; }
                    return 0;
                })
            }
        },

        hidden(label) {
            this.$store.dispatch('rows/addHiddenLabel', {'row': this.vuerow, 'column': this.vuecolumn, 'label': label})
        },

        cekExistsHiddenLabel(label) {
            return this.inArray(this.hidden_label, label)
        },

        show(label) {
            this.$store.dispatch('rows/removeHiddenLabel', {'row': this.vuerow, 'column': this.vuecolumn, 'label': label})
        }
    },

    computed: {
        ...mapState(['rows', 'data']),

        ...mapGetters('workspace', {
            type: 'getType'
        }),

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
                return this.rows.rows[this.vuerow][0]['height'] - 110
            }
        },
        titles: {
            get() {
                return this.rows.rows[this.vuerow][this.vuecolumn]['titles']
            }
        },
        datas: {
            get() {
                return this.rows.rows[this.vuerow][this.vuecolumn]['datas']
            }
        },
        table_options: {
            get() {
                return this.rows.rows[this.vuerow][this.vuecolumn]['table_options']
            },
        },
        key: {
            get() {
                return this.rows.rows[this.vuerow][this.vuecolumn]['titles'][0]['prop']
            }
        },
        limit_table: {
            get() {
                return this.rows.rows[this.vuerow][this.vuecolumn]['limit_table']
            },

            set(limit_table) {
                this.$store.dispatch('rows/setLimitTable', limit_table)
            }
        },

        hidden_label: {
            get() {
                return this.rows.rows[this.vuerow][this.vuecolumn]['hidden_label']
            }
        },
    },

    watch: {
        titles() {
            this.magicBims()
        },

        row: {
            handler(){
                this.magicBims()
            },
            deep: true
        },

        type: {
            handler(){
                this.magicBims()
            },
            deep: true
        },
    },

    created() {
        this.magicBims(),

        this.$store.dispatch('rows/cekTableOptions', {'row': this.vuerow, 'column': this.vuecolumn})
    }
}
</script>

<style>
    .plus {
        background: green;
        color: white;
    }

    .minus {
        background: red;
        color: white;
    }
</style>
