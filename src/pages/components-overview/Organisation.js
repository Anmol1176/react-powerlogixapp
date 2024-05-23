// material-ui
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
// project import
import ComponentSkeleton from './ComponentSkeleton';
import MainCard from 'components/MainCard';
 import OrdersTable from 'pages/dashboard/OrdersTable';
import { Link } from 'react-router-dom';
// ==============================|| COMPONENTS - TYPOGRAPHY ||============================== //

const Organisation = () => (
  <ComponentSkeleton>
    <Grid container spacing={3}>

      <Grid item xs={12} md={12} lg={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
        <div style={{textAlign:'right', margin:'8px 8px 8px 0'}}>
        <Link to="/user/addOrg">
        <Button variant="contained" color="success">
        + Organisation
        </Button>
        </Link>
        </div>
          <OrdersTable />
        </MainCard>
      </Grid>
    </Grid>
  </ComponentSkeleton>
);

export default Organisation;
