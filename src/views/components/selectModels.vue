<template>
    <div id="selectModels">
        <multiselect v-model="value" :options="options" :custom-label="nameWithLang" placeholder="Select one" label="name" track-by="name" @select="action"></multiselect>

        <ul>
            <li v-for="(select, i) in selected" style="display: inline-block;">
                <br/>
                <br/>
                <button  class="btn-primary btn-sm" @click="modelClick(select['id'], select['model'])" v-text="select['name']"></button> <button class="btn-primary btn-sm" @click="remove(i)">x</button> &nbsp; &nbsp;
                <br/>
                <br/>
            </li>
        </ul>

        <!-- <hr>
        <h4>Fields</h4>
        <hr>
        <ul>
            <li v-for="column in columns" style="display: inline-block;">
                <button class="btn-primary btn-sm" v-text="column['name']" @click="addTitle(column['name'])"></button> &nbsp;
                <br/>
                <br/>
            </li>
        </ul> -->
        <!-- <div class="col-md-3" style="display:inline-block;">
            <h3>Titles</h3>
            <draggable element="span" v-model="titles" :move="onMove" :options="dragOptions">
                <transition-group name="no" class="list-group" tag="ul">
                    <li class="list-group-item" v-for="(element, index) in titles" :key="element.prop">
                        {{element.label}}

                        <button @click="removeTitle(index)">x</button>
                    </li>
                </transition-group>
            </draggable>
        </div> -->
    </div>
</template>

<script>
    import Multiselect from 'vue-multiselect'
    import draggable from 'vuedraggable'
    import { Event } from '../../event.js'

    export default {
        name: 'selectModels',
        components: {
            Multiselect, draggable
        },

        props: [
            'vuedata', 'vuetitles', 'vueloading', 'vuetotal',
        ],

        data () {
            return {
                value: [],
                options: [],
                selected: [],
                columns: [],
                data: this.vuedata,
                titles: this.vuetitles,
                loading: this.vueloading,
                total: this.vuetotal,
            }
        },
        methods: {
            nameWithLang ({ name, model, id }) {
                return `${name}`
            },
            action(value) {
                if(this.$data.selected.indexOf(value) < 0)
                    this.$data.selected.push(value)

                this.save()
            },
            remove(i) {
                this.$data.selected.splice(i, 1)

                this.save()
            },
            modelClick(id, model) {
                this.$store.dispatch('fields/getFields', id)
                    .then(res => {
                        this.$data.columns = res

                        Event.$emit('selectColumns', res)
                    })

                this.$store.dispatch('data/getDatas', model)
                    .then(res => {
                        this.$data.data[model] = res

                        Event.$emit('selectData', {model, res})
                    })

                Event.$emit('selectModel', model)
            },
            inArray(needle, haystack) {
                var length = haystack.length;
                for(var i = 0; i < length; i++) {
                    if(haystack[i].prop == needle) return true;
                }
                return false;
            },
            onMove({ relatedContext, draggedContext }) {
                const relatedElement = relatedContext.element;
                const draggedElement = draggedContext.element;
            },
            loadModels() {
                this.$data.selected = JSON.parse(localStorage.getItem('models')) || []
            },

            save() {
                localStorage.setItem('models', JSON.stringify(this.$data.selected))
            }
        },
        created() {
            this.$store.dispatch('models/getModels')
                .then((res) => {
                    this.$data.options = res
                }),

            this.loadModels()            
        },
        computed: {
            dragOptions() {
                return {
                    animation: 0,
                    group: "description",
                    // disabled: !this.editable,
                    ghostClass: "ghost"
                };
            },
        }
    }
</script>