<template>
    <div class="buttonSave" v-if="colOptionShow && type == 'edit'">
        <font-awesome-icon icon="save" @click="save()"/>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'button-save',

        methods: {
            save() {
                this.$store.dispatch('rows/save')
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
    .buttonSave * {
        margin-left: 0 !important;
    }
</style>
