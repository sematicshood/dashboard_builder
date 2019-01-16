<template>
    <div id="jenisColumn" v-if="colOptionShow && type == 'edit'">
        <b-form-group>
            <label class="label-form">Type Chart</label>
            <b-form-select v-model="selected" :options="all_options" size="sm" placeholder="Pilih jenis column"/>
        </b-form-group>
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex'

    export default {
        name: 'jenis-column',

        data() {
            return {
                all_options: ''
            }
        },

        watch: {
            width: {
                handler(val){
                    let show = this.options

                    if(val < 100) {
                        show = this.options.filter(sel => {
                                    return sel.value != 'pivot-table'
                                })
                    }

                    this.$data.all_options = show
                },
                deep: true
            },
        },

        computed: {
            ...mapGetters('rows', {
                options: 'getOptions',
                colOptionShow: 'getColOptionShow',
                rowOp: 'getRowOp',
                colOp: 'getColOp'
            }),

            ...mapGetters('workspace', {
                type: 'getType'
            }),

            ...mapState(['rows']),

            selected: {
                set(selected) {
                    this.$store.dispatch('rows/updateSelected', selected)
                },

                get() {
                    return this.rows.selected
                },
            },

            width: {
                get() {
                    return (this.rows.rows[this.rowOp]) ? this.rows.rows[this.rowOp][this.colOp]['width'] : 0
                },
            }
        },

        created() {
            this.$data.all_options = this.options
        }
    }
</script>