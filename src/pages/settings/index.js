import { Box, Button, CircularProgress, Container, Grid, IconButton, InputAdornment, Link, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import Title from '../../components/title';
import useStyles from './styles';
import { Form, Formik } from 'formik';
import { settingsSchema } from '../../validation/schema';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useHistory } from 'react-router';
import { TextField } from '@mui/material';

const Settings = () => {
  const classes = useStyles();
  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
    firstName      : '',
    lastName       : '',
    email          : '',
    password       : '',
    confirmPassword: '',
  }

  const handleSubmit = () => {

  }

  const handleShowPassword = () => {
    setShowPassword(prevValue => !prevValue);
  }

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(prevValue => !prevValue);
  }

  const handleCancel = () => {
    history.push('/portal/alumni');
  }

  return (
    <Container className={classes.container}>
      <Title name='Settings'/>
      <Paper className={classes.paper}>
        <Formik
          initialValues={initialValues}
          validationSchema={settingsSchema}
          onSubmit={handleSubmit}
        >
        {
          formik => (
            <Form>
              <Grid container spacing={2}>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    id="firstName"
                    label={'First Name'}
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    id="lastName"
                    label={'Last Name'}
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    label={'Email Address'}
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item lg={4} md={4} sm={12} xs={12}>
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
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    name="confirmPassword"
                    label='Confirm Password'
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    autoComplete="current-password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            id="confirmPasswordVisibility"
                            aria-label="toggle confirmPassword visibility"
                            onClick={handleShowConfirmPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  />
                </Grid>
              </Grid>
              
              <Box textAlign='center' className={classes.buttonContainer}>
                <Button
                  id="submitButton"
                  onClick={handleCancel} 
                  variant="outlined"
                  color="primary"
                  size='medium'
                  className={classes.button}
                >
                  Cancel
                </Button>
                <Button
                  id="cancelButton"
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
                      'Update'
                  }
                </Button>
              </Box>
            </Form>
          )
        }

        </Formik>
      </Paper>
    </Container>
  )
}

export default Settings