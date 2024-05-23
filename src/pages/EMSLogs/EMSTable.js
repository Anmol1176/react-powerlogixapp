import { Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import ComponentSkeleton from 'pages/components-overview/ComponentSkeleton';
import EMSTableByGateway from './EMSTableByGateway';
import BaseNav from 'pages/gateway/BaseNav';

function EMSTable() {

  return (
    <BaseNav>
    <ComponentSkeleton>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <EMSTableByGateway />
          </MainCard>
        </Grid>
      </Grid>
    </ComponentSkeleton>
    </BaseNav>
  );
}

export default EMSTable;
