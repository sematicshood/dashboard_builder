<template>
    <div id="filterModal">
        <b-modal id="filterModal" 
                 centered 
                 title="Filter" 
                 button-size="sm"
                 @ok="submitFilter"
                 @cancel="cancel">
            <ul>
                <li v-for="(fil, i) in filters"><span>{{ fil['name'] }}</span> <button @click="deleteFilter(i)">x</button></li>
            </ul>

            <select v-model="filter['value']" class="form-control" @change="change">
                <option v-for="opt in columns" :value="`${opt['name']}-${opt['ttype']}-${opt['field_description']}`" v-text="opt['field_description']"></option>
            </select>

            <select v-if="Object.keys(filter['value']).length != 0" v-model="filter['option']" class="form-control" @change="changeOp">
                <option v-for="(opt, i) in options" :value="opt['value']" v-text="opt['text']"></option>
            </select>
            
            <div v-if="filter['option'] != 'True' && filter['option'] != 'False' && type != ''">
                <input v-if="type == 'datetime'" v-for="i in input" type="date" v-model="filter['content'][i]" class="form-control">

                <input v-if="type == 'integer' || type == 'monetary'" type="number" v-model="filter['content'][0]" pattern="[0-9]+([\.,][0-9]+)?" step="0.01" class="form-control">
                
                <input v-if="type != 'integer' && type != 'monetary' && type != 'datetime'" type="text" v-model="filter['content'][0]" class="form-control">
            </div>
        </b-modal>
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex'

    export default {
        name: 'filter-modal',

        data() {
            return {
                select: '',
                // columns: '',
                options: '',
                type: '',
                filters: [],
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
                rows: 'getRows',
                rowOp: 'getRowOp',
                colOp: 'getColOp',
                colOptionShow: 'getColOptionShow',
                columns: 'getColumns'
            }),
        },

        methods: {
            change() {
                let data = {}

                data['ttype'] = this.$data.filter['value'].split('-')[1]
                data['name']  = this.$data.filter['value'].split('-')[0]

                console.log(data['ttype'])
                
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
                this.$data.filters.splice(i, 1)
            },

            submitFilter() {
                try {
                    let filter  = ''

                    let name = this.$data.options.filter(x => {
                        return x['value'] == this.$data.filter['option']
                    })

                    if(this.$data.filter['option'] == 'True' || this.$data.filter['option'] == 'False') {
                        this.$data.filter['content'][0] = this.$data.filter['option']

                        this.$data.filter['option'] = '=='
                    }

                    let judul = ''
                    
                    Object.keys(this.$data.filter['content']).forEach((el, x) => {
                        judul += ` ${ this.$data.filter['content'][el] }`

                        if(x + 1 != Object.keys(this.$data.filter['content']).length)
                            judul += ' & '
                    })

                    this.$data.filter['name'] = this.$data.filter['value'].split('-')[2] + ' ' + name[0].text + judul

                    this.$data.filters.push(this.$data.filter)
                } catch (error) {
                    
                }

                this.actionFilter()
            },

            actionFilter() {
                let content = ''

                this.$data.filters.forEach((element, i) => {
                    Object.keys(element['content']).forEach((el, x) => {
                        content += `('${ element['value'].split('-')[0] }', '${ element['option'].split(',')[x] }', '${ element['content'][el] }'),`
                    })
                });

                let final = `[${ content }]`

                this.$store.dispatch('data/filterData', final)
                    .then(res => {
                        this.$store.dispatch('rows/setDataRow', res)
                    })

                this.$data.type = ''

                this.$data.filter = {
                    value: {},
                    content: {}
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
