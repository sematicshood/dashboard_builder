<template>
    <div id="colOption" v-if="colOptionShow && type == 'edit'">
        <judul-column/>
        <jenis-column/>

        <div class="col-md-12">
            <div class="col-md-3" style="display: inline-block; float: left;">
               
            </div>

            <div class="col-md-9" style="display: inline-block;">
                
            </div>
        </div>

        <br><br>

        &nbsp;
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