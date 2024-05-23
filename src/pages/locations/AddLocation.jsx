import React from 'react';
import ComponentSkeleton from 'pages/components-overview/ComponentSkeleton';
import { Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import Button from '@mui/material/Button';
import { Stack, InputLabel, Input } from '@mui/material';
import { Container, FormHelperText, MenuItem, Select } from '../../../node_modules/@mui/material/index';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState, useEffect } from 'react';
import { loadOrganisation, saveLocation } from 'utils/user-service';
import { Link, useParams } from '../../../node_modules/react-router-dom/dist/index';
import { toast } from 'react-toastify';

function AddLocation() {
  const { orgId } = useParams();

  const [org, setOrg] = useState({});

  useEffect(() => {
    if (orgId) {
      loadOrganisation(orgId)
        .then((data) => {
          setOrg(data);
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [orgId]);

  const [data, setData] = useState({
    organisationName: '',
    locationUniqueShortName: '',
    locationShortCode: '',
    type: '',
    locationTag: '',
    amenities: '',
    status: '',
    personName: '',
    phoneNumber: '',
    emailId: '',
    designation: '',
    addressLine1: '',
    addressLine2: '',
    landMark: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    latitude: '',
    longitude: ''
  });

  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value });
  };

  const createLocation = (event) => {
    event.preventDefault();

    const locationData = { ...data, orgId: orgId }; // Add orgId to location data
    saveLocation(locationData)
      .then(() => {
        toast.success('Location is registered successfully !!');
        // Optionally, you can reset the form fields after successful submission
        setData({
          organisationName: '',
          locationUniqueShortName: '',
          locationShortCode: '',
          type: '',
          locationTag: '',
          amenities: '',
          status: '',
          personName: '',
          phoneNumber: '',
          emailId: '',
          designation: '',
          addressLine1: '',
          addressLine2: '',
          landMark: '',
          city: '',
          state: '',
          pincode: '',
          country: '',
          latitude: '',
          logitude: ''
        });
      })
      .catch((error) => {
        setError({
          errors: error,
          isError: true
        });
        // toast.error('Failed to register location.');
      });
  };

  const resetData = () => {
    setData({
      organisationName: '',
      locationUniqueShortName: '',
      locationShortCode: '',
      type: '',
      locationTag: '',
      amenities: '',
      status: '',
      personName: '',
      phoneNumber: '',
      emailId: '',
      designation: '',
      addressLine1: '',
      addressLine2: '',
      landMark: '',
      city: '',
      state: '',
      pincode: '',
      country: '',
      latitude: '',
      logitude: ''
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

          <form onSubmit={createLocation}>
            <div style={{ textAlign: 'right', margin: '0 0 20px 0' }}>
            <Link to={`/user/organisations/${orgId}/locations`}>
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
            <p style={{fontSize:"20px"}}>Location Information</p>
            <MainCard sx={{ mt: 2 }} content={false}>
              <Container style={{ marginTop: '8px', marginBottom: '20px' }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="organisationName"></InputLabel>
                      <Input
                        type="text"
                        id="organisationName"
                        name="organisationName"
                        value={org.organisationName || ''}
                        placeholder="Organisation"
                        disabled
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="Organisation unique"></InputLabel>
                      <Input
                        type="text"
                        id="locationUniqueShortName"
                        value={data.locationUniqueShortName}
                        onChange={(e) => handleChange(e, 'locationUniqueShortName')}
                        invalid={error.errors?.response?.data?.locationUniqueShortName ? true : false}
                        placeholder="Location unique Short Name"
                      />
                      <FormHelperText>{error.errors?.response?.data?.locationUniqueShortName}</FormHelperText>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="Organisation unique"></InputLabel>
                      <Input
                        type="text"
                        id="locationShortCode"
                        value={data.locationShortCode}
                        onChange={(e) => handleChange(e, 'locationShortCode')}
                        invalid={error.errors?.response?.data?.locationShortCode ? true : false}
                        placeholder="Location Short Code"
                        inputProps={{ maxLength: 5 }}
                      />
                      <FormHelperText>{error.errors?.response?.data?.locationShortCode}</FormHelperText>
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
                        <MenuItem value={'Public'}>Public</MenuItem>
                        <MenuItem value={'Private'}>Private</MenuItem>
                        <MenuItem value={'Restricted'}>Restricted</MenuItem>
                        <MenuItem value={'Captive'}>Captive</MenuItem>
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
                        id="amenities"
                        value={data.amenities}
                        onChange={(e) => handleChange(e, 'amenities')}
                        displayEmpty
                        sx={{ color: data.amenities ? 'inherit' : '#aaa' }}
                      >
                        <MenuItem value="" disabled>
                          Select Amenities
                        </MenuItem>
                        <MenuItem value={'wifi'}>wifi</MenuItem>
                        <MenuItem value={'mall'}>mall</MenuItem>
                        <MenuItem value={'toilet'}>toilet</MenuItem>
                        <MenuItem value={'cafe'}>cafe</MenuItem>
                        <MenuItem value={'pump'}>pump</MenuItem>
                        <MenuItem value={'restaurant'}>restaurant</MenuItem>
                        <MenuItem value={'firesafety'}>firesafety</MenuItem>
                        <MenuItem value={'park'}>park</MenuItem>
                        <MenuItem value={'supermarket'}>supermarket</MenuItem>
                        <MenuItem value={'theater'}>theater</MenuItem>
                      </Select>
                      <FormHelperText>{error.errors?.response?.data?.amenities}</FormHelperText>
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
                        sx={{ color: data.status ? 'inherit' : '#aaa' }}
                      >
                        <MenuItem value="" disabled className="placeholder">
                          Select Status
                        </MenuItem>
                        <MenuItem value={'Active'}>Active</MenuItem>
                        <MenuItem value={'Pending'}>Pending</MenuItem>
                        <MenuItem value={'Retired'}>Retired</MenuItem>
                        <MenuItem value={'Blocked'}>Blocked</MenuItem>
                        <MenuItem value={'Draft'}>Draft</MenuItem>
                      </Select>
                      {/* <FormHelperText>{error.errors?.response?.data?.status}</FormHelperText> */}
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

                      <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="Organisation unique"></InputLabel>
                          <Input
                            type="text"
                            id="latitude"
                            value={data.latitude}
                            onChange={(e) => handleChange(e, 'latitude')}
                            invalid={error.errors?.response?.data?.latitude ? true : false}
                            placeholder="Latitude"
                          />
                          <FormHelperText>{error.errors?.response?.data?.latitude}</FormHelperText>
                        </Stack>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="Organisation unique"></InputLabel>
                          <Input
                            type="text"
                            id="logitude"
                            value={data.logitude}
                            onChange={(e) => handleChange(e, 'logitude')}
                            invalid={error.errors?.response?.data?.logitude ? true : false}
                            placeholder="Logitude"
                          />
                          <FormHelperText>{error.errors?.response?.data?.logitude}</FormHelperText>
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

export default AddLocation;
