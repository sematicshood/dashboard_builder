<template>
    <div id="table">
        <el-table :max-height="height" :data="datas" :summary-method="getSummaries" show-summary>
            <el-table-column
            type="index"
            fixed sortable
            :index="indexMethod" width="50" v-if="datas != undefined && titles.length > 0">
            </el-table-column>

            <el-table-column fixed sortable v-for="t in titles" :prop="filterProp(t)" :label="t.label" :key="t.label">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: 'table-component',

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

        methods: {
            filterProp(prop) {
                if(prop.type == 'many2one' || prop.type == 'one2many') {
                    return prop.prop + '[1]'
                } else {
                    return prop.prop
                }
            },

            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];

                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = 'Total';
                        return;
                    }

                    const values = data.map(item => Number(item[column.property]));
                    
                    if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                    const value = Number(curr);
                    if (!isNaN(value)) {
                        return prev + curr;
                    } else {
                        return prev;
                    }
                    }, 0);
                    } else {
                        sums[index] = 'N/A';
                    }
                });

                return sums;
            },

            indexMethod(index) {
                return index += 1;
            },
        },
    }
</script>

<style>
    #table {
        margin-top: 50px;
    }
</style>
