<template>
    <div id="widthColumn" v-if="colOptionShow && type == 'edit'">
        <b-form-group>
            <label class="label-form">Width Chart</label>
            <b-form-input size="sm" type="number" v-model="width"
                        placeholder="Width Column"/>    
        </b-form-group>
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex'

    export default {
        name: 'width-column',

        computed: {
            ...mapState(['rows']),

            ...mapGetters('rows', {
                rowOp: 'getRowOp',
                colOp: 'getColOp',
                colOptionShow: 'getColOptionShow'
            }),

            ...mapGetters('workspace', {
                type: 'getType'
            }),

            width: {
                get() {
                    return this.rows.rows[this.rowOp][this.colOp]['width']
                },

                set(width) {
                    this.$store.dispatch('rows/setColumnWidth', width)
                }
            }
        }
    }
</script>
