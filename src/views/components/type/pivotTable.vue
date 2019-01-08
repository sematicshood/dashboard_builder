<template lang="">
    <div>
        <div class="mb-5">
            <pivot
                :data="datas"
                :fields="fieldes"
                :row-fields="rowfieldes"
                :col-fields="colfieldes"
                :reducer="reducer"
                :default-show-settings="defaultShowSettings"
            >
                <template slot="value" slot-scope="{ value }">
                {{ value | number }}
                </template>
                <template slot="genderHeader" slot-scope="{ value }">
                <svg v-if="value == 'female'" aria-hidden="true" data-prefix="fas" data-icon="venus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 288 512" class="svg-inline--fa fa-venus fa-fw"><path fill="currentColor" d="M288 176c0-79.5-64.5-144-144-144S0 96.5 0 176c0 68.5 47.9 125.9 112 140.4V368H76c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h36v36c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-36h36c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-36v-51.6c64.1-14.5 112-71.9 112-140.4zm-224 0c0-44.1 35.9-80 80-80s80 35.9 80 80-35.9 80-80 80-80-35.9-80-80z" class=""></path></svg>
                <svg v-else-if="value == 'male'" aria-hidden="true" data-prefix="fas" data-icon="mars" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="svg-inline--fa fa-mars fa-fw"><path fill="currentColor" d="M372 64h-79c-10.7 0-16 12.9-8.5 20.5l16.9 16.9-80.7 80.7c-22.2-14-48.5-22.1-76.7-22.1C64.5 160 0 224.5 0 304s64.5 144 144 144 144-64.5 144-144c0-28.2-8.1-54.5-22.1-76.7l80.7-80.7 16.9 16.9c7.6 7.6 20.5 2.2 20.5-8.5V76c0-6.6-5.4-12-12-12zM144 384c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z" class=""></path></svg>
                {{ value | capitalize }}
                </template>
            </pivot>
        </div>
    </div>
</template>

<script>
    import Pivot from '@marketconnect/vue-pivot-table'
    import PivotTable from '@marketconnect/vue-pivot-table'
    import { mapGetters, mapState } from 'vuex'

    export default {
        name: 'pivot-table',

        components: { Pivot, PivotTable },

        props: ['vuecolumn', 'vuerow'],

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
            columns: {
                get() {
                    return this.rows.rows[this.vuerow][this.vuecolumn]['columns']
                }
            },
            datas: {
                get() {
                    return this.rows.rows[this.vuerow][this.vuecolumn]['datas']
                }
            }
        },

        data: () => {
            return {
                asyncData: [],
                fieldes: [{
                    getter: item => item.id,
                    label: 'Year'
                }],
                rowfieldes: [],
                colfieldes: [],
                reducer: (sum, item) => sum + item.count,
                defaultShowSettings: true,
                isDataLoading: false
            }
        },

        methods: {
            renderFields() {
                this.columns.forEach(el => {
                    this.fieldes.push({
                        getter: item => (typeof item[el.name] == 'object') ? item[el.name][1] : item[el.name],
                        label: el.field_description
                    })
                })
            }
        },

        created: function() {
            this.renderFields()
            this.isDataLoading = true
            setTimeout(() => {
            this.asyncData = data
            this.isDataLoading = false
            }, 3000)
        },
        filters: {
            number: function(value) {
            return value.toLocaleString()
            },
            capitalize: function(value) {
            return value.replace(/\b\w/g, l => l.toUpperCase())
            }
        },
    }
</script>