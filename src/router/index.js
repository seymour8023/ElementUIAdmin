import Vue from 'vue'
import Router from 'vue-router'
import Personal from './personal'

Vue.use(Router)

let RouteList = [
  {
    path: '/',
    component: r => require.ensure([], () => r(require('@/views/layout/App.vue')), 'layout'),
    meta: {
      title: '首页',
    },
    children: [
      {
        path: '/',
        name: 'Dashboard',
        meta: {
          title: '首页',
        },
        component: r => require.ensure([], () => r(require('@/views/home/Index.vue')), 'Dashboard'),
      },
      {
        path: '/font_awesome',
        name: 'FontAwesome',
        meta: {
          title: 'FontAwesome 图标',
        },
        component: r => require.ensure([], () => r(require('@/views/icon/FontAwesome.vue')), 'FontAwesome'),
      },
      {
        path: '/element_icon',
        name: 'ElementIcon',
        meta: {
          title: 'Element 图标',
        },
        component: r => require.ensure([], () => r(require('@/views/icon/ElementIcon.vue')), 'ElementIcon'),
      },
      {
        path: '/post_manage',
        name: 'PostManage',
        meta: {
          title: '文章管理',
        },
        component: r => require.ensure([], () => r(require('@/views/contentManage/Index.vue')), 'PostManage'),
      },
      {
          path: '/add_manage',
          name: 'addManage',
          meta: {
              title: '文章添加',
          },
          component: r => require.ensure([], () => r(require('@/views/contentManage/iframetext.vue')), 'addManage'),
      },
      {
        path: '/user_manage',
        name: 'UserManage',
        meta: {
          title: '用户列表',
        },
        component: r => require.ensure([], () => r(require('@/views/userManage/Index.vue')), 'UserManage'),
      },
      {
        path: '/category_manage',
        name: 'CategoryManage',
        meta: {
          title: '分类列表',
        },
        component: r => require.ensure([], () => r(require('@/views/categoryManage/Index.vue')), 'CategoryManage'),

      },
      {
        path: '/role_manage',
        name: 'RoleManage',
        meta: {
          title: '角色列表',
        },
        component: r => require.ensure([], () => r(require('@/views/permissionManage/role/Role.vue')), 'RoleManage'),
      },
      {
        path: '/permission_list',
        name: 'PermissionList',
        meta: {
          title: '权限列表',

        },
        component: r => require.ensure([], () => r(require('@/views/permissionManage/permission/Index.vue')), 'PermissionList'),
      },
      //个人中心，可能有修改密码，头像修改等路由
      Personal.index,
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '后台登录',
    },
    components: {
      blank: r => require.ensure([], () => r(require('@/views/login/Login.vue')), 'Login'),
    }
  },

]


RouteList[0].children.push({
  path: '/build_code',
  name: 'BuildCode',
  meta: {
    title: '构建代码',
  },
  component: r => require.ensure([], () => r(require('@/views/developmentTool/Build.vue')), 'BuildCode'),
});

export default new Router({routes: RouteList})


