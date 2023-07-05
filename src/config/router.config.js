// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/stock_db_management/company_basic_info',
    children: [
      // stock_db_management
      {
        path: '/stock_db_management',
        component: RouteView,
        redirect: '/stock_db_management/company_basic_info',
        name: 'stock_db_management',
        meta: { title: 'menu.stock_db_management', icon: 'database' },
        children: [
          {
            path: '/stock_db_management/company_basic_info',
            name: 'company_basic_info',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/stock_db_management/company_basic_info'),
            meta: { title: 'menu.stock_db_management.company_basic_info' }
          },
          {
            path: '/stock_db_management/company_financial_info',
            name: 'company_financial_info',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/stock_db_management/company_financial_info'),
            meta: { title: 'menu.stock_db_management.company_financial_info' }
          },
          {
            path: '/stock_db_management/company_shareholder_info',
            name: 'company_shareholder_info',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/stock_db_management/company_shareholder_info'),
            meta: { title: 'menu.stock_db_management.company_shareholder_info' }
          },
          {
            path: '/stock_db_management/kline_graph',
            name: 'kline_graph',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/stock_db_management/kline_graph'),
            meta: { title: 'menu.stock_db_management.kline_graph' }
          },
          {
            path: '/stock_db_management/transaction_data_seperate',
            name: 'transaction_data_seperate',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/stock_db_management/transaction_data_seperate'),
            meta: { title: 'menu.stock_db_management.transaction_data_seperate' }
          }
        ]
      },
      // model_management
      {
        path: '/model_management',
        component: RouteView,
        redirect: '/model_management/model_management_main',
        name: 'model_management',
        meta: { title: 'menu.model_management', icon: 'cluster' },
        children: [
          {
            path: '/model_management/model_management_main',
            name: 'model_management_main',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/model_management/model_management_main'),
            meta: { title: 'menu.model_management.main' }
          }
        ]
      },
      // user management
      {
        path: '/user_management',
        component: RouteView,
        redirect: '/user_management/user_view',
        name: 'user_management',
        meta: { title: 'menu.user_management', icon: 'user' },
        children: [
          {
            path: '/user_management/user_view',
            name: 'user_view',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/user_management/user_view'),
            meta: { title: 'menu.user_management.user_view' }
          }
        ]
      },
      // analysis
      {
        path: '/analysis',
        component: RouteView,
        redirect: '/analysis/analysis_main',
        name: 'analysis',
        meta: { title: 'menu.analysis', icon: bxAnaalyse },
        children: [
          {
            path: '/analysis/analysis_main',
            name: 'analysis_main',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/analysis/analysis_main'),
            meta: { title: 'menu.analysis.main' }
          }
        ]
      },
      // forms
      {
        path: '/form',
        redirect: '/form/base-form',
        component: RouteView,
        meta: { title: 'menu.form', icon: 'form', permission: ['form'] },
        children: [
          {
            path: '/form/base-form',
            name: 'BaseForm',
            component: () => import('@/views/form/basicForm'),
            meta: { title: 'menu.form.basic-form', keepAlive: true, permission: ['form'] }
          },
          {
            path: '/form/step-form',
            name: 'StepForm',
            component: () => import('@/views/form/stepForm/StepForm'),
            meta: { title: 'menu.form.step-form', keepAlive: true, permission: ['form'] }
          },
          {
            path: '/form/advanced-form',
            name: 'AdvanceForm',
            component: () => import('@/views/form/advancedForm/AdvancedForm'),
            meta: { title: 'menu.form.advanced-form', keepAlive: true, permission: ['form'] }
          }
        ]
      },
      // list
      {
        path: '/list',
        name: 'list',
        component: RouteView,
        redirect: '/list/table-list',
        meta: { title: 'menu.list', icon: 'table', permission: ['table'] },
        children: [
          {
            path: '/list/table-list/:pageNo([1-9]\\d*)?',
            name: 'TableListWrapper',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/list/TableList'),
            meta: { title: 'menu.list.table-list', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/list/basic-list',
            name: 'BasicList',
            component: () => import('@/views/list/BasicList'),
            meta: { title: 'menu.list.basic-list', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/list/card',
            name: 'CardList',
            component: () => import('@/views/list/CardList'),
            meta: { title: 'menu.list.card-list', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/list/search',
            name: 'SearchList',
            component: () => import('@/views/list/search/SearchLayout'),
            redirect: '/list/search/article',
            meta: { title: 'menu.list.search-list', keepAlive: true, permission: ['table'] },
            children: [
              {
                path: '/list/search/article',
                name: 'SearchArticles',
                component: () => import('../views/list/search/Article'),
                meta: { title: 'menu.list.search-list.articles', permission: ['table'] }
              },
              {
                path: '/list/search/project',
                name: 'SearchProjects',
                component: () => import('../views/list/search/Projects'),
                meta: { title: 'menu.list.search-list.projects', permission: ['table'] }
              },
              {
                path: '/list/search/application',
                name: 'SearchApplications',
                component: () => import('../views/list/search/Applications'),
                meta: { title: 'menu.list.search-list.applications', permission: ['table'] }
              }
            ]
          }
        ]
      }
      // other
      /*
      {
        path: '/other',
        name: 'otherPage',
        component: PageView,
        meta: { title: '其他组件', icon: 'slack', permission: [ 'dashboard' ] },
        redirect: '/other/icon-selector',
        children: [
          {
            path: '/other/icon-selector',
            name: 'TestIconSelect',
            component: () => import('@/views/other/IconSelectorView'),
            meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: [ 'dashboard' ] }
          },
          {
            path: '/other/list',
            component: RouteView,
            meta: { title: '业务布局', icon: 'layout', permission: [ 'support' ] },
            redirect: '/other/list/tree-list',
            children: [
              {
                path: '/other/list/tree-list',
                name: 'TreeList',
                component: () => import('@/views/other/TreeList'),
                meta: { title: '树目录表格', keepAlive: true }
              },
              {
                path: '/other/list/edit-table',
                name: 'EditList',
                component: () => import('@/views/other/TableInnerEditList'),
                meta: { title: '内联编辑表格', keepAlive: true }
              },
              {
                path: '/other/list/user-list',
                name: 'UserList',
                component: () => import('@/views/other/UserList'),
                meta: { title: '用户列表', keepAlive: true }
              },
              {
                path: '/other/list/role-list',
                name: 'RoleList',
                component: () => import('@/views/other/RoleList'),
                meta: { title: '角色列表', keepAlive: true }
              },
              {
                path: '/other/list/system-role',
                name: 'SystemRole',
                component: () => import('@/views/role/RoleList'),
                meta: { title: '角色列表2', keepAlive: true }
              },
              {
                path: '/other/list/permission-list',
                name: 'PermissionList',
                component: () => import('@/views/other/PermissionList'),
                meta: { title: '权限列表', keepAlive: true }
              }
            ]
          }
        ]
      }
      */
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
