import React from 'react';

import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
// import PeopleIcon from '@mui/icons-material/People';
import { Link, useLocation } from 'react-router-dom';
import { useParams } from '../../../node_modules/react-router-dom/dist/index';
import { useEffect } from 'react';
import { loadOrganisation } from 'utils/user-service';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';

function Navbar() {

  const { orgId } = useParams();

  useEffect(() => {
    if (orgId) {
      loadOrganisation(orgId)
        .then((data) => {
          setOrg(data);
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [orgId]);

    const location = useLocation();
  
    const isActive = (pathname) => {
      return location.pathname === pathname ? { color: 'green' } : {};
    };
  return (
    <Toolbar sx={{ display: 'flex', gap: '40px' }}>
      <Link to={`/user/organisations/${orgId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ display: 'flex', alignItems: 'center', ...isActive(`/user/organisations/${orgId}`) }}>
            <IconButton color="inherit">
              <CorporateFareIcon sx={{ fontSize: 32 }} />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ ml: 1, fontSize: 18, }}>
              Organisation Information
            </Typography>
          </div>
        </Link>

        <Link to={`/user/organisations/${orgId}/locations`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ display: 'flex', alignItems: 'center', ...isActive(`/user/organisations/${orgId}/locations`) }}>
            <IconButton color="inherit">
              <LocationOnIcon sx={{ fontSize: 32 }} />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ ml: 1, fontSize: 18, }}>
              Location
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
