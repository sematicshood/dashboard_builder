<template>
    <div id="judulComponent" v-if="colOptionShow && type == 'edit'">
        <b-form-group>
            <label class="label-form">Title Chart</label>
            <b-form-input size="sm" type="text" v-model="title"
                        placeholder="Judul Column"/>    
        </b-form-group>
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex'

    export default {
        name: 'judul-component',

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

            title: {
                get() {
                    return this.rows.rows[this.rowOp][this.colOp]['title']
                },

                set(title) {
                    this.$store.dispatch('rows/setColumnTitle', title)
                }
            }
        }
    }
</script>