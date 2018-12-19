<template>
    <div id="canvas">
        <col-option></col-option>

        <row-canvas></row-canvas>

        <button-add-row/>

        <add-rows></add-rows>

        <add-column></add-column>
    </div>
</template>

<script>
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
            draggable, RowCanvas, addRows, rowOption, addColumn, buttonAddRow
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
        },
    }
</script>

<style>
    @import '../../../public/style/canvas.css'
</style>
