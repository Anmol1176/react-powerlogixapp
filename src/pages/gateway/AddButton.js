import { Grid } from '@mui/material';
// import { Link, useParams } from 'react-router-dom';
import MainCard from 'components/MainCard';
import ComponentSkeleton from 'pages/components-overview/ComponentSkeleton';
import { Link, useParams } from '../../../node_modules/react-router-dom/dist/index';
import { useEffect } from 'react';
import { loadGatewayByOrganisationAndLocation } from 'utils/user-service';
import { Button } from '../../../node_modules/@mui/material/index';
import GatewayByLocation from './GatewayByLocation';
import Base from 'pages/locations/base';

function AddButton() {
  const { orgId,locationId } = useParams();

  useEffect(() => {

      loadGatewayByOrganisationAndLocation(orgId,locationId)
      .then((data) => {
        setLocationByOrg(data);
      })
      .catch((error) => {
        console.error(error);
      });
    

  }, [orgId,locationId]);

  return (
    <Base>
    <ComponentSkeleton>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <div style={{ textAlign: 'right', margin: '8px 8px 8px 0' }}>
              <Link to={`/user/organisations/${orgId}/locations/${locationId}/gateways/add`} style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="success">
                  + Gateway
                </Button>
              </Link>
            </div>
            <GatewayByLocation />
          </MainCard>
        </Grid>
      </Grid>
    </ComponentSkeleton>
    </Base>
  );
}

export default AddButton;
