import ComponentSkeleton from 'pages/components-overview/ComponentSkeleton';
import { Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import Button from '@mui/material/Button';
import { loadAllOrganisation, signUp } from 'utils/user-service';
import { toast } from 'react-toastify';

import React, { useEffect, useState } from 'react';
import { Stack, InputLabel, Input } from '@mui/material';
import { Container, Select, FormHelperText, MenuItem } from '../../../node_modules/@mui/material/index';
import { Link } from '../../../node_modules/react-router-dom/dist/index';

function AddOperator() {

    const [orgs, setOrg] = useState([])
    const [data, setData] = useState({
        firstName:'',
        lastName:'',
        phone:'',
        email:'',
        password:'',
        confirmPassword:'',
        roleName:'',
        type:'',
        orgId:-1
  });

    useEffect(() => {     
        {
          loadAllOrganisation()       
          .then((data) => {         
            setOrg(data);       
          })       
          .catch((error) => {         
            console.log(error);       
          });
        }   
  }, []);


  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value });
  };

  const fieldChange = (event) => {
    setData({...data, [event.target.name] : event.target.value })
  }

  const submitForm = (event) => {
    event.preventDefault();
    signUp(data)
      .then(() => {
        toast.success('User registered');
        setData({
            firstName:'',
            lastName:'',
            phone:'',
            email:'',
            password:'',
            confirmPassword:'',
            roleName:'',
            type:'',
            orgId:''
        })
      })
      .catch((error) => {
        console.log(error);
        setError({
          errors: error,
          isError: true
        });
      });
  };

  const resetData = () => {
    setData({

        firstName:'',
        lastName:'',
        phone:'',
        email:'',
        password:'',
        confirmPassword:'',
        roleName:'',
        type:''

    });
  };

  const [error, setError] = useState({
    errors: {},
    isError: false
  });

  return (
    <ComponentSkeleton>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item />
          </Grid>
          
          <form onSubmit={submitForm}>
            <div style={{ textAlign: 'right', margin: '0 0 20px 0' }}>
            <Link to={`/user/operators`}>
            <Button variant="contained" color="success" style={{ margin: '0 10px 0 0' }}>
                Cancel
              </Button>
            </Link>
              <Button variant="contained" color="success" onClick={resetData} style={{ margin: '0 10px 0 0' }}>
                Reset
              </Button>
              <Button type="submit" variant="contained" color="success">
                Save
              </Button>
            </div>

            <MainCard sx={{ mt: 2 }} content={false}>
              <Container style={{ marginTop: '8px', marginBottom: '20px' }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="Organisation Type"></InputLabel>
                      <Select
                        variant="standard"
                        type="text"
                        id="type"
                        name="type"
                        value={data.type}
                        onChange={(e) => handleChange(e, 'type')}                
                        invalid={error.errors?.response?.data?.type ? true : false}
                        displayEmpty
                        sx={{ color: data.type ? 'inherit' : '#aaa' }}
                      >
                        <MenuItem value="" disabled className="placeholder">
                          Organisation Type
                        </MenuItem>
                        <MenuItem value={'EMSLP'}>EMSLP</MenuItem>
                        <MenuItem value={'VENDOR'}>VENDOR</MenuItem>
                        <MenuItem value={'EMSDP'}>EMSDP</MenuItem>
                      </Select>
                      <FormHelperText>{error.errors?.response?.data?.type}</FormHelperText>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="Organisation Name"></InputLabel>
                      <Select
                        variant="standard"
                        type="text"
                        id="organisation"
                        name="orgId"
                        onChange={fieldChange}
                        displayEmpty
                        defaultValue={0}
                        sx={{ color: data.orgId ? 'inherit' : '#aaa' }}
                      >
                        <MenuItem value={0} disabled className="placeholder">
                          Organisation
                        </MenuItem>
                            {orgs.map((organisation) => (
                              <MenuItem value={organisation.orgId} key={organisation.orgId}>
                                {organisation.organisationName}
                              </MenuItem>
                            ))}
                      </Select>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="Role Name"></InputLabel>
                      <Select
                        variant="standard"
                        type="text"
                        id="roleName"
                        name="roleName"
                        value={data.roleName}
                        onChange={(e) => handleChange(e, 'roleName')}
                        invalid={error.errors?.response?.data?.roleName ? true : false}
                        displayEmpty
                        sx={{ color: data.roleName ? 'inherit' : '#aaa' }}
                      >
                        <MenuItem value="" disabled className="placeholder">
                          Role Name
                        </MenuItem>
                        <MenuItem value={'ADMIN'}>ADMIN</MenuItem>
                        <MenuItem value={'VENDOR'}>VENDOR</MenuItem>
                        <MenuItem value={'OWNER'}>OWNER</MenuItem>
                      </Select>
                      <FormHelperText>{error.errors?.response?.data?.roleName}</FormHelperText>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="First Name"></InputLabel>
                      <Input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={data.firstName}
                        onChange={(e) => handleChange(e, 'firstName')}
                        invalid={error.errors?.response?.data?.firstName ? true : false}
                        placeholder="First Name"
                      />
                      <FormHelperText>{error.errors?.response?.data?.firstName}</FormHelperText>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="Last Name"></InputLabel>
                      <Input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={data.lastName}
                        onChange={(e) => handleChange(e, 'lastName')}
                        invalid={error.errors?.response?.data?.lastName ? true : false}
                        placeholder="Last Name"
                      />
                      <FormHelperText>{error.errors?.response?.data?.lastName}</FormHelperText>
                    </Stack>
                  </Grid>

                
                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="Email"></InputLabel>
                      <Input
                        type="text"
                        id="email"
                        name="email"
                        value={data.email}
                        onChange={(e) => handleChange(e, 'email')}
                        invalid={error.errors?.response?.data?.email ? true : false}
                        placeholder="Email"
                      />
                      <FormHelperText>{error.errors?.response?.data?.email}</FormHelperText>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="Phone Number"></InputLabel>
                      <Input
                        type="text"
                        id="phone"
                        name="phone"
                        value={data.phone}
                        onChange={(e) => handleChange(e, 'phone')}
                        invalid={error.errors?.response?.data?.phone ? true : false}
                        placeholder="Phone Number"
                      />
                      <FormHelperText>{error.errors?.response?.data?.phone}</FormHelperText>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="Password"></InputLabel>
                      <Input
                        type="password"
                        id="password"
                        name="password"
                        value={data.password}
                        onChange={(e) => handleChange(e, 'password')}
                        invalid={error.errors?.response?.data?.password ? true : false}
                        placeholder="Password"
                      />
                      <FormHelperText>{error.errors?.response?.data?.password}</FormHelperText>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="Confirm Password"></InputLabel>
                      <Input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={data.confirmPassword}
                        onChange={(e) => handleChange(e, 'confirmPassword')}
                        invalid={error.errors?.response?.data?.confirmPassword ? true : false}
                        placeholder="Confirm Password"
                      />
                      <FormHelperText>{error.errors?.response?.data?.confirmPassword}</FormHelperText>
                    </Stack>
                  </Grid>


                </Grid>
              </Container>
            </MainCard>

          </form>
        </Grid>
      </Grid>
    </ComponentSkeleton>
  );
}

export default AddOperator;
