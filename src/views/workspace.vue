<template>
    <div id="workspace"  :class="{ 'col-md-12': !sidebar, 'col-md-10': sidebar, 'inline-block': true }">
        <canvas-workspace/>
    </div>
</template>

<script>
    import canvasWorkspace from './components/canvasWorkspace.vue'
    import { mapGetters } from 'vuex'

    export default {
        name: 'workspace',

        components: {
            canvasWorkspace
        },

        computed: {
            ...mapGetters('style', {
                sidebar: 'getSidebar'
            })
        }
    }
</script>