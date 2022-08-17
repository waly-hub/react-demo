import { makeAutoObservable } from 'mobx'
import { http, setToken, getToken } from '@/utils'
class LoginStore {
  token = getToken() || ''

  constructor() {
    makeAutoObservable(this)
  }

  async login (mobile, code) {
    const res = await http.post('/authorizations', { mobile, code })
    this.token = res.data.token
    setToken(this.token)
  }
}

const loginStore = new LoginStore()
export default loginStore