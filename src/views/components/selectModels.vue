<template>
    <div id="selectModels" v-if="type == 'edit'">
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
    </div>
</template>

<script>
    import Multiselect from 'vue-multiselect'
    import draggable from 'vuedraggable'
    import { Event } from '../../event.js'
    import { mapGetters } from 'vuex'

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

                        this.$store.dispatch('rows/selectColumns', res)
                    })

                this.$store.dispatch('data/getDatas', model)
                    .then(res => {
                        this.$store.dispatch('data/selectData', {model, res})
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
            ...mapGetters('workspace', {
                type: 'getType',
            })
        }
    }
</script>