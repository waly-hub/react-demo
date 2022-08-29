import { makeAutoObservable, runInAction } from 'mobx'
import { http } from '@/utils'
import { message } from 'antd'
import { getChannelList } from '@/apis'
class ActicleStore {
  articleList = []
  channelList = []
  articleTotal = 0
  constructor() {
    makeAutoObservable(this)
  }

  getChannelList = async () => {
    const res = await getChannelList()
    runInAction(() => {
      this.channelList = res.data.channels

    })
  }

  getArticleDataList = async (params) => {
    const res = await http.get('/mp/articles', { params })
    runInAction(() => {
      this.articleList = res.data.results
      this.articleTotal = res.data.total_count
    })

  }

  delAtrticleById = async (id) => {
    const res = await http.delete(`/mp/articles/${id}`)
    message.success(res.message)
  }
}

export default new ActicleStore()