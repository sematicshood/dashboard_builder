<template>
    <div id="buttonDelete" v-if="type == 'edit'">
        <b-btn @click="deleteDashboard" size="sm" variant="danger">Delete Dashboard</b-btn>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'button-delete',

        methods: {
            deleteDashboard() {
                if(confirm('Yakin ingin menghapus dashboard ini?')) {
                    let name        = 'template-dashboard-' + this.name

                    localStorage.removeItem(name)

                    this.$router.push('/')
                }
            }
        },

        computed: {
            ...mapGetters('workspace', {
                name: 'getName',
                type: 'getType'
            }),
        }
    }
</script>