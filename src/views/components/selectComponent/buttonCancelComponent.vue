<template>
    <div class="buttonCancel" v-if="colOptionShow && type == 'edit'">
        <button class="btn btn-primary btn-sm" 
                variant="warning" 
                @click="loadTemplate()">Cancel</button>
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