<template>
    <div id="navbar">
        <div class="container-2">
            <div class="logo-left col-md-6">
                <div class="logo-nav">
                    <img src="../assets/logo.jpg" alt="Logo Sematics">
                </div>
                <span v-text="greeting"></span>
            </div>
            <div class="content col-md-6">
                <button-sync/>
                <button-share/>
                <a href="#">
                    <button-add-row/> 
                </a>
                <a href="#">
                    <button-save/>
                </a>
                <a href="#">
                    <button-cancel/>
                </a>
                <a href="#">
                    <button-changed></button-changed>
                </a>
                <a href="#">
                    <logout-button/>
                </a>                
            </div>
        </div>
    </div>
</template>

<script>
    import logoutButton from './components/logoutButton.vue'
    import buttonChanged from './components/buttonChanged.vue'
    import buttonAddRow from './components/buttonAddRow.vue'
    import buttonSave from './components/selectComponent/buttonSaveComponent.vue'
    import buttonCancel from './components/selectComponent/buttonCancelComponent.vue'
    import buttonSync from './components/row/buttonSync.vue'
    import buttonShare from './components/row/buttonShare.vue'

    export default {
        name: 'navbar',

        data() {
            return {
                greeting: 'Selamat datang'
            }
        },

        components: {
            buttonChanged, buttonAddRow, buttonSave, buttonCancel, logoutButton, buttonSync, buttonShare
        },

        methods: {
            getDataUser() {
                this.$store.dispatch('data/getUserData')
                    .then(res => {
                        this.setGreeting(res[0].display_name)
                    })
            },

            setGreeting(name) {
                var today = new Date()
                var curHr = today.getHours()
                let greeting = ''

                if (curHr < 12) {
                    greeting = 'Selamat pagi ' + name
                } else if (curHr < 18) {
                    greeting = 'Selamat siang ' + name
                } else {
                    greeting = 'Selamat sore ' + name
                }

                this.$data.greeting = greeting
            }
        },

        created() {
            this.getDataUser()
        }
    }
</script>

<style>
    @import '../assets/css/navbar.css';
</style>
