<template>
    <div id="shareButton">
        <b-modal id="modalShare" 
                 centered 
                 title="Share this template dashboard" 
                 button-size="sm"
                 @ok="share">
            <select v-model="id" class="form-control">
                <option :value="user.id" v-for="user in users" v-text="user.name"></option>
            </select>
        </b-modal>
    </div>
</template>

<script>
    export default {
        name: 'modal-share',

        data() {
            return {
                users: [],
                id: ''
            }
        },

        methods: {
            share() {
                this.$store.dispatch('rows/syncDatabase', this.$data.id)
            }
        },

        created() {
            this.$store.dispatch('data/getUsers')
                .then(res => {
                    this.$data.users = res
                })
        }
    }
</script>