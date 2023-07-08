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

type StockBasicList = {
  code: string;
  name: string;
  intro: string;
  leader: string;
  distribution: string;
  notice: string;
};

const columns: ProColumns<StockBasicList>[] = [
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
    disable: true,
    title: '公司名称',
    dataIndex: 'name',
    ellipsis: true,
    editable: false,
  },
  {
    disable: true,
    title: '公司简介',
    dataIndex: 'intro',
    copyable: true,
    ellipsis: true,
    search: false,
  },
  {
    disable: true,
    title: '公司领导架构',
    dataIndex: 'leader',
    copyable: true,
    ellipsis: true,
    search: false,
  },
  {
    disable: true,
    title: '公司分配模式',
    dataIndex: 'distribution',
    copyable: true,
    ellipsis: true,
    search: false,
  },
  {
    disable: true,
    title: '公司公告',
    dataIndex: 'notice',
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
    <ProTable<StockBasicList>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        await waitTime(2000);
        return request<{
          data: StockBasicList[];
        }>('http://10.236.66.157/api/backend/stock_basic/list_get', {
          params,
        });
      }}
      editable={{
        type: 'multiple',
        onSave: async (rowKey, data) => {
          const { code, intro, leader, distribution, notice} = data; // 提取需要修改的字段
          const payload = { code, intro, leader, distribution, notice }; // 构造需要上传的数据
          console.log('payload: ', payload);
          // 发送 POST 请求将修改后的数据同步到后端
          await request.post(`http://10.236.66.157/api/backend/stock_basic/info_change`,{data:payload});
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
      headerTitle="股票基础信息列表"
    />
  );
};