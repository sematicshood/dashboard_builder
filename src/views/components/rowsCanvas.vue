<template>
    <div id="rows">
        <div v-for="(row, index) in rows" class="s-row">
            <div class="button-row" 
                 v-show="type == 'edit'" 
                 v-b-modal.modalColumn 
                 @click="addColumn(index)">
                <font-awesome-icon icon="plus"/>
            </div>

            <div class="button-row" 
                v-show="type == 'edit'" 
                @click="rowOption(index)">
                <font-awesome-icon icon="edit"/>
            </div>

            <div class="rows" :style="`height: ${ row[0]['height'] }px`">
                <div v-for="(column, indexes) in rows[index]" class="column"
                    :style="`width: ${column['width']}%; left: ${column['left']}%;`"
                    @click="colOption(index, indexes)" v-if="indexes != 0">

                    <b-btn v-if="type == 'view'" v-b-modal.filterModal size="sm" variant="danger">Filter Dashboard</b-btn>

                    <h5 v-text="column['title']"></h5>
                    
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
                </div>
            </div>
        </div>

        <filter-modal></filter-modal>
    </div>
</template>

<script>
    import tableComponent from './type/tableComponent.vue'
    import lineComponent from './type/lineComponent.vue'
    import barComponent from './type/barComponent.vue'
    import pieComponent from './type/pieComponent.vue'
    import polarComponent from './type/polarComponent.vue'
    import doughnutComponent from './type/doughnutComponent.vue'
    import horizontalComponent from './type/horizontalComponent.vue'
    import filterModal from './filterModal.vue'
    import { Event } from '../../event.js'
    import { mapGetters, mapState } from 'vuex'

    export default {
        name: 'row-canvas',

        data() {
            return {
                date: '',
                date_to: ''
            }
        },

        components: {
            tableComponent, lineComponent, barComponent, pieComponent, polarComponent, doughnutComponent, horizontalComponent, filterModal
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
        background: #6c5ce7;
        color: white;
        position: absolute;
        z-index: 99;
        top: 10px;
        padding: 5px 10px;
        border-radius: 3px;
        left: 10px;
    }

    .button-row:nth-child(2) {
        left: 50px;
        background: #e17055;
    }
</style>
