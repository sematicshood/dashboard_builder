<template>
    <div id="collapseOption" v-if="colOptionShow && type == 'edit'">
        <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-btn block href="#" v-b-toggle.accordion1 variant="info">Legend</b-btn>
        </b-card-header>
        <b-collapse id="accordion1" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                <title-chart/>
            </b-card-body>
        </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-btn block href="#" v-b-toggle.accordion2 variant="info">Tooltip</b-btn>
        </b-card-header>
        <b-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                <tooltip-chart/>
            </b-card-body>
        </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-btn block href="#" v-b-toggle.accordion3 variant="info">Scales</b-btn>
        </b-card-header>
        <b-collapse id="accordion3" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                <scales-chart/>
            </b-card-body>
        </b-collapse>
        </b-card>
    </div>
</template>

<script>
    import titleChart from './titleChart.vue'
    import tooltipChart from './tooltipChart.vue'
    import scalesChart from './scalesChart.vue'
    import { mapGetters } from 'vuex'

    export default {
        name: 'collapse-option',

        components: {
            titleChart, tooltipChart, scalesChart
        },

        computed: {
            ...mapGetters('rows', {
                colOp: 'getColOp',
                rowOp: 'getRowOp',
                colOptionShow: 'getColOptionShow'
            }),

            ...mapGetters('workspace', {
                type: 'getType'
            }),
        },
    }
</script>