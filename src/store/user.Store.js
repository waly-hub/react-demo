import { makeAutoObservable } from 'mobx'
import { http } from '@/utils'
class UserStore {
  userInfo = {}
  constructor() {
    makeAutoObservable(this)
  }

  getUserInfo = async () => {
    const res = await http.get('/user/profile')
    this.userInfo = res.data
    console.log('res', res)
  }
}

export default new UserStore()