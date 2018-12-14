<template>
    <div id="canvas">
        <div id="rowOption" v-if="rowOptionShow">
            <b-btn size="sm" 
                   variant="warning" 
                   @click="deleteRow(rowOp)">Hapus Row</b-btn>
            <br><br>
            <b-form-input size="sm" type="text" v-model="rows[rowOp][0]['height']"
                          placeholder="Tinggi row dalam px (default 300px)"/>
            <br>
            <b-btn size="sm" 
                   variant="danger" 
                   @click="save()">Save</b-btn> &nbsp;
            <b-btn size="sm" 
                   variant="danger" 
                   @click="loadTemplate()">Cancel</b-btn>

            <br><br>
            <br><br>
        </div>

        <div id="colOption" v-if="colOptionShow">
            <b-form-input size="sm" type="text" v-model="rows[rowOp][colOp]['title']"
                          placeholder="Judul Column"/>
            <br/>
            <b-form-select v-model="selected" :options="options" size="sm" placeholder="Pilih jenis column"/>
            <br/>
            <br/>

            <div class="col-md-12">
                <div class="col-md-3" style="display: inline-block; float: left;">
                    <hr>
                    <h4>Titles</h4>
                    <hr>
                    <draggable element="span" v-model="rows[rowOp][colOp]['titles']">
                        <transition-group name="no" class="list-group" tag="ul">
                            <li class="list-group-item" v-for="(element, index) in rows[rowOp][colOp]['titles']" :key="element.prop">
                                {{element.label}}

                                <button @click="removeTitle(index)">x</button>
                            </li>
                        </transition-group>
                    </draggable>
                </div>

                <div class="col-md-9" style="display: inline-block;">
                    <hr>
                    <h4>Fields</h4>
                    <hr>
                    <ul>
                        <li v-for="column in rows[rowOp][colOp]['columns']" style="display: inline-block;">
                            <button class="btn-primary btn-sm" v-text="column['name']" @click="addTitle(column['name'])"></button> &nbsp;
                            <br/>
                            <br/>
                        </li>
                    </ul>
                </div>
            </div>

            <br><br>

            <b-btn size="sm" 
                   variant="primary" 
                   @click="save()">Save</b-btn> &nbsp;
            <b-btn size="sm" 
                   variant="danger" 
                   @click="deleteColumn(rowOp, colOp)">Delete Column</b-btn> &nbsp;
            <b-btn size="sm" 
                   variant="warning" 
                   @click="loadTemplate()">Cancel</b-btn>
            <br><br>
            <br><br>
        </div>

        <div v-for="(row, index) in rows">
            <b-btn v-b-modal.modalColumn
                   size="sm" 
                   variant="danger" 
                   @click="addColumn(index)">Add Column</b-btn>
            <b-btn size="sm" 
                   variant="primary" 
                   style="margin-left: 10px;"
                   @click="rowOption(index)">Row Option</b-btn>

            <div class="rows" :style="`height: ${ row[0]['height'] }px`">
                <div v-for="(column, indexes) in rows[index]" class="column"
                    :style="`width: ${column['width']}%; left: ${column['left']}%;`"
                    @click="colOption(index, indexes)" v-if="indexes != 0">

                    <h5 v-text="column['title']"></h5>

                    <el-table max-height="250" v-if="column['type'] == 'table'" :data="data[column['model']]" :total="total" :loading="loading" :pagination-props="{ pageSizes: [5, 10, 15] }" :load-data="loadData" :summary-method="getSummaries" show-summary>
                        <el-table-column
                        type="index"
                        fixed sortable
                        :index="indexMethod" width="50">
                        </el-table-column>

                        <el-table-column fixed sortable v-for="t in column['titles']" :prop="t.prop" :label="t.label" :key="t.label">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>

        <b-btn v-b-modal.modalRow size="sm" variant="primary">Add Row</b-btn>

        <!-- Modal Component -->
        <b-modal id="modalRow" 
                 centered 
                 title="Add New Row" 
                 button-size="sm"
                 @ok="addRow">
            <b-form-input size="sm" type="number" v-model="height"
                          placeholder="Tinggi row dalam px (default 300px)"/>
        </b-modal>

        <b-modal id="modalColumn" 
                 centered 
                 :title="`Add New Column (max width ${ maxWidth })`" 
                 button-size="sm"
                 @ok="addColumnToRow">
            <b-form-input size="sm" type="number" min="0" :max="maxWidth" v-model="width"
                          placeholder="Lebar column dalam % (default 100%)"/>
            <br>
            <b-form-input size="sm" type="text" v-model="title"
                          placeholder="Judul Column"/>
            <br>
            <b-form-select v-model="selected" :options="options" size="sm" placeholder="Pilih jenis column"/>
        </b-modal>
    </div>
</template>

