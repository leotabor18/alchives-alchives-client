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
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import ColorPicker from 'react-pick-color';
import colors from '../../themes/colors';
import Programs from '../programs';

const headCells = [
  createHeadCells('name', false, 'Name', false)
]

const Institute = (props) => {
  const { match } = props;
  const { id } = match.params;
  const isCreate = id === 'create';
  
  const classes = useStyles();
  const history = useHistory();
  const { isResponsive, isMobileView } = useResponsive();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [programs, setPrograms]     = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [instituteId, setInstituteId] = useState('');
  const [instituteError, setInstituteError] = useState('');
  const [prevImage, setPrevImage] = useState('');
  const [image, setImage] = useState('');
  const [showColor, setShowColor] = useState(false)
  const [preview, setPreview] = useState(null);
  const [color, setColor] = useState(colors.PRIMARY);

  const initialValues = {
    name,
    description,
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

  const handleSubmit =  async(values, formik) => {
    const { setErrors, setSubmitting } = formik;

    const newValues = {
      ...values,
      image,
      color
    }
    
    if (image === prevImage) {
      delete newValues.image;
    }
    
    try {
      await request({
        url: isCreate ? `${api.PUBLIC_INSTITUTES_API}/create` : `${api.PUBLIC_INSTITUTES_API}/update/${id}`,
        method: isCreate ? API_METHOD.POST: API_METHOD.PATCH,
        data: newValues,
        headers: {
          'Content-type': 'multipart/form-data'
        }
      });

      history.push('/portal/institutes');
    } catch (error) {
      if (error?.response?.status === 409) {
        setErrors({
          name: 'Institute name already exist'
        });
      }
      console.log(error);
    }
    // handleCreate(values, formik);
  }

  const handleCancel = () => {
    history.push('/portal/institutes');
  }

  const handleGetData = async() => {
    setIsLoading(true);
    try {
      const response = await request({
        url: `${api.INSTITUTES_API}/${id}`,
        method: API_METHOD.GET,
      })
      const { name, description, image, color, _links } = response.data;
      setName(name);
      setDescription(description);
      const secondResponse = await request({
        url: _links.programs.href,
        method: API_METHOD.GET,
      })
      const instituteId = _links.institute.href.replace(`${api}/`, '');

      setInstituteId(instituteId);
      setPrograms(secondResponse.data._embedded.programs);
      setColor(color)
      setPreview(image);
      setPrevImage(image);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (id && !isCreate) {
      handleGetData()
    }
  }, [])


// const handleSelectedInstitute = (item) => {
//   const { value } = item.target;
//   setInstituteError('');
//   setInstitute(value);
//   const selectedInstituteId = instituteData.find(data => {
//     return data.name === value;
//   })
//   console.log('selectedInstituteId', selectedInstituteId)
//   setInstituteId(parseInt(selectedInstituteId.id));
// }

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
    <Title name={name}/>
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
                  <Grid item sm={8}>
                    <Grid container spacing={2}>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <TextField
                          fullWidth
                          id="name"
                          label={'Institute name*'}
                          name="name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          error={formik.touched.name && Boolean(formik.errors.name)}
                          helperText={formik.touched.name && formik.errors.name}
                        />
                      </Grid>
                      {/* <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Select error={instituteError} menuItem={instituteData} label='Institute*' value={institute} handleChange={handleSelectedInstitute}/>
                      </Grid> */}
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
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Button                      variant="contained"
                          color="primary"
                          size='medium'
                          className={classes.uploadButton}
                          component="label"
                          onClick={() => setShowColor(prev => !prev)}>{color ? 'Update Institute Color' : 'Add Institute Color'}</Button>
                        {showColor ? (
                          <ColorPicker color={color} onChange={color => setColor(color.hex)} />
                        ) : (
                          <></>
                        )}
                      </Grid>
                    </Grid>  
                  </Grid>
                  <Grid item sm={4}> 
                      <Grid className={isResponsive ? classes.mPhotoContainer : classes.photoContainer} item md={12} sm={12} xs={12}>
                        {
                          preview ?  
                          <Zoom>
                            <img style={{width: '350px'}} src={preview} /> 
                          </Zoom>
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
                          {preview ? 'Update Logo' : 'Upload Logo'}
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
    <Programs id={id}/>
  </Container>
)
}

export default Institute