/*
 * @Author: your name
 * @Date: 2020-12-02 10:42:24
 * @LastEditTime: 2020-12-02 15:13:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \kVue\router+vuex原理\studyvue\src\store\kvuex.js
 */
let Vue;
class Store {
    constructor(options) {
        console.log('options', options);
        this.$options = options;

        this._mutations = options.mutations;
        this._actions = options.actions;

        this._vm = new Vue({
            data: {
                $$state: options.state
            }
        })

        this.commit = this.commit.bind(this);
        this.dispatch = this.dispatch.bind(this);
        // console.log(this.commit)
    }

    get state() {
        return this._vm._data.$$state
    }

    set state(target) {
        console.error('not edit');
    }

    commit(type, payload) {
        console.log('commit', this)
        const entry = this._mutations[type];

        if(!entry) {
            console.log('nothing commit type');
            return false;
        }

        entry(this.state, payload);
    }

    dispatch(type, payload) {
        console.log(type)
        const entry = this._actions[type];
        
        if(!entry) {
            console.log('nothing commit type');
            return false;
        }

        console.log(this)
        entry(this, payload);
    }
}

function install(_Vue) {
    Vue = _Vue;
    Vue.mixin({
        beforeCreate() {
            if(this.$options.store) {
                Vue.prototype.$store = this.$options.store;
            }
        }
    })
}

export default {
    Store,
    install
}