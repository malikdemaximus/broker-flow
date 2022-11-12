import { notification } from 'ant-design-vue'
import { i18n } from '@/i18n'

export const showErrorMsg = (msg) => {
  notification.error({
    message: i18n.global.t('common.error'),
    description: msg,
  })
}

export const showSuccessMsg = (msg) => {
  notification.success({
    message: 'Успех',
    description: msg,
  })
}
