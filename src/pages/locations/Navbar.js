import React from 'react';

import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FenceIcon from '@mui/icons-material/Fence';
// import PeopleIcon from '@mui/icons-material/People';
import { Link, useLocation } from 'react-router-dom';
import { useParams } from '../../../node_modules/react-router-dom/dist/index';
import { useEffect } from 'react';
import { loadLocation } from 'utils/user-service';

function Navbar() {

  const { orgId,locationId } = useParams();

  useEffect(() => {
      loadLocation(orgId,locationId)
        .then((data) => {
          setOrg(data);

        })
        .catch((error) => {
          console.log(error);
        });
  }, [orgId,locationId]);

    const location = useLocation();
  
    const isActive = (pathname) => {
      return location.pathname === pathname ? { color: 'green' } : {};
    };
  return (
    <Toolbar sx={{ display: 'flex', gap: '40px' }}>
      
      <Link to={`/user/organisations/${orgId}/locations/${locationId}`}  style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ display: 'flex', alignItems: 'center', ...isActive(`/user/organisations/${orgId}/locations/${locationId}`) }}>
            <IconButton color="inherit">
              <FenceIcon sx={{ fontSize: 32 }} />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ ml: 1, fontSize: 18 }}>
              Location Information
            </Typography>
          </div>
        </Link>


        <Link to={`/user/organisations/${orgId}/locations/${locationId}/gateways`}  style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ display: 'flex', alignItems: 'center', ...isActive(`/user/organisations/${orgId}/locations/${locationId}/gateways`) }}>
            <IconButton color="inherit">
              <FenceIcon sx={{ fontSize: 32 }} />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ ml: 1, fontSize: 18 }}>
              Gateways
            </Typography>
          </div>
        </Link>

        {/* <Link to="/user/operators" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ display: 'flex', alignItems: 'center', ...isActive('/user/operators') }}>
            <IconButton color="inherit">
              <PeopleIcon sx={{ fontSize: 32 }} />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ ml: 1, fontSize: 18 }}>
              Operators
            </Typography>
          </div>
        </Link> */}
     
    </Toolbar>
  );
}

export default Navbar;
