<template>
    <div id="rows">
        <div v-for="(row, index) in rows">
            <b-btn v-show="type == 'edit'" v-b-modal.modalColumn
                   size="sm" 
                   variant="danger" 
                   @click="addColumn(index)">Add Column</b-btn>
            <b-btn v-show="type == 'edit'" size="sm" 
                   variant="primary" 
                   style="margin-left: 10px;"
                   @click="rowOption(index)">Row Option</b-btn>

            <div class="rows" :style="`height: ${ row[0]['height'] }px`">
                <div v-for="(column, indexes) in rows[index]" class="column"
                    :style="`width: ${column['width']}%; left: ${column['left']}%;`"
                    @click="colOption(index, indexes)" v-if="indexes != 0">

                    <h5 v-text="column['title']"></h5>
                    
                    <el-table :max-height="row[0]['height'] - 100" v-if="column['type'] == 'table'" :data="data[column['model']]" :summary-method="getSummaries" show-summary>
                        <el-table-column
                        type="index"
                        fixed sortable
                        :index="indexMethod" width="50" v-if="data[column['model']] != undefined && column['titles'].length > 0">
                        </el-table-column>

                        <el-table-column fixed sortable v-for="t in column['titles']" :prop="t.prop" :label="t.label" :key="t.label">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Event } from '../../event.js'
    import { mapGetters, mapState } from 'vuex'

    export default {
        name: 'row-canvas',

        methods: {
            addColumn(row) {
                this.$store.dispatch('rows/setRowSelect', row)
                let totalWidth       = 100,
                    totalLeft        = 0

                this.rows[row].forEach(val => {
                    if(parseInt(val['width'])) {
                        totalWidth -= parseInt(val['width'])
                        totalLeft += parseInt(val['width'])
                    }
                });

                this.$store.dispatch('rows/setMaxWidth', totalWidth)
                this.$store.dispatch('rows/setTotalLeft', totalLeft)
            },

            rowOption(index) {
                this.$store.dispatch('rows/setRowOp', index)
                this.$store.dispatch('rows/setRowOptionShow', true)
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

            colOption(index, indexes) {
                this.$store.dispatch('rows/setRowOp', index)
                this.$store.dispatch('rows/setColOp', indexes)
                this.$store.dispatch('rows/setColOptionShow', true)
                this.$store.dispatch('rows/setSelected', this.rows[index][indexes]['type'])
            },

        },

        computed: {
            ...mapGetters('workspace', {
                type: 'getType',
            }),

            ...mapGetters('rows', {
                rows: 'getRows',
                maxWidth: 'getMaxWidth',
                totalLeft: 'getTotalLeft',
                rowSelect: 'getRowSelected',
            }),

            ...mapGetters('data', {
                data: 'getData'
            })
        },
    }
</script>