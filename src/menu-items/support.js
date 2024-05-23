// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
  id: 'support',
  title: 'NETWORK',
  type: 'group',
  children: [
    {
      id: 'sample-page',
      title: 'User',
      type: 'item',
      url: '/user/users',
      icon: icons.ChromeOutlined
    }
  ]
};

export default support;
