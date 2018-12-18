<template>
    <div id="canvas">
        <row-option></row-option>

        <col-option></col-option>

        <row-canvas></row-canvas>

        <b-btn v-show="type == 'edit'" v-b-modal.modalRow size="sm" variant="primary">Add Row</b-btn>

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
    import colOption from './colOption.vue'
    import { mapGetters } from 'vuex'

    export default {
        name: 'canvasWorkspace',

        components: {
            draggable, RowCanvas, addRows, rowOption, addColumn, colOption
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
