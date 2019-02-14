export default {
  index:{
    path: '/personal',
    name: 'Personal',
    meta: {
      title: '个人中心',
      keepAlive: true
    },
    component: r => require.ensure([], () => r(require('@/views/personal/Index.vue')), 'Personal'),
  }
}
