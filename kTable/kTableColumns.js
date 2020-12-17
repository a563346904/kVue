Vue.component('k-table-column', {
    render(h) {
            return h('td', this.$slots.default)
    }
})