<template>
    <div id="widget-card">
        <b-card no-body class="">
            <b-card-body class="pb-0">
                <b-dropdown class="float-right" variant="transparent p-0" right>
                <template slot="button-content">
                    <font-awesome-icon icon="cog"/>
                </template>
                <b-dropdown-item>Action</b-dropdown-item>
                <b-dropdown-item>Another action</b-dropdown-item>
                <b-dropdown-item>Something else here...</b-dropdown-item>
                </b-dropdown>
                <p>Members online</p>
                <h4 class="mb-0">9.823</h4>
                <p class="span-widget"><font-awesome-icon icon="long-arrow-alt-up"/> 20.2 %</p>
            </b-card-body>
        </b-card>
    </div>
</template>


<script>
export default {
    name: "widget-card"
}
</script>

