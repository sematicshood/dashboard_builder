<template>
    <div id="filterModal">
        <b-modal :id="`filterModal-${ vuerow }-${ vuecolumn }`" 
                 centered 
                 title="Filter" 
                 button-size="sm"
                 @ok="submitFilter"
                 @cancel="cancel">
                <b-list-group>
                    <b-list-group-item v-for="(fil, i) in filters_list" href="#" :key="i">
                        <span>{{ fil['name'] }}</span>&nbsp;<font-awesome-icon @click="deleteFilter(i)" icon="window-close" class="icon-close"/>
                    </b-list-group-item>
                </b-list-group>
                <br>
                <select v-model="filter['value']" class="form-control" @change="change">
                    <option v-for="(opt, o) in columns" :value="`${opt['name']}-${opt['ttype']}-${opt['field_description']}`" v-text="opt['field_description']" :key="o"></option>
                </select>
                
                <select v-if="Object.keys(filter['value']).length != 0" v-model="filter['option']" class="form-control" @change="changeOp">
                    <option v-for="(opt, i) in options" :value="opt['value']" v-text="opt['text']" :key="i"></option>
                </select>
                
                <div v-if="filter['option'] != 'True' && filter['option'] != 'False' && type != ''">
                    <input v-if="type == 'datetime'" v-for="(i, z) in input" type="date" v-model="filter['content'][i]" class="form-control" :key="z">

                    <input v-else-if="type == 'integer' || type == 'monetary'" type="number" v-model="filter['content'][0]" pattern="[0-9]+([\.,][0-9]+)?" step="0.01" class="form-control">
                    
                    <input v-else-if="type != 'integer' && type != 'monetary' && type != 'datetime'" type="text" v-model="filter['content'][0]" class="form-control">
                </div>
        </b-modal>
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex'

    export default {
        name: 'filter-modal',

        props: ['vuerow', 'vuecolumn'],

        data() {
            return {
                select: '',
                options: '',
                type: '',
                filter: {
                    value: {},
                    content: {}
                },
                input: 1,
                dataOp: {
                    datetime: [
                        { text: 'equal to', value: '=' },
                        { text: 'not equal to', value: '!=' },
                        { text: 'after', value: '>' },
                        { text: 'before', value: '<' },
                        { text: 'between', value: '>=,<=' },
                        { text: 'set', value: 'True' },
                        { text: 'not set', value: 'False' },
                    ],
                    char: [
                        { text: 'contains', value: 'ilike' },
                        { text: "doesn't contain", value: 'not ilike' },
                        { text: 'equal to', value: '=' },
                        { text: 'not equal to', value: '!=' },
                        { text: 'set', value: 'True' },
                        { text: 'not set', value: 'False' },
                    ],
                    text: [
                        { text: 'contains', value: 'ilike' },
                        { text: "doesn't contain", value: 'not ilike' },
                        { text: 'equal to', value: '=' },
                        { text: 'not equal to', value: '!=' },
                        { text: 'set', value: 'True' },
                        { text: 'not set', value: 'False' },
                    ],
                    one2many: [
                        { text: 'contains', value: 'ilike' },
                        { text: "doesn't contain", value: 'not ilike' },
                        { text: 'equal to', value: '=' },
                        { text: 'not equal to', value: '!=' },
                        { text: 'set', value: 'True' },
                        { text: 'not set', value: 'False' },
                    ],
                    many2one: [
                        { text: 'contains', value: 'ilike' },
                        { text: "doesn't contain", value: 'not ilike' },
                        { text: 'equal to', value: '=' },
                        { text: 'not equal to', value: '!=' },
                        { text: 'set', value: 'True' },
                        { text: 'not set', value: 'False' },
                    ],
                    integer: [
                        { text: 'equal to', value: '=' },
                        { text: 'not equal to', value: '!=' },
                        { text: 'greater than', value: '>' },
                        { text: 'less than', value: '<' },
                        { text: 'greater than and equal to', value: '>=' },
                        { text: 'less than and equal to', value: '<=' },
                        { text: 'set', value: 'True' },
                        { text: 'not set', value: 'False' },
                    ],
                    monetary: [
                        { text: 'equal to', value: '=' },
                        { text: 'not equal to', value: '!=' },
                        { text: 'greater than', value: '>' },
                        { text: 'less than', value: '<' },
                        { text: 'greater than and equal to', value: '>=' },
                        { text: 'less than and equal to', value: '<=' },
                        { text: 'set', value: 'True' },
                        { text: 'not set', value: 'False' },
                    ],
                    float: [
                        { text: 'equal to', value: '=' },
                        { text: 'not equal to', value: '!=' },
                        { text: 'greater than', value: '>' },
                        { text: 'less than', value: '<' },
                        { text: 'greater than and equal to', value: '>=' },
                        { text: 'less than and equal to', value: '<=' },
                        { text: 'set', value: 'True' },
                        { text: 'not set', value: 'False' },
                    ],
                }
            }
        },

        computed: {
            ...mapGetters('rows', {
                rowOp: 'getRowOp',
                colOp: 'getColOp',
                colOptionShow: 'getColOptionShow',
                columns: 'getColumns',
            }),

            ...mapState(['rows']),

            filters_list: {
                get() {
                    return this.rows.rows[this.vuerow][this.vuecolumn]['filters_list']
                }
            },

            filters_data: {
                get() {
                    return this.rows.rows[this.vuerow][this.vuecolumn]['filters_data']
                }
            }
        },

        methods: {
            change() {
                let data = {}

                data['ttype'] = this.$data.filter['value'].split('-')[1]
                data['name']  = this.$data.filter['value'].split('-')[0]
                
                this.$data.options = this.$data.dataOp[data['ttype']]
                this.$data.type    = data['ttype']
            },

            changeOp() {
                let data = {}

                data['ttype']  = this.$data.filter['value'].split('-')[1]
                data['name']   = this.$data.filter['value'].split('-')[0]
                data['option'] = this.$data.filter['option'].split(',')

                this.$data.type    = data['ttype']

                this.$data.input   = data['option'].length
            },

            deleteFilter(i) {
                this.$store.dispatch('rows/removeFilters', i)

                let content = ''

                this.filters_list.forEach((element) => {
                    Object.keys(element['content']).forEach((el, x) => {
                        content += `('${ element['value'].split('-')[0] }', '${ element['option'].split(',')[x] }', '${ element['content'][el] }'),`
                    })
                });

                let final = `[${ content }]`

                this.$store.dispatch('rows/addFilters', final)
            },

            submitFilter() {
                try {
                    let name = this.$data.options.filter(x => {
                        return x['value'] == this.$data.filter['option']
                    })

                    if(this.$data.filter['option'] == 'True' || this.$data.filter['option'] == 'False') {
                        this.$data.filter['content'][0] = this.$data.filter['option']

                        this.$data.filter['option'] = '='
                    }

                    let judul = ''
                    
                    Object.keys(this.$data.filter['content']).forEach((el, x) => {
                        judul += ` ${ this.$data.filter['content'][el] }`

                        if(x + 1 != Object.keys(this.$data.filter['content']).length)
                            judul += ' & '
                    })

                    this.$data.filter['name'] = this.$data.filter['value'].split('-')[2] + ' ' + name[0].text + judul

                    this.$store.dispatch('rows/addFiltersList', this.$data.filter)
                } catch (error) {
                    // console.log(error)
                }

                this.actionFilter()
            },

            actionFilter() {
                if(this.filters_list != undefined) {
                    let content = ''

                    this.filters_list.forEach((element) => {
                        Object.keys(element['content']).forEach((el, x) => {
                            content += `('${ element['value'].split('-')[0] }', '${ element['option'].split(',')[x] }', '${ element['content'][el] }'),`
                        })
                    });

                    let final = `[${ content }]`

                    this.$store.dispatch('rows/addFilters', content)

                    this.$store.dispatch('data/filterData', final)
                        .then(res => {
                            this.$store.dispatch('rows/setDataRow', res)
                        })
                        .catch(() => {
                            this.$store.dispatch('rows/setDataRow', [])
                        })

                    this.$data.type = ''

                    this.$data.filter = {
                        value: {},
                        content: {}
                    }
                }
            },

            cancel() {
                this.$data.type = ''

                this.$data.filter = {
                    value: {},
                    content: {}
                }
            }
        },
    }
</script>
