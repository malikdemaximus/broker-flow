import { GET, PUT } from '@/api/REST'
import { i18n } from '@/i18n'

const baseUrl = '/api/v1/'
const baseUrlBGA = process.env.VUE_APP_BGA_API_URL

export const orderInfo = async () => {
  const res = await GET(baseUrl + 'order')
  // if (!res.ok) {
  //   throw Error(res.statusText)
  // }
  return res
}

export const offers = async () => {
  const res = await GET(baseUrl + 'order/offers')
  // if (!res.ok) {
  //   throw Error(res.statusText)
  // }
  return res
}

export const saveChosenOffer = async (data) => {
  const res = await PUT(baseUrl + 'order/save-chosen-offer', data)
  // if (!res.ok) {
  //   throw Error(res.statusText)
  // }
  return res
}

export const startProcess = async () => {
  const data = {}
  const res = await PUT(baseUrl + 'order/start-process', data)
  // if (!res.ok) {
  //   throw Error(res.statusText)
  // }
  return res
}

export const verifyAgreement = async (data) => {
  const res = await PUT(baseUrl + 'order/verify-agreement', data)
  // if (!res.ok) {
  //   throw Error(res.statusText)
  // }
  return res
}

export const verifyAgreementId = async (data) => {
  const res = await PUT(baseUrl + 'agreement/verify', data, {}, baseUrlBGA)
  // if (!res.ok) {
  //   throw Error(res.statusText)
  // }
  return res
}

export const specification = async () => {
  const SPECIFICATION_CODE = 'airba_broker_agreement'
  let specUrl = `specification/${SPECIFICATION_CODE}`
  const res = await GET(baseUrl + specUrl, {}, {}, baseUrlBGA)
  // if (!res.ok) {
  //   throw Error(res.statusText)
  // }
  return res
}

export const agreement = async (data) => {
  const res = await PUT(baseUrl + 'agreement/sign', data, {}, baseUrlBGA)
  // if (!res.ok) {
  //   throw Error(res.statusText)
  // }
  return res
}
