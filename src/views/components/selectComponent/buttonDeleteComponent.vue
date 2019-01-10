<template>
    <div class="buttonDelete" v-if="colOptionShow && type == 'edit'">
        <b-btn size="sm" 
                class="form-control"
                variant="sidebar" 
                @click="deleteColumn()">Delete Chart</b-btn>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'button-delete-column',

        methods: {
            deleteColumn() {
                this.$store.dispatch('rows/deleteColumn')
            },
        },

        computed: {
            ...mapGetters('workspace', {
                type: 'getType'
            }),

            ...mapGetters('rows', {
                colOptionShow: 'getColOptionShow'
            }),
        }
    }
</script>