<!--
 * @Author: your name
 * @Date: 2020-12-17 10:02:15
 * @LastEditTime: 2020-12-17 10:17:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \kVue\router+vuex原理\studyvue\src\components\kTable\kTableHeader.vue
-->
<script>
export default {
    render(h) {
        return h('tr', this.initHeaders(h))
    },
    inject: ['$kTable'],
    data() {
        return {
            sortActive: null,
            sortProp: null
        }
    },
    computed: {
        columns() {
            try {
                return this.$kTable.$slots.default.filter(item => item.tag && item.tag.includes('KTableColumn'))
            } catch (error) {
                return []
            }
        }
    },
    methods: {
        initHeaders(h) {
            return this.columns.map(item => {
                const { attrs } = item.data
                return h('th', [attrs.label, attrs.sortable !== undefined ? [
                    h('span', {
                        class: ['sortIcon', (this.sortActive === 'Desc' && this.sortProp === attrs.prop) && 'sortAcive'], 
                        on: {
                            click: (e) => this.sortByDesc(attrs, e)
                        }
                    }, '↑'),
                    h('span', {
                        class: ['sortIcon', (this.sortActive === 'Asc' && this.sortProp === attrs.prop) && 'sortAcive'],
                        on: {
                            click: (e) => this.sortByAsc(attrs, e)
                        }
                    }, '↓'),
                ] : ''])
            })
        },
        //升序
        sortByAsc(attrs) {
            this.sortActive = 'Asc'
            this.sortProp = attrs.prop
            this.$kTable.order(attrs.prop, 'asc');
        },
        //降序
        sortByDesc(attrs) {
            this.sortActive = 'Desc'
            this.sortProp = attrs.prop
            this.$kTable.order(attrs.prop, 'desc');
        }
    }
}
</script>
