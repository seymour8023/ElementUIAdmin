import Vue from 'vue'
import Router from 'vue-router'
import Personal from './personal'

Vue.use(Router)
const layout = () => import(/* webpackChunkName: "layout" */ '@/views/layout/App.vue')
const Dashboard = () => import(/* webpackChunkName: "Dashboard" */ '@/views/home/Index.vue')
const FontAwesome = () => import(/* webpackChunkName: "FontAwesome" */ '@/views/icon/FontAwesome.vue')
const ElementIcon = () => import(/* webpackChunkName: "ElementIcon" */ '@/views/icon/ElementIcon.vue')
const PostManage = () => import(/* webpackChunkName: "PostManage" */ '@/views/contentManage/Index.vue')
const addManage = () => import(/* webpackChunkName: "addManage" */ '@/views/contentManage/iframetext.vue')

let RouteList = [
  {
    path: '/',
    component: layout,
    meta: {
      title: '首页',
      keepAlive: false,
    },
    children: [
      {
        path: '/',
        name: 'Dashboard',
        meta: {
          title: '首页',
          keepAlive: false
        },
        component: Dashboard,
      },
      {
        path: '/font_awesome',
        name: 'FontAwesome',
        meta: {
          title: 'FontAwesome 图标',
          keepAlive: false
        },
        component: FontAwesome,
      },
      {
        path: '/element_icon',
        name: 'ElementIcon',
        meta: {
          title: 'Element 图标',
          keepAlive: false
        },
        component: ElementIcon,
      },
      {
        path: '/post_manage',
        name: 'PostManage',
        meta: {
          title: '文章管理',
          keepAlive: false
        },
        component: PostManage,
      },
      {
          path: '/add_manage',
          name: 'addManage',
          meta: {
              title: '文章添加',
              keepAlive: false
          },
          component: addManage,
      },
      {
        path: '/user_manage',
        name: 'UserManage',
        meta: {
          title: '用户列表',
          keepAlive: true
        },
        component: r => require.ensure([], () => r(require('@/views/userManage/Index.vue')), 'UserManage'),
      },
      {
        path: '/category_manage',
        name: 'CategoryManage',
        meta: {
          title: '分类列表',
          keepAlive: true
        },
        component: r => require.ensure([], () => r(require('@/views/categoryManage/Index.vue')), 'CategoryManage'),

      },
      {
        path: '/role_manage',
        name: 'RoleManage',
        meta: {
          title: '角色列表',
          keepAlive: true
        },
        component: r => require.ensure([], () => r(require('@/views/permissionManage/role/Role.vue')), 'RoleManage'),
      },
      {
        path: '/permission_list',
        name: 'PermissionList',
        meta: {
          title: '权限列表',
          keepAlive: true
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
      keepAlive: false
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
    keepAlive: true
  },
  component: r => require.ensure([], () => r(require('@/views/developmentTool/Build.vue')), 'BuildCode'),
});

export default new Router({routes: RouteList})


