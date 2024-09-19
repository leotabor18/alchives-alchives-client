import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, CircularProgress, Grid, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import useResponsive from '../../hooks/useResponsive';
import { loginSchema } from '../../validation/schema';
import useStyles from './styles';
import { request } from '../../service/request';
import api from '../../service/api';
import { API_METHOD, BEARER } from '../../utility/constant';
import { AuthContext } from '../../context/AuthContext';
import { LOGIN } from '../../reducer/AuthReducer';

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  
  const { dispatch : authDispatch } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const { isMobileView } = useResponsive();
  
  const initialValues = {
    email  : '',
    password  : ''
  }

  const handleSignIn = async (values, formik) => {
    const { email, password } = values;
    const { setSubmitting, setErrors } = formik;

    try {
      const response = await request({
        url   : api.LOGIN,
        method: API_METHOD.POST,
        data  : {
          email  : email,
          password  : password
        }
      });

      const { data } = response;
      const userResponse  = await getUserByToken(data.accessToken);

      authDispatch({
        type   : LOGIN,
        payload: {
          token: data,
          user : {
            userId        : userResponse.data.userId,
            email         : userResponse.data.email,
            firstName     : userResponse.data.firstName,
            lastName      : userResponse.data.lastName,
            status        : userResponse.data.status,
            role         : userResponse.data.role,
          }
        }
      });

      if (userResponse.data.role === 'ALUMNI') {
        history.push('/');
      } else {
        history.push('portal/alumni');
      }
      setSubmitting(false);
    } catch(e) {
      console.log('error', e)
      setErrors({
        email     : ' ',
        password  : 'Invalid email or password.'
      })
    }
  }

  const getUserByToken = async (token) => {
    return request({
      url     : api.USERS_BY_TOKEN,
      method  : API_METHOD.GET,
      headers : {
        Authorization: BEARER + token
      }
    });
  }

  const handleShowPassword = () => {
    setShowPassword(prevValue => !prevValue);
  }

  const handleForgotPassword = () => {
    history.push('/forgot-password');
  }

  const handleActivateAccount = () => {
    history.push('/activate-account');
  }

  return (
    <Box className={`${isMobileView ? classes.mLoginContainer: classes.loginContainer}`}>
      <Typography variant='h6'>
        Sign in
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSignIn}
      >
      {
        formik => (
          <Form>
            <TextField
              fullWidth
              id="email"
              label={'Email'}
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              name="password"
              label='Password'
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      id="passwordVisibility"
                      aria-label="toggle password visibility"
                      onClick={handleShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Grid container>
              <Grid item className={classes.link}>
                <Link id="forgotPassword" onClick={handleForgotPassword} variant="body2" className={classes.textDecor}>
                  Forgot Password?
                </Link>
              </Grid>
            </Grid>

            <Box textAlign='center'>
              <Button
                id="submitButton"
                type="submit"
                variant="contained"
                color="primary"
                size='medium'
                className={classes.button}
              >
                {
                  formik.isSubmitting ?
                    <CircularProgress color="inherit" size={24}/>
                  :
                    'Login'
                }
              </Button>
              <Grid container>
              {/* <Grid item className={classes.link}>
                <Link id="activateAccount" onClick={handleActivateAccount} variant="body2" className={classes.textDecor}>
                  Activate Account
                </Link>
              </Grid> */}
            </Grid>
            </Box>
          </Form>
        )
      }

      </Formik>
    </Box>
  )
}

export default Login