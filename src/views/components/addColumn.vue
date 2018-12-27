<template>
    <div id="addColumn">
        <b-modal id="modalColumn" 
                 centered 
                 :title="`Add New Column (max width ${ maxWidth })`" 
                 button-size="sm"
                 @ok="addColumnToRow">
            <b-form-input size="sm" type="number" min="0" :max="maxWidth" v-model="width"
                          placeholder="Lebar column dalam % (default 100%)"/>
            <br>
            <b-form-input size="sm" type="text" v-model="title"
                          placeholder="Judul Column"/>
            <br>
            <b-form-select v-model="selected" :options="options" size="sm" placeholder="Pilih jenis column"/>
        </b-modal>
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex'

    export default {
        name: 'add-column',

        data() {
            return {
                selected: ''
            }
        },

        methods: {
            addColumnToRow() {
                let width = 0,
                    row   = this.rowSelect

                if(this.width != '')
                    width = this.width
                else
                    width = this.maxWidth

                if(this.width > this.maxWidth)
                    width = this.maxWidth

                let column = {
                        width: width,
                        left: this.totalLeft,
                        title: this.title,
                        type: this.$data.selected,
                        titles: [],
                        columns: [],
                        data: []
                    }

                if(this.maxWidth != 0)
                    this.$store.dispatch('rows/updateRows', {row, column})
                else
                    alert('Lebar sudah maksimum, pindah ke row bawah')
            },
        },

        computed: {
            ...mapGetters('rows', {
                'totalLeft': 'getTotalLeft',
                'title': 'getTitle',
                'selected': 'getSelected',
                'options': 'getOptions',
                'width': 'getWidth',
                'maxWidth': 'getMaxWidth',
                'rowSelect': 'getRowSelect'
            }),

            ...mapState(['rows']),

            width: {
                set(width) {
                    this.$store.dispatch('rows/setWidth', width)
                },

                get() {
                    return this.rows.width
                }
            },

            title: {
                set(title) {
                    this.$store.dispatch('rows/setTitle', title)
                },

                get() {
                    return this.rows.title
                }
            },

            // selected: {
            //     set(selected) {
            //         this.$store.dispatch('rows/setSelected', selected)
            //     },

            //     get() {
            //         return this.rows.selected
            //     }
            // }
        }
    }
</script>