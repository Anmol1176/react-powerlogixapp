import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {
  Box,
  Button,
  // Divider,
  FormControl,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// third party
import { Formik } from 'formik';
// import { toast } from '../../../../node_modules/react-toastify/dist/index';
// project import
// import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import { toast } from 'react-toastify';
// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { signUp } from 'utils/user-service';
import { FormHelperText } from '../../../../node_modules/@mui/material/index';
// ============================|| FIREBASE - REGISTER ||============================ //

const AuthRegister = () => {
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  const [data,setData] = useState({
    firstName:'',
    lastName:'',
    phone:'',
    email:'',
    password:''
  })

  const handleChange = (event,property) =>{
    setData({...data,[property]:event.target.value})
  }

  const [error,setError] = useState({
    errors:{},
    isError:false
  })

  const submitForm = (event) => {
    event.preventDefault()

    signUp(data).then((resp) => {
      toast.success("User is registred successfully !! user id "+resp.userId)
      setData({
        firstName:'',
        lastName:'',
        phone:'',
        email:'',
        password:''
      })
    }).catch((error) => {
      setError({
        errors:error,
        isError:true
      })
    })
  }

  return (
    <>
      <Formik>
          <form onSubmit={submitForm}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="firstname">First Name*</InputLabel>
                  <OutlinedInput
                    id="firstname"
                    type="text"
                    name="firstname"
                    placeholder="Enter first name"
                    onChange={(e) => handleChange(e,'firstName')}
                    value={data.firstName}
                    invalid={error.errors?.response?.data?.firstName ? true : false}
                    fullWidth
                  />
                  <FormHelperText>
                  {error.errors?.response?.data?.firstName}  
                  </FormHelperText>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="lastname">Last Name*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    id="lastname"
                    type="lastname"
                    name="lastname"
                    placeholder="Enter last name"
                    onChange={(e) => handleChange(e,'lastName')}
                    value={data.lastName}
                    invalid={error.errors?.response?.data?.lastName ? true : false}
                    inputProps={{}}
                  />
                  <FormHelperText>
                  {error.errors?.response?.data?.lastName}  
                  </FormHelperText>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="phone">Mobile</InputLabel>
                  <OutlinedInput
                    fullWidth
                    id="phone"
                    name="phone"
                    placeholder="Enter mobile number"
                    onChange={(e) => handleChange(e,'phone')}
                    value={data.phone}
                    invalid={error.errors?.response?.data?.phone ? true : false}
                    inputProps={{}}
                  />
                  <FormHelperText>
                  {error.errors?.response?.data?.phone}  
                  </FormHelperText>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email">Email Address*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    onChange={(e) => handleChange(e,'email')}
                    value={data.email}
                    invalid={error.errors?.response?.data?.email ? true : false}
                    inputProps={{}}
                  />
                <FormHelperText>
                  {error.errors?.response?.data?.email}  
                  </FormHelperText>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    id="password-signup"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="******"
                    onChange={(e) => handleChange(e,'password')}
                    value={data.password}
                    invalid={error.errors?.response?.data?.password ? true : false}
                    inputProps={{}}
                  />
                <FormHelperText>
                  {error.errors?.response?.data?.password}  
                  </FormHelperText>
                </Stack>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  By Signing up, you agree to our &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#" style={{color:'green'}}>
                    Terms of Service
                  </Link>
                  &nbsp; and &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#" style={{color:'green'}}>
                    Privacy Policy
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <AnimateButton>
                  <Button type="submit"  fullWidth size="large" variant="contained" color="success">
                    Create Account
                  </Button>
                </AnimateButton>
              </Grid>
              {/* <Grid item xs={12}>
                <Divider>
                  <Typography variant="caption">Sign up with</Typography>
                </Divider>
              </Grid>
              <Grid item xs={12}>
                <FirebaseSocial />
              </Grid> */}
            </Grid>
          </form>
      </Formik>
    </>
  );
};

export default AuthRegister;
