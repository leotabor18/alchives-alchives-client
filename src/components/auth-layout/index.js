import { Typography } from '@material-ui/core';
import { Box, Container, Grid, Paper } from '@mui/material';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import backgroundAuthImage from '../../assets/images/auth-background.jpg';
import alumniBackgroundImage from '../../assets/images/auth-image.jpg';
import ccaLogo from '../../assets/images/cca-logo.png';
import useResponsive from '../../hooks/useResponsive';
import useStyles from './styles';

const AuthLayout = (props) => {
  const { children } = props;
  const classes = useStyles();
  const history = useHistory();

  const { pathname } = history.location;
  const { isTabletView, isMobileView } = useResponsive();

  useEffect(() => {
    let title = 'Login';
    if (pathname.includes('activate')) {
      title = 'Activate Account';
    } else if (pathname.includes('forgot')) {
      title = 'Forgot Password';
    } else if (pathname.includes('new')) {
      title = 'Create Password';
    }

    document.title = `Yearbook Management - ${title}`;
  }, [pathname]);

  return (
    <Box className={classes.root}>
      <Box className={classes.backdrop} />
      <img className={classes.background} src={backgroundAuthImage} alt='CCA Background' />
      <Container className={classes.container}>
      {
        // isResponsive ? 
            <Paper elevation={6} className={`${classes.paper} ${isTabletView ? classes.tPaper : classes.mPaper } ${!(isTabletView && isMobileView) && classes.lPaper}` }> 
              <Box className={`${classes.content} ${classes.mContent} ${pathname.includes('forgot') && classes.forgotPasswordContent }`} >
                <div className={`${classes.logoContainer} ${classes.mLogoContainer}`}></div>
                <img className={classes.logo} src={ccaLogo} alt='CCA Logo' />
                <Typography variant='h4'>
                  AL-Chives
                </Typography>
                {
                  children
                }
              </Box>
            </Paper>
          // :
          //   <Paper elevation={6} className={`${classes.paper} ${ classes.lPaper}`}> 
          //     <Box className={classes.content}>
          //       <div className={classes.logoContainer}></div>
          //       <img className={classes.logo} src={ccaLogo} alt='CCA Logo' />
          //       <Typography variant='h4'>
          //         AL-Chives
          //       </Typography>
          //       {
          //         children
          //       }
          //     </Box>
          //   </Paper>
            // <Paper elevation={6} className={`${classes.paper} ${ classes.lPaper}`}> 
            //   <Grid container>
            //     <Grid item md={5} lg={5} sm={0} className={classes.alumniAuth}>
            //       <div className={classes.logoContainer}></div>
            //       <img className={classes.logo} src={ccaLogo} alt='CCA Logo' />
            //       <img className={classes.alumniBackgroundImage} src={alumniBackgroundImage} alt='Alumni Background Image' />
            //     </Grid>
            //     <Grid className={classes.content} item md={7} lg={7} sm={12}>
            //       <Typography variant='h4'>
            //         AL-Chives
            //       </Typography>
            //       {
            //         children
            //       }
            //     </Grid>
            //   </Grid>
            // </Paper>
          }
      </Container>
    </Box>
  )
}

export default AuthLayout