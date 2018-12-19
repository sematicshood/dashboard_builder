<template>
    <div id="fields" v-if="colOptionShow && type == 'edit'">
        <li v-for="column in rows[rowOp][colOp]['columns']" style="display: inline-block;">
            <button class="btn-primary btn-sm" v-text="column['field_description']" @click="addTitle(column['name'], column['field_description'])"></button> &nbsp;
        </li>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'fields-column',

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

        methods: {
            addTitle(field, label) {
                this.$store.dispatch('rows/addTitle', {prop: field,label: label})
            },
        }
    }
</script>