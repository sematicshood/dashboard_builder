<template>
    <div id="button-changed">
        <font-awesome-icon icon="eye" @click="changed" v-if="type == 'edit'"/>
        <font-awesome-icon icon="edit" @click="changed" v-if="type == 'view'"/>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'button-changed',

        methods: {
            changed() {
                let typeChange = ''

                if(this.type == 'edit')
                    typeChange      = 'view'
                else
                    typeChange      = 'edit'

                this.$store.dispatch('workspace/setType', typeChange)

                this.$store.dispatch('style/changeSidebar')

                this.$store.dispatch('rows/save', false)

                this.$router.push({ name: 'dashboard', params: { name: this.name, type: typeChange } })

                this.$store.dispatch('rows/getSelectedFromServer', this.$route.params.name)
            },

            change(type) {
                if(type == 'edit')
                    return 'view'
                else
                    return 'edit'
            }
        },

        computed: {
            ...mapGetters('workspace', {
                type: 'getType',
                name: 'getName'
            })
        }
    }
</script>

<style>
    #button-changed * {
        margin-left: 0px;
    }
</style>
