import { Box, Grid, Link, Paper } from '@mui/material';
import React, { useState } from 'react';
import programPic from '../../assets/images/emblem.png';
import useStyles from './styles';
import Modal from '../modal';
import { Typography } from '@material-ui/core';

const Tile = (props) => {
  const { item, modelContent, handleSubmit, image, id } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleCloseModal = () => {
    setOpen(false);
  }

  return (
    <Box style={{display: 'flex', alignItems: 'flex-start'}}>
      <Modal
        open={open} 
        handleClose={handleCloseModal} 
        handleSubmit={() => handleSubmit(id)} 
        buttonName='Submit'
        image={image}
        title={item.name}
      >
        { modelContent }
      </Modal>
      <Grid  className={classes.tile} container onClick={handleOpen} style={{diplay:'flex', width: '100%', alignItems: 'center', justifyContent:'center', marginBottom:'24px', cursor: 'pointer'}}>
        <Grid item sm={12} lg={2} style={{display: 'flex', justifyContent: 'center'}}>
          <img className={classes.programPic} src={programPic} alt='Alumni Placeholder Image' />
        </Grid>
        <Grid item sm={12} lg={10}>
          <Typography color='primary' variant='h5' style={{color: '#161616'}}>{item.name}</Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Tile