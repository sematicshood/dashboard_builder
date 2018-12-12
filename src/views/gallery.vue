<template>
    <div id="gallery">
        <div class="container">
            <div class="text-center">
                <hr>
                <h1>List Dashboard</h1>
                <router-link to="create" class="btn btn-sm btn-primary">Create New Dashboard</router-link>
                <hr>
            </div>

            <div class="row">
                <div class="col-xs-12 col-md-6">
                    <div class="bg bg-left">
                        <h2>Create your snippet's HTML, CSS and Javascript in the editor tabs</h2>
                    </div>
                </div>
                <div class="col-xs-12 col-md-6">
                    <div class="bg bg-right">
                        <h2>Create your snippet's HTML, CSS and Javascript in the editor tabs</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'gallery'
    }
</script>

<style>
    @import '../../public/style/gallery.css';
</style>
