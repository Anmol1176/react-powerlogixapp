import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {
  Button,
  Checkbox,
  // Divider,
  FormControlLabel,
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

// project import
// import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { toast } from "react-toastify";
import { loginUser } from 'utils/user-service';
import { doLogin } from './index';
//import { useNavigate } from "react-router-dom";
// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
  
  const [checked, setChecked] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //const navigate = useNavigate()
  const [loginDetail,setLoginDetail] = useState({
    username:'',
    password:''
  })

  const handleChange=(event,field)=>{
    let actualValue = event.target.value
    setLoginDetail({
      ...loginDetail,
      [field]:actualValue
    })
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
  
    // Validation
    if (loginDetail.username.trim() === '' || loginDetail.password.trim() === '') {
      toast.error("Email or password is required");
      return;
    }
  
    // Submit the data to the server to get a token
    loginUser(loginDetail).then((data) => {
      // Save the data to local storage
      doLogin(data, () => {
        console.log("Login detail is saved in local storage");
  
        // Redirect to dashboard
        window.location.replace("/user/dashboard");
      });
  
      toast.success("Login success");
      setLoginDetail({
        username: "",
        password: ""
      });
    }).catch(error => {
      console.log(error);
  
      if (error.response) {
        if (error.response.status === 400 || error.response.status === 404) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong on the server!!");
        }
      } else {
        toast.error("Network error or no response from server!");
      }
    });
  }
  

  return (
    <>
      <Formik>
          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email">Email Address</InputLabel>
                  <OutlinedInput
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    value={loginDetail.username}
                    onChange={(e) => handleChange(e,'username')}
                    fullWidth
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    id="-password-login"
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
                    placeholder="Enter password"
                    value={loginDetail.password}
                    onChange={(e) => handleChange(e,'password')}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={<Typography variant="h6">Keep me sign in</Typography>}
                  />
                  <Link variant="h6" component={RouterLink} to="" color="text.primary">
                    Forgot Password?
                  </Link>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation  fullWidth size="large" type="submit" variant="contained" color="success">
                    Login
                  </Button>
                </AnimateButton>
              </Grid>
              {/* <Grid item xs={12}>
                <Divider>
                  <Typography variant="caption"> Login with</Typography>
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

export default AuthLogin;
