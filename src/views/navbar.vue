<template>
    <div id="navbar">
        <div class="container-2">
            <div class="logo-left col-md-6">
                <div class="logo-nav">
                    <img src="../assets/logo.jpg" alt="Logo Sematics">
                </div>
            </div>
            <div class="content col-md-6">
                <a href="#">
                    <button-add-row/> 
                </a>
                <a href="#">
                    <font-awesome-icon icon="sync" class="icon-badge-navbar"/>
                </a>
                <b-badge pill variant="danger" class="badge-navbar">1</b-badge>
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

    export default {
        name: 'navbar',
        components: {
            buttonChanged, buttonAddRow, buttonSave, buttonCancel, logoutButton
        }      
    }
</script>

<style>
    @import '../assets/css/navbar.css';
</style>
