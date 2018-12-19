<template>
    <div id="gallery">           
        <!-- Navbar -->
        <b-navbar toggleable="md" type="light" variant="" class="studio-nav">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand href="#"><img src="../assets/semut.png" class="d-inline-block align-top logo" alt=""></b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

            <b-navbar-nav>
                <i class="fa-studio fa-file-text"></i>
                <b-nav-item-dropdown text="File" class="item-nav" left>
                    <b-dropdown-item href="#"><i class="fa fa-file" style="padding-right:15px;"></i>New File</b-dropdown-item>
                    <b-dropdown-item href="#"><i class="fa fa-folder-open" style="padding-right:15px;"></i>Open</b-dropdown-item>
                    <b-dropdown-item href="#"><i class="fa fa-save" style="padding-right:15px;"></i>Save</b-dropdown-item>
                </b-nav-item-dropdown>
                <!-- <i class="fa-studio fa-area-chart"></i>
                <b-nav-item-dropdown text="Chart" class="item-nav" left>
                    <b-dropdown-item href="#"><i class="fa fa-table" style="padding-right:15px;"></i>Table</b-dropdown-item>
                    <b-dropdown-item href="#"><i class="fa fa-bar-chart" style="padding-right:15px;"></i>Bar</b-dropdown-item>
                    <b-dropdown-item href="#"><i class="fa fa-line-chart" style="padding-right:15px;"></i>Line</b-dropdown-item>
                    <b-dropdown-item href="#"><i class="fa fa-pie-chart" style="padding-right:15px;"></i>Pie</b-dropdown-item>
                </b-nav-item-dropdown> -->
                <i class="fa-studio fa-upload"></i>
                <b-nav-item-dropdown text="Export" left>
                    <b-dropdown-item href="#"><i class="fa fa-file-excel-o" style="padding-right:15px;"></i>Excel</b-dropdown-item>
                    <b-dropdown-item href="#"><i class="fa fa-file-pdf-o" style="padding-right:15px;"></i>Pdf</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item></b-nav-item>
                <b-nav-item>
                    <router-link to="/"><b-button size="sm" variant="primary">Back</b-button></router-link>
                </b-nav-item>   
                <b-nav-item>
                    <button-changed></button-changed>    
                </b-nav-item> 
                <b-nav-item>
                    <button-save/>    
                </b-nav-item> 
                <b-nav-item>
                    <button-cancel/>
                </b-nav-item>
                <b-nav-item> </b-nav-item>
                <b-nav-item>
                    <input class="form-control input-sm input-nav" placeholder="Height" style="width: 75px; height: 31px">    
                </b-nav-item> 
                <b-nav-item>
                    <input class="form-control input-sm input-nav" placeholder="width" style="width: 75px; height: 31px">    
                </b-nav-item>
                <b-nav-item></b-nav-item> 
                <b-nav-item>
                    <p>Koneksi:</p>
                </b-nav-item>
                <b-nav-item>
                    <b-form-select size="sm">
                        <option>--Pilih--</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </b-form-select>                    
                </b-nav-item>
                <b-nav-item>
                    <button type="button" class="btn btn-sm btn-search-nav"><i class="fa fa-search"></i></button>
                </b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
            </b-navbar-nav>

        </b-collapse>
        </b-navbar>


        <b-row>
            <!-- Container -->
            <b-col cols="9" align-self="end">
                <b-row class="studio-container">
                    <b-col cols="12">
                        <b-container>   
                            <!-- <button-delete></button-delete>                          -->
                            <canvasWorkspace></canvasWorkspace>    
                        </b-container>
                    </b-col>                    
                </b-row>   
            </b-col>

            <!-- Sidebar -->
            <b-col cols="3" align-self="start" class="studio-side-bar">
                <b-card no-body class="contain-side-bar">
                    <b-tabs pills card class="tab-side-bar">
                        <b-tab title="Chart Options" active>
                            <div class="body-properties">
                                <b-form-group id="exampleInputGroup1"
                                    label="Title Chart:"
                                    label-for="exampleInput1">
                                        <judul-column/>
                                </b-form-group>
                                <b-form-group id="exampleInputGroup1"
                                    label="Type Chart:"
                                    label-for="exampleInput1">
                                        <jenis-column/>
                                </b-form-group>                                   
                            </div>
                        </b-tab>
                        <b-tab title="Model">
                            <div class="body-properties">
                                <selectModels></selectModels>
                            </div>            
                        </b-tab>
                        <b-tab title="Fields">
                            <div class="body-properties">
                                <ul>
                                    <fields-column/>
                                </ul>    
                            </div>
                        </b-tab>                        
                    </b-tabs>
                    <b-tabs pills card class="tab-side-bar">
                        <b-tab title="Titles" active>
                            <div class="body-properties">
                                <titles-column/>   
                            </div>    
                        </b-tab>
                        <b-tab title="Row">
                            <div class="body-properties">                              
                                <row-option></row-option>
                            </div>
                        </b-tab>
                        <b-tab title="Column">
                            <div class="body-properties">
                                <button-delete-column/>
                            </div>
                        </b-tab>
                    </b-tabs>
                </b-card>
            </b-col>
        </b-row>
    </div>       
</template>

<script>
    import selectModels from './components/selectModels.vue'
    import canvasWorkspace from './components/canvasWorkspace.vue'
    import buttonChanged from './components/buttonChanged.vue'
    import buttonDelete from './components/buttonDelete.vue'
    import rowOption from './components/rowOption.vue'
    import judulColumn from './components/selectComponent/judulComponent.vue'
    import jenisColumn from './components/selectComponent/jenisColumnComponent.vue'
    import titlesColumn from './components/selectComponent/titlesComponent.vue'
    import fieldsColumn from './components/selectComponent/fieldsCompunent.vue'
    import buttonSave from './components/selectComponent/buttonSaveComponent.vue'
    import buttonDeleteColumn from './components/selectComponent/buttonDeleteComponent.vue'
    import buttonCancel from './components/selectComponent/buttonCancelComponent.vue'
    import { Event } from '../event.js'
    import { mapGetters, mapState } from 'vuex'


    export default {
        name: 'dashboard',
        components: {
            selectModels, canvasWorkspace,  buttonChanged, buttonDelete, rowOption, judulColumn, jenisColumn, titlesColumn, fieldsColumn, buttonSave, buttonDeleteColumn, buttonCancel
        },
        
        data() {
            return {
                type: this.$route.params.type,
                name: this.$route.params.name
            }
        },

        created() {
            this.$store.dispatch('workspace/setType', this.$route.params.type),
            this.$store.dispatch('workspace/setName', this.$route.params.name)
        },
    }
</script>

<style>
    @import '../../public/style/gallery.css';
    @import '../../node_modules/vue-multiselect/dist/vue-multiselect.min.css';
</style>
