<template>
    <div id="widget-table">
        <table class="widget-table">
            <thead>
                <tr>
                    <th>Employee</th>
                    <th>Apalah</th>
                    <th v-show="type == 'edit'">Options</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Siti Nur Rohmah</td>
                    <td>Rp. 2000.000</td>
                    <td v-show="type == 'edit'">
                        <b-dropdown left text="Option" size="sm" variant="white">
                        <b-dropdown-item>Count (+)</b-dropdown-item>
                        <b-dropdown-item>Count (-)</b-dropdown-item>
                        <b-dropdown-item>Sum (+)</b-dropdown-item>
                        <b-dropdown-item>Sum (-)</b-dropdown-item>
                        </b-dropdown>
                    </td>
                </tr>
                <tr>
                    <td>Jono Sujono</td>
                    <td>Rp. 2.250.000</td>
                    <td v-show="type == 'edit'">
                        <b-dropdown left text="Option" size="sm" variant="white">
                        <b-dropdown-item>Count (+)</b-dropdown-item>
                        <b-dropdown-item>Count (-)</b-dropdown-item>
                        <b-dropdown-item>Sum (+)</b-dropdown-item>
                        <b-dropdown-item>Sum (-)</b-dropdown-item>
                        </b-dropdown>
                    </td>
                </tr>
                <tr>
                    <td>Joko Sutopo</td>
                    <td>Rp. 10.500.000</td>
                    <td v-show="type == 'edit'">
                        <b-dropdown left text="Option" size="sm" variant="white">
                        <b-dropdown-item>Count (+)</b-dropdown-item>
                        <b-dropdown-item>Count (-)</b-dropdown-item>
                        <b-dropdown-item>Sum (+)</b-dropdown-item>
                        <b-dropdown-item>Sum (-)</b-dropdown-item>
                        </b-dropdown>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td>Jumlah</td>
                    <td>Rp. 14.750.000</td>
                    <td v-show="type == 'edit'">Footer</td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>


<script>
import { mapGetters } from 'vuex'

export default {
    name: 'widget-table',

    computed: {
            ...mapGetters('workspace', {
                type: 'getType'
            })
        }
}
</script>
