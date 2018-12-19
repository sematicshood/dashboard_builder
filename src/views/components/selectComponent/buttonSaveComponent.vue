<template>
    <div class="buttonSave" v-if="colOptionShow && type == 'edit'">
        <b-btn size="sm" 
                variant="primary" 
                @click="save()">Save</b-btn>
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