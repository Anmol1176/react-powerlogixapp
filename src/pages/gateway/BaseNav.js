import Navbar from "./Navbar";


const BaseNav = ({ children }) => {
  return (
    <div>
      <Navbar />
      { children }
    </div>
  );
};

export default BaseNav;