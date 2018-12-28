<template>
    <div id="heightRow" v-if="colOptionShow && type == 'edit'">
        <b-form-group>
            <label  class="label-form">Tinggi Row</label>
            <b-form-input size="sm" type="text" v-model="rows[rowOp][0]['height']"
                        placeholder="Tinggi row dalam px (default 300px)"/>
        </b-form-group>
         
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
                rowOp: 'getRowOp',
                colOptionShow: 'getColOptionShow'
            }),

            ...mapGetters('workspace', {
                type: 'getType'
            })
        }
    }
</script>