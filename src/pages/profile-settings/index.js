import { Box, Button, CircularProgress, Container, Grid, IconButton, InputAdornment, Link, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import Title from '../../components/title';
import useStyles from './styles';
import { Form, Formik } from 'formik';
import { createPasswordSchema, settingsSchema } from '../../validation/schema';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useHistory } from 'react-router';
import { TextField } from '@mui/material';

const ProfileSetting = () => {
  const classes = useStyles();
  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
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
          validationSchema={createPasswordSchema}
          onSubmit={handleSubmit}
        >
        {
          formik => (
            <Form>
              <Grid container spacing={2}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    name="password"
                    label='Password*'
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
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    name="confirmPassword"
                    label='Confirm Password*'
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
                      'Submit'
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

export default ProfileSetting