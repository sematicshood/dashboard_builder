<template>
    <div id="judulComponent" v-if="colOptionShow && type == 'edit'">
        <b-form-input size="sm" type="text" v-model="rows[rowOp][colOp]['title']"
                        placeholder="Judul Column"/>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'judul-component',

        computed: {
            ...mapGetters('rows', {
                rows: 'getRows',
                rowOp: 'getRowOp',
                colOp: 'getColOp',
                colOptionShow: 'getColOptionShow'
            }),

            ...mapGetters('workspace', {
                type: 'getType'
            }),
        }
    }
</script>