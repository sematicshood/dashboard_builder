<template>
    <div id="selectModels">
        <multiselect v-model="value" :options="options" :custom-label="nameWithLang" placeholder="Select one" label="name" track-by="name" @select="action"></multiselect>

        <ul>
            <li v-for="(select, i) in selected">
                <button @click="modelClick(select['id'])" v-text="select['name']"></button> <button @click="remove(i)">x</button>
            </li>
        </ul>

        <hr>
        <h4>Fields</h4>
        <hr>
        <ul>
            <li v-for="column in columns" v-text="column['name']"></li>
        </ul>
    </div>
</template>

<script>
    import Multiselect from 'vue-multiselect'

    export default {
        name: 'selectModels',
        components: {
            Multiselect
        },
        data () {
            return {
                value: [],
                options: [],
                selected: [],
                columns: []
            }
        },
        methods: {
            nameWithLang ({ name, model, id }) {
                return `${name}`
            },
            action(value) {
                if(this.$data.selected.indexOf(value) < 0)
                    this.$data.selected.push(value)
            },
            remove(i) {
                this.$data.selected.splice(i, 1)
            },
            modelClick(id) {
                this.$store.dispatch('fields/getFields', id)
                    .then(res => {
                        this.$data.columns = res
                    })
            }
        },
        created() {
            this.$store.dispatch('models/getModels')
                .then((res) => {
                    this.$data.options = res
                })
        }
    }
</script>