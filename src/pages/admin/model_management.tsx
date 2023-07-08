import { CheckCard } from '@ant-design/pro-components';

export default () => (
  <CheckCard.Group
    onChange={(value) => {
      console.log('value', value);
    }}
    defaultValue="A"
  >
    <CheckCard title="模型 A" description="基础模型" value="A" />
    <CheckCard title="模型 B" description="快一点点的模型" value="B" />
    <CheckCard
      title="模型 C"
      disabled
      description="速度最快，但是坏了"
      value="C"
    />
  </CheckCard.Group>
);