<template>
    <div id="filterModal">
        <b-modal id="filterModal" 
                 centered 
                 title="Filter" 
                 button-size="sm"
                 @ok="submitFilter">
            <ul>
                <li v-for="fil in filters"><span>{{ fil['name'] }}</span></li>
            </ul>

            <select v-model="filter['value']" class="form-control" @change="change">
                <option v-for="opt in columns" :value="`${opt['name']}-${opt['ttype']}-${opt['field_description']}`" v-text="opt['field_description']"></option>
            </select>

            <select v-if="options != ''" v-model="filter['option']" class="form-control" @change="changeOp">
                <option v-for="(opt, i) in options" :value="opt['value']" v-text="opt['text']"></option>
            </select>
            
            <div v-if="filter['option'] != 'True' && filter['option'] != 'False'">
                <input v-if="type == 'datetime'" v-for="i in input" type="date" v-model="filter['content'][i]" class="form-control">
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
                    content: {}
                },
                input: 1,
                dataOp: {
                    datetime: [
                        { text: 'is equal to', value: '==' },
                        { text: 'is not equal to', value: '!=' },
                        { text: 'is after', value: '>' },
                        { text: 'is before', value: '<' },
                        { text: 'is between', value: '>=,<=' },
                        { text: 'is set', value: 'True' },
                        { text: 'is not set', value: 'False' },
                    ]
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
                
                this.$data.options = this.$data.dataOp[data['ttype']]
                this.$data.type    = data['ttype']

                this.$store.dispatch('data/filterData', data)
            },

            changeOp() {
                let data = {}

                data['ttype']  = this.$data.filter['value'].split('-')[1]
                data['name']   = this.$data.filter['value'].split('-')[0]
                data['option'] = this.$data.filter['option'].split(',')

                this.$data.type    = data['ttype']

                this.$data.input   = data['option'].length
            },

            submitFilter() {
                let filter  = '',
                    content = ''

                if(this.$data.filter['option'] == 'True' || this.$data.filter['option'] == 'False') {
                    this.$data.filter['content'][0] = this.$data.filter['option']

                    this.$data.filter['option'] = '=='
                }

                let name = this.$data.options.filter(x => {
                    return x['value'] == this.$data.filter['option']
                })

                this.$data.filter['name'] = this.$data.filter['value'].split('-')[2]

                console.log(name)

                this.$data.filters.push(this.$data.filter)

                console.log(this.$data.filters)

                this.$data.filters.forEach((element, i) => {
                    Object.keys(element['content']).forEach((el, x) => {
                        console.log('---')
                        content += `('${ element['value'].split('-')[0] }', '${ element['option'].split(',')[x] }', '${ element['content'][el] }'),`
                    })
                });

                let final = `[${ content }]`

                this.$data.filter = {
                    content: {}
                }

                console.log(final)
            }
        },
    }
</script>
