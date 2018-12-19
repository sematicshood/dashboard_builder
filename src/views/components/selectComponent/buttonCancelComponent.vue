<template>
    <div class="buttonCancel" v-if="colOptionShow && type == 'edit'">
        <b-btn size="sm" 
                variant="warning" 
                @click="loadTemplate()">Cancel</b-btn>
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