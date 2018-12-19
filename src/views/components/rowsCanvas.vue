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
                    
                    <table-component v-if="column['type'] == 'table'"
                           :vuedata="data[column['model']]"
                           :vuetitles="column['titles']"
                           :vueheight="row[0]['height'] - 100"/>

                    <line-component v-if="column['type'] == 'line'"
                           :vuedata="data[column['model']]"
                           :vuetitles="column['titles']"
                           :vueheight="row[0]['height'] - 100"/>

                    <bar-component v-if="column['type'] == 'bar'"
                           :vuedata="data[column['model']]"
                           :vuetitles="column['titles']"
                           :vueheight="row[0]['height'] - 100"/>

                    <pie-component v-if="column['type'] == 'pie'"
                           :vuedata="data[column['model']]"
                           :vuetitles="column['titles']"
                           :vueheight="row[0]['height'] - 100"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import tableComponent from './type/tableComponent.vue'
    import lineComponent from './type/lineComponent.vue'
    import barComponent from './type/barComponent.vue'
    import pieComponent from './type/pieComponent.vue'
    import { Event } from '../../event.js'
    import { mapGetters, mapState } from 'vuex'

    export default {
        name: 'row-canvas',

        components: {
            tableComponent, lineComponent, barComponent, pieComponent
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