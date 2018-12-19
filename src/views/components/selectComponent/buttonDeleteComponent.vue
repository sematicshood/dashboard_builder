<template>
    <div class="buttonDelete" v-if="colOptionShow && type == 'edit'">
        <b-btn size="sm" 
                variant="danger" 
                @click="deleteColumn()">Delete Column</b-btn>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'button-delete',

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