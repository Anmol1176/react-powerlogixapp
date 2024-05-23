import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import AddOrg from 'pages/organisation/AddOrg';
import UpdateOrg from 'pages/organisation/UpdateOrg';
import AddLocation from 'pages/locations/AddLocation';
import LocationByOrg from 'pages/locations/LocationByOrg';
import UpdateLocations from 'pages/locations/UpdateLocations';
import Nodes from 'pages/Nodes/Nodes';
import AddButton from 'pages/gateway/AddButton';
import AddGatewayForm from 'pages/gateway/AddGatewayForm';
import UpdateUser from 'pages/extra-pages/UpdateUser';
import AllOperatorsImp from 'pages/Operators/AllOperatorsImp';
import AddOperator from 'pages/Operators/AddOperator';
import UpdateGateway from 'pages/gateway/UpdateGateway';
import AddGatewayFull from 'pages/gateway/AddGatewayFull';
import AddFullButton from 'pages/gateway/AddFullButton';
import EMSTable from 'pages/EMSLogs/EMSTable';
import NodeTable from 'pages/Nodes/NodeTable';
//import { useParams } from 'react-router-dom';
// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const Userpage = Loadable(lazy(() => import('pages/extra-pages/UserPage')));

// render - utilities
const Organisation = Loadable(lazy(() => import('pages/components-overview/Organisation')));
const Location = Loadable(lazy(() => import('pages/components-overview/Location')));
//const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
//const Gateway = Loadable(lazy(() => import('pages/components-overview/Gateway')));

// ==============================|| MAIN ROUTING ||============================== //


// Define route configurations based on user roles
// const adminRoutes = [
//   // Define admin routes
// ];

// const managerRoutes = [
//   // Define manager routes
// ];

// const userRoutes = [
//   // Define user routes
// ];


// const userRole = getUserRole(); // Get the user's role

// let accessibleRoutes = [];

// // Determine accessible routes based on user role
// if (userRole === 'admin') {
//     accessibleRoutes = [...adminRoutes, ...managerRoutes, ...userRoutes];
// } else if (userRole === 'manager') {
//     accessibleRoutes = [...managerRoutes, ...userRoutes];
// } else {
//     accessibleRoutes = [...userRoutes];
// }


const MainRoutes = {
  
  path: '/user',
  element: <MainLayout />,
  children: [
    {
      path: 'dashboard',
      element: <DashboardDefault />
    },
    {
      path: 'organisation',
      element: <Organisation />
    },
    {
      path: 'organisations/:orgId',
      element: <UpdateOrg />
    },
    {
      path: 'addOrg',
      element: <AddOrg />
    },
    {
      path: 'location',
      element: <Location />
    },
    {
      path: 'organisations/:orgId/locations/add',
      element: <AddLocation />
    },
    {
      path: 'organisations/:orgId/locations',
      element:<LocationByOrg />
    },
    {
      path: 'organisations/:orgId/locations/:locationId',
      element: <UpdateLocations />
    },
    {
      path: 'gateway',
      element: <AddFullButton />
    },
    {
      path: 'organisations/:orgId/locations/:locationId/gateways',
      element: <AddButton />
    },
    {
      path: 'organisations/:orgId/locations/:locationId/gateways/add',
      element: <AddGatewayForm />
    },
    {
      path: 'gateways/org/:orgId/location/:locationId/gateway/:gatewayId',
      element: <UpdateGateway />
    },
    {
      path: 'gateway/:gatewayId/emslogs',
      element: <EMSTable />
    },
    {
      path: 'gateways/add',
      element: <AddGatewayFull />
    },
    {
      path: 'users',
      element: <Userpage />
    },
    {
      path: 'organisations/:orgId/user/:userId',
      element: <UpdateUser />
    },
    {
      path: 'operators',
      element: <AllOperatorsImp />
    },
    {
      path: 'operators/add',
      element: <AddOperator />
    },
    {
      path: 'nodes',
      element: <Nodes />
    },
    {
      path: 'node/:nodeId',
      element: <NodeTable />
    },
  ]
};
 

export default MainRoutes;
