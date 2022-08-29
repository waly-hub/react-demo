import React from 'react'
import loginStore from './login.Store'
import userStore from './user.Store'
import articleStore from './article.Store'
import publishStore from './publish.Store'
class RootStore {
  constructor() {
    this.loginStore = loginStore
    this.userStore = userStore
    this.articleStore = articleStore
    this.publishStore = publishStore
  }
}

const rootStore = new RootStore()

const context = React.createContext(rootStore)

const useSotre = () => React.useContext(context)

export default useSotre