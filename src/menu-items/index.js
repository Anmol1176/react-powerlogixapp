// project import
import pages from './pages';
import dashboard from './dashboard';
import utilities from './utilities';
import support from './support';
import { isLoggedIn } from 'pages/authentication/auth-forms/index';
//import { toast } from 'react-toastify';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: []
};


if (isLoggedIn()) {
  // User is logged in, allow access to menu items
    menuItems.items.push(dashboard, pages, utilities, support);

  } else {
  // User is not logged in, show login or register page
  if (window.location.pathname !== '/' && window.location.pathname !== '/register') {
    // Redirect to login page
    window.location.href = '/'; 

  }
}

export default menuItems;
