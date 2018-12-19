<template>
    <div id="rowOption" v-if="rowOptionShow">
        <button-delete-row/>
        <br><br>
        <height-row/>
        <br>
        <button-save/>
        <button-cancel/>

        <br><br>
        <br><br>
    </div>
</template>

<script>
    import buttonDeleteRow from './rowComponent/buttonDeleteRow.vue'
    import heightRow from './rowComponent/heightRow.vue'
    import buttonSave from './selectComponent/buttonSaveComponent.vue'
    import buttonCancel from './selectComponent/buttonCancelComponent.vue'
    import { mapGetters } from 'vuex'

    export default {
        name: 'row-option',

        components: {
            buttonDeleteRow, heightRow, buttonSave, buttonCancel
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