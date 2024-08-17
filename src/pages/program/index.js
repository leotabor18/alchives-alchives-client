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
import { programSchema, REQUIRED_FIELD } from '../../validation/schema';
import { request } from '../../service/request';
import useResponsive from '../../hooks/useResponsive';
import { API_METHOD } from '../../utility/constant';
import { Form, Formik } from 'formik';
import Select from '../../components/select';

const headCells = [
  createHeadCells('name', false, 'Name', false)
]

const Program = (props) => {
  const { match } = props;
  const { id } = match.params;
  const isCreate = id === 'create';
  
  const classes = useStyles();
  const history = useHistory();
  const { isResponsive, isMobileView } = useResponsive();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [institute, setInstitute]     = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [instituteId, setInstituteId] = useState('');
  const [instituteError, setInstituteError] = useState('');

  const initialValues = {
    name,
    description,
    institute,
  }

  const getInstituteProps = {
    api: api.INSTITUTES_API,
    keyword: '',
    dataFormat: createInstituteData,
    columns: headCells,
    pageName: 'Institutes'
  }

  const { state: programState } = useGetApi(getInstituteProps)
  const { data: instituteData, isLoading: instituteLoading } = programState;

  console.log('instituteData', instituteData)

  const handleSubmit =  async(values, formik) => {
    const { setErrors, setSubmitting } = formik;
    if (!institute) {
      setInstituteError(REQUIRED_FIELD);
      setSubmitting(false);
      return;
    }

    const instituteItem = instituteData.find(item => item.name === institute);

    delete values.institute;
    const newValues = {
      ...values,
      id: parseInt(instituteItem.id)
    }
    try {
      await request({
        url: isCreate ? `${api.PROGRAM_API}/create` : `${api.PROGRAM_API}/${id}`,
        method: isCreate ? API_METHOD.POST: API_METHOD.PATCH,
        data: newValues
      });

      history.push('/portal/programs');
    } catch (error) {
      if (error?.response?.status === 409) {
        setErrors({
          name: 'Program name already exist'
        });
      }
      console.log(error);
    }
    // handleCreate(values, formik);
  }

  const handleCancel = () => {
    history.push('/portal/programs');
  }

  const handleGetUser = async() => {
    setIsLoading(true);
    try {
      const response = await request({
        url: `${api.PROGRAMS_API}/${id}`,
        method: API_METHOD.GET,
      })
      const { name, description, _links } = response.data;
      setName(name);
      setDescription(description);
      const secondResponse = await request({
        url: _links.institute.href,
        method: API_METHOD.GET,
      })
      const instituteId = _links.institute.href.replace(`${api}/`, '');
      console.log('secondResponse', secondResponse)

      setInstituteId(instituteId);
      setInstitute(secondResponse.data.name);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (id && !isCreate) {
      handleGetUser()
    }
  }, [])

  // useEffect(() => {
  //   if (!programData.length) return;

  //   const programObject = programData.find(item => item.id === programId.toString());
  //   setProgram(programObject?.name);
  // }, [programLoading, programId])

//   const handleSelectedProgram = (item) => {
//     const { value } = item.target;
//     setProgramError('');
//     setProgram(value);
//     const selectedProgram = programData.find(data => {
//       return data.name === value;
//     })
//     console.log('selectedProgram', selectedProgram)
//     setProgramId(parseInt(selectedProgram.id));
//   }

//   const handleSelectedBatch = (item) => {
//     setBatchYear('')
//     setBatchYear(item.target.value)
//   }

//   useEffect(() => {
//     if (!image) {
//         setPreview(undefined)
//         return
//     }

//     const objectUrl = URL.createObjectURL(image)
//     setPreview(objectUrl)

//     // free memory when ever this component is unmounted
//     return () => URL.revokeObjectURL(objectUrl)
// }, [image])

// const onSelectFile = e => {
//   if (!e.target.files || e.target.files.length === 0) {
//     setImage(undefined)
//     return
//   }

//   setImage(e.target.files[0])
// }

const handleSelectedInstitute = (item) => {
  const { value } = item.target;
  setInstituteError('');
  setInstitute(value);
  const selectedInstituteId = instituteData.find(data => {
    return data.name === value;
  })
  console.log('selectedInstituteId', selectedInstituteId)
  setInstituteId(parseInt(selectedInstituteId.id));
}

return (
  <Container className={classes.container}>
    <Title name='Program'/>
    <Paper className={classes.paper}>
    {
      id && isLoading ?
        <Loading />
        : 
        <Formik
          initialValues={initialValues}
          validationSchema={programSchema}
          onSubmit={handleSubmit}
        >
          {
            formik => (
              
              <Form>
                <Grid container spacing={2} className={isMobileView ? classes.formContainer : ''}>
                  <Grid container spacing={2}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TextField
                        fullWidth
                        id="name"
                        label={'Program name*'}
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <Select error={instituteError} menuItem={instituteData} label='Institute*' value={institute} handleChange={handleSelectedInstitute}/>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <TextField
                        fullWidth
                        id="description"
                        label={'Description'}
                        name="description"
                        multiline
                        rows={6}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                      />
                    </Grid>
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

export default Program