import { GET } from '@/api/REST'
import { i18n } from '@/i18n'

const baseUrl = '/api/v1'

export const orderInfo = async () => {
  const res = await GET(baseUrl + '/order')
  // if (!res.ok) {
  //   throw Error(res.statusText)
  // }
  return res
}
