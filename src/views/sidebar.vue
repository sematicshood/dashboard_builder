<template>
    <div class="col-md-2" id="sidebar">
        <div class="option-side">
            <div :class="{'s-side': true, 's-active': database}" @click="changeDatabase">
                <font-awesome-icon icon="database"/>
            </div>
            <div :class="{'s-side': true, 's-actived': style}" @click="changeStyle">
                <font-awesome-icon icon="stream"/>
            </div>
        </div>

        <div class="content-side">
            <div id="database-view" v-show="database">
                <div class="content-view">
                    <div class="select-m">
                        <div class="title-view">
                            <h6>Models</h6>
                        </div>
                        <div class="content-sidebar-view">
                            <b-form-group>
                                <label class="label-form">Select Module</label>
                                <category-component/>
                            </b-form-group>
                            <b-form-group>
                                <label class="label-form">Select Model</label>
                                <select-models></select-models>
                            </b-form-group>
                        </div>
                    </div>
                    <div class="select-f">
                        <div class="title-view">
                            <h6>Fields</h6>
                        </div>
                        <div class="content-sidebar-view">
                            <fields-column></fields-column>                                      
                            <titles-column></titles-column>
                        </div>
                    </div>
                </div>
            </div>

            <div id="style-view" v-show="style">
                <div class="content-view">
                    <div class="select-m">
                        <div class="title-view">
                            <h6>Chart Style</h6>
                        </div>
                        <div class="style-content-sidebar">
                            <judul-column/>
                            <jenis-column/>
                            <width-column/>                            
                            <collapse-option/>
                            <button-delete-component/>
                        </div>                    
                    </div>

                    <div class="select-m">
                        <div class="title-view">
                            <h6>Row Style</h6>
                        </div>
                        <div class="style-content-sidebar">
                            <height-row/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import heightRow from './components/rowComponent/heightRow.vue'
    import selectModels from './components/selectModels.vue'
    import titlesColumn from './components/selectComponent/titlesComponent.vue'
    import fieldsColumn from './components/selectComponent/fieldsCompunent.vue'
    import judulColumn from './components/selectComponent/judulComponent.vue'
    import jenisColumn from './components/selectComponent/jenisColumnComponent.vue'
    import widthColumn from './components/column/widthColumn.vue'
    import categoryComponent from './components/categoryComponent.vue'
    import buttonDeleteComponent from './components/selectComponent/buttonDeleteComponent.vue'
    import collapseOption from './components/column/collapseOption.vue'

    export default {
        name: 'sidebar',

        components: {
            selectModels, titlesColumn, fieldsColumn, judulColumn, jenisColumn, categoryComponent, heightRow, widthColumn, buttonDeleteComponent, collapseOption
        },
        
        computed: {
            ...mapGetters('style', {
                database: 'getDatabase',
                style: 'getStyle'
            })
        },

        methods: {
            changeDatabase() {
                this.$store.dispatch('style/changeDatabase')
            },
            changeStyle() {
                this.$store.dispatch('style/changeStyle')
            }
        }
    }
</script>

<style>
    @import '../../public/style/sidebar.css';
</style>
