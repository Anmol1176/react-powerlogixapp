import ComponentSkeleton from 'pages/components-overview/ComponentSkeleton';
import { Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import Button from '@mui/material/Button';
import { createOrg } from 'utils/user-service';
import { toast } from 'react-toastify';

import React, { useState } from 'react';
import { Stack, InputLabel, Input } from '@mui/material';
import { Container, Select, FormHelperText, MenuItem } from '../../../node_modules/@mui/material/index';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from '../../../node_modules/react-router-dom/dist/index';

function AddOrg() {
  const [data, setData] = useState({
    organisationUniqueShortName: '',
    organisationShortCode: '',
    organisationName: '',
    companyIdentificationNumber: '',
    gstNumber: '',
    type: '',
    status: '',
    emsOperator: '',
    personName: '',
    phoneNumber: '',
    emailId: '',
    designation: '',
    addressLine1: '',
    addressLine2: '',
    landMark: '',
    city: '',
    state: '',
    country: ''
  });

  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value });
  };

  const submitForm = (event) => {
    event.preventDefault();
    createOrg(data)
      .then(() => {
        toast.success('Organisation registered');
        setData({
          organisationUniqueShortName: '',
          organisationShortCode: '',
          organisationName: '',
          companyIdentificationNumber: '',
          gstNumber: '',
          type: '',
          status: '',
          emsOperator: '',
          personName: '',
          phoneNumber: '',
          emailId: '',
          designation: '',
          addressLine1: '',
          addressLine2: '',
          landMark: '',
          city: '',
          state: '',
          country: ''
        });
      })
      .catch((error) => {
        setError({
          errors: error,
          isError: true
        });
      });
  };

  const resetData = () => {
    setData({
      organisationUniqueShortName: '',
      organisationShortCode: '',
      organisationName: '',
      companyIdentificationNumber: '',
      gstNumber: '',
      type: '',
      status: '',
      emsOperator: '',
      personName: '',
      phoneNumber: '',
      emailId: '',
      designation: '',
      addressLine1: '',
      addressLine2: '',
      landMark: '',
      city: '',
      state: '',
      country: ''
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
              <Link to="/user/organisation">
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
                      <InputLabel htmlFor="Organisation unique"></InputLabel>
                      <Input
                        type="text"
                        id="organisationUniqueShortName"
                        value={data.organisationUniqueShortName}
                        onChange={(e) => handleChange(e, 'organisationUniqueShortName')}
                        invalid={error.errors?.response?.data?.organisationUniqueShortName ? true : false}
                        placeholder="Organisation unique Short Name"
                      />
                      <FormHelperText>{error.errors?.response?.data?.organisationUniqueShortName}</FormHelperText>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="Organisation unique"></InputLabel>
                      <Input
                        type="text"
                        id="organisationShortCode"
                        value={data.organisationShortCode}
                        onChange={(e) => handleChange(e, 'organisationShortCode')}
                        invalid={error.errors?.response?.data?.organisationShortCode ? true : false}
                        placeholder="Organisation Short Code"
                        inputProps={{ maxLength: 5 }}
                      />
                      <FormHelperText>{error.errors?.response?.data?.organisationShortCode}</FormHelperText>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="Organisation unique"></InputLabel>
                      <Input
                        type="text"
                        id="organisationName"
                        value={data.organisationName}
                        onChange={(e) => handleChange(e, 'organisationName')}
                        invalid={error.errors?.response?.data?.organisationName ? true : false}
                        placeholder="Organisation Name"
                      />
                      <FormHelperText>{error.errors?.response?.data?.organisationName}</FormHelperText>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="Organisation unique"></InputLabel>
                      <Input
                        type="text"
                        id="companyIdentificationNumber"
                        value={data.companyIdentificationNumber}
                        onChange={(e) => handleChange(e, 'companyIdentificationNumber')}
                        invalid={error.errors?.response?.data?.companyIdentificationNumber ? true : false}
                        placeholder="Company Identification Number"
                      />
                      <FormHelperText>{error.errors?.response?.data?.companyIdentificationNumber}</FormHelperText>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="Organisation unique"></InputLabel>
                      <Input
                        type="text"
                        id="gstNumber"
                        value={data.gstNumber}
                        onChange={(e) => handleChange(e, 'gstNumber')}
                        invalid={error.errors?.response?.data?.gstNumber ? true : false}
                        placeholder="GST Number"
                      />
                      <FormHelperText>{error.errors?.response?.data?.gstNumber}</FormHelperText>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="Organisation unique"></InputLabel>
                      <Select
                        variant="standard"
                        type="text"
                        id="type"
                        value={data.type}
                        onChange={(e) => handleChange(e, 'type')}
                        displayEmpty
                        sx={{ color: data.type ? 'inherit' : '#aaa' }}
                      >
                        <MenuItem value="" disabled className="placeholder">
                          Select Type
                        </MenuItem>
                        <MenuItem value={'EMSLP'}>EMSLP</MenuItem>
                        <MenuItem value={'VENDOR'}>VENDOR</MenuItem>
                        <MenuItem value={'EMSDP'}>EMSDP</MenuItem>
                      </Select>
                      {/* <FormHelperText>{error.errors?.response?.data?.type}</FormHelperText> */}
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="Organisation unique"></InputLabel>
                      <Select
                        variant="standard"
                        type="text"
                        id="status"
                        value={data.status}
                        onChange={(e) => handleChange(e, 'status')}
                        displayEmpty
                        // sx={{ color: data.status ? 'inherit' : '#aaa' }}
                      >
                        <MenuItem value="" disabled className="placeholder">
                          Select Status
                        </MenuItem>
                        <MenuItem value={'Active'} >Active</MenuItem>
                        <MenuItem value={'Pending'} >Pending</MenuItem>
                        <MenuItem value={'Retired'} >Retired</MenuItem>
                        <MenuItem value={'Blocked'}>Blocked</MenuItem>
                        <MenuItem value={'Draft'} >Draft</MenuItem>
                      </Select>
                      {/* <FormHelperText>{error.errors?.response?.data?.status}</FormHelperText> */}
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="Organisation unique"></InputLabel>
                      <Input
                        type="text"
                        id="emsOperator"
                        value={data.emsOperator}
                        onChange={(e) => handleChange(e, 'emsOperator')}
                        invalid={error.errors?.response?.data?.emsOperator ? true : false}
                        placeholder="EMS Operator"
                      />
                      <FormHelperText>{error.errors?.response?.data?.emsOperator}</FormHelperText>
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
                          <InputLabel htmlFor="personName"></InputLabel>
                          <Input
                            type="text"
                            id="personName"
                            value={data.personName}
                            onChange={(e) => handleChange(e, 'personName')}
                            invalid={error.errors?.response?.data?.personName ? true : false}
                            placeholder="Person Name*"
                          />
                          <FormHelperText>{error.errors?.response?.data?.personName}</FormHelperText>
                        </Stack>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="Organisation unique"></InputLabel>
                          <Input
                            type="text"
                            id="phoneNumber"
                            value={data.phoneNumber}
                            onChange={(e) => handleChange(e, 'phoneNumber')}
                            invalid={error.errors?.response?.data?.phoneNumber ? true : false}
                            placeholder="Phone Number*"
                          />
                          <FormHelperText>{error.errors?.response?.data?.phoneNumber}</FormHelperText>
                        </Stack>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="Organisation unique"></InputLabel>
                          <Input
                            type="email"
                            value={data.emailId}
                            id="emailId"
                            onChange={(e) => handleChange(e, 'emailId')}
                            invalid={error.errors?.response?.data?.emailId ? true : false}
                            placeholder="Email ID*"
                          />
                          <FormHelperText>{error.errors?.response?.data?.emailId}</FormHelperText>
                        </Stack>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="Organisation unique"></InputLabel>
                          <Input
                            type="text"
                            id="designation"
                            value={data.designation}
                            onChange={(e) => handleChange(e, 'designation')}
                            invalid={error.errors?.response?.data?.designation ? true : false}
                            placeholder="Designation"
                          />
                          <FormHelperText>{error.errors?.response?.data?.designation}</FormHelperText>
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
                  <h3>Address: </h3>
                </AccordionSummary>
                <AccordionDetails>
                  <Container style={{ marginTop: '8px', marginBottom: '20px' }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="Organisation unique"></InputLabel>
                          <Input
                            type="text"
                            id="addressLine1"
                            value={data.addressLine1}
                            onChange={(e) => handleChange(e, 'addressLine1')}
                            invalid={error.errors?.response?.data?.addressLine1 ? true : false}
                            placeholder="Address Line1"
                          />
                          <FormHelperText>{error.errors?.response?.data?.addressLine1}</FormHelperText>
                        </Stack>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="Organisation unique"></InputLabel>
                          <Input
                            type="text"
                            id="addressLine2"
                            value={data.addressLine2}
                            onChange={(e) => handleChange(e, 'addressLine2')}
                            invalid={error.errors?.response?.data?.addressLine2 ? true : false}
                            placeholder="Address Line2"
                          />
                          <FormHelperText>{error.errors?.response?.data?.addressLine2}</FormHelperText>
                        </Stack>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="Organisation unique"></InputLabel>
                          <Input
                            type="text"
                            id="landMark"
                            value={data.landMark}
                            onChange={(e) => handleChange(e, 'landMark')}
                            invalid={error.errors?.response?.data?.landMark ? true : false}
                            placeholder="Landmark"
                          />
                          <FormHelperText>{error.errors?.response?.data?.landMark}</FormHelperText>
                        </Stack>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="Organisation unique"></InputLabel>
                          <Input
                            type="text"
                            id="city"
                            value={data.city}
                            onChange={(e) => handleChange(e, 'city')}
                            invalid={error.errors?.response?.data?.city ? true : false}
                            placeholder="City"
                          />
                          <FormHelperText>{error.errors?.response?.data?.city}</FormHelperText>
                        </Stack>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="Organisation unique"></InputLabel>
                          <Input
                            type="text"
                            id="state"
                            value={data.state}
                            onChange={(e) => handleChange(e, 'state')}
                            invalid={error.errors?.response?.data?.state ? true : false}
                            placeholder="State"
                          />
                          <FormHelperText>{error.errors?.response?.data?.state}</FormHelperText>
                        </Stack>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="Organisation unique"></InputLabel>
                          <Input
                            type="text"
                            id="pincode"
                            value={data.pincode}
                            onChange={(e) => handleChange(e, 'pincode')}
                            invalid={error.errors?.response?.data?.pincode ? true : false}
                            placeholder="Pin\Zip Code"
                          />
                          <FormHelperText>{error.errors?.response?.data?.pincode}</FormHelperText>
                        </Stack>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="Organisation unique"></InputLabel>
                          <Input
                            type="text"
                            id="country"
                            value={data.country}
                            onChange={(e) => handleChange(e, 'country')}
                            invalid={error.errors?.response?.data?.country ? true : false}
                            placeholder="Country"
                          />
                          <FormHelperText>{error.errors?.response?.data?.country}</FormHelperText>
                        </Stack>
                      </Grid>
                    </Grid>
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

export default AddOrg;
