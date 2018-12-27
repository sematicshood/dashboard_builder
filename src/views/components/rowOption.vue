<template>
    <div id="rowOption">
        <height-row/>
    </div>
</template>

<script>
    import buttonDeleteRow from './rowComponent/buttonDeleteRow.vue'
    import heightRow from './rowComponent/heightRow.vue'
    import buttonCancel from './selectComponent/buttonCancelComponent.vue'
    import { mapGetters } from 'vuex'

    export default {
        name: 'row-option',

        components: {
            buttonDeleteRow, heightRow, buttonCancel
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