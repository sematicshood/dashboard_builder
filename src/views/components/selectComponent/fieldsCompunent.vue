<template>
    <div id="fields" v-if="colOptionShow">
        <b-form-group>
            <label class="label-form">Select Field</label> 
            <select type="option" v-model="val" @change="addTitle(val)" class="custom-select custom-select-sm">
                <option v-for="column in columns" :key="column.id" :value="column">
                    <button @click="addTitle(column['name'], column['field_description'], column['ttype'])"><span>{{ column['field_description'] }}</span></button>
                </option>
            </select>
        </b-form-group>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'fields-column',
        data() {
            return {
                val: [],
            }
        },

        computed: {
            ...mapGetters('rows', {
                rows: 'getRows',
                rowOp: 'getRowOp',
                colOp: 'getColOp',
                colOptionShow: 'getColOptionShow',
                columns: 'getColumns'
            }),

            ...mapGetters('workspace', {
                type: 'getType'
            }),
        },

        methods: {
            addTitle(column) {
                this.$store.dispatch('rows/addTitle', {prop: column.name, label: column.field_description, type: column.ttype})
            },

            nameWithLang ({ name, field_description }) {
                return `${name} - ${ field_description }`
            },
        }
    }
</script>