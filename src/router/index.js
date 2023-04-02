import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    name: 'name',
    path: '/home',
    component: () => import('@/views/home/home.vue')
  },
  {
    name: 'fover',
    path: '/favor',
    component: () => import('@/views/favor/favor.vue')
  },
  {
    name: 'order',
    path: '/order',
    component: () => import('@/views/order/order.vue')
  },
  {
    name: 'message',
    path: '/message',
    component: () => import('@/views/message/message.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/home'
  }
]


const router = createRouter({
  history: createWebHashHistory(),
  // 映射关系: path -> component
  routes
})

export default router