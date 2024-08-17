import React, { useEffect } from 'react'
import useResponsive from '../../hooks/useResponsive';
import NavigationBar from '../navigation-bar';
import { Container } from '@mui/material';
import useStyles from './styles';
import { IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const MainLayout = (props) => {
  const { children } = props;
  const { isMobileView, isTabletView } = useResponsive();
  const classes = useStyles();

  useEffect(() => {
    document.title = `Yearbook`;
  }, []);

  return (
    <>
      <NavigationBar isPublic/>
      <Container className={classes.publicContainer}>
        {
          children
        }
      </Container>
    </>
  )
}

export default MainLayout