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
import { AutoAwesome } from '@mui/icons-material';
import Carousel from 'react-material-ui-carousel';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'


const MENU_ITEM = [
  {id: 1, name: 'Tiles'},
  {id: 2, name: 'Book'}
]

var items = [
  {
      name: "Message from the Dean",
      description: `Probably the most random thing you have ever seen!Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet suscipit nunc. 
      Curabitur vulputate euismod risus, vitae efficitur ante faucibus vel. Integer dictum est nec lacus consectetur, 
      eget dictum risus dapibus. Nullam ut magna vel augue porttitor auctor. Nam vel urna sapien. Vestibulum pharetra 
      ex nisi`,
      align: 'left'
  },
  {
      name: "Vision",
      description: `An institution of hope, a thought leader in its area of operations and preferred provider of talent in the Metro Angeles Area.`,
      align: 'center'
  },
  {
      name: "Mission",
      description: `The City College of Angeles is committed to offer quality education for the holistic development of competitive and technically-capable professionals with a deep sense of excellence, resiliency, stewardship, and patrimony.`,
      align: 'center'
  },
  {
      name: "Objectives",
      description: "• To provide degree and non-degree programs that are relevant to local and global demands and are in compliance with quality standards in education. \n\n • To strengthen the natural capability of the College through continuous benchmarking, program evaluation, innovation, and professional development of the administrators, faculty, and staff. \n\n • To develop networks and linkages with local and international institutions to ensure the quality of education. \n\n • To produce research which will contribute to the efficient and effective management of the institution and to serve the community better. \n\n • To develop and strengthen the moral values of administrators, faculty, staff, and students. \n\n • To develop a positive image of corporate and social responsibility that will benefit the community. \n\n • To serve as an active agent for the cultivation, promotion, preservation, and appreciation of Kapampangan arts, culture, and heritage.",
      align: 'left'
  },
  {
    name: 'Core Values',
    description: 'Excellence \n Stewardship \n Resiliency \n Patrimony',
    align: 'center'
  },
  {
    name: 'Hymn',
    description: `Oh City College College of Angeles! \n You inculcate faith in ourselves \n Testament to our undying will \n To earn wisdom of paramount quality \n Hail our Alma Mater, our sanctuary! \n You always call us to seek excellence \n Yet beacon of humility and resilience \n For hope''s alive in us as our passion \n To steward with kindness and compassion \n\n Hail CCA, our shelter and protection! \n Forever we''ll hold fond memories \n In molding us as paragons of greatness \n Never we''ll forget, in all times of glory \n To give thanks to God and our community \n Hail CCA, our beloved Alma Mater!`,
    align: 'center'
  }

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
        <Typography className={classes.title} variant="h5" color="primary">{program}</Typography>
        
        <Box className={classes.modalContent}>
          <Box className={classes.studentContent}>
            <Typography className={classes.studentName} variant="h4">{`${student.lastName}, ${student.firstName}`}</Typography>
            <Typography className={classes.batch} variant="h6">{`${student.studentNumber} - Batch ${student.batchYear}`}</Typography>
            <Typography className={classes.quotes} variant="h6">"{student.quotes}"</Typography>
            <Typography className={classes.batch} variant="h6">{student.award}</Typography>
          </Box>
          
          {/* Student Image Section */}
          <Zoom>
            <img src={student.image ? student.image : gradPic} className={classes.studentPic} alt="CCA Background" />
          </Zoom>
        </Box>

        {/* Achievements Section */}
        <Box className={classes.achievementsSection}>
          <Typography variant="h6" color="primary" style={{ marginBottom: '12px' }}>
            Achievements
          </Typography>
          
          {student.achievements && student.achievements.length > 0 ? (
            <Box>
              {student.achievements.map((achievement, index) => (
                <Box key={index} style={{ marginBottom: '12px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                  <Typography variant="body1" style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    {achievement.text}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" style={{ fontStyle: 'italic' }}>
                    {achievement.date}
                  </Typography>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography variant="body2" color="textSecondary">No achievements to display</Typography>
          )}
        </Box>
      </Paper>
    </Dialog>
  );
};


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

  const CarouselItem = (props) =>  
  {
      return (
          <Box style={{width: '100%',  padding: '20px', overflow: 'auto'}}>
              <h2>{props.item.name}</h2>
              <Typography variant='body2'>{props.item.description}</Typography>
          </Box>
      )
  }

  return (
    <Box>
      <StudentModal 
        student={student}
        program={program}
        open={open}
        handleClose={handleCloseModal}
      />
      <Box style={{width: '100%', height: '500px', overflow: 'auto', marginBottom: '100px'}}>
     
          {
            items.map( (item, i) => (
              <>
                <Typography variant='h6' style={{marginBottom:'16px'}} >{item.name}</Typography>
                <Typography variant='body2' style={{marginBottom:'16px'}} >{item.description}</Typography>
              </>
            ))
          }
    
      </Box>
      <Grid container spacing={2}>
    
          {
            data.map((student, index) => (
              <Grid key={index} item xs={4} sm={8} md={3} >
                <Paper className={classes.tile} >
                  <Box>
                  <Zoom>

                    <img className={classes.programPic} src={student.image ? student.image : gradPic} alt='Alumni Placeholder Image' />
                  </Zoom>
                  </Box>
                  <Link onClick={() => handleOpen(student)}>{`${student.lastName}, ${student.firstName}`}</Link>
                </Paper>
              </Grid>
            ))
          }
   
      </Grid>
    </Box>
  )
}

const SlideshowView = (props) => {
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

  const CarouselItem = (props) => {
    const { item } = props;
    
    return (
      <Paper style={{ display: 'flex', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', width: '100%', height: '100%', padding: '20px', overflow: 'auto' }}>
        <Box>
          <img className={classes.programPicSlide} src={item.image ? item.image : gradPic} alt="Alumni Placeholder Image" />
        </Box>
  
        <Box style={{ marginBottom: '8px' }}>
          <Typography variant="h5" color="primary">{`${item.lastName}, ${item.firstName}`}</Typography>
        </Box>
  
        <Box>
          <Typography className={classes.quotes} variant="body2">"{item.quotes}"</Typography>
        </Box>
  
        {/* Render Achievements */}
        <Box style={{ marginTop: '20px', width: '100%' }}>
          <Typography variant="h6" color="primary" style={{ marginBottom: '12px' }}>
            Achievements
          </Typography>
          {item.achievements && item.achievements.length > 0 ? (
            <Box>
              {item.achievements.map((achievement, index) => (
                <Box key={index} style={{ marginBottom: '12px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                  <Typography variant="body1" style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    {achievement.text}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" style={{ fontStyle: 'italic' }}>
                    {achievement.date}
                  </Typography>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography variant="body2" color="textSecondary">No achievements to display</Typography>
          )}
        </Box>
      </Paper>
    );
  };

  return (
    <Box style={{position: 'relative'}}>
    
      <Box style={{width: '100%', position: 'absolute'}}>
        <Carousel height={500}>
          {
            data?.map( (item, i) => <CarouselItem key={i} item={item} /> )
          }
        </Carousel>
      </Box>

    </Box>
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
      history.push('/');
      return;
    }

    handleGetInstitute();
  }, []);

  const splitParagraphIntoChunks = (text, chunkSize) => {
    const chunks = [];
    let index = 0;

    while (index < text.length) {
      chunks.push(text.slice(index, index + chunkSize));
      index += chunkSize;
    }
    
    return chunks;
  };


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
          <Zoom>
            <img className={classes.gradPic} src={props.image ? props.image : gradPic} alt="Alumni Background Image" />
          </Zoom>
          
          <Box className={classes.textBox}>
            {/* Styled Name */}
            <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '10px' }}>
              {props.name}
            </Typography>
  
            {/* Styled Award */}
            <Typography variant="h5" style={{ fontStyle: 'italic', marginBottom: '10px' }}>
              {props.award}
            </Typography>
  
            {/* Styled Quote */}
            <Typography variant="h6" style={{ fontSize: '1.1rem', color: '#555', fontStyle: 'italic', marginBottom: '20px' }}>
              "{props.quotes}"
            </Typography>
          </Box>
  
          {/* Achievements Section */}
          <Box className={classes.achievementsSection}>
            <Typography variant="h6" color="primary" style={{ marginBottom: '12px' }}>
              Achievements
            </Typography>
  
            {props.achievements && props.achievements.length > 0 ? (
              <Box>
                {props.achievements.map((achievement, index) => (
                  <Box
                    key={index}
                    style={{
                      marginBottom: '12px',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      backgroundColor: '#f9f9f9',
                    }}
                  >
                    <Typography variant="body1" style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                      {achievement.text}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{ fontStyle: 'italic' }}>
                      {achievement.date}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="textSecondary">
                No achievements to display
              </Typography>
            )}
          </Box>
        </Container>
      </div>
    );
  });
    

  const PageInitialContent = React.forwardRef((props, ref) => {
    return (
      <div className={classes.bookContentStudents} ref={ref}>
        <Container className={classes.bookContainer}>
          <Box style={{marginBottom: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Typography variant={props.content.name === 'Core Values' && "h5"} style={{fontWeight: 'bold'}}>{props.content.name}</Typography>
            <Box sx={{ padding: 2 }}>
              <Typography  sx={{ whiteSpace: 'pre-line' }} variant={props.content.name === 'Core Values' ? "h5" : "body2"} style={{textAlign: props.content.align}}>
                {props.content.description}
              </Typography>
            </Box>
          </Box>
        </Container>
      </div>
    )
  })


  const PageCoverContent = React.forwardRef((props, ref) => {
    return (
      <Box
        sx={{
          position: 'relative',
          display: 'inline-block',
          width: '100%', 
          height: '100%',
        }}
        ref={ref}
      >
        <Box
          component="img"
          src={props.src}
          alt={props.alt}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        <Typography
          variant="h5"
          sx={{
            position: 'absolute',
            top: '43%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#fff', // white text color
            fontFamily: 'Roboto',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
            textAlign: 'center',
          }}
        >
          {'BATCH'}
        </Typography>
        <Typography
          variant="h1"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#fff', // white text color
            fontFamily: 'Caveat',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
            textAlign: 'center',
            size: '100px'
          }}
        >
          {batchYear}
        </Typography>
      </Box>
    )
  })

  const handleView = (item) => {
    setView(item.target.value);
  }

  const handleHome = () => {
    history.push('/')
  }

  const  chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  const byThreeData = chunkArray(data, 3);

  const paragraph = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet suscipit nunc. 
  Curabitur vulputate euismod risus, vitae efficitur ante faucibus vel. Integer dictum est nec lacus consectetur, 
  eget dictum risus dapibus. Nullam ut magna vel augue porttitor auctor. Nam vel urna sapien. Vestibulum pharetra 
  ex nisi, vel fermentum dolor scelerisque nec. Aenean luctus lacus id felis efficitur, at tincidunt eros bibendum. 
  Donec vel augue sed neque egestas finibus. Ut vehicula felis eget est lobortis, nec vehicula velit ultrices. 

  Proin tincidunt urna id sem cursus, ac elementum neque sollicitudin. Maecenas convallis suscipit felis, 
  eget consectetur mauris pretium vel. Fusce vitae nibh vestibulum, porttitor arcu in, facilisis libero. 
  Duis tincidunt justo eu sem faucibus ultricies. Aenean posuere feugiat velit, vitae auctor mauris sodales id. 
  Sed sit amet molestie neque. Integer tincidunt leo eget diam facilisis, non placerat felis egestas. 
  Sed elementum pretium odio, vel euismod ipsum pharetra id. Sed eu metus sed erat dictum pharetra sit amet ac justo. 
  `;

  const vision = `
  Proin tincidunt urna id sem cursus, ac elementum neque sollicitudin. Maecenas convallis suscipit felis, 
  eget consectetur mauris pretium vel. Fusce vitae nibh vestibulum, porttitor arcu in, facilisis libero. 
  Duis tincidunt justo eu sem faucibus ultricies. Aenean posuere feugiat velit, vitae auctor mauris sodales id. 
  Sed sit amet molestie neque. Integer tincidunt leo eget diam facilisis, non placerat felis egestas. 
  Sed elementum pretium odio, vel euismod ipsum pharetra id. Sed eu metus sed erat dictum pharetra sit amet ac justo.`;

  const mission = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet suscipit nunc. 
  Curabitur vulputate euismod risus, vitae efficitur ante faucibus vel. Integer dictum est nec lacus consectetur, 
  eget dictum risus dapibus. Nullam ut magna vel augue porttitor auctor. Nam vel urna sapien. Vestibulum pharetra 
  ex nisi, vel fermentum dolor scelerisque nec. Aenean luctus lacus id felis efficitur, at tincidunt eros bibendum. 
  Donec vel augue sed neque egestas finibus. Ut vehicula felis eget est lobortis, nec vehicula velit ultrices. `;

  const chunkedMessage = splitParagraphIntoChunks(paragraph, 1000);

  const initialPagesContent = [
    {title: 'message from the dean', paragraph: chunkedMessage},
  ]
  const vm = [
    {title: 'vision', paragraph: vision},
    {title: 'mission', paragraph: mission},
  ]

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
                  items.map((item, index) => (
                    <PageInitialContent key={`initialContent${index}`} content={item}/>
                  ))
                }
           
              
              {
                data.map((item, index) => (
                  <PageContent key={index} achievements={item.achievements} image={item.image} name={`${item.lastName}, ${item.firstName}`} award={item.award} quotes={item.quotes}/>
                  ))
                }
                {/* <div sx={{ boxShadow: 2 }} className={`${classes.bookContent} ${classes.cover}`}></div> */}
                <PageCover></PageCover>
              </HTMLFlipBook>
            }
          </Container>
        :
          view === 'Tiles' ?
          <Container>
            <TilesView data={data} program={programName} />
          </Container>
          :
          <Container>
            <SlideshowView data={data} program={programName} />
          </Container>
      }
    </>
  )
}

export default PublicAlumni