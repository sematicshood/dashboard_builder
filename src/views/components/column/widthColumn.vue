<template>
    <div id="widthColumn">
        {{ width }}
        <input class="form-control" type="number" v-model="width" placeholder="Width column"/>
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex'

    export default {
        name: 'width-column',

        computed: {
            ...mapState(['rows']),

            ...mapGetters('rows', {
                row: 'getRowOp',
                col: 'getColOp'
            }),

            width: {
                get() {
                    let row     = (state.rowOp != '') ? state.rowOp : 0,
                        column  = (state.colOp != '') ? state.colOp : 1

                    this.rows.rows[row][col]['width']
                }
            }
        }
    }
</script>
