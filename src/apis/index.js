import { http } from '@/utils'

export const getChannelList = () => {
  return http.get('/channels')
}