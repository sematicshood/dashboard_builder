<template>
    <div id="heightRow" v-if="rowOptionShow && type == 'edit'">
         <b-form-input size="sm" type="text" v-model="rows[rowOp][0]['height']"
                        placeholder="Tinggi row dalam px (default 300px)"/>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'height-row',

        computed: {
            ...mapGetters('rows', {
                rows: 'getRows',
                rowOptionShow: 'getRowOptionShow',
                rowOp: 'getRowOp'
            }),

            ...mapGetters('workspace', {
                type: 'getType'
            })
        }
    }
</script>