<template>
    <div id="canvas">
        <row-canvas></row-canvas>

        <add-rows></add-rows>

        <add-column></add-column>

        <!-- <div id="loading-page">
            <h5>Loading . . .</h5>
            <p>Sematics© 2018 Dashboard Studio.</p>
        </div> -->
    </div>
</template>

<script>
    import buttonDeleteRow from './rowComponent/buttonDeleteRow.vue'
    import { Event } from '../../event.js'
    import draggable from 'vuedraggable'
    import RowCanvas from './rowsCanvas.vue'
    import addRows from './addRows.vue'
    import rowOption from './rowOption.vue'
    import addColumn from './addColumn.vue'
    import buttonAddRow from './buttonAddRow.vue'
    import { mapGetters } from 'vuex'

    export default {
        name: 'canvasWorkspace',

        components: {
            draggable, RowCanvas, addRows, rowOption, addColumn, buttonAddRow, buttonDeleteRow
        },

        computed: {
            ...mapGetters('workspace', {
                type: 'getType',
            }),

            ...mapGetters('data', {
                models: 'getModels',
            }),

            ...mapGetters('rows', {
                rows: 'getRows'
            })
        },

        created() {
            this.$store.dispatch('rows/loadTemplate'),

            this.$store.dispatch('data/loadData')

            // this.loadData()
        },
    }
</script>

<style>
    @import '../../../public/style/canvas.css'
</style>
