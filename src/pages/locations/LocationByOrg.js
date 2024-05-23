import { Grid } from '@mui/material';
//import { Link, useParams } from 'react-router-dom';
import MainCard from 'components/MainCard';
import LocationTable from 'pages/locations/LocationTable';
import ComponentSkeleton from 'pages/components-overview/ComponentSkeleton';
import { Link, useParams } from '../../../node_modules/react-router-dom/dist/index';
import { useEffect } from 'react';
import { loadLocationsByOrganisation } from 'utils/user-service';
import { Button } from '../../../node_modules/@mui/material/index';
import Base from 'pages/authBase/Base';

function LocationByOrg() {
  const { orgId } = useParams();

  useEffect(() => {
    if(orgId){
      loadLocationsByOrganisation(orgId)
      .then((data) => {
        setLocationByOrg(data);
      })
      .catch((error) => {
        console.error(error);
      });
    }

  }, [orgId]);

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
              <Link to={`/user/organisations/${orgId}/locations/add`} style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="success">
                  + Location
                </Button>
              </Link>
            </div>
            <LocationTable />
          </MainCard>
        </Grid>
      </Grid>
    </ComponentSkeleton>
   </Base>
  );
}

export default LocationByOrg;
