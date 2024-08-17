import { Box, Button, CircularProgress, Container, Grid, Paper } from '@material-ui/core';
import { TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router';
import Title from '../../components/title';
import { profileSchema } from '../../validation/schema';
import useStyles from './styles';
import useResponsive from '../../hooks/useResponsive';
import Select from '../../components/select';

const Profile = () => {
  const classes = useStyles();
  const history = useHistory();
  const { isResponsive, isMobileView } = useResponsive();
  const initialValues = {
    studentNumber   : '',
    firstName      : '',
    lastName       : '',
    email          : '',
    program         : '',
    password       : '',
    confirmPassword: '',
    quotes: ''
  }

  const handleSubmit = () => {

  }

  const handleCancel = () => {
    history.push('/portal/alumni');
  }

  return (
    <Container className={classes.container}>
      <Title name='Profile'/>
      <Paper className={classes.paper}>
        <Formik
          initialValues={initialValues}
          validationSchema={profileSchema}
          onSubmit={handleSubmit}
        >
        {
          formik => (
            <Form>
              <Grid container spacing={2} className={isResponsive ? classes.formContainer : ''}>
                <Grid item md={8} xs={12}>
                  <Grid container spacing={2}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TextField
                        fullWidth
                        id="studentNumber"
                        label={'Student Number*'}
                        name="studentNumber"
                        value={formik.values.studentNumber}
                        onChange={formik.handleChange}
                        error={formik.touched.studentNumber && Boolean(formik.errors.studentNumber)}
                        helperText={formik.touched.studentNumber && formik.errors.studentNumber}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
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
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TextField
                        fullWidth
                        id="firstName"
                        label={'First Name*'}
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TextField
                        fullWidth
                        id="lastName"
                        label={'Last Name*'}
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <Select menuItem={[]} label='Program*' value={''} handleChange={() =>{}}/>
                      {/* <TextField
                        fullWidth
                        id="program"
                        label={'Program*'}
                        name="program"
                        value={formik.values.program}
                        onChange={formik.handleChange}
                        error={formik.touched.program && Boolean(formik.errors.program)}
                        helperText={formik.touched.program && formik.errors.program}
                      /> */}
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <Select menuItem={[]} label='Academic Honors' value={''} handleChange={() =>{}}/>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={6}
                        id="quotes"
                        label={'Quotes*'}
                        name="quotes"
                        value={formik.values.quotes}
                        onChange={formik.handleChange}
                        error={formik.touched.quotes && Boolean(formik.errors.quotes)}
                        helperText={formik.touched.quotes && formik.errors.quotes}
                      />
                    </Grid>
                  </Grid>  
                </Grid>  
                <Grid className={isMobileView ? classes.mPhotoContainer : classes.photoContainer} item md={4} xs={12}>
                  <Paper>

                  </Paper>
                  <Button
                    id="uploadButton"
                    onClick={handleCancel} 
                    variant="contained"
                    color="primary"
                    size='medium'
                    className={classes.uploadButton}
                  >
                    Upload
                  </Button>
                </Grid>  
              </Grid>            
              <Box textAlign='center' className={`${classes.buttonContainer} ${isMobileView && classes.mButtonContainer}`}>
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
                      'Request Changes'
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

export default Profile