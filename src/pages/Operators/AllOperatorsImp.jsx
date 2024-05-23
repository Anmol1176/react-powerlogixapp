import { Grid } from '@mui/material';
//import { Link, useParams } from 'react-router-dom';
import MainCard from 'components/MainCard';
import ComponentSkeleton from 'pages/components-overview/ComponentSkeleton';
import { Link } from '../../../node_modules/react-router-dom/dist/index';
import { Button } from '../../../node_modules/@mui/material/index';
import AllOperators from './AllOperators';

function AllOperatorsImp() {

  return (
    
    <ComponentSkeleton>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <div style={{ textAlign: 'right', margin: '8px 8px 8px 0' }}>
              <Link to={`/user/operators/add`} style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="success">
                  + Operators
                </Button>
              </Link>
            </div>
            <AllOperators />
          </MainCard>
        </Grid>
      </Grid>
    </ComponentSkeleton>
    
  );
}

export default AllOperatorsImp;
