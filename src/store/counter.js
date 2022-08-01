// 编写第一个mobx 
import { makeAutoObservable } from 'mobx'

class CounterStore {
  // 1.定义数据
  counter = 0

  constructor() {
    // 2.将数据转化成可响应式的
    makeAutoObservable(this)
  }

  // 3.定义action函数，修改数据
  addCounter () {
    this.counter++
    console.log('==', this.counter)
  }


}
// 4.实例化，然后导出
const counterStore = new CounterStore()

export default counterStore