<template>
    <div id="titles" v-if="colOptionShow && type == 'edit'">
        <draggable element="span" v-model="rows[rowOp][colOp]['titles']">
            <transition-group name="no" class="list-group" tag="ul">
                <li class="list-group-item" v-for="(element, index) in rows[rowOp][colOp]['titles']" :key="element.prop">
                    {{element.label}}

                    <button @click="removeTitle(index)">x</button>
                </li>
            </transition-group>
        </draggable>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import draggable from 'vuedraggable'

    export default {
        name: 'titles-component',

        components: {
            draggable
        },

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
        },

        methods: {
            removeTitle(index) {
                this.$store.dispatch('rows/removeTitle', index)
            },
        }
    }
</script>