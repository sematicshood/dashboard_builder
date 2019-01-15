<template>
    <div id="rowOption">
        <height-row/>
    </div>
</template>

<script>
    import heightRow from './rowComponent/heightRow.vue'
    import { mapGetters } from 'vuex'

    export default {
        name: 'row-option',

        components: {
            heightRow
        },

        computed: {
            ...mapGetters('rows', {
                rowOptionShow: 'getRowOptionShow',
                rowOp: 'getRowOp',
                rows: 'getRows'
            }),

            ...mapGetters('workspace', {
                type: 'getType'
            })
        },
    }
</script>