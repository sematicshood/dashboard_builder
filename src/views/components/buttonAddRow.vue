<template>
    <div id="buttonAddRow" v-show="type == 'edit'">
        <b-btn v-b-modal.modalRow size="sm" variant="primary">Add Row</b-btn>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'button-add-row',

        computed: {
            ...mapGetters('workspace', {
                type: 'getType'
            })
        }
    }
</script>