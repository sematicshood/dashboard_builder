<template>
    <div id="jenisColumn" v-if="colOptionShow && type == 'edit'">
        <b-form-group>
            <label class="label-form">Type Chart</label>
            <b-form-select v-model="selected" :options="options" size="sm" placeholder="Pilih jenis column"/>
        </b-form-group>
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex'

    export default {
        name: 'jenis-column',

        computed: {
            ...mapGetters('rows', {
                options: 'getOptions',
                colOptionShow: 'getColOptionShow'
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
                }
            },
        }
    }
</script>