<template>
    <div id="selectModels">
        <multiselect v-model="value" :options="options" :custom-label="nameWithLang" placeholder="Select one" label="name" track-by="name" @select="action"></multiselect>

        <ul>
            <li v-for="(select, i) in selected">
                <button @click="modelClick(select['id'], select['model'])" v-text="select['name']"></button> <button @click="remove(i)">x</button>
            </li>
        </ul>

        <hr>
        <h4>Fields</h4>
        <hr>
        <ul>
            <li v-for="column in columns">
                <button v-text="column['name']" @click="addTitle(column['name'])"></button>
            </li>
        </ul>

        <data-tables-server :data="data" :total="total" :loading="loading" :pagination-props="{ pageSizes: [5, 10, 15] }">
            <el-table-column v-for="title in titles" :prop="title.prop" :label="title.label" :key="title.label">
            </el-table-column>
        </data-tables-server>
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
                columns: [],

                data: [],
                titles: [],
                loading: false,
                total: 0,
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
            modelClick(id, model) {
                this.$store.dispatch('fields/getFields', id)
                    .then(res => {
                        this.$data.columns = res
                    })

                this.$store.dispatch('data/getDatas', model)
                    .then(res => {
                        console.log(res)
                        this.$data.data = res
                    })
            },
            inArray(needle, haystack) {
                var length = haystack.length;
                for(var i = 0; i < length; i++) {
                    if(haystack[i].prop == needle) return true;
                }
                return false;
            },
            addTitle(field) {
                if(this.inArray(field, this.$data.titles) == false) {
                    this.$data.titles.push({
                        prop: field,
                        label: field
                    })
                }
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