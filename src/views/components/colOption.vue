<template>
    <div id="colOption" v-if="colOptionShow && type == 'edit'">
        <judul-column/>
        <jenis-column/>

        <div class="col-md-12">
            <div class="col-md-3" style="display: inline-block; float: left;">
                <hr>
                <h4>Titles</h4>
                <hr>
                <titles-column/>
            </div>

            <div class="col-md-9" style="display: inline-block;">
                <hr>
                <h4>Fields</h4>
                <hr>
                <ul>
                    <fields-column/>
                </ul>
            </div>
        </div>

        <br><br>

        &nbsp;
        <button-save/>
        <button-delete-column/> &nbsp;
        <button-cancel/>
        <br><br>
        <br><br>
    </div>
</template>

<script>
    import judulColumn from './selectComponent/judulComponent.vue'
    import jenisColumn from './selectComponent/jenisColumnComponent.vue'
    import titlesColumn from './selectComponent/titlesComponent.vue'
    import fieldsColumn from './selectComponent/fieldsCompunent.vue'
    import buttonSave from './selectComponent/buttonSaveComponent.vue'
    import buttonDeleteColumn from './selectComponent/buttonDeleteComponent.vue'
    import buttonCancel from './selectComponent/buttonCancelComponent.vue'
    import { mapGetters, mapState } from 'vuex'

    export default {
        name: 'col-option',

        components: {
            judulColumn, jenisColumn, titlesColumn, fieldsColumn, buttonSave, buttonDeleteColumn, buttonCancel
        },

        computed: {
            ...mapGetters('workspace', {
               type: 'getType' 
            }),

            ...mapGetters('rows', {
                rows: 'getRows',
                rowOp: 'getRowOp',
                colOp: 'getColOp',
                options: 'getOptions',
                colOptionShow: 'getColOptionShow'
            }),

            ...mapGetters('workspace', {
                type: 'getType'
            }),
        }
    }
</script>