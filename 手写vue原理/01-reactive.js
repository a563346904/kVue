/*
 * @Author: your name
 * @Date: 2020-12-03 09:31:25
 * @LastEditTime: 2020-12-03 12:02:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \kVue\手写vue原理\01-reactive.js
 */
// Object.defineproperty
// 数据拦截 响应式基础

function defineReactive(obj, key, val) {
    // 递归处理
    observe(val)
    // a(val)

    Object.defineProperty(obj, key, {
        get() {
            console.log('getkey', val)
            return val;
        },
        set(v) {
            if(v != val) {
                console.log('setkey', v)
                val = v;
                update();
            }
        }
    })
}

function a(obj) {
    // 判断obj是不是对象
    console.log(obj)
    if(typeof obj != 'object' || obj == null) {
        console.log('进来了')
        return
    }
}

// 对象响应式 遍历每个key对其执行defineReactive
function observe(obj) {
    // 判断obj是不是对象
    if(typeof obj != 'object' || obj == null) {
        console.log('进来了')
        return
    }

    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key]);
    });
}

let obj = {
    foo: 'foo',
    bar: 'baz',
    baz: {
        a: 2
    }
};

observe(obj)

function update() {
    document.getElementById('app').innerText = obj.foo + '---' + obj.bar + '--' + obj.baz.a
}

obj.baz.a++;
setInterval(() => {
    // obj.foo = new Date().toLocaleTimeString()
    // obj.bar++;
    obj.baz.a++;
}, 1000);
