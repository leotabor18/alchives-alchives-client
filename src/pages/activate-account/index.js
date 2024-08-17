import { Box, Button, CircularProgress, Grid, Link, TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router';
import { activateAccountSchema } from '../../validation/schema';
import useStyles from './styles';
import useResponsive from '../../hooks/useResponsive';

const ActivateAccount = () => {
  const classes = useStyles();
  const history = useHistory();
  const { isMobileView } = useResponsive();

  const initialValues = {
    studentNumber     : '',
    email  : ''
  }

  const handleActivateAccount = () => {

  }

  const handleLogin = () => {
    history.push('/portal');
  }

  return (
    <Box className={`${isMobileView ? classes.mLoginContainer: classes.loginContainer}`}>
      <Typography variant='h6'>
        Activate Account
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={activateAccountSchema}
        onSubmit={handleActivateAccount}
      >
      {
        formik => (
          <Form>
            <TextField
              fullWidth
              id="studentNumber"
              label={'Student Number'}
              name="studentNumber"
              value={formik.values.studentNumber}
              onChange={formik.handleChange}
              error={formik.touched.studentNumber && Boolean(formik.errors.studentNumber)}
              helperText={formik.touched.studentNumber && formik.errors.studentNumber}
            />
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
                    'Activate'
                }
              </Button>
              <Grid container>
              <Grid item className={classes.link}>
                <Link id="activateAccount" onClick={handleLogin} variant="body2" className={classes.textDecor}>
                  Login
                </Link>
              </Grid>
            </Grid>
            </Box>
          </Form>
        )
      }

      </Formik>
    </Box>
  )
}

export default ActivateAccount