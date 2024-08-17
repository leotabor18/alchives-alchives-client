import React, { useEffect, useState } from 'react';

import { Box, Container, Typography } from '@mui/material';
import HTMLFlipBook from 'react-pageflip';
import gradPic from '../../assets/images/pic-placeholder.jpeg';
import alumniBackgroundImage from '../../assets/images/yearbook-cover.jpg';
import Loading from '../../components/loading';
import useGetApi from '../../hooks/useGetApi';
import api from '../../service/api';
import useStyles from './styles';
import { useHistory } from 'react-router-dom';
import { API_METHOD } from '../../utility/constant';
import { request } from '../../service/request';
import Select from '../../components/select';
import { Button, Dialog, Grid, IconButton, Link, Paper } from '@material-ui/core';
import Tile from '../../components/tile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const MENU_ITEM = [
  {id: 1, name: 'Tiles'},
  {id: 2, name: 'Book'}
]


const StudentModal = (props) => {
  const { open, handleClose, student, program } = props;
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={classes.modal}
    >
      <Paper className={classes.paper}>
        <Typography className={classes.title} variant='h5' color='primary'>{program}</Typography>
        <Box className={classes.modalContent}>
          <Box className={classes.studentContent}>
            <Typography className={classes.studentName} variant='h4'>{`${student.lastName}, ${student.firstName}`}</Typography>
            <Typography className={classes.batch} variant='h6'>{`${student.studentNumber} - Batch ${student.batchYear}`}</Typography>
            <Typography className={classes.quotes} variant='h6'>"{student.quotes}"</Typography>
          </Box>
          <img src={student.image ? student.image : gradPic} className={classes.studentPic} alt='CCA Background' />
        </Box>
      </Paper>

    </Dialog>
  )
}

const TilesView = (props) => {
  const { data, program } = props;

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [student, setStudent] = useState({});

  const handleOpen = (value) => {
    setOpen(true);
    setStudent(value)
  }

  const handleCloseModal = () => {
    setOpen(false);
  }

  return (
    <>
      <StudentModal 
        student={student}
        program={program}
        open={open}
        handleClose={handleCloseModal}
      />
      <Grid container spacing={2}>
      {
        data.map((student, index) => (
          <Grid key={index} item xs={4} sm={8} md={3} >
            <Paper className={classes.tile} >
              <Box>
                <img className={classes.programPic} src={student.image ? student.image : gradPic} alt='Alumni Placeholder Image' />
              </Box>
              <Link onClick={() => handleOpen(student)}>{`${student.lastName}, ${student.firstName}`}</Link>
            </Paper>
          </Grid>
        ))
      }
      </Grid>
    </>
  )
}

const PublicAlumni = () => {
  const classes = useStyles();

  const history = useHistory();
  
  const { search } = history.location;
  const params      = new URLSearchParams(search);

  const batchYear = params.get('batch');
  const programId = params.get('programId');

  const getProps = {
    api: api.PUBLIC_ALUMNI_API,
    pageName: 'Public Alumni',
    params: {
      batchYear,
      programId
    }
  }

  const { state } = useGetApi(getProps)
  const { data, isLoading: alumniLoading } = state;

  const [isLoading, setIsLoading] = useState(false);
  const [programName, setProgramName] = useState('');
  const [view, setView] = useState('Tiles');

  const handleGetInstitute = async() => {
    setIsLoading(true);
    try {
      const response = await request({
        url: `${api.PUBLIC_PROGRAMS_API}/${programId}`,
        method: API_METHOD.GET,
      })
      setProgramName(response?.data?.name);
    } catch (e) {

    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!programId) {
      history.push('/programs');
      return;
    }

    handleGetInstitute();
  }, []);

  const PageCover = React.forwardRef((props, ref) => {
    return (
      <div className={`${classes.bookContent} ${classes.cover} page page-cover`} ref={ref} data-density="hard">
        <div  className={`${classes.coverContent} page-content`}>
          {props.children}
        </div>
      </div>
    );
  });

  const PageContent = React.forwardRef((props, ref) => {
    return (
      <div className={classes.bookContent} ref={ref}>
        <Container className={classes.bookContainer}>
          <img className={classes.gradPic} src={props.image ? props.image : gradPic} alt='Alumni Background Image' />
          <Box className={classes.textBox}>
            <Typography variant='h4'>{props.name}</Typography>
            <Typography variant='h5'>Cum Laude</Typography>
            <i variant='h5'>"{props.quotes}"</i>
          </Box>
        </Container>
      </div>
    )
  })

  const handleView = (item) => {
    setView(item.target.value);
  }

  const handleHome = () => {
    history.push('/programs')
  }

  return (
    <>
      <Container className={classes.parentContainer}>
        <IconButton onClick={handleHome} className={classes.iconButton}>
          <FontAwesomeIcon color='primary' icon={faArrowLeft} />
        </IconButton>
        <Grid container className={classes.alumniHeader}>
          <Grid item xs={12} sm={12} md={9} lg={9}>
            <Typography color='primary' variant='h4'>{programName}</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2}>
            <Select menuItem={MENU_ITEM} label='View*' value={view} handleChange={handleView}/>
          </Grid>
        </Grid>
      </Container>
      {
        view === 'Book' ?
          <Container className={classes.container}>
            {
              alumniLoading ?
              <Loading />
              :
              <HTMLFlipBook 
              width={500}
              height={650}
              minWidth={315}
              maxWidth={1000}
                minHeight={400}
                maxHeight={1533}
                >
                <div sx={{ boxShadow: 2 }} className={`${classes.bookContent} ${classes.firstPage} `}></div>
                <PageCover sx={{ boxShadow: 2 }}>
                  <img className={classes.alumniBackgroundImage} src={alumniBackgroundImage} alt='Alumni Background Image' />
                  {/* <Typography variant='h4'>Batch {batchYear}</Typography> */}
                </PageCover>
                <div sx={{ boxShadow: 2 }} className={`${classes.bookContent} ${classes.cover}`}></div>
              
              {
                data.map((item, index) => (
                  <PageContent key={index} image={item.image} name={`${item.lastName}, ${item.firstName}`} quotes={item.quotes}/>
                  ))
                }
                {/* <div sx={{ boxShadow: 2 }} className={`${classes.bookContent} ${classes.cover}`}></div> */}
                <PageCover></PageCover>
              </HTMLFlipBook>
            }
          </Container>
        :
          <Container>
            <TilesView data={data} program={programName} />
          </Container>
      }
    </>
  )
}

export default PublicAlumni