import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
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

type UserList = {
  id: number;
  name: string;
  state: number;
  created_at: string;
  login_at: string;
};


const columns: ProColumns<UserList>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    disable: true,
    title: '用户ID',
    dataIndex: 'id',
    copyable: true,
    ellipsis: true,
    editable: false,
  },
  {
    title: '用户名称',
    dataIndex: 'name',
    copyable: true,
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '状态',
    dataIndex: 'state',
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      1: {
        text: '已封禁',
        status: 'Error',
      },
      0: {
        text: '正常',
        status: 'Success',
      },
    },
  },
  {
    title: '创建时间',
    key: 'show_time',
    dataIndex: 'created_at',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
    editable: false,
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    valueType: 'dateRange',
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          create_start_time: value[0],
          create_end_time: value[1],
        };
      },
    },
  },
  {
    title: '上次上线时间',
    key: 'login_time',
    dataIndex: 'login_at',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
    editable: false,
  },
  {
    title: '上次上线时间',
    dataIndex: 'login_at',
    valueType: 'dateRange',
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          login_start_time: value[0],
          login_end_time: value[1],
        };
      },
    },
  },
  {
    disable: true,
    title: '操作',
    tooltip: '重置默认密码为123456，重置密保问题为111，密保答案为000',
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
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'password_reset', name: '重置密码', onClick: () => {
            const id = record.id;
            const payload = { id }; // 构造需要上传的数据
            request.post('http://10.236.66.157/api/backend/user/reset/password', {data:payload});
            }
          },
          { key: 'question_answer_reset', name: '重置密保', onClick: () => {
            const id = record.id;
            const payload = { id }; // 构造需要上传的数据
            request.post('http://10.236.66.157/api/backend/user/reset/security_question', {data:payload});
            }
          },
          // { key: 'password_reset', name: '重置密码',},
          // { key: 'question_answer_reset', name: '重置密保', },
        ]}
      />,
    ],
  },
];
// export const handleResetPassword = async (rowKey, data) => {
//   const { id } = data; // 提取需要修改的字段
//   const payload = { id }; // 构造需要上传的数据
//   await request.post('http://10.236.66.157/api/backend/user_list_password_reset', {data:payload});
// };

export default () => {
  const actionRef = useRef<ActionType>();

  return (
    <ProTable<UserList>
      columns={columns}
      actionRef={actionRef}
      
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        await waitTime(2000);
        return request<{
          data: UserList[];
        }>('http://10.236.66.157/api/backend/user/list_get', {
          params,
        });
      }}
      //http://10.236.66.157/api/backend/user_list_password_reset
      editable={{
        type: 'multiple',
        onSave: async (rowKey, data) => {
          const { id, name, state } = data; // 提取需要修改的字段
          const payload = { id, name, state }; // 构造需要上传的数据
          console.log('payload: ', payload);
          // 发送 POST 请求将修改后的数据同步到后端
          await request.post(`http://10.236.66.157/api/backend/user/info_change`,{data:payload});
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
              login_at: [values.startTime, values.endTime],
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
      headerTitle="用户列表"
    />
  );
};