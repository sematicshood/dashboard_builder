<template>
    <div id="button-changed">
        <b-btn size="sm" variant="primary" @click="changed" v-text="change(type)"></b-btn>
    </div>
</template>

<script>
    import { Event } from '../../event.js'
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

                this.$router.push({ name: 'dashboard', params: { name: this.name, type: typeChange } })
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