Vue.component('k-table-body', {
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
                return this.$kTable.$slots.default.filter(item => item.tag && item.tag.includes('k-table-column'))
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
})