<script>
    import { Event } from '../../event.js'
    import draggable from 'vuedraggable'

    export default {
        name: 'canvasWorkspace',

        components: {
            draggable
        },

        props: [
            'vuedata', 'vuetitles', 'vueloading', 'vuetotal',
        ],

        data() {
            return {
                rows: [],
                rowSelect: '',

                height: '',
                width: '',
                maxWidth: '',
                totalLeft: '',
                selected: '',
                options: [
                    { value: 'table', text: 'table' }
                ],

                rowOp: '',
                rowOptionShow: false,
                colOp: '',
                colOptionShow: false,

                title: '',
                data: this.vuedata,
                titles: this.vuetitles,
                loading: this.vueloading,
                total: this.vuetotal,

                isLoad: false,
                models: []
            }
        },

        methods: {
            addRow() {
                let height = 0

                if(this.$data.height != '')
                    height = this.$data.height
                else
                    height = 300

                let row = [{
                    height: height
                }]

                this.$data.rows.push(row)

                this.save()
                this.reset()
            },
            addColumn(row) {
                this.$data.rowSelect = row
                let totalWidth       = 100,
                    totalLeft        = 0

                this.$data.rows[row].forEach(val => {
                    if(parseInt(val['width'])) {
                        totalWidth -= parseInt(val['width'])
                        totalLeft += parseInt(val['width'])
                    }
                });

                this.$data.maxWidth = totalWidth
                this.$data.totalLeft = totalLeft
            },
            addColumnToRow() {
                let width = 0,
                    row   = this.$data.rowSelect

                if(this.$data.width != '')
                    width = this.$data.width
                else
                    width = this.$data.maxWidth

                if(this.$data.width > this.$data.maxWidth)
                    width = this.$data.maxWidth

                let column = {
                        width: width,
                        left: this.$data.totalLeft,
                        title: this.$data.title,
                        type: this.$data.selected,
                        titles: [],
                        columns: []
                    }

                if(this.$data.maxWidth != 0)
                    this.$data.rows[row].push(column)
                else
                    alert('Lebar sudah maksimum, pindah ke row bawah')

                this.save()

                this.reset()
            },

            reset(all = true) {
                this.$data.rowSelect    = ''
                this.$data.width        = ''
                this.$data.height       = ''
                this.$data.selected     = ''

                if(all) {
                    this.$data.rowOp         = ''
                    this.$data.rowOptionShow = false
                    this.$data.colOp         = ''
                    this.$data.colOptionShow = false
                }
            },

            save(all = true) {
                localStorage.setItem('template', JSON.stringify(this.$data.rows))

                this.reset(all)
            },

            rowOption(index) {
                this.$data.rowOp = index
                this.$data.rowOptionShow = true
            },

            colOption(index, indexes) {
                this.$data.rowOp            = index
                this.$data.colOp            = indexes
                this.$data.colOptionShow    = true
                this.$data.selected         = this.$data.rows[index][indexes]['type']
            },

            deleteRow(index) {
                this.$data.rows.splice(index, 1)

                this.reset()
                this.save()
            },

            deleteColumn(index, indexes) {
                let width   =   this.$data.rows[index][indexes]['width']

                this.$data.rows[index].forEach((element, index) => {
                    let ori = element['left']
                    if(index != 0 && index != indexes) {
                        if(element['left'] - width >= 0) {
                            element['left'] -= width
                        } else {
                            element['left'] = ori
                        }
                    }
                });

                this.$data.rows[index].splice(indexes, 1)

                this.reset()
                this.save()
            },

            loadTemplate() {
                this.$data.rows = JSON.parse(localStorage.getItem('template')) || []

                this.reset()
            },

            cekColRow() {
                return this.$data.rowOp.length == undefined && this.$data.colOp.length == undefined
            },

            inArray(needle, haystack) {
                var length = haystack.length;
                for(var i = 0; i < length; i++) {
                    if(haystack[i] == needle) return true;
                }
                return false;
            },

            loadData() {
                let models = this.$data.models
                
                this.$data.rows.forEach(element => {
                    for (let index = 0; index < element.length; index++) {
                        if(index != 0) {
                            let model = element[index]['model']

                            if(this.inArray(model, models) == false) {
                                models.push(model)
                            }
                        }
                    }
                });

                models.forEach(model => {
                    this.$store.dispatch('data/getDatas', model)
                        .then(res => {
                            this.$data.data[model] = res
                        })
                });
            },

            addTitle(field) {
                Event.$emit('selectField', {prop: field,label: field})
            },
            
            removeTitle(index) {
                if (this.cekColRow()) {
                    this.$data.rows[this.$data.rowOp][this.$data.colOp]['titles'].splice(index, 1)
                }
            },

            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = 'Total';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                    const value = Number(curr);
                    if (!isNaN(value)) {
                        return prev + curr;
                    } else {
                        return prev;
                    }
                    }, 0);
                } else {
                    sums[index] = 'N/A';
                }
                });

                return sums;
            },

            indexMethod(index) {
                return index += 1;
            }
        },

        created() {
            this.loadTemplate(),

            this.loadData(),

            Event.$on('selectModel', (model) => {
                if (this.cekColRow())
                    this.$data.rows[this.$data.rowOp][this.$data.colOp]['model'] = model

                this.save(false)
            }),

            Event.$on('selectField', (fields) => {
                if (this.cekColRow()) {
                    if (this.$data.rows[this.$data.rowOp][this.$data.colOp]['titles'] == undefined) {
                        this.$data.rows[this.$data.rowOp][this.$data.colOp]['titles'] = []
                    }

                    this.$data.rows[this.$data.rowOp][this.$data.colOp]['titles'].push(fields)
                }

                this.save(false)
            }),

            Event.$on('selectColumns', (columns) => {
                if (this.cekColRow()) {
                    this.$data.rows[this.$data.rowOp][this.$data.colOp]['columns'] = columns
                }

                this.save(false)
            })
        },
    }
</script>

<style>
    @import '../../../public/style/canvas.css'
</style>
