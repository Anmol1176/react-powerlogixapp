import Navbar from 'pages/organisation/Navbar';


const Base = ({ children }) => {
  return (
    <div>
      <Navbar />
      { children }
    </div>
  );
};

export default Base;
