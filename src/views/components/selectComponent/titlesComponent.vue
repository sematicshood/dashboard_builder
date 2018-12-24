<template>
    <div id="titles" v-if="colOptionShow && type == 'edit'">
        <draggable element="span" v-model="rows[rowOp][colOp]['titles']">
            <transition-group name="no" class="list-group" tag="ul">
                <li v-for="(element, index) in rows[rowOp][colOp]['titles']" :key="element.prop">
                    <button><span>{{element.label}}</span> <span @click="removeTitle(index)">x</span></button>
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