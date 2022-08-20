import React from 'react'
import loginStore from './login.Store'
import userStore from './user.Store'
import articleStore from './article.Store'
class RootStore {
  constructor() {
    this.loginStore = loginStore
    this.userStore = userStore
    this.articleStore = articleStore
  }
}

const rootStore = new RootStore()

const context = React.createContext(rootStore)

const useSotre = () => React.useContext(context)

export default useSotre