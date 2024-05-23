// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined
} from '@ant-design/icons';

// icons
const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //


const utilities = {
  id: 'utilities',
  title: 'MANAGE',
  type: 'group',
  children: [
    {
      id: 'util-Organisation',
      title: 'Organisation',
      type: 'item',
      url: '/user/organisation',
      icon: icons.FontSizeOutlined,
      // breadcrumbs: true
    },
    {
      id: 'util-Locations',
      title: 'Locations',
      type: 'item',
      url: '/user/location',
      icon: icons.BgColorsOutlined
    },
    {
      id: 'util-Gateway',
      title: 'Gateway',
      type: 'item',
      url: '/user/gateway',
      icon: icons.BarcodeOutlined
    },
    {
      id: 'ant-Nodes',
      title: 'Nodes',
      type: 'item',
      url: '/user/nodes',
      icon: icons.AntDesignOutlined,
    },
    {
      id: 'operators',
      title: 'Operators',
      type: 'item',
      url: '/user/operators',
      icon: icons.AntDesignOutlined,
    }
    
  ]
};

export default utilities;
