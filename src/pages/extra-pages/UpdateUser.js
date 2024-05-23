import React from 'react';

import ComponentSkeleton from 'pages/components-overview/ComponentSkeleton';
import { Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import Button from '@mui/material/Button';
import { Stack, InputLabel, Input } from '@mui/material';
import { Container, MenuItem, Select } from '../../../node_modules/@mui/material/index';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useState, useEffect } from 'react';
import { doUpdateOperators, loadSingleOperators } from 'utils/user-service';
import { Link, useNavigate, useParams } from '../../../node_modules/react-router-dom/dist/index';
import { toast } from 'react-toastify';
import './OrdersTable.css';

function UpdateUser() {

  const { orgId, userId } = useParams();
  const [data, setData] = useState({});

  const [initialValues, setInitialValues] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (orgId) {
      loadSingleOperators(orgId, userId)
        .then((data) => {
          setData(data);
          setInitialValues(data);
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [orgId, userId]);

  const handleChange = (property, value) => {
    setData({ ...data, [property]: value });
  };

  const navigate = useNavigate();

  const updateForm = () => {

    doUpdateOperators(data, orgId, userId)
      .then(() => {
        toast.success('User Updated');
        setEditMode(false);
        navigate('/user/operators')
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSaveClick = () => {
    if (editMode) {
      const isDataChanged = Object.keys(data).some((key) => data[key] !== initialValues[key]);

      if (isDataChanged) {
        updateForm();
      }
      //      setEditMode(false);
    } else {
      setEditMode(true);
    }
  };

  return (
    <ComponentSkeleton>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item />
          </Grid>
          <form onSubmit={updateForm}>

            <MainCard sx={{ mt: 2 }} content={false}>
              <Container style={{ marginTop: '8px', marginBottom: '20px' }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="firstName"></InputLabel>
                      <Input
                        type="text"
                        id="firstName"
                        value={data.firstName || ''}
                        onChange={(e) => handleChange('firstName', e.target.value)}
                        placeholder="First Name"
                        disabled={!editMode}
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="lastName"></InputLabel>
                      <Input
                        type="text"
                        id="lastName"
                        value={data.lastName || ''}
                        onChange={(e) => handleChange('lastName', e.target.value)}
                        placeholder="Last Name"
                        disabled={!editMode} // Set disabled based on editMode
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="Organisation unique"></InputLabel>
                      <Input
                        type="text"
                        id="email"
                        value={data.email || ''}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="Email"
                        disabled={!editMode}
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="Organisation unique"></InputLabel>
                      <Input
                        type="text"
                        id="phone"
                        value={data.phone || ''}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="phone"
                        disabled={!editMode}
                      />
                    </Stack>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="Password"></InputLabel>
                      <Input
                        type="password"
                        id="password"
                        name="password"
                        value={data.password || ''}
                        onChange={(e) => handleChange(e, 'password')}
                        placeholder="Password"
                        //style={{ display: 'none' }}
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="Confirm Password"></InputLabel>
                      <Input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={data.confirmPassword || ''}
                        onChange={(e) => handleChange(e, 'confirmPassword')}
                        placeholder="Confirm Password"
                        //style={{ display: 'none' }}
                      />
                    </Stack>
                  </Grid>

                </Grid>
              </Container>
            </MainCard>

            <MainCard sx={{ mt: 2 }} content={false}>
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                  <h3>Primary Contact</h3>
                </AccordionSummary>
                <AccordionDetails>
                  <Container style={{ marginTop: '8px', marginBottom: '20px' }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="organisationName">Organisation Name</InputLabel>
                          <Input
                        type="text"
                        id="organisationName"
                        name="organisationName"
                        value={data.organisation && data.organisation.organisationName ? data.organisation.organisationName : ''}
                        placeholder="Organisation"
                        disabled
                      />
                        </Stack>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="roleName">Role Name</InputLabel>
                          <Select
                            variant="standard"
                            type="text"
                            id="roleName"
                            value={data.roleName || ''}
                            onChange={(e) => handleChange('roleName', e.target.value)}
                            displayEmpty
                            sx={{ color: data.roleName ? 'inherit' : '#aaa' }}
                          >
                            <MenuItem value="" disabled>
                              Select Role Name
                            </MenuItem>
                            <MenuItem value={'ADMIN'}>ADMIN</MenuItem>
                            <MenuItem value={'OWNER'}>OWNER</MenuItem>
                            <MenuItem value={'VENDOR'}>VENDOR</MenuItem>
                          </Select>
                        </Stack>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="type">Type</InputLabel>
                          <Select
                            variant="standard"
                            type="text"
                            id="type"
                            value={data.type || ''}
                            onChange={(e) => handleChange('type', e.target.value)}
                            displayEmpty
                            sx={{ color: data.type ? 'inherit' : '#aaa' }}
                          >
                            <MenuItem value="" disabled>
                              Select Type
                            </MenuItem>
                            <MenuItem value={'EMSLP'}>EMSLP</MenuItem>
                            <MenuItem value={'VENDOR'}>VENDOR</MenuItem>
                            <MenuItem value={'EMSDP'}>EMSDP</MenuItem>
                          </Select>
                        </Stack>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="enabled">Access</InputLabel>
                          <Select
                            variant="standard"
                            type="text"
                            id="enabled"
                            value={data.enabled || ''}
                            onChange={(e) => handleChange('enabled', e.target.value)}
                            displayEmpty
                            sx={{ color: data.enabled ? 'inherit' : '#aaa' }}
                          >
                            <MenuItem value="" disabled>
                              Select Access
                            </MenuItem>
                            <MenuItem value={'true'}>Active</MenuItem>
                            <MenuItem value={'false'}>Disabled</MenuItem>
                          </Select>
                        </Stack>
                      </Grid>

                    </Grid>
                  </Container>
                </AccordionDetails>
              </Accordion>
            </MainCard>

            <MainCard sx={{ mt: 2 }} content={false}>
                <Accordion defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                    <h3> </h3>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Container style={{ textAlign: 'center', marginTop: '8px', marginBottom: '20px' }}>

                      <div style={{ margin: '0 0 20px 0' }}>
                        {editMode && (
                          <Link to={`/user/operators`}>
                            <Button variant="contained" color="success" style={{ margin: '0 10px 0 0' }}>
                              Cancel
                            </Button>
                          </Link>
                        )}

                        <Button type={editMode ? 'button' : 'submit'} variant="contained" color="success" onClick={handleSaveClick}>
                          {editMode ? 'Save' : 'Edit'}
                        </Button>
                        <Button variant="contained" color="error" style={{ margin: '0 0 0 5px' }}>
                          Delete
                        </Button>
                      </div>
                      
                    </Container>
                  </AccordionDetails>
                </Accordion>
              </MainCard>
          </form>
        </Grid>
      </Grid>
    </ComponentSkeleton>
  );
}

export default UpdateUser;
