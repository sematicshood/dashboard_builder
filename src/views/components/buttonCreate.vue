<template>
    <div id="buttonCreate" class="full">
        <b-btn v-b-modal.create class="full button-c" size="sm" variant="primary">+</b-btn>

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

                if(localStorage.getItem(`template-dashboard-${ name }`) != null) {
                    alert('Nama telah digunakan')

                    return false
                }

                if(name == '') {
                    alert('Masukkan nama')

                    return false
                }

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

<style>
    .full {
        height: 100%;
        width: 100%;
    }

    .button-c {
        font-size: 100px !important;
    }
</style>
