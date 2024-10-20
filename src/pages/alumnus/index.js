import { Box, Button, CircularProgress, Container, Grid, Paper } from '@material-ui/core';
import { TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Loading from '../../components/loading';
import Select from '../../components/select';
import Title from '../../components/title';
import useGetApi from '../../hooks/useGetApi';
import useResponsive from '../../hooks/useResponsive';
import api from '../../service/api';
import { request } from '../../service/request';
import { createProgramData, getBatchYear } from '../../utility';
import { API_METHOD } from '../../utility/constant';
import { REQUIRED_FIELD, alumniSchema, profileSchema } from '../../validation/schema';
import { headCells } from '../alumni';
import useStyles from './styles';

const Alumnus = (props) => {
  const { match } = props;
  const { id } = match.params;
  const isCreate = id === 'create';
  
  const batchYears = getBatchYear(2016);
  
  const classes = useStyles();
  const history = useHistory();
  const { isResponsive, isMobileView } = useResponsive();
  
  const [studentNumber, setStudentNumber] = useState('');
  const [firstName, setFirstName]         = useState('');
  const [lastName, setLastName]           = useState('');
  const [program, setProgram]             = useState('');
  const [email, setEmail]                 = useState('');
  const [quotes, setQuotes]               = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [programError, setProgramError] = useState('');
  const [batchError, setBatchError] = useState('');
  const [award, setAward] = useState('');
  const [image, setImage] = useState('');
  const [batchYear, setBatchYear] = useState('');
  const [programId, setProgramId] = useState('');
  const [prevImage, setPrevImage] = useState('');

  const [preview, setPreview] = useState(null)

  const getProgramProps = {
    api: api.PROGRAMS_API,
    keyword: '',
    dataFormat: createProgramData,
    columns: headCells,
    pageName: 'Programs',
    params: {
      size: 1000
    }
  }

  const { state: programState } = useGetApi(getProgramProps)
  const { data: programData, isLoading: programLoading } = programState;

  const initialValues = {
    studentNumber,
    firstName,
    lastName,
    email ,
    quotes,
  }

  const handleSubmit =  async(values, formik) => {
    const { setErrors, setSubmitting } = formik;
    if (!program) {
      setProgramError(REQUIRED_FIELD);
      setSubmitting(false);
      return;
    }

    if (!batchYear) {
      setBatchError(REQUIRED_FIELD);
      setSubmitting(false);
      return;
    }

    const newValue = {
      ...values,
      programId,
      award,
      image: image.name,
      batchYear
    }

    if (image === prevImage) {
      delete newValue.image;
    }

    console.log('first, newValue', newValue)
    try {
      await request({
        url: isCreate ? `${api.ALUMNI_API}/create` : `${api.ALUMNI_API}/${id}`,
        method: isCreate ? API_METHOD.POST: API_METHOD.PATCH,
        data: newValue,
        headers: {
          'Content-type': 'multipart/form-data'
        }
      })
      history.push('/portal/alumni');
    } catch(error) {
      if (error?.response?.status === 409) {
        setErrors({
          studentNumber: 'Student number already exist'
        });
      }
    }
   
    // handleCreate(values, formik);
  }

  const handleCancel = () => {
    history.push('/portal/alumni');
  }

  const handleGetUser = async() => {
    setIsLoading(true);
    try {
      const response = await request({
        url: `${api.ALUMNIS_API}/${id}`,
        method: API_METHOD.GET,
      })
      const { firstName, lastName, studentNumber, image, batchYear, quotes, _links } = response.data;
      setFirstName(firstName);
      setLastName(lastName);
      setStudentNumber(studentNumber);
      setQuotes(quotes);
      setBatchYear(batchYear);

      const programId = _links.program.href.replace(`${api.ALUMNIS_API}/`, '');

      const secondResponse = await request({
        url: _links.program.href,
        method: API_METHOD.GET,
      })
      setProgram(secondResponse.data.name)
      setProgramId(programId.replace('/program', ''));
      setPreview(image);
      setPrevImage(image);
    } catch (e) {

    } finally {
      setIsLoading(false);
    }
  }
console.log('programId', programId)
console.log('program', program)
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

  const handleSelectedProgram = (item) => {
    const { value } = item.target;
    setProgramError('');
    setProgram(value);
    const selectedProgram = programData.find(data => {
      return data.name === value;
    })
    console.log('selectedProgram', selectedProgram)
    setProgramId(parseInt(selectedProgram.id));
  }

  const handleSelectedBatch = (item) => {
    setBatchYear('')
    setBatchYear(item.target.value)
  }

  useEffect(() => {
    if (!image) {
        setPreview(undefined)
        return
    }

    const objectUrl = URL.createObjectURL(image)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
}, [image])

const onSelectFile = e => {
  if (!e.target.files || e.target.files.length === 0) {
    setImage(undefined)
    return
  }

  setImage(e.target.files[0])
}

return (
  <Container className={classes.container}>
    <Title name='Alumni'/>
    <Paper className={classes.paper}>
    {
      id && isLoading ?
        <Loading />
        : 
        <Formik
          initialValues={initialValues}
          validationSchema={alumniSchema}
          onSubmit={handleSubmit}
        >
          {
            formik => (
              
              <Form>
                <Grid container spacing={2} className={isMobileView ? classes.formContainer : ''}>
                  <Grid item md={8} sm={6} xs={12}>
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
                        <Select error={programError} menuItem={programData} label='Program*' value={program} handleChange={handleSelectedProgram}/>
                      </Grid>
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Select menuItem={[]} label='Academic Honors' value={''} handleChange={() =>{}}/>
                      </Grid>
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                      <Select error={batchError} menuItem={batchYears} label='Batch Year*' value={batchYear} handleChange={handleSelectedBatch}/>
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
                  <Grid className={isResponsive ? classes.mPhotoContainer : classes.photoContainer} item md={4} sm={6} xs={12}>
                    {
                      preview ?  
                        <img style={{width: '350px'}} src={preview} /> 
                      :
                        <Paper>

                        </Paper>
                    }
                    <Button
                      id="uploadButton"
                      variant="contained"
                      color="primary"
                      size='medium'
                      component="label"
                      className={classes.uploadButton}
                    >
                      {preview ? 'Update' : 'Upload'}
                      <input
                        id="file"
                        name="file"
                        variant="outlined"
                        // value={formik.values.file}
                        style={{ display: 'none' }}
                        onChange={onSelectFile}
                        type="file" 
                        // accept=".csv"
                      />
                    </Button>
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

export default Alumnus