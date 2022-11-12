import { i18n } from '@/i18n'

export const getFormButtonText = (isUpdateMode) =>
  isUpdateMode ? i18n.global.t('common.update') : i18n.global.t('common.create')
