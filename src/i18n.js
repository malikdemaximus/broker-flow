import { createI18n } from 'vue-i18n'
import messages from './locales'

const i18n = createI18n({
  locale: localStorage.getItem('locale') || 'ru',
  fallbackLocale: 'kz',
  messages,
  allowComposition: true,
})
export { i18n }
