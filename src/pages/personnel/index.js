import { Box, Button, CircularProgress, Container, Grid, Paper } from '@material-ui/core'
import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Title from '../../components/title'
import useStyles from './styles';
import SearchBar from '../../components/search-bar';
import { createHeadCells, createInstituteData, createProgramData } from '../../utility';
import { useHistory } from 'react-router';
import EnhancedTable from '../../components/table';
import api from '../../service/api';
import useGetApi from '../../hooks/useGetApi';
import Loading from '../../components/loading';
import { personnelSchema, programSchema, REQUIRED_FIELD } from '../../validation/schema';
import { request } from '../../service/request';
import useResponsive from '../../hooks/useResponsive';
import { API_METHOD } from '../../utility/constant';
import { Form, Formik } from 'formik';
import Select from '../../components/select';

const headCells = [
  createHeadCells('name', false, 'Name', false)
]

const Personnel = (props) => {
  const { match } = props;
  const { id } = match.params;
  const isCreate = id === 'create' || !id ;
  
  const classes = useStyles();
  const history = useHistory();
  const { isResponsive, isMobileView } = useResponsive();
  
  const [fullName, setFullName] = useState('');
  const [suffix, setSuffix] = useState('');
  const [prefix, setPrefix] = useState('');
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [image, setImage] = useState('');
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [prevImage, setPrevImage] = useState('');
  const [preview, setPreview] = useState(null)
  console.log('id', id)
  const initialValues = {
    fullName,
    suffix,
    prefix,
    title,
    department,
    position,
    role
  }

  const handleSubmit =  async(values, formik) => {
    const { setErrors, setSubmitting } = formik;
    const newValue = {
      ...values,
      image
    }

    if (image === prevImage) {
      delete newValue.image;
    }

    console.log('newValue', newValue)
    try {
      await request({
        url: isCreate ? `${api.PERSONNEL_API}/create` : `${api.PERSONNEL_API}/${id}`,
        method: isCreate ? API_METHOD.POST: API_METHOD.PATCH,
        data: newValue,
        headers: {
          'Content-type': 'multipart/form-data'
        }
      });

      history.push('/portal/personnel');
    } catch (error) {
      console.log(error);
    }
  }

  const handleCancel = () => {
    history.push('/portal/personnel');
  }

  const handleGetPersonnel = async() => {
    setIsLoading(true);
    try {
      const response = await request({
        url: `${api.PERSONNELS_API}/${id}`,
        method: API_METHOD.GET,
      })
      const { fullName, suffix, prefix, title, department, position, profilePic, role } = response.data;
      setFullName(fullName);
      setSuffix(suffix);
      setPrefix(prefix);
      setTitle(title);
      setDepartment(department);
      setPosition(position);
      setPreview(profilePic);
      setPrevImage(image);
      setRole(role);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (id && !isCreate) {
      handleGetPersonnel()
    }
  }, [])


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
    <Title name='School Personnels'/>
    <Paper className={classes.paper}>
    {
      id && isLoading ?
        <Loading />
        : 
        <Formik
          initialValues={initialValues}
          validationSchema={personnelSchema}
          onSubmit={handleSubmit}
        >
          {
            formik => (
              
              <Form>
                <Grid container spacing={2} className={isMobileView ? classes.formContainer : ''}>
                  <Grid item md={8} sm={6} xs={12}>
                    <Grid container spacing={2}>
                      <Grid item lg={3} md={3} sm={6} xs={6}>
                        <TextField
                          fullWidth
                          id="prefix"
                          label={'Prefix*'}
                          name="prefix"
                          placeholder='Dr., Hon., Prof., Mr., Ms., etc.'
                          value={formik.values.prefix}
                          onChange={formik.handleChange}
                          error={formik.touched.prefix && Boolean(formik.errors.prefix)}
                          helperText={formik.touched.prefix && formik.errors.prefix}
                        />
                      </Grid>
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField
                          fullWidth
                          id="fullName"
                          label={'Full Name*'}
                          name="fullName"
                          value={formik.values.fullName}
                          onChange={formik.handleChange}
                          error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                          helperText={formik.touched.fullName && formik.errors.fullName}
                        />
                      </Grid>
                      <Grid item lg={3} md={3} sm={6} xs={6}>
                        <TextField
                          fullWidth
                          id="suffix"
                          label={'Suffix'}
                          placeholder='PhD, MaED, MIT etc.'
                          name="suffix"
                          value={formik.values.suffix}
                          onChange={formik.handleChange}
                          error={formik.touched.suffix && Boolean(formik.errors.suffix)}
                          helperText={formik.touched.suffix && formik.errors.suffix}
                        />
                      </Grid>
                      {/* <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField
                          fullWidth
                          id="title"
                          placeholder='City Mayor, Dean etc.'
                          label={'Title'}
                          name="title"
                          value={formik.values.title}
                          onChange={formik.handleChange}
                          error={formik.touched.title && Boolean(formik.errors.title)}
                          helperText={formik.touched.title ? formik.errors.title: 
                            'Ex. City Mayor, Dean etc.'}
                        />
                      </Grid> */}
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <TextField
                          fullWidth
                          id="position"
                          label={'Department Position*'}
                          placeholder='Member, Vice Chairman, Secretary, Dean etc.'
                          name="position"
                          value={formik.values.position}
                          onChange={formik.handleChange}
                          error={formik.touched.position && Boolean(formik.errors.position)}
                          helperText={formik.touched.position && formik.errors.position}
                        />
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <TextField
                          fullWidth
                          id="department"
                          label={'Department*'}
                          placeholder='Institute`s name, Board of Trustees etc.'
                          name="department"
                          value={formik.values.department}
                          onChange={formik.handleChange}
                          error={formik.touched.department && Boolean(formik.errors.department)}
                          helperText={formik.touched.department && formik.errors.department}
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

export default Personnel