<template>
    <div id="canvas">
        <modal-share/>
        
        <row-canvas></row-canvas>

        <add-rows></add-rows>

        <add-column></add-column>

        <!-- <div id="loading-page" v-show="loading">
            <h5>Loading . . .</h5>
            <p>Sematics© 2018 Dashboard Studio.</p>
        </div> -->
    </div>
</template>

<script>
    import RowCanvas from './rowsCanvas.vue'
    import addRows from './addRows.vue'
    import addColumn from './addColumn.vue'
    import modalShare from './row/modalShare.vue'
    import { mapGetters } from 'vuex'

    export default {
        name: 'canvasWorkspace',

        components: {
            RowCanvas, addRows, addColumn, modalShare
        },
        
        computed: {
            ...mapGetters('core', {
                loading: 'getLoading'
            })
        }
    }
</script>

<style>
    @import '../../../public/style/canvas.css'
</style>
