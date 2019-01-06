<template>
    <div id="widget-table">
        <b-dropdown left text="Option" size="sm" variant="white">
            <b-dropdown-item @click="set_options('count')">Count</b-dropdown-item>
            <b-dropdown-item @click="set_options('sum')">Sum</b-dropdown-item>
            <b-dropdown-item @click="set_options('avg')">Average</b-dropdown-item>
        </b-dropdown>

        <input type="number" placeholder="Input limit data" v-model="limit_table">
        
        <table class="widget-table" :height="height">
            <thead>
                <tr>
                    <th>#</th>
                    <th v-for="title in titles" v-text="title.label"></th>
                    <th v-show="type == 'edit'">Options</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(data, i) in alls" v-if="alls.length > 0 && titles.length > 0 && limit_table > 0 && i < limit_table">
                    <td v-text="i + 1"></td>
                    <td v-for="title in titles">
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
                        <button v-show="Object.keys(table_options).length != 0" class="btn btn-primary btn-sm" @click="ChangeOperator(data)">Change Operator</button>

                        <button class="btn btn-danger btn-sm" @click="hidden(data[key])">Hidden Label</button>
                    </td>
                </tr>
                <tr v-for="(data, i) in alls" v-if="alls.length > 0 && titles.length > 0 && limit_table == 0">
                    <td v-text="i + 1"></td>
                    <td v-for="title in titles">
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
                        <button v-if="Object.keys(table_options).length != 0" class="btn btn-primary btn-sm" @click="ChangeOperator(data)">Change Operator</button>

                        <button v-if="cekExistsHiddenLabel(data[key]) == false" class="btn btn-danger btn-sm" @click="hidden(data[key])">Hidden Label</button>

                        <button v-if="cekExistsHiddenLabel(data[key])" class="btn btn-warning btn-sm" @click="show(data[key])">Show Label</button>
                    </td>
                </tr>
                <tr v-if="alls.length == 0">
                    <td class="text-center" :colspan="titles.length + (type == 'edit') ? 2 : 1">Not Found Data</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td>Jumlah</td>
                    <td v-for="title in titles">
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
        ChangeOperator(data) {
            let keys  = this.titles[0]['prop'],
                op    = this.table_options[data[keys]]['operation']

            op = (op == '+') ? '-' : '+'
            
            this.$store.dispatch('rows/changeTableOptions', {'row': this.vuerow, 'column': this.vuecolumn, 'keys': data[keys], 'op': op})
        },

        set_options(type) {
            let keys  = this.titles[0]['prop']
            
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
                return 'Rp. ' + data.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.")
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

                if(title.type == 'monetary') return 'Rp. ' + duit.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.")

                if(title.type == 'integer') return duit
            }
        },

        inArray(all, newed) {
            var length = all.length;
            for(var i = 0; i < length; i++) {
                if(all[i] == newed) return true;
            }
            return false;
        },

        magicBims() {
            if(this.titles[0] && this.titles[1]) {
                this.$data.alls = []

                let keys  = this.titles[0]['prop'],
                    value = this.titles[1]['prop'],
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
        titles(newv, oldv) {
            this.magicBims()
        },

        row: {
            handler(val){
                this.magicBims()
            },
            deep: true
        },

        type: {
            handler(val){
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
