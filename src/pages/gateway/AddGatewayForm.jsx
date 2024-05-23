import React, { useEffect, useState } from 'react'
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
import { Link, useParams } from '../../../node_modules/react-router-dom/dist/index';
import { doSaveGateway, loadLocation } from 'utils/user-service';
import { toast } from 'react-toastify';

function AddGatewayForm() {

  const { orgId ,locationId } = useParams();

  const [org, setOrg] = useState({});

  useEffect(() => {
    if (orgId) {
      loadLocation(orgId,locationId)
        .then((data) => {
          setOrg(data);
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [orgId,locationId]);

  const [data, setData] = useState({
    gatewayId:'',
    gatewayPointName:'',
    serialNumber:'',
    controller:'',
    controllerSerialNumber:'',
    firmWareVersion:'',
    siteSurveyNumber:'',
    siteSurveyDate:'',
    warrantyStartDate:'',
    warrantyPeriod:'',
    activationDate:'',
    registrationStatus:'',
    vendorName:'',
    model:'',
    simCardType:'',
    simCardNumber:'',
    simCardMobileNumber:'',
    simCardProvider:'',
    simCardConnectionPayee:'',
    simCardOwner:'',
    addressLine1: '',
    addressLine2: '',
    landMark: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    latitude: '',
    logitude: '',
    orgId:'',
    locationId:''
  });  

  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value });
  };

  const createGateway = (event) => {
    event.preventDefault();

    if (data.gatewayId.trim() === '') {
      toast.error("Gateway id is required !!");
      return;
    }

    if (data.serialNumber.trim() === '') {
      toast.error("Serial number  is required !!");
      return;
    }

    if (data.controller.trim() === '') {
      toast.error("Controller  is required !!");
      return;
    }

    if (data.firmWareVersion.trim() === '') {
      toast.error("FirmWareVersion  is required !!");
      return;
    }

    if (data.registrationStatus.trim() === '') {
      toast.error("RegistrationStatus  is required !!");
      return;
    }

    if (data.simCardType.trim() === '') {
      toast.error("SimCardType  is required !!");
      return;
    }

    if (data.simCardNumber.trim() === '') {
      toast.error("SimCardNumber  is required !!");
      return;
    }
    if (data.simCardMobileNumber.trim() === '') {
      toast.error("SimCardMobileNumber  is required !!");
      return;
    }

    if (data.addressLine1.trim() === '') {
      toast.error("AddressLine1  is required !!");
      return;
    }

    if (data.city.trim() === '') {
      toast.error("City  is required !!");
      return;
    }

    if (data.state.trim() === '') {
      toast.error("State  is required !!");
      return;
    }

    if (data.pincode.trim() === '') {
      toast.error("Pincode  is required !!");
      return;
    }

    if (data.country.trim() === '') {
      toast.error("Country  is required !!");
      return;
    }

    if (data.latitude.trim() === '') {
      toast.error("Latitude  is required !!");
      return;
    }

    if (data.logitude.trim() === '') {
      toast.error("Logitude  is required !!");
      return;
    }

    const gatewayData = { ...data, orgId, locationId };
    doSaveGateway(gatewayData)
      .then(() => {
        toast.success('Gateway registered successfully !!');
        setData({
          gatewayId:'',
          gatewayPointName:'',
          serialNumber:'',
          controller:'',
          controllerSerialNumber:'',
          firmWareVersion:'',
          siteSurveyNumber:'',
          siteSurveyDate:'',
          warrantyStartDate:'',
          warrantyPeriod:'',
          activationDate:'',
          registrationStatus:'',
          vendorName:'',
          model:'',
          simCardType:'',
          simCardNumber:'',
          simCardMobileNumber:'',
          simCardProvider:'',
          simCardConnectionPayee:'',
          simCardOwner:'',
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

          <form onSubmit={createGateway}>
          <div style={{ textAlign: 'right', margin: '0 0 20px 0' }}>
           <Link to={`/user/organisations/${orgId}/locations/${locationId}/gateways`} >
           <Button  variant="contained" color="success" style={{ margin: '0 10px 0 0' }}>
                Cancel
            </Button>
           </Link>

            <Button variant="contained" color="success" style={{ margin: '0 10px 0 0' }}>
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
                      <InputLabel htmlFor="organisationName"></InputLabel>
                      <Input
                        type="text"
                        id="organisationName"
                        name="organisationName"
                        value={org.organisation && org.organisation.organisationName ? org.organisation.organisationName : ''}
                        placeholder="Organisation"
                        disabled
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="locationShortCode"></InputLabel>
                      <Input
                        type="text"
                        id="locationShortCode"
                        value={org.locationShortCode}
                        onChange={(e) => handleChange(e, 'locationShortCode')}
                        placeholder="Location"
                        disabled
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="gatewayId"></InputLabel>
                      <Input
                        type="text"
                        id="gatewayId"
                        value={data.gatewayId}
                        onChange={(e) => handleChange(e, 'gatewayId')}
//                        invalid={error.errors?.response?.data?.gatewayId ? true : false}
                        placeholder="Gateway Id"
                      />
                      {/* <FormHelperText>{error.errors?.response?.data?.gatewayId}</FormHelperText> */}
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="gatewayPointName"></InputLabel>
                      <Input
                        type="text"
                        id="gatewayPointName"
                        value={data.gatewayPointName}
                        onChange={(e) => handleChange(e, 'gatewayPointName')}
                        invalid={error.errors?.response?.data?.gatewayPointName ? true : false}
                        placeholder="Gateway Point Name"
                      />
                      <FormHelperText>{error.errors?.response?.data?.gatewayPointName}</FormHelperText>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="Organisation unique"></InputLabel>
                      <Input
                        type="text"
                        id="serialNumber"
                        value={data.serialNumber}
                        onChange={(e) => handleChange(e, 'serialNumber')}
                        invalid={error.errors?.response?.data?.serialNumber ? true : false}
                        placeholder="Gateway Serial Number"
                      />
                      <FormHelperText>{error.errors?.response?.data?.serialNumber}</FormHelperText>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="Controller"></InputLabel>
                      <Input
                        type="text"
                        id="controller"
                        value={data.controller}
                        onChange={(e) => handleChange(e, 'controller')}
                        invalid={error.errors?.response?.data?.controller ? true : false}
                        placeholder="Controller"
                      />
                      <FormHelperText>{error.errors?.response?.data?.controller}</FormHelperText>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="Controller Serial Number"></InputLabel>
                      <Input
                        type="text"
                        id="controllerSerialNumber"
                        value={data.controllerSerialNumber}
                        onChange={(e) => handleChange(e, 'controllerSerialNumber')}
                        invalid={error.errors?.response?.data?.controllerSerialNumber ? true : false}
                        placeholder="Controller Serial Number"
                      />
                      <FormHelperText>{error.errors?.response?.data?.controllerSerialNumber}</FormHelperText>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="Firmware Version"></InputLabel>
                      <Input
                        type="text"
                        id="firmWareVersion"
                        value={data.firmWareVersion}
                        onChange={(e) => handleChange(e, 'firmWareVersion')}
                        invalid={error.errors?.response?.data?.firmWareVersion ? true : false}
                        placeholder="Firmware Version"
                      />
                      <FormHelperText>{error.errors?.response?.data?.firmWareVersion}</FormHelperText>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="Site Survey Number"></InputLabel>
                      <Input
                        type="text"
                        id="siteSurveyNumber"
                        value={data.siteSurveyNumber}
                        onChange={(e) => handleChange(e, 'siteSurveyNumber')}
                        invalid={error.errors?.response?.data?.siteSurveyNumber ? true : false}
                        placeholder="Site Survey Number"
                      />
                      <FormHelperText>{error.errors?.response?.data?.siteSurveyNumber}</FormHelperText>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="Site Survey Date"></InputLabel>
                      <Input
                        type="date"
                        id="siteSurveyDate"
                        value={data.siteSurveyDate}
                        onChange={(e) => handleChange(e, 'siteSurveyDate')}
                        invalid={error.errors?.response?.data?.siteSurveyDate ? true : false}
                        placeholder="Site Survey Date"
                      />
                      <FormHelperText>{error.errors?.response?.data?.siteSurveyDate}</FormHelperText>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="Warranty Start Date"></InputLabel>
                      <Input
                        type="date"
                        id="warrantyStartDate"
                        value={data.warrantyStartDate}
                        onChange={(e) => handleChange(e, 'warrantyStartDate')}
                        invalid={error.errors?.response?.data?.warrantyStartDate ? true : false}
                        placeholder="Warranty Start Date"
                      />
                      <FormHelperText>{error.errors?.response?.data?.warrantyStartDate}</FormHelperText>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="Warranty Period(in months)"></InputLabel>
                      <Input
                        type="text"
                        id="warrantyPeriod"
                        value={data.warrantyPeriod}
                        onChange={(e) => handleChange(e, 'warrantyPeriod')}
                        invalid={error.errors?.response?.data?.warrantyPeriod ? true : false}
                        placeholder="Warranty Period(in months)"
                      />
                      <FormHelperText>{error.errors?.response?.data?.warrantyPeriod}</FormHelperText>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="Activation Date"></InputLabel>
                      <Input
                        type="date"
                        id="activationDate"
                        value={data.activationDate}
                        onChange={(e) => handleChange(e, 'activationDate')}
                        invalid={error.errors?.response?.data?.activationDate ? true : false}
                        placeholder="Activation Date"
                      />
                      <FormHelperText>{error.errors?.response?.data?.activationDate}</FormHelperText>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="Registration Status"></InputLabel>
                      <Select
                        variant="standard"
                        type="text"
                        id="registrationStatus"
                        value={data.registrationStatus}
                        //value={data.registrationStatus}
                        onChange={(e) => handleChange(e, 'registrationStatus')}
                      >
                        <MenuItem value="" disabled className="placeholder">
                          Select Registration Status
                        </MenuItem>
                        <MenuItem value={'Active'} >Active</MenuItem>
                        <MenuItem value={'Pending'} >Pending</MenuItem>
                        <MenuItem value={'Inactive'} >Inactive</MenuItem>
                        <MenuItem value={'Blocked'}>Blocked</MenuItem>
                        <MenuItem value={'Expired'} >Expired</MenuItem>
                        <MenuItem value={'Replaced'} >Replaced</MenuItem>
                        <MenuItem value={'Recieved'} >Recieved</MenuItem>
                        <MenuItem value={'Suspended'} >Suspended</MenuItem>
                      </Select>
                      <FormHelperText>{error.errors?.response?.data?.registrationStatus}</FormHelperText>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="Select Vender"></InputLabel>
                      <Input
                        type="text"
                        id="type"
                        value={org.organisation && org.organisation.type ? org.organisation.type : ''}
                        
                        invalid={error.errors?.response?.data?.type ? true : false}
                        placeholder="Vendor Name"
                      />
                      <FormHelperText>{error.errors?.response?.data?.type}</FormHelperText>
                    </Stack>
                  </Grid>

                </Grid>
              </Container>
            </MainCard>

            <MainCard sx={{ mt: 2 }} content={false}>
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                  <h3>Connection Details</h3>
                </AccordionSummary>
                <AccordionDetails>
                  <Container style={{ marginTop: '8px', marginBottom: '20px' }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="simCardType"></InputLabel>
                          <Select
                        variant="standard"
                        type="text"
                        id="simCardType"
                        value={data.simCardType}
                        onChange={(e) => handleChange(e, 'simCardType')}
                      >
                        <MenuItem value="" disabled className="placeholder">
                          Select Sim Card Type
                        </MenuItem>
                        <MenuItem value={'M2M'} >M2M</MenuItem>
                        <MenuItem value={'4G'} >4G</MenuItem>
                        <MenuItem value={'3G'} >3G</MenuItem>
                        <MenuItem value={'2G'}>2G</MenuItem>
                        <MenuItem value={'LAN'} >LAN</MenuItem>
                        <MenuItem value={'Wifi'} >Wifi</MenuItem>
                      </Select>
                      <FormHelperText>{error.errors?.response?.data?.simCardType}</FormHelperText>
                        </Stack>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="simCardNumber"></InputLabel>
                          <Input
                            type="text"
                            id="simCardNumber"
                            value={data.simCardNumber}
                            onChange={(e) => handleChange(e, 'simCardNumber')}
                            invalid={error.errors?.response?.data?.simCardNumber ? true : false}
                            placeholder="Sim Card Number*"
                          />
                      <FormHelperText>{error.errors?.response?.data?.simCardNumber}</FormHelperText>
                        </Stack>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="simCardMobileNumber"></InputLabel>
                          <Input
                            type="text"
                            value={data.simCardMobileNumber}
                            id="simCardMobileNumber"
                            onChange={(e) => handleChange(e, 'simCardMobileNumber')}
                            invalid={error.errors?.response?.data?.simCardMobileNumber ? true : false}
                            placeholder="Sim Card Mobile Number*"
                          />
                      <FormHelperText>{error.errors?.response?.data?.simCardMobileNumber}</FormHelperText>
                        </Stack>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="simCardProvider"></InputLabel>
                          <Input
                            type="text"
                            id="simCardProvider"
                            value={data.simCardProvider}
                            onChange={(e) => handleChange(e, 'simCardProvider')}
                            invalid={error.errors?.response?.data?.simCardProvider ? true : false}
                            placeholder="Sim Card Provider"
                          />
                      <FormHelperText>{error.errors?.response?.data?.simCardProvider}</FormHelperText>
                        </Stack>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="simCardConnectionPayee"></InputLabel>
                          <Input
                            type="text"
                            id="simCardConnectionPayee"
                            value={data.simCardConnectionPayee}
                            onChange={(e) => handleChange(e, 'simCardConnectionPayee')}
                            invalid={error.errors?.response?.data?.simCardConnectionPayee ? true : false}
                            placeholder="Sim Card Connection Payee"
                          />
                      <FormHelperText>{error.errors?.response?.data?.simCardConnectionPayee}</FormHelperText>
                        </Stack>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="simCardOwner"></InputLabel>
                          <Input
                            type="text"
                            id="simCardOwner"
                            value={data.simCardOwner}
                            onChange={(e) => handleChange(e, 'simCardOwner')}
                            invalid={error.errors?.response?.data?.simCardOwner ? true : false}
                            placeholder="Sim Card Owner"
                          />
                      <FormHelperText>{error.errors?.response?.data?.simCardOwner}</FormHelperText>
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
                          <Input type="text" id="city" 
                          value={data.city} 
                          onChange={(e) => handleChange(e, 'city')} 
                          invalid={error.errors?.response?.data?.city ? true : false} 
                          placeholder="City" />
                      <FormHelperText>{error.errors?.response?.data?.city}</FormHelperText>
                        </Stack>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="Organisation unique"></InputLabel>
                          <Input type="text" 
                          id="state" 
                          value={data.state} 
                          onChange={(e) => handleChange(e, 'state')} 
                          invalid={error.errors?.response?.data?.state ? true : false} 
                          placeholder="State" />
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
  )
}

export default AddGatewayForm