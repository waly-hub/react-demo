import React from 'react'
import loginStore from './login.Store'

class RootStore {
  constructor() {
    this.loginStore = loginStore
  }
}

const rootStore = new RootStore()

const context = React.createContext(rootStore)

const useSotre = () => React.useContext(context)

export default useSotre