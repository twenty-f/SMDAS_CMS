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

type StockShareholderList = {
  account: React.Key;
  stock_code: string;
  rank: number;
  name: string;
  identity: string;
  counting: number;
  rate: number;
  change_count: number;
  change_percentage: number;
};

const columns: ProColumns<StockShareholderList>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    disable: true,
    title: '序列号',
    dataIndex: 'account',
    copyable: true,
    ellipsis: true,
    editable: false,
    search: false,
  },
  {
    disable: true,
    title: '股票代码',
    dataIndex: 'stock_code',
    copyable: true,
    ellipsis: true,
    editable: false,
  },
  {
    disable: true,
    title: '股东名称',
    dataIndex: 'name',
    ellipsis: true,
    editable: false,
  },
  {
    disable: true,
    title: '公司内排名',
    dataIndex: 'rank',
    ellipsis: true,
    search: false,
  },
  {
    disable: true,
    title: '股东身份',
    dataIndex: 'identity',
    copyable: true,
    ellipsis: true,
    search: false,
  },
  {
    disable: true,
    title: '持股数量',
    dataIndex: 'counting',
    copyable: true,
    ellipsis: true,
    search: false,
  },
  {
    disable: true,
    title: '持股比率',
    dataIndex: 'rate',
    copyable: true,
    ellipsis: true,
    search: false,
  },
  {
    disable: true,
    title: '持股数增减',
    dataIndex: 'change_count',
    copyable: true,
    ellipsis: true,
    search: false,
  },
  {
    disable: true,
    title: '变动幅度',
    dataIndex: 'change_percentage',
    copyable: true,
    ellipsis: true,
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
    <ProTable<StockShareholderList>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        await waitTime(2000);
        return request<{
          data: StockShareholderList[];
        }>('http://10.236.66.49/api/backend/stock_shareholder/list_get', {
          params,
        });
      }}
      editable={{
        type: 'multiple',
        onSave: async (rowKey, data) => {

          // type StockShareholderList = {
          //   code: string;
          //   name: string;
          //   identity: string;
          //   counting: number;
          //   rate: number;
          //   period: number;
          // };
          const { account, stock_code, name, identity, counting, rate, change_count, change_percentage} = data; 
          // 提取需要修改的字段
          const payload = { account, stock_code, name, identity, counting, rate, change_count, change_percentage }; 
          // 构造需要上传的数据
          console.log('payload: ', payload);
          // 发送 POST 请求将修改后的数据同步到后端
          await request.post(`http://10.236.66.49/api/backend/stock_shareholder/info_change`,{data:payload});
          // 重新加载数据
          actionRef.current?.reload();
        },
        onDelete: async (rowKey, data) => {
          const { account } = data; // 提取需要删除的字段
          const payload = { account }; // 构造需要上传的数据
          console.log('payload: ', payload);
          // 发送 POST 请求将修改后的数据同步到后端
          await request.post(`http://10.236.66.49/api/backend/stock_shareholder/info_delete`,{data:payload});
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
      //rowKey="account"
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
      headerTitle="股票股东信息列表"
    />
  );
};