<template>
    <div id="table">
        <el-table :max-height="height" :data="data" :summary-method="getSummaries" show-summary>
            <el-table-column
            type="index"
            fixed sortable
            :index="indexMethod" width="50" v-if="data != undefined && titles.length > 0">
            </el-table-column>

            <el-table-column fixed sortable v-for="t in titles" :prop="t.prop" :label="t.label" :key="t.label">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: 'table-component',

        props: [ 'vuedata', 'vuetitles', 'vueheight' ],

        data() {
            return {
                data: this.vuedata,
                titles: this.vuetitles,
                height: this.vueheight
            }
        },

        methods: {
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