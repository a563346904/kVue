<!--
 * @Author: your name
 * @Date: 2020-12-17 09:59:47
 * @LastEditTime: 2020-12-17 10:04:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \kVue\router+vuex原理\studyvue\src\components\kTable\index.vue
-->
<script>
export default {
  render(h) {
        return h('table', [
            h('k-table-header'),
            h('k-table-body', this.$slots.default)
        ])
    },
    props: {
        data: {
            type: Array,
            default: function () {
                return [];
            }
        },
    },
    data() {
        return {
            cloneData: this.data
        }
    },
    provide() {
        return {
            $kTable: this
        }
    },
    methods: {
        order(attrs, type) {
            let cloneData = JSON.parse(JSON.stringify(this.data)) 
            // //设置排序函数
            var sortFunction;
            switch (type) {
                default://默认为 asc 排序
                case 'asc':
                    sortFunction = function (a, b) {
                        return a[attrs] > b[attrs] ? 1 : -1;
                    };
                    break;
                case 'desc':
                    sortFunction = function (a, b) {
                        return a[attrs] < b[attrs] ? 1 : -1;
                    };
                    break;
            }

            cloneData.sort(sortFunction);

            this.cloneData = cloneData
        }
    }
}
</script>