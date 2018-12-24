<template>
    <div id="buttonAddRow" v-show="type == 'edit'">
        <font-awesome-icon v-b-modal.modalRow icon="plus"/>
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