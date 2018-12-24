<template>
    <div class="buttonCancel" v-if="colOptionShow && type == 'edit'">
        <font-awesome-icon icon="undo" @click="loadTemplate()"/>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'button-cancel',

        methods: {
            loadTemplate() {
                this.$store.dispatch('rows/loadTemplate')
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

<style>
    .buttonCancel * {
        margin-left: 0 !important;
    }
</style>
