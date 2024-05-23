import React from 'react'
import { Grid } from '@mui/material';
// project import
import ComponentSkeleton from './ComponentSkeleton';
import MainCard from 'components/MainCard';
import AllLocationTable from 'pages/locations/AllLocationTable';

function Location() {
  return (
    <ComponentSkeleton>
    <Grid container spacing={3}>

      <Grid item xs={12} md={12} lg={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
        <AllLocationTable />
        </MainCard>
      </Grid>
    </Grid>
  </ComponentSkeleton>
  )
}

export default Location