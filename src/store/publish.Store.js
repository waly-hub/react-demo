import { makeAutoObservable, runInAction } from 'mobx'
import { getChannelList } from '@/apis'

class publishStore {
  channelList = []

  constructor() {
    makeAutoObservable(this)
  }

  getChannelList = async () => {
    const res = await getChannelList()
    runInAction(() => {
      this.channelList = res.data.channels
    })
  }
}

export default new publishStore()