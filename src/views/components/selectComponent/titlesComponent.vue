<template>
    <div id="titles" v-if="colOptionShow && type == 'edit'">
        <draggable element="span" v-model="titles">
            <transition-group name="no" class="list-group" tag="ul">
                <li v-for="(element, index) in titles" :key="element.prop">
                    <button><span>{{element.label}}</span> <span @click="removeTitle(index)">x</span></button>
                </li>
            </transition-group>
        </draggable>
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex'
    import draggable from 'vuedraggable'

    export default {
        name: 'titles-component',

        components: {
            draggable
        },

        computed: {
            ...mapGetters('rows', {
                rowOp: 'getRowOp',
                colOp: 'getColOp',
                colOptionShow: 'getColOptionShow'
            }),

            ...mapGetters('workspace', {
                type: 'getType'
            }),

            ...mapState(['rows']),

            titles: {
                get() {
                    let row     = (this.rowOp != '') ? this.rowOp : 0,
                        column  = (this.colOp != '') ? this.colOp : 0
                    
                    return this.rows.rows[row][column]['titles']
                },

                set(titles) {
                    this.$store.dispatch('rows/setTitlesColumn', titles)
                }
            }
        },

        methods: {
            removeTitle(index) {
                this.$store.dispatch('rows/removeTitle', index)
            },
        }
    }
</script>