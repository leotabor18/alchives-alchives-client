import { Box, Button, CircularProgress, Container, Grid, Paper } from '@material-ui/core'
import { Divider, IconButton, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Title from '../../components/title'
import useStyles from './styles';
import SearchBar from '../../components/search-bar';
import { createHeadCells, createInstituteData, createProgramData, getBatchYear } from '../../utility';
import { useHistory } from 'react-router';
import EnhancedTable from '../../components/table';
import api from '../../service/api';
import useGetApi from '../../hooks/useGetApi';
import Loading from '../../components/loading';
import { eventSchema, personnelSchema, programSchema, REQUIRED_FIELD } from '../../validation/schema';
import { request } from '../../service/request';
import useResponsive from '../../hooks/useResponsive';
import { API_METHOD } from '../../utility/constant';
import { Field, FieldArray, Form, Formik } from 'formik';
import Select from '../../components/select';
import { Add, PlusOne, Remove } from '@mui/icons-material';
import MultipleSelect from '../../components/multiselect';

const headCells = [
  createHeadCells('name', false, 'Name', false)
]

const Event = (props) => {
  const { match } = props;
  const { id } = match.params;
  const isCreate = id === 'create' || !id ;
  
  const classes = useStyles();
  const history = useHistory();
  const { isResponsive, isMobileView } = useResponsive();

  const batchYears = getBatchYear(2016);

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
  
  const [eventName, setEventName] = useState('');
  const [eventTheme, setEventTheme] = useState('');
  const [eventProgramId, setEventProgramId] = useState('');
  const [eventProgram, setEventProgram] = useState([]);
  const [eventVenue, setEventVenue] = useState('');
  const [eventBatchYear, setEventBatchYear] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventThemeSongTitle, setEventThemeSongTitle] = useState('');
  const [eventThemeSong, setEventThemeSong] = useState('');
  const [batchError, setBatchError] = useState('');
  const [programError, setProgramError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [eventPersonnelList, setEventPersonnelList] = useState([{value: '', message: '', personnelId: ''}]);
  const [existingPersonnelList, setExistingPersonnelList] = useState([]);
  const [selectedProgramName, setSelectedProgramName] = useState([]);
  const [selectedProgramId, setSelectedProgramId] = useState([]);
  const [toSendBatchYear, setToSendBatchYear] = useState(eventBatchYear);

  const getSelectedProgramIds = async () => {
    const selectedProgramId = selectedProgramName?.map(program => {
      programData.find(data => {
        console.log("iter", program === data.name)
        if (data?.name === program) {
          console.log("valueee hereeeee", data.id)
          return data?.id;
        }
      })

    })

    return selectedProgramId;

  }

  console.log('id', id)

  const initialValues = {
    eventName,
    eventTheme,
    eventVenue,
    eventDate,
    eventThemeSongTitle,
    eventThemeSong,
    eventPersonnelList: eventPersonnelList
  }

  const handleSubmit =  async(values, formik) => {
    // const { setErrors, setSubmitting } = formik;

    console.log("valueee", selectedProgramName)
    console.log("valueee", programData)
    
    const newValue = {
      ...values,
      // programId: eventProgramId,
      eventDate,
      batchYear: toSendBatchYear,
      // programIds: await getSelectedProgramIds();
      programs: selectedProgramName
    }
    console.log("valueeeeee", newValue)

    // if (!eventBatchYear) {
    //   setBatchError(REQUIRED_FIELD);
    //   setSubmitting(false);
    //   return;
    // }

    try {
      await request({
        url: isCreate ? `${api.EVENT}/create` : `${api.EVENTS}/${id}`,
        method: isCreate ? API_METHOD.POST: API_METHOD.PATCH,
        data: newValue,
        // headers: {
        //   'Content-type': 'multipart/form-data'
        // }
      });

      history.push('/portal/events');
    } catch (error) {
      console.log(error);
    }
  }

  const handleCancel = () => {
    history.push('/portal/events');
  }

  const handleGetEvent = async() => {
    setIsLoading(true);
    try {
      const response = await request({
        url: `${api.EVENT}/${id}`,
        method: API_METHOD.GET,
      })
      console.log("event response", response)
      const { name, theme, themeSong, themeSongTitle, venue, date, batchYear, eventPersonnels, eventProgram, _links } = response.data;
      
      // const programId = _links.program.href.replace(`${api.ALUMNIS_API}/`, '');
      
      // const secondResponse = await request({
      //   url: _links.program.href,
      //   method: API_METHOD.GET,
      // })

      const parsingPersonnel = await eventPersonnels.map(personnel =>       
      ({
        message: personnel?.message,
        value: personnel?.personnel?.prefix + " " + personnel?.personnel?.fullName + " " + personnel?.personnel?.suffix,
      }))

      const parsingEventProgram = await eventProgram.map(program =>       
      ({
        name: program?.program_id?.name
      }))

      
      setEventName(name);
      setEventTheme(theme);
      setEventProgram(parsingEventProgram);
      // setEventProgramId(programId.replace('/program', ''));
      setEventPersonnelList(parsingPersonnel)
      setEventVenue(venue);
      setEventBatchYear(batchYear);
      setEventDate(date);
      setEventThemeSongTitle(themeSongTitle);
      setEventThemeSong(themeSong);
      console.log("event response2222", name)

    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSelectedBatch = (item) => {
    setEventBatchYear('')
    setEventBatchYear(item.target.value)
  }

  const handleSelectedDate = (item) => {
    setEventDate('')
    setEventDate(item.target.value)
  }

  const handleSelectedProgram = (item) => {
    const { value } = item.target;
    setProgramError('');
    setEventProgram(value);
    const selectedProgram = programData.find(data => {
      return data.name === value;
    })
    console.log('selectedProgram', selectedProgram)
    setEventProgramId(parseInt(selectedProgram.id));
  }

  useEffect(async () => {

    // const isEvent = await request({
    //   url: `${api.EVENT}/get-current-event?programId=2&batchYear=2023`,
    //   method: API_METHOD.GET,
    // })

    // console.log("test event", isEvent)
    // const educEvent = await request({
    //   url: `${api.EVENT}/get-current-event?programId=8&batchYear=2024`,
    //   method: API_METHOD.GET,
    // })

    // console.log("test event", educEvent)

    if (id && !isCreate) {
      handleGetEvent()
    } else {
      const personnelResponse = await request({
        url: api.PERSONNELS_API,
        method: API_METHOD.GET,
      })

      setExistingPersonnelList(personnelResponse?.data?._embedded?.personnels?.map(personnel => {
        const personnelId = personnel._links.self.href.replace(`${api.PERSONNELS_API}/`, '');
        return {
          id: personnelId,
          name: personnel.prefix + ' ' + personnel.fullName + ' ' + personnel.suffix
        }
      }))
      
      console.log("personnels here", existingPersonnelList)
      
    }
  }, [])

  const handleChangePersonnel = (item, index) => {
    const { value } = item.target;
    initialValues.eventPersonnelList[index].value = value;
  }

  useEffect(() => {
    setToSendBatchYear(eventBatchYear);
  }, [eventBatchYear]);

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

return (
  <Container className={classes.container}>
    <Title name='Graduation Event'/>
    <Paper className={classes.paper}>
    {
      id && isLoading ?
        <Loading />
        : 
        <Formik
          initialValues={initialValues}
          // validationSchema={eventSchema}
          onSubmit={handleSubmit}
        >
          {
            formik => (
              
              <Form>
                <Grid container spacing={2} className={isMobileView ? classes.formContainer : ''}>
                  <Grid item md={8} sm={6} xs={12}>
                    <Grid container spacing={2}>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <TextField
                          fullWidth
                          id="eventName"
                          label={'Event Name*'}
                          name="eventName"
                          placeholder='Event Name'
                          value={formik.values.eventName}
                          onChange={formik.handleChange}
                          error={formik.touched.eventName && Boolean(formik.errors.eventName)}
                          helperText={formik.touched.eventName && formik.errors.eventName}
                        />
                      </Grid>
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                        {/* <Select error={programError} menuItem={programData} label='Program*' value={eventProgram} handleChange={handleSelectedProgram}/> */}
                        <MultipleSelect setSelectedProgramName={setSelectedProgramName} selectedProgramName={selectedProgramName} />
                      </Grid>
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Select error={batchError} menuItem={batchYears} label='Batch Year*' value={eventBatchYear} handleChange={handleSelectedBatch}/>
                      </Grid>
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField
                          fullWidth
                          id="eventTheme"
                          label={'Event Theme*'}
                          name="eventTheme"
                          value={formik.values.eventTheme}
                          onChange={formik.handleChange}
                          error={formik.touched.eventTheme && Boolean(formik.errors.eventTheme)}
                          helperText={formik.touched.eventTheme && formik.errors.eventTheme}
                        />
                      </Grid>
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField
                          fullWidth
                          id="eventVenue"
                          label={'Event Venue*'}
                          placeholder='Event Venue'
                          name="eventVenue"
                          value={formik.values.eventVenue}
                          onChange={formik.handleChange}
                          error={formik.touched.eventVenue && Boolean(formik.errors.eventVenue)}
                          helperText={formik.touched.eventVenue && formik.errors.eventVenue}
                        />
                      </Grid>
                      <Grid item lg={3} md={3} sm={6} xs={6}>
                        <TextField
                          id="date"
                          label="Event date"
                          type="date"
                          value={eventDate}
                          sx={{ width: 220 }}
                          onChange={handleSelectedDate}
                          error={formik.touched.eventDate && Boolean(formik.errors.eventDate)}
                          helperText={formik.touched.eventDate && formik.errors.eventDate}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <TextField
                          fullWidth
                          id="eventThemeSongTitle"
                          label={'Theme song title'}
                          name="eventThemeSongTitle"
                          value={formik.values.eventThemeSongTitle}
                          onChange={formik.handleChange}
                          error={formik.touched.eventThemeSongTitle && Boolean(formik.errors.eventThemeSongTitle)}
                          helperText={formik.touched.eventThemeSongTitle && formik.errors.eventThemeSongTitle}
                        />
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <TextField
                          fullWidth
                          multiline
                          rows={6}
                          id="eventThemeSong"
                          label={'Theme song'}
                          name="eventThemeSong"
                          value={formik.values.eventThemeSong}
                          onChange={formik.handleChange}
                          error={formik.touched.eventThemeSong && Boolean(formik.errors.eventThemeSong)}
                          helperText={formik.touched.eventThemeSong && formik.errors.eventThemeSong}
                        />
                      </Grid>
                    </Grid>
                  </Grid> 
                  {/* Add grid for pic here <Grid></Grid> */}
                  <Grid item xs={12} lg={12}>
                    <Divider />
                    <Typography color='primary' sx={{marginBottom: '24px', marginTop: '24px'}} variant='h6'>School personnel and messages</Typography>
                    <FieldArray name="eventPersonnelList">
                      {({ push, remove, replace }) => (
                        <Box>
                          {formik?.values?.eventPersonnelList?.map((field, index) => (
                            <Box key={index} mb={2}>
                              {
                                (isCreate) ?
                                <>
                                  <Box sx={{display:'flex',  alignItems: 'center'}}>
                                    <Select menuItem={existingPersonnelList} label='Personnel' value={formik.values.eventPersonnelList[index].value} 
                                      handleChange={(e) => {
                                        const selectedPerson = existingPersonnelList.find(data => {
                                          return data.name === e.target.value;
                                        })
                                        formik.setFieldValue(`eventPersonnelList[${index}].personnelId`, selectedPerson.id);
                                        formik.setFieldValue(`eventPersonnelList[${index}].value`, e.target.value);
                                      }}
                                    />
                                    <Remove sx={{marginLeft: '16px', color: 'blue'}} 
                                      onClick={() => {
                                        if (formik.values.eventPersonnelList.length === 1) {
                                          replace(index, {value: '', message: ''})
                                        } else {
                                          remove(index)
                                        }
                                      }}
                                    />
                                  </Box>
                                  <TextField
                                    name={`eventPersonnelList[${index}].message`}
                                    label={`Message`}
                                    value={formik.values.eventPersonnelList[index].message}
                                    onChange={formik.handleChange}
                                    variant="outlined"
                                    fullWidth
                                    rows={4}
                                    multiline
                                    // error={Boolean(formik.touched.eventPersonnelList?.[index]?.message && formik.errors.eventPersonnelList?.[index]?.message)}
                                    // helperText={
                                    //   formik.touched.eventPersonnelList?.[index]?.message && formik.errors.eventPersonnelList?.[index]?.message
                                    //     ? formik.errors.fields[index].message
                                    //     : ''
                                    // }
                                    margin="normal"
                                  />
                                </>
                                :
                                <>
                                  <Box style={{marginBottom:'8px'}}>
                                    <Typography variant='h6'>{field.value}</Typography>
                                  </Box>
                                  <Box>
                                    <Typography variant='body2'>{field.message}</Typography>
                                  </Box>
                                </>
                              }
                              
                            </Box>
                          ))}

                          {
                            isCreate &&
                            <Button
                              startIcon={<Add/>}
                              variant="outlined"
                              color="primary"
                              onClick={() => {
                                const lastIndex   = formik.values.eventPersonnelList.length - 1;
                                const lastValue   = formik.values.eventPersonnelList[lastIndex].value;
                                const lastMessage = formik.values.eventPersonnelList[lastIndex].message;
                                // Check if the last field is not empty before adding a new one
                                if (lastValue.trim() === '' || lastMessage.trim() === '') {
                                  // formik.setEventPersonnelListTouched(`fields[${lastIndex}].value`, true);
                                  alert('Please fill in the last Personnel before adding a new one');
                                } else {
                                  push({ value: '', message: '' });
                                }
                              }} 
                            >
                              Add Personnel
                            </Button>

                          }
                      
                        </Box>
                      )}

                    </FieldArray>
                    {
                      isCreate ? 
                      <></>
                      :
                      <>
                        <Divider />
                        <Typography color='primary' sx={{marginBottom: '24px', marginTop: '24px'}} variant='h6'>Programs</Typography>
                        {
                          eventProgram.map((program, index) => (
                            <>
                              <Box key={index} style={{marginBottom:'8px'}}>
                                <Typography variant='h6'>{program.name}</Typography>
                              </Box>
                            </>
                          ))
                        }
                      </>
                    }
                  </Grid>
 
                </Grid>            
                <Box textAlign='center' className={`${classes.buttonContainer} ${isMobileView && classes.mButtonContainer}`}>
                  {
                    isCreate &&
                    <>
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
                    </>
                  }
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

export default Event