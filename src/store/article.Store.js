import { makeAutoObservable } from 'mobx'
import { http } from '@/utils'
class ActicleStore {
  articleList = []
  channelList = []
  articleTotal = 0
  constructor() {
    makeAutoObservable(this)
  }

  getChannelList = async () => {
    const res = await http.get('/channels')
    this.channelList = res.data.channels
  }

  getArticleDataList = async (params) => {
    const res = await http.get('/mp/articles', { params })
    this.articleList = res.data.results
    this.articleTotal = res.data.total_count
  }
}

export default new ActicleStore()