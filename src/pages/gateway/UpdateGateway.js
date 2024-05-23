import React, { useEffect, useState } from 'react';
import ComponentSkeleton from 'pages/components-overview/ComponentSkeleton';
import { Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import Button from '@mui/material/Button';
import { Stack, InputLabel, Input } from '@mui/material';
import { Container, FormHelperText } from '../../../node_modules/@mui/material/index';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate, useParams } from 'react-router-dom';
import { doUpdateGateway, loadGateway } from 'utils/user-service';
import { toast } from 'react-toastify';
import StatusNotification from './StatusNotification';
import BaseNav from './BaseNav';
import { Link } from '../../../node_modules/react-router-dom/dist/index';


function UpdateGateway() {
  const { orgId, locationId, gatewayId } = useParams();

  const [data, setData] = useState({});
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    loadGateway(orgId, locationId, gatewayId)
      .then((data) => {
        setData(data);
        setInitialValues(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [orgId, locationId, gatewayId]);

  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value });
  };

  const navigate = useNavigate();

  const updateForm = () => {
    doUpdateGateway(data, orgId, locationId, gatewayId)
      .then(() => {
        toast.success('Gateway Updated');
        setEditMode(false);
        navigate('/user/gateway')
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

  const [editMode, setEditMode] = useState(false);

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
    <BaseNav>
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
                      <InputLabel htmlFor="organisationName"></InputLabel>
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
                      <InputLabel htmlFor="locationShortCode"></InputLabel>
                      <Input
                        type="text"
                        id="locationShortCode"
                        value={data.location && data.location.locationShortCode ? data.location.locationShortCode : ''}
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
                        disabled={!editMode}
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
                        disabled={!editMode}
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
                        disabled={!editMode}
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
                        disabled={!editMode}
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
                        disabled={!editMode}
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
                        disabled={!editMode}
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
                        disabled={!editMode}
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
                        disabled={!editMode}
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
                        disabled={!editMode}
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
                        disabled={!editMode}
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
                        disabled={!editMode}
                      />
                      <FormHelperText>{error.errors?.response?.data?.activationDate}</FormHelperText>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="Registration Status"></InputLabel>
                      <Input
                        type="text"
                        id="registrationStatus"
                        value={data.registrationStatus}
                        onChange={(e) => handleChange(e, 'registrationStatus')}
                        invalid={error.errors?.response?.data?.registrationStatus ? true : false}
                        placeholder="Registration Status"
                        disabled={!editMode}
                      />
                      <FormHelperText>{error.errors?.response?.data?.registrationStatus}</FormHelperText>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="Select Vender"></InputLabel>
                      <Input
                        type="text"
                        id="vendorName"
                        value={data.vendorName}
                        onChange={(e) => handleChange(e, 'vendorName')}
                        invalid={error.errors?.response?.data?.vendorName ? true : false}
                        placeholder="Select Vendor"
                        disabled={!editMode}
                      />
                      <FormHelperText>{error.errors?.response?.data?.vendorName}</FormHelperText>
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
                          <Input
                            type="text"
                            id="simCardType"
                            value={data.simCardType}
                            onChange={(e) => handleChange(e, 'simCardType')}
                            invalid={error.errors?.response?.data?.simCardType ? true : false}
                            placeholder="Sim Card Type*"
                            disabled={!editMode}
                          />
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
                            disabled={!editMode}
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
                            disabled={!editMode}
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
                            disabled={!editMode}
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
                            disabled={!editMode}
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
                            disabled={!editMode}
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
                  <h3>Nodes Details: </h3>
                </AccordionSummary>
                <StatusNotification />
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
                            disabled={!editMode}
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
                            disabled={!editMode}
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
                            disabled={!editMode}
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
                            disabled={!editMode}
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
                            disabled={!editMode}
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
                            disabled={!editMode}
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
                            disabled={!editMode}
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
                            disabled={!editMode}
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
                            disabled={!editMode}
                          />
                          <FormHelperText>{error.errors?.response?.data?.logitude}</FormHelperText>
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
                          <Link to={`/user/organisations/${orgId}/locations/${locationId}/gateways`}>
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
    </BaseNav>
  );
}

export default UpdateGateway;
