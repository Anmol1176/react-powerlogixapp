import React, { useEffect } from 'react';

import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
// import PeopleIcon from '@mui/icons-material/People';
import { Link, useLocation } from 'react-router-dom';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import { useParams } from '../../../node_modules/react-router-dom/dist/index';
import {  loadEMSTableByGateway } from 'utils/user-service';

function Navbar() {

  const { orgId,locationId,  gatewayId } = useParams();
  const location = useLocation();
  
    const isActive = (pathname) => {
      return location.pathname === pathname ? { color: 'green' } : {};
    };

    useEffect(() => {
      if(gatewayId){
        loadEMSTableByGateway(gatewayId)
        .then(() => {
          //setData(data);
        })
        .catch((error) => {
          console.error(error);
        });
      }
  
    }, [gatewayId]);

  return (
    <Toolbar sx={{ display: 'flex', gap: '40px' }}>
      <Link to={`/user/gateway`}  style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ display: 'flex', alignItems: 'center', ...isActive(`/user/gateways/org/${orgId}/location/${locationId}/gateway/${gatewayId}`) }}>
            <IconButton color="inherit">
              <CorporateFareIcon sx={{ fontSize: 32 }} />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ ml: 1, fontSize: 18, }}>
              Gateway Information
            </Typography>
          </div>
        </Link>

        <Link  to={`/user/gateway/${gatewayId}/emslogs`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ display: 'flex', alignItems: 'center', ...isActive(`/user/gateway/${gatewayId}/emslogs`) }}>
            <IconButton color="inherit">
              <LocationOnIcon sx={{ fontSize: 32 }} />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ ml: 1, fontSize: 18, }}>
              EMS Logs
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
