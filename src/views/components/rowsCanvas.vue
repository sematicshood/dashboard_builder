<template>
    <div id="rows">
        <div v-for="(row, index) in rows" class="s-row" :key="index">

            <div class="button-row" 
                 v-show="type == 'edit'" 
                 v-b-modal.modalColumn 
                 @click="addColumn(index)">
                <font-awesome-icon icon="plus"/>
            </div>
            <div class="button-row delete-row" v-show="type == 'edit'">
                <button-delete-row :vuerow="index"/>
            </div>

            <div class="rows" :style="`height: ${ row[0]['height'] }px`">
                <div v-for="(column, indexes) in rows[index]" :key="indexes" class="column"
                    :style="`width: ${column['width']}%; left: ${column['left']}%;`"
                    @click="colOption(index, indexes)" v-if="indexes != 0">

                    <b-btn class="btn-filter-dashboard" v-if="type == 'edit'" v-b-modal="`filterModal-${ index }-${ indexes }`" size="sm" variant="info"><font-awesome-icon icon="filter"/> Filter Data</b-btn>

                    <filter-modal
                        :vuerow="index"
                        :vuecolumn="indexes"></filter-modal>

                    <filter-date :vuerow="index"
                           :vuecolumn="indexes" 
                           v-show="type == 'view'"/>

                    <group-option :vuerow="index"
                        :vuecolumn="indexes" 
                        v-if="type == 'view' && column['type'] == 'bar' || column['type'] == 'line'"/>

                    <h5 v-text="column['title']"></h5>

                    <div class="line"></div>
                    
                    <table-component v-if="column['type'] == 'table'"
                           :vuerow="index"
                           :vuecolumn="indexes"/>

                    <line-component v-if="column['type'] == 'line'"
                           :vuerow="index"
                           :vuecolumn="indexes"/>

                    <bar-component v-if="column['type'] == 'bar'"
                           :vuerow="index"
                           :vuecolumn="indexes"/>

                    <pie-component v-if="column['type'] == 'pie'"
                           :vuerow="index"
                           :vuecolumn="indexes"/>

                    <horizontal-component v-if="column['type'] == 'horizontal'"
                           :vuerow="index"
                           :vuecolumn="indexes"/>

                    <doughnut-component v-if="column['type'] == 'doughnut'"
                           :vuerow="index"
                           :vuecolumn="indexes"/>

                    <polar-component v-if="column['type'] == 'polar'"
                           :vuerow="index"
                           :vuecolumn="indexes"/>

                    <widget-card v-if="column['type'] == 'widget-card'"
                            :vuerow="index"
                            :vuecolumn="indexes"/>

                    <widget-table v-if="column['type'] == 'widget-table'"
                           :vuerow="index"
                           :vuecolumn="indexes"/>

                    <pivot-table v-if="column['type'] == 'pivot-table'"
                           :vuerow="index"
                           :vuecolumn="indexes"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import buttonDeleteRow from './rowComponent/buttonDeleteRow.vue'
    import widgetCard from './type/widgetCard.vue'
    import widgetTable from './type/widgetTable.vue'
    import tableComponent from './type/tableComponent.vue'
    import lineComponent from './type/lineComponent.vue'
    import barComponent from './type/barComponent.vue'
    import pieComponent from './type/pieComponent.vue'
    import polarComponent from './type/polarComponent.vue'
    import doughnutComponent from './type/doughnutComponent.vue'
    import horizontalComponent from './type/horizontalComponent.vue'
    import filterModal from './filterModal.vue'
    import filterDate from './column/filterDate.vue'
    import groupOption from './column/groupOption.vue'
    import pivotTable from './type/pivotTable.vue'
    import { mapGetters } from 'vuex'

    export default {
        name: 'row-canvas',

        data() {
            return {
                date: '',
                date_to: ''
            }
        },

        components: {
            tableComponent, lineComponent, barComponent, pieComponent, polarComponent, doughnutComponent, horizontalComponent, filterModal, buttonDeleteRow, filterDate, widgetTable, widgetCard, groupOption, pivotTable
        },

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

<style>
    .s-row {
        position: relative;
    }

    .button-row {
        background: #17a2b8;
        color: white;
        position: absolute;
        z-index: 99;
        top: 10px;
        padding: 5px 10px;
        border-radius: 3px;
        left: 10px;
        widows: 30.25px;
        height: 31px;

    }

    .button-row:nth-child(2) {
        top: 5px;
        left: 40px;
        background: none;
    }

    .btn-filter-dashboard{
        top: 9px;
        position: absolute;
        left: 85px;
        z-index: 999;
    }

    .line {
        margin-top: 80px;
    }
</style>
