<template>
    <div id="rename">
        <b-modal :id="dashboard" 
                 centered 
                 title="Rename Dashboard" 
                 button-size="sm"
                 @ok="rename">
            <b-form-input size="sm" type="text" v-model="name"/>
        </b-modal>
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex'

    export default {
        name: 'rename',

        data() {
            return {
                name: this.dashboard.split('-').splice(2).join(' ')
            }
        },

        methods: {
            rename() {
                this.$store.dispatch('workspace/renameDashboard', {
                    name: this.$data.name,
                    template: this.dashboard
                })
            }
        },

        props: ['dashboard'],
    }
</script>