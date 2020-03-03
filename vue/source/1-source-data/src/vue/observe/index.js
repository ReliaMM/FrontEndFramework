import observe from "./observe";

function proxy (vm, source, key) {
  Object.defineProperty(vm, key, {
    get: () => vm[source][key],
    set: function(value) {
      console.log('value',value)
      vm[source][key] = value;
    }
  })
}

function initState (vm) {
  initData(vm)
}

function initData (vm) {
  let { data } = vm.$options
  data = vm._data = typeof data === "function" ? data.call(vm) : data || {}
  observe(vm._data);
  Object.keys(data).map(item => proxy(vm, '_data', item))
  console.log(vm)
}
export default initState;