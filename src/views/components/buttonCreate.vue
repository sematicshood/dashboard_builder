<template>
    <div id="buttonCreate">
        <b-btn v-b-modal.create size="sm" variant="primary">Create New Dashboard</b-btn>

        <b-modal id="create" 
                centered 
                title="Create New Dashboard" 
                button-size="sm"
                @ok="createDashboard">
            <b-form-input size="sm" type="text" v-model="name"
                        placeholder="Nama Dashboard"/>
        </b-modal>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'button-create',

        props: ['vuedashboards'],

        data() {
            return {
                name: '',
            }
        },

        methods: {
            createDashboard() {
                let name = this.$data.name.replace(/ /g, '-')

                localStorage.setItem(`template-dashboard-${ name }`, JSON.stringify({name: this.$data.name}))

                this.$data.name = ''

                this.$router.push({ name: 'dashboard', params: { name: name, type: 'edit' } })
            }
        },

        computed: {
            ...mapGetters('workspace', {
                dashboards: 'getDashboards',
            })
        }
    }
</script>