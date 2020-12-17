<!--
 * @Author: your name
 * @Date: 2020-12-17 10:01:40
 * @LastEditTime: 2020-12-17 10:17:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \kVue\router+vuex原理\studyvue\src\components\kTable\kTableBody.vue
-->
<script>
export default {
    render(h) {
        return h('tbody',
            this.data.map(item => {
                return h('tr', this.initColumn(h, item))
            })
        )
    },
    inject: ['$kTable'],
    computed: {
        data() {
            return this.$kTable.cloneData
        },
        columns() {
            try {
                return this.$kTable.$slots.default.filter(item => item.tag && item.tag.includes('KTableColumn'))
            } catch (error) {
                return []
            }
        }
    },
    methods: {
        initColumn(h, item) {
            return this.columns.map(column => {
                const { prop } = column.data.attrs
                return h('k-table-column', column.componentOptions.children || item[prop])
            })
        }
    }
}
</script>
