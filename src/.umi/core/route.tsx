// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import React from 'react';

export async function getRoutes() {
  const routes = {"1":{"path":"/user","layout":false,"id":"1"},"2":{"name":"登录","path":"/user/login","parentId":"1","id":"2"},"3":{"path":"/welcome","name":"欢迎","icon":"smile","parentId":"ant-design-pro-layout","id":"3"},"4":{"path":"/admin","name":"管理页","icon":"crown","parentId":"ant-design-pro-layout","id":"4"},"5":{"path":"/admin","redirect":"/admin/user_management","parentId":"4","id":"5"},"6":{"path":"/admin/userlist","name":"用户管理","parentId":"4","id":"6"},"7":{"path":"/admin/sub-page","name":"模型管理","parentId":"4","id":"7"},"8":{"path":"/stockManage","name":"数据库管理","icon":"table","parentId":"ant-design-pro-layout","id":"8"},"9":{"path":"/stockManage","redirect":"/stockManage/basic","parentId":"8","id":"9"},"10":{"path":"/stockManage/basic","name":"公司基础信息","parentId":"8","id":"10"},"11":{"path":"/stockManage/financial","name":"公司财务信息","parentId":"8","id":"11"},"12":{"path":"/stockManage/shareholder","name":"股东信息","parentId":"8","id":"12"},"13":{"path":"/stockManage/kline","name":"K线图数据统计","parentId":"8","id":"13"},"14":{"path":"/stockManage/transaction","name":"股票交易数据","parentId":"8","id":"14"},"15":{"path":"/","redirect":"/welcome","parentId":"ant-design-pro-layout","id":"15"},"16":{"path":"*","layout":false,"id":"16"},"ant-design-pro-layout":{"id":"ant-design-pro-layout","path":"/","isLayout":true},"umi/plugin/openapi":{"path":"/umi/plugin/openapi","id":"umi/plugin/openapi"}} as const;
  return {
    routes,
    routeComponents: {
'1': React.lazy(() => import( './EmptyRoute')),
'2': React.lazy(() => import(/* webpackChunkName: "p__User__Login__index" */'@/pages/User/Login/index.tsx')),
'3': React.lazy(() => import(/* webpackChunkName: "p__Welcome" */'@/pages/Welcome.tsx')),
'4': React.lazy(() => import( './EmptyRoute')),
'5': React.lazy(() => import( './EmptyRoute')),
'6': React.lazy(() => import(/* webpackChunkName: "p__admin__user_management" */'@/pages/admin/user_management.tsx')),
'7': React.lazy(() => import(/* webpackChunkName: "p__admin__model_management" */'@/pages/admin/model_management.tsx')),
'8': React.lazy(() => import( './EmptyRoute')),
'9': React.lazy(() => import( './EmptyRoute')),
'10': React.lazy(() => import(/* webpackChunkName: "p__stock_db_management__company_basic_info" */'@/pages/stock_db_management/company_basic_info.tsx')),
'11': React.lazy(() => import(/* webpackChunkName: "p__stock_db_management__company_financial_info" */'@/pages/stock_db_management/company_financial_info.tsx')),
'12': React.lazy(() => import(/* webpackChunkName: "p__stock_db_management__company_shareholder_info" */'@/pages/stock_db_management/company_shareholder_info.tsx')),
'13': React.lazy(() => import(/* webpackChunkName: "p__stock_db_management__kline_graph" */'@/pages/stock_db_management/kline_graph.tsx')),
'14': React.lazy(() => import(/* webpackChunkName: "p__stock_db_management__transaction_data_seperate" */'@/pages/stock_db_management/transaction_data_seperate.tsx')),
'15': React.lazy(() => import( './EmptyRoute')),
'16': React.lazy(() => import(/* webpackChunkName: "p__404" */'@/pages/404.tsx')),
'ant-design-pro-layout': React.lazy(() => import(/* webpackChunkName: "umi__plugin-layout__Layout" */'F:/demo/git_clone_summer/fuckyou/src/.umi/plugin-layout/Layout.tsx')),
'umi/plugin/openapi': React.lazy(() => import(/* webpackChunkName: "umi__plugin-openapi__openapi" */'F:/demo/git_clone_summer/fuckyou/src/.umi/plugin-openapi/openapi.tsx')),
},
  };
}
