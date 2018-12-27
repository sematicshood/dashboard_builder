<template>
    <div id="fields" v-if="colOptionShow">
        <!-- <multiselect v-model="val" :options="rows[rowOp][colOp]['columns']" :custom-label="nameWithLang" placeholder="Select one" label="name" track-by="name" @select="action"></multiselect> -->
        <b-form-group>
            <label class="label-form">Select Field</label> 
            <select type="option" v-model="val" @change="addTitle(val)" class="custom-select custom-select-sm">
                <option v-for="column in rows[rowOp][colOp]['columns']" :value="column">
                    <button @click="addTitle(column['name'], column['field_description'], column['ttype'])"><span>{{ column['field_description'] }}</span></button>
                </option>
            </select>
        </b-form-group>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Multiselect from 'vue-multiselect'

    export default {
        name: 'fields-column',

        components: {
            Multiselect
        },

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
                colOptionShow: 'getColOptionShow'
            }),

            ...mapGetters('workspace', {
                type: 'getType'
            }),
        },

        created() {
            this.$data.options = this.rows[(this.rowOp) ? this.rowOp : 0][(this.colOp) ? this.colOp : 0]['columns']
        },

        methods: {
            addTitle(column) {
                this.$store.dispatch('rows/addTitle', {prop: column.name, label: column.field_description, type: column.ttype})
            },

            action() {
                console.log('halloo')
            },
            nameWithLang ({ name, field_description, id }) {
                return `${name} - ${ field_description }`
            },
        }
    }
</script>