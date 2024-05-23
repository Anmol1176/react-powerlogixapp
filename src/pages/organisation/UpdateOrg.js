import ComponentSkeleton from 'pages/components-overview/ComponentSkeleton';
import { Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import Button from '@mui/material/Button';

import { Stack, InputLabel, Input, TextField, Autocomplete } from '@mui/material';
import { Container } from '../../../node_modules/@mui/material/index';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, useParams } from '../../../node_modules/react-router-dom/dist/index';
import { useEffect, useState } from 'react';
import { loadOrganisation, doUpdateOrg } from 'utils/user-service';
import { toast } from 'react-toastify';
import Base from 'pages/authBase/Base';
import { useNavigate } from 'react-router-dom';

//import IconButton from '@mui/material/IconButton';

function UpdateOrg() {
  const options = [
    { label: 'EMSLP', value: 'EMSLP' },
    { label: 'VENDOR', value: 'VENDOR' },
    { label: 'EMSDP', value: 'EMSDP' }
  ];

  const optionsStatus = [
    { label: 'Active', value: 'Active' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Retired', value: 'Retired' },
    { label: 'Blocked', value: 'Blocked' },
    { label: 'Draft', value: 'Draft' }
  ];

  const { orgId } = useParams();
  const [data, setData] = useState({});
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    if (orgId) {
      loadOrganisation(orgId)
        .then((data) => {
          setData(data);
          setInitialValues(data);
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [orgId]);

  const handleChange = (property, value) => {
    setData({ ...data, [property]: value });
  };

  const navigate = useNavigate();

  const updateForm = () => {
    // event.preventDefault();
    doUpdateOrg(data, orgId)
      .then(() => {
        toast.success('Organisation Updated');
        setEditMode(false);
        navigate('/user/organisation');
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
    <Base>
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
                    {/* Render your form inputs here */}
                    <Grid item xs={12} md={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="organisationUniqueShortName"></InputLabel>
                        <Input
                          type="text"
                          id="organisationUniqueShortName"
                          value={data.organisationUniqueShortName || ''}
                          onChange={(e) => handleChange('organisationUniqueShortName', e.target.value)}
                          placeholder="Organisation unique Short Name"
                          disabled={!editMode} // Set disabled based on editMode
                        />
                      </Stack>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="Organisation unique"></InputLabel>
                        <Input
                          type="text"
                          id="organisationShortCode"
                          value={data.organisationShortCode || ''}
                          onChange={(e) => handleChange('organisationShortCode', e.target.value)}
                          placeholder="Organisation Short Code"
                          inputProps={{ maxLength: 5 }}
                          disabled={!editMode}
                        />
                      </Stack>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="Organisation unique"></InputLabel>
                        <Input
                          type="text"
                          id="organisationName"
                          value={data.organisationName || ''}
                          onChange={(e) => handleChange('organisationName', e.target.value)}
                          placeholder="Organisation Name"
                          disabled={!editMode}
                        />
                      </Stack>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="Organisation unique"></InputLabel>
                        <Input
                          type="text"
                          id="companyIdentificationNumber"
                          value={data.companyIdentificationNumber || ''}
                          onChange={(e) => handleChange('companyIdentificationNumber', e.target.value)}
                          placeholder="Company Identification Number"
                          disabled={!editMode}
                        />
                      </Stack>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="Organisation unique"></InputLabel>
                        <Input
                          type="text"
                          id="gstNumber"
                          value={data.gstNumber || ''}
                          onChange={(e) => handleChange('gstNumber', e.target.value)}
                          placeholder="GST Number"
                          disabled={!editMode}
                        />
                      </Stack>
                    </Grid>

                    {/* Autocomplete for type */}
                    <Grid item xs={12} md={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="type"></InputLabel>
                        <Autocomplete
                          options={options}
                          getOptionLabel={(option) => option.label} // Return the label instead of the value
                          value={options.find((option) => option.value === data.type) || null}
                          onChange={(e, value) => handleChange('type', value ? value.value : '')}
                          disabled={!editMode}
                          renderInput={(params) => <TextField {...params} variant="standard" />}
                        />
                      </Stack>
                    </Grid>

                    {/* Autocomplete for status */}
                    <Grid item xs={12} md={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="status"></InputLabel>
                        <Autocomplete
                          options={optionsStatus}
                          getOptionLabel={(option) => option.label} // Return the label instead of the value
                          value={optionsStatus.find((option) => option.value === data.status) || null}
                          onChange={(e, value) => handleChange('status', value ? value.value : '')}
                          disabled={!editMode}
                          renderInput={(params) => <TextField {...params} variant="standard" />}
                        />
                      </Stack>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="Organisation unique"></InputLabel>
                        <Input
                          type="text"
                          id="emsOperator"
                          value={data.emsOperator || ''}
                          onChange={(e) => handleChange('emsOperator', e.target.value)}
                          placeholder="EMS Operator"
                          disabled={!editMode}
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
                            <InputLabel htmlFor="personName"></InputLabel>
                            <Input
                              type="text"
                              id="personName"
                              value={data.personName || ''}
                              onChange={(e) => handleChange('personName', e.target.value)}
                              placeholder="Person Name*"
                              disabled={!editMode}
                            />
                          </Stack>
                        </Grid>

                        <Grid item xs={12} md={4}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="Organisation unique"></InputLabel>
                            <Input
                              type="text"
                              id="phoneNumber"
                              value={data.phoneNumber || ''}
                              onChange={(e) => handleChange('phonenumber', e.target.value)}
                              placeholder="Phone Number*"
                              disabled={!editMode}
                            />
                          </Stack>
                        </Grid>

                        <Grid item xs={12} md={4}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="Organisation unique"></InputLabel>
                            <Input
                              type="email"
                              value={data.emailId || ''}
                              id="emailId"
                              onChange={(e) => handleChange('emailId', e.target.value)}
                              placeholder="Email ID*"
                              disabled={!editMode}
                            />
                          </Stack>
                        </Grid>

                        <Grid item xs={12} md={4}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="Organisation unique"></InputLabel>
                            <Input
                              type="text"
                              id="designation"
                              value={data.designation || ''}
                              onChange={(e) => handleChange('designation', e.target.value)}
                              placeholder="Designation"
                              disabled={!editMode}
                            />
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
                              value={data.addressLine1 || ''}
                              onChange={(e) => handleChange('addressLine1', e.target.value)}
                              placeholder="Address Line1"
                              disabled={!editMode}
                            />
                          </Stack>
                        </Grid>

                        <Grid item xs={12} md={4}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="Organisation unique"></InputLabel>
                            <Input
                              type="text"
                              id="addressLine2"
                              value={data.addressLine2 || ''}
                              onChange={(e) => handleChange('addressLine2', e.target.value)}
                              placeholder="Address Line2"
                              disabled={!editMode}
                            />
                          </Stack>
                        </Grid>

                        <Grid item xs={12} md={4}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="Organisation unique"></InputLabel>
                            <Input
                              type="text"
                              id="landMark"
                              value={data.landMark || ''}
                              onChange={(e) => handleChange('landMark', e.target.value)}
                              placeholder="Landmark"
                              disabled={!editMode}
                            />
                          </Stack>
                        </Grid>

                        <Grid item xs={12} md={4}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="Organisation unique"></InputLabel>
                            <Input
                              type="text"
                              id="city"
                              value={data.city || ''}
                              onChange={(e) => handleChange('city', e.target.value)}
                              placeholder="City"
                              disabled={!editMode}
                            />
                          </Stack>
                        </Grid>

                        <Grid item xs={12} md={4}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="Organisation unique"></InputLabel>
                            <Input
                              type="text"
                              id="state"
                              value={data?.state || ''}
                              onChange={(e) => handleChange('state', e.target.value)}
                              placeholder="State"
                              disabled={!editMode}
                            />
                          </Stack>
                        </Grid>

                        <Grid item xs={12} md={4}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="Organisation unique"></InputLabel>
                            <Input
                              type="text"
                              id="pincode"
                              value={data.pincode || ''}
                              onChange={(e) => handleChange('pincode', e.target.value)}
                              placeholder="Pin\Zip Code"
                              disabled={!editMode}
                            />
                          </Stack>
                        </Grid>

                        <Grid item xs={12} md={4}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="Organisation unique"></InputLabel>
                            <Input
                              type="text"
                              id="country"
                              value={data.country || ''}
                              onChange={(e) => handleChange('country', e.target.value)}
                              placeholder="Country"
                              disabled={!editMode}
                            />
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
                    <h3> Actions: </h3>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Container style={{ textAlign: 'center', marginTop: '8px', marginBottom: '20px' }}>
                      <div style={{ margin: '0 0 20px 0' }}>
                        {editMode && (
                          <Link to="/user/organisation">
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
    </Base>
  );
}

export default UpdateOrg;
