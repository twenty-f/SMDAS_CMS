export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    routes: [
      { path: '/admin', redirect: '/admin/user_management' },
      { path: '/admin/userlist', name: '用户管理', component: './admin/user_management' },
      { path: '/admin/sub-page', name: '模型管理', component: './admin/model_management' },
    ],
  },
  {
    path: '/stockManage',
    name: '数据库管理',
    icon: 'table',
    routes: [
      { path: '/stockManage', redirect: '/stockManage/basic' },
      { path: '/stockManage/basic', name: '公司基础信息', component: './stock_db_management/company_basic_info' },
      { path: '/stockManage/financial', name: '公司财务信息', component: './stock_db_management/company_financial_info' },
      { path: '/stockManage/shareholder', name: '股东信息', component: './stock_db_management/company_shareholder_info' },
      { path: '/stockManage/kline', name: 'K线图数据统计', component: './stock_db_management/kline_graph' },
      { path: '/stockManage/transaction', name: '股票交易数据', component: './stock_db_management/transaction_data_seperate' },
    ]
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
