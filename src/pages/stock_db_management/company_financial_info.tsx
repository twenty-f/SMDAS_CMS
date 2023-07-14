import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useRef } from 'react';
import request from 'umi-request';
export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

type StockFinancialList = {
  stock_code: string;
  property: number;
  liability: number;
  interest: number;
  income: number;
  profit: number;
  asset_turnover: number;
  account_receivable_turnover: number;
  inventory_turnover: number;
  operating_cycle: number;
};

const columns: ProColumns<StockFinancialList>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    disable: true,
    title: '股票代码',
    dataIndex: 'stock_code',
    copyable: true,
    ellipsis: true,
    editable: false,
    valueType:'digit',
  },
  {
    disable: true,
    title: '公司资产',
    dataIndex: 'property',
    ellipsis: true,
    valueType:'money',
    search: false,
  },
  {
    disable: true,
    title: '公司负债',
    dataIndex: 'liability',
    copyable: false,
    ellipsis: true,
    valueType:'money',
    search: false,
  },
  {
    disable: true,
    title: '公司权益',
    dataIndex: 'interest',
    copyable: false,
    ellipsis: true,
    valueType:'money',
    search: false,
  },
  {
    disable: true,
    title: '公司收入',
    dataIndex: 'income',
    copyable: false,
    ellipsis: true,
    valueType:'money',
    search: false,
  },
  {
    disable: true,
    title: '公司利润',
    dataIndex: 'profit',
    copyable: false,
    ellipsis: true,
    valueType:'money',
    search: false,
  },
  {
    disable: true,
    title: '总资产周转率',
    dataIndex: 'asset_turnover',
    tooltip: '指企业在一定时期内销售（营业）收入同平均资产总额的比值。',
    copyable: false,
    ellipsis: true,
    valueType:'digit',
    search: false,
  },
  {
    disable: true,
    title: '应收账款周转率',
    tooltip: '指一定时期内应收账款转化为现金的平均次数。',
    dataIndex: 'account_receivable_turnover',
    copyable: false,
    ellipsis: true,
    valueType:'digit',
    search: false,
  },
  {
    disable: true,
    title: '存货周转率[大于]',
    tooltip: '指销售成本与存货平均余额之比。',
    dataIndex: 'inventory_turnover',
    copyable: false,
    ellipsis: true,
    valueType:'digit',
  },
  {
    disable: true,
    title: '营业周期[大于]',
    tooltip: '指从外购承担付款义务，到收回因销售商品或提供劳务而产生的应收账款的这段时间。其计算公式为：营业周期=存货周转天数+应收账款周转天数。',
    dataIndex: 'operating_cycle',
    copyable: false,
    ellipsis: true,
    valueType:'digit',
  },
  {
    disable: true,
    title: '操作',
    tooltip: '如无必要严禁随意修改数据！',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.stock_code);
        }}
      >
        编辑
      </a>,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<StockFinancialList>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        await waitTime(2000);
        return request<{
          data: StockFinancialList[];
        }>('localhost:8000/api/backend/stock_financial/list_get', {
          params,
        });
      }}
      editable={{
        type: 'multiple',
        onSave: async (rowKey, data) => {

          // type StockFinancialList = {
          //   code: string;
          //   property: number;
          //   liability: number;
          //   interest: number;
          //   income: number;
          //   profit: number;
          //   asset_turnover: number;
          //   account_receivable_turnover: number;
          //   inventory_turnover: number;
          //   operating_cycle: number;
          // };
          const { stock_code, property, liability, interest, income, profit, asset_turnover, account_receivable_turnover, inventory_turnover, operating_cycle} = data; 
          // 提取需要修改的字段
          const payload = { stock_code, property, liability, interest, income, profit, asset_turnover, account_receivable_turnover, inventory_turnover, operating_cycle }; 
          // 构造需要上传的数据
          console.log('payload: ', payload);
          // 发送 POST 请求将修改后的数据同步到后端
          await request.post(`localhost:8000/api/backend/stock_financial/info_change`,{data:payload});
          // 重新加载数据
          actionRef.current?.reload();
        },
        onDelete: async (rowKey, data) => {
          const { stock_code } = data; // 提取需要删除的字段
          const payload = { stock_code }; // 构造需要上传的数据
          console.log('payload: ', payload);
          // 发送 POST 请求将修改后的数据同步到后端
          await request.post(`localhost:8000/api/backend/user/info_delete`,{data:payload});
          // 重新加载数据
          actionRef.current?.reload();
        },
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startValue, values.endValue],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="股票财政信息列表"
    />
  );
};