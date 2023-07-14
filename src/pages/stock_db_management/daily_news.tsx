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

type DailyNewsList = {
  id: number;
  link: string;
  date: string;
  title: string;
};

const columns: ProColumns<DailyNewsList>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    disable: true,
    title: '序列号',
    dataIndex: 'id',
    editable: false,
    search: false,
    hideInTable: true,
//
  },
  {
    disable: true,
    title: '新闻链接',
    dataIndex: 'link',
    copyable: true,
    ellipsis: true,
    editable: false,
    search: false,
//
  },
  {
    title: '收录日期',
    key: 'date',
    dataIndex: 'date',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
    editable: false,
  },
  {
    title: '收录日期',
    dataIndex: 'date',
    valueType: 'dateRange',
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          start_time: value[0],
          end_time: value[1],
        };
      },
    },
  },
  {
    title: '新闻标题',
    dataIndex: 'title',
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
          action?.startEditable?.(record.id);
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
    <ProTable<DailyNewsList>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        await waitTime(2000);
        return request<{
          data: DailyNewsList[];
        }>('http://10.236.66.49/api/backend/daily_news/list_get', {
          params,
        });
      }}
      editable={{
        type: 'multiple',
        onSave: async (rowKey, data) => {

          // type DailyNewsList = {
          //   id: number;
          //   link: string;
          //   date: string;
          //   title: string;
          // };
          const { id, title} = data; 
          // 提取需要修改的字段
          const payload = { id, title}; 
          // 构造需要上传的数据
          console.log('payload: ', payload);
          // 发送 POST 请求将修改后的数据同步到后端
          await request.post(`http://10.236.66.49/api/backend/daily_news/info_change`,{data:payload});
          // 重新加载数据
          actionRef.current?.reload();
        },
        onDelete: async (rowKey, data) => {
          const { id } = data; // 提取需要删除的字段
          const payload = { id }; // 构造需要上传的数据
          console.log('payload: ', payload);
          // 发送 POST 请求将修改后的数据同步到后端
          await request.post(`http://10.236.66.49/api/backend/daily_news/info_delete`,{data:payload});
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
      headerTitle="新闻链接数据列表"
    />
  );
};