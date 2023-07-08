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

type StockTransactionList = {
  code: string;
  date: string;
  amount: number;
  price: number;
};

const columns: ProColumns<StockTransactionList>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    disable: true,
    title: '股票代码',
    dataIndex: 'code',
    copyable: true,
    ellipsis: true,
    editable: false,
//
  },
  {
    title: '交易日期',
    key: 'date',
    dataIndex: 'date',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
    editable: false,
  },
  {
    title: '交易日期',
    dataIndex: 'date',
    valueType: 'dateRange',
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: '成交数量',
    dataIndex: 'amount',
    copyable: true,
    ellipsis: true,
    search: false,
    valueType:'digit'
  },
  {
    title: '成交价格',
    dataIndex: 'price',
    copyable: true,
    ellipsis: true,
    search: false,
    valueType:'money',
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
          action?.startEditable?.(record.code);
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
    <ProTable<StockTransactionList>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        await waitTime(2000);
        return request<{
          data: StockTransactionList[];
        }>('http://10.236.66.157/transaction_data_seperate/list_get', {
          params,
        });
      }}
      editable={{
        type: 'multiple',
        onSave: async (rowKey, data) => {

          // type StockTransactionList = {
          //   code: string;
          //   date: string;
          //   amount: number;
          //   price: number;
          // };
          const { code, date, amount, price} = data; 
          // 提取需要修改的字段
          const payload = { code, date, amount, price}; 
          // 构造需要上传的数据
          console.log('payload: ', payload);
          // 发送 POST 请求将修改后的数据同步到后端
          await request.post(`http://10.236.66.157/api/backend/transaction_data_seperate/info_change`,{data:payload});
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
      rowKey="code"
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
              created_at: [values.startTime, values.endTime],
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
      headerTitle="股票交易信息列表"
    />
  );
};