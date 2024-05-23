//import Navbar from 'pages/location/Navbar';

import Navbar from "./Navbar";


const Base = ({ children }) => {
  return (
    <div>
      <Navbar />
      { children }
    </div>
  );
};

export default Base;