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

type KlineInfoList = {
  code: string;
  date: string;
  total_amount: number;
  total_sales: number;
  average_price: number;
  open_price: number;
  close_price: number;
  highest_price: number;
  lowest_price: number;
  increase: number;
};

const columns: ProColumns<KlineInfoList>[] = [
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
  },
  {
    title: '日期',
    key: 'date',
    dataIndex: 'date',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
    editable: false,
  },
  {
    title: '日期',
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
    disable: true,
    title: '当日销售总数',
    dataIndex: 'total_amount',
    copyable: true,
    ellipsis: true,
    search: false,
    valueType:'digit',
  },
  {
    disable: true,
    title: '当日销售总额',
    dataIndex: 'total_sales',
    copyable: true,
    ellipsis: true,
    valueType:'money',
    search: false,
  },
  {
    disable: true,
    title: '当日成交均价',
    dataIndex: 'average_price',
    copyable: true,
    ellipsis: true,
    valueType:'money',
    search: false,
  },
  {
    disable: true,
    title: '开盘价',
    dataIndex: 'open_price',
    copyable: true,
    ellipsis: true,
    search: false,
    valueType:'money',
  },
  {
    disable: true,
    title: '收盘价',
    dataIndex: 'close_price',
    copyable: true,
    ellipsis: true,
    editable: false,
    valueType:'money',
    search: false,
  },
  {
    disable: true,
    title: '最高价',
    dataIndex: 'highest_price',
    copyable: true,
    ellipsis: true,
    editable: false,
    valueType:'money',
    search: false,
  },
  {
    disable: true,
    title: '最低价',
    dataIndex: 'lowest_price',
    copyable: true,
    ellipsis: true,
    editable: false,
    valueType:'money',
    search: false,
  },
  {
    disable: true,
    title: '涨跌幅',
    tooltip: '正为涨负为跌！',
    dataIndex: 'increase',
    copyable: true,
    ellipsis: true,
    editable: false,
    valueType:'digit',
    search: false,
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
    <ProTable<KlineInfoList>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        await waitTime(2000);
        return request<{
          data: KlineInfoList[];
        }>('http://10.236.66.157/api/backend/kline_graph/list_get', {
          params,
        });
      }}
      editable={{
        type: 'multiple',
        onSave: async (rowKey, data) => {

          // type KlineInfoList = {
          //   code: string;
          //   date: string;
          //   total_amount: number;
          //   total_sales: number;
          //   average_price: number;
          //   open_price: number;
          //   close_price: number;
          //   highest_price: number;
          //   lowest_price: number;
          //   increase: number;
          // };
          const { code, total_amount, total_sales, average_price, open_price, close_price, highest_price, lowest_price, increase} = data; 
          // 提取需要修改的字段
          const payload = { code, total_amount, total_sales, average_price, open_price, close_price, highest_price, lowest_price, increase }; 
          // 构造需要上传的数据
          console.log('payload: ', payload);
          // 发送 POST 请求将修改后的数据同步到后端
          await request.post(`http://10.236.66.157/api/backend/kline_graph/info_change`,{data:payload});
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
              created_at: [values.start_time, values.end_time],
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
      headerTitle="股票K线图信息列表"
    />
  );
};