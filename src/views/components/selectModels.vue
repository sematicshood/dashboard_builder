<template>
    <div id="selectModels" v-if="type == 'edit'">
        <multiselect class="dropdownMultySelect sidebar-dropdown" v-model="value" :options="options" :custom-label="nameWithLang" placeholder="Select one" label="name" track-by="name" @select="action" size="sm"></multiselect>
        
        <ul>
            <li v-for="(select, i) in selected">
                <button @click="modelClick(select['id'], select['model'])"><span>{{ select['name'] }}</span> <span @click="remove(i)">x</span></button>
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

        data () {
            return {
                value: [],
                columns: [],
            }
        },
        methods: {
            nameWithLang ({ name, model, id }) {
                return `${name}`
            },
            action(value) {
                if(this.selected.indexOf(value) < 0)
                    this.$store.dispatch('data/addSelected', value)
            },
            remove(i) {
                this.$store.dispatch('data/removeSelected', i)
            },
            modelClick(id, model) {
                this.$store.dispatch('fields/getFields', id)
                    .then(res => {
                        this.$store.dispatch('rows/selectColumns', res)

                        this.$store.dispatch('rows/save', false)
                    })

                this.$store.dispatch('data/getDatas', model)
                    .then(res => {
                        this.$store.dispatch('data/selectData', {model, res})
                    })

                this.$store.dispatch('rows/selectModel', model)
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
        },
        created() {
            this.$store.dispatch('models/getModels')
                .then((res) => {
                    
                }),

            this.$store.dispatch('data/setSelected')           
        },
        computed: {
            ...mapGetters('workspace', {
                type: 'getType',
            }),

            ...mapGetters('data', {
                selected: 'getSelected'
            }),

            ...mapGetters('models', {
                options: 'getModels'
            }),
        },
    }
</script>