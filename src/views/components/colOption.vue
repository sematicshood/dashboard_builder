<template>
    <div id="colOption" v-if="colOptionShow && type == 'edit'">
        <b-form-input size="sm" type="text" v-model="rows['rows'][rowOp][colOp]['title']"
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
                <draggable element="span" v-model="rows['rows'][rowOp][colOp]['titles']">
                    <transition-group name="no" class="list-group" tag="ul">
                        <li class="list-group-item" v-for="(element, index) in rows['rows'][rowOp][colOp]['titles']" :key="element.prop">
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
                    <li v-for="column in rows['rows'][rowOp][colOp]['columns']" style="display: inline-block;">
                        <button class="btn-primary btn-sm" v-text="column['name']" @click="addTitle(column['name'])"></button> &nbsp;
                        <br/>
                        <br/>
                    </li>
                </ul>
            </div>
        </div>

        <br><br>

        <b-btn v-show="type == 'edit'" size="sm" 
                variant="primary" 
                @click="save()">Save</b-btn> &nbsp;
        <b-btn v-show="type == 'edit'" size="sm" 
                variant="danger" 
                @click="deleteColumn(rowOp, colOp)">Delete Column</b-btn> &nbsp;
        <b-btn v-show="type == 'edit'" size="sm" 
                variant="warning" 
                @click="loadTemplate()">Cancel</b-btn>
        <br><br>
        <br><br>
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex'
    import draggable from 'vuedraggable'

    export default {
        name: 'col-option',

        components: {
            draggable
        },

        methods: {
            deleteColumn(rowOp, colOp) {
                this.$store.dispatch('rows/deleteColumn')
            },

            loadTemplate() {
                this.$store.dispatch('rows/loadTemplate')
            },

            save() {
                this.$store.dispatch('rows/save')
            }
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

            ...mapState(['rows']),

            selected: {
                set(selected) {
                    this.$store.dispatch('rows/setSelected', selected)
                },

                get() {
                    return this.rows.selected
                }
            },
        }
    }
</script>