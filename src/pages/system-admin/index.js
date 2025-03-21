import { Box, Button, CircularProgress, Container, Grid, Paper } from '@material-ui/core';
import { TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Loading from '../../components/loading';
import Select from '../../components/select';
import Title from '../../components/title';
import useResponsive from '../../hooks/useResponsive';
import api from '../../service/api';
import { request } from '../../service/request';
import { getBatchYear } from '../../utility';
import { API_METHOD } from '../../utility/constant';
import { REQUIRED_FIELD, alumniSchema, userSchema } from '../../validation/schema';
import useStyles from './styles';
import { CleaningServices } from '@mui/icons-material';

const SystemAdmin = (props) => {
  const { match } = props;
  const { id } = match.params;
  const isCreate = id === 'create';
console.log(isCreate, id)
  const classes = useStyles();
  const history = useHistory();
  const { isResponsive, isMobileView } = useResponsive();

  const [firstName, setFirstName]         = useState('');
  const [lastName, setLastName]           = useState('');
  const [email, setEmail]                 = useState('');
  const [role, setRole] = useState('');
  const [roleError, setRoleError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    firstName,
    lastName,
    email ,
    role,
  }

  const handleSubmit =  async(values, formik) => {
    const { setErrors, setSubmitting } = formik;
    if (!role) {
      setRoleError(REQUIRED_FIELD);
      setSubmitting(false);
      return;
    }
    const newValue = {
      ...values,
      role
    }

    console.log('first, newValue', newValue)
    try {
      await request({
        url: !id ? `${api.REGISTER}` : `${api.USER_API}/${id}`,
        method: !id ? API_METHOD.POST: API_METHOD.PATCH,
        data: newValue,
      })
      history.push('/portal/admins');
    } catch(error) {
      if (error?.response?.status === 409) {
        setErrors({
          studentNumber: 'Email address already exist'
        });
      }
    }
   
    // handleCreate(values, formik);
  }

  const handleCancel = () => {
    history.push('/portal/admins');
  }

  const handleGetUser = async() => {
    setIsLoading(true);
    try {
      const response = await request({
        url: `${api.USER_API}/${id}`,
        method: API_METHOD.GET,
      })
      const { firstName, email, lastName, role } = response.data;
      setFirstName(firstName);
      setLastName(lastName);
      setRole(role);

      setEmail(email)
    } catch (e) {

    } finally {
      setIsLoading(false);
    }
  }

  // useEffect(() => {
  //   if (!programData.length) return;

  //   const programObject = programData.find(item => item.id === programId.toString());
  //   setProgram(programObject?.name);
  // }, [programLoading, programId, program])

  useEffect(() => {
    if (id && !isCreate) {
      handleGetUser()
    }
  }, [])

  const handleSelectRole = (item) => {
    const { value } = item.target;
    setRoleError('');
    setRole(value);
  }

return (
  <Container className={classes.container}>
    <Title name='System Admin'/>
    <Paper className={classes.paper}>
    {
      id && isLoading ?
        <Loading />
        : 
        <Formik
          initialValues={initialValues}
          validationSchema={userSchema}
          onSubmit={handleSubmit}
        >
          {
            formik => (
              
              <Form>
                <Grid container spacing={2} className={isMobileView ? classes.formContainer : ''}>
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
                        <Select error={roleError} menuItem={[{name: 'ADMIN'},{name: 'REGISTRAR'}]} label='Role*' value={role} handleChange={handleSelectRole}/>
                    </Grid>
                </Grid>            
                <Box textAlign='center' className={`${classes.buttonContainer} ${isMobileView && classes.mButtonContainer}`}>
                  <Button
                    id="cancelButton"
                    onClick={handleCancel} 
                    variant="outlined"
                    color="primary"
                    size='medium'
                    className={classes.button}
                  >
                    Cancel
                  </Button>
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
                        'Submit'
                    }
                  </Button>
                </Box>
              </Form>
            )
          }
          
        </Formik>
    }
    </Paper>
  </Container>
)
}

export default SystemAdmin