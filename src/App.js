// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css"
import UserProvider from 'context/UserProvider';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
  <UserProvider>
  <ThemeCustomization>
    <ScrollTop>
      <ToastContainer position="bottom-center" />
      <Routes />
    </ScrollTop>
  </ThemeCustomization>
  </UserProvider>
);

export default App;
