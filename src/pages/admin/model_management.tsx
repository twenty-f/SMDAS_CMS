import { CheckCard } from '@ant-design/pro-components';
import request from 'umi-request';
import { useState } from 'react';

export default () => {
  const [selectedValue, setSelectedValue] = useState<string>('A'); // 当前选中的按钮的值

  const chooseModel = (value: string) => {
    request
      .post('http://10.236.66.49/api/backend/model/choose', {
        data: {
          value: value,
        },
      })
      .then(() => {
        console.log('模型选择成功');
      })
      .catch((error) => {
        console.error('模型选择失败:', error);
      });
  };

  const handleCardChange = (value: string) => {
    if (value !== selectedValue) {
      setSelectedValue(value); // 更新当前选中的按钮的值
      chooseModel(value); // 调用 chooseModel 函数，将 value 作为参数传入
    } else {
      // 点击已被选中的按钮时，不执行任何操作
    }
  };

  return (
    <CheckCard.Group
      onChange={handleCardChange}
      value={selectedValue} // 设置选中的按钮的值
    >
      <CheckCard title="模型 A" description="基础模型" value="A"></CheckCard>
      <CheckCard
        title="模型 B"
        description="快一点点的模型"
        value="B"
      ></CheckCard>
      <CheckCard
        title="模型 C"
        disabled
        description="速度最快，但是坏了"
        value="C"
      ></CheckCard>
    </CheckCard.Group>
  );
};
