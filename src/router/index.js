import { createRouter, createWebHistory } from 'vue-router'
import { i18n } from '@/i18n'

import NotFound from '@/pages/NotFound'
import MainPage from '@/pages/MainPage/MainPage'

export const routes = [
  {
    path: '/:token',
    name: 'TokenPage',
    component: MainPage,
    meta: {
      name: i18n.global.t('content.roles'),
    },
  },
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
    meta: {
      name: i18n.global.t('content.roles'),
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      name: 'Ничего не найдено',
      permissions: 'config-discovery',
    },
  },
]

const router = new createRouter({
  history: createWebHistory(),
  routes,
})

// router.beforeEach((to, from, next) => {
//   const isAuthenticated = Boolean(cookie.get('accessToken'))
//   const isInnerPage =
//     to.name !== 'Login' &&
//     to.name !== 'ChangePassword' &&
//     to.name !== 'DisabledMerchant'
//   const shouldRedirectToLogin = isInnerPage && !isAuthenticated

//   if (!isAuthenticated && to.name === 'ChangePassword') {
//     return next({ name: 'Login' })
//   }
//   if (shouldRedirectToLogin) {
//     return next({ name: 'Login' })
//   }

//   const hasMetaInfo = Object.keys(to.meta).length

//   if (hasMetaInfo || !isInnerPage) {
//     return next()
//   }

//   next({ path: to.meta.failPath })
// })

export default router
