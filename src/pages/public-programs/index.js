import { Box, Container, Grid, Link, Typography } from '@mui/material';
import React, { useState } from 'react';
import Tile from '../../components/tile';
import useGetApi from '../../hooks/useGetApi';
import api from '../../service/api';
import { getBatchYear } from '../../utility';
import useStyles from './styles';
import { useHistory } from 'react-router';
import calendar from '../../assets/images/calendar.png';
import Select from '../../components/select';

const PublicPrograms = () => {
  const history = useHistory();

  const getProps = {
    api: api.PUBLIC_INSTITUTES_API,
    pageName: 'Public Institutes',
    params: {
      size: 1000
    }
  }
  const classes = useStyles();
  const { state } = useGetApi(getProps)
  const { data, isLoading } = state;

  const batchYears = getBatchYear(2016);
  
  const [batchYear, setBatchYear] = useState(false);

  const handleSelectedBatch = (item) => {
    setBatchYear(item.target.value);
  }

  const handleSubmit = (id) => {
    if (!batchYear) return;
    
    history.push(`/alumni?batch=${batchYear}&programId=${id}`)
  }

  const handleClear = () => {
    setBatchYear('');
  }

  return (
    <Container>
     <Box sx={{ flexGrow: 1 }}>
      {
        data.map((item, index) =>  (
          <div key={index} className={classes.instituteContainer}>
            <Typography color='primary' variant='h5'>{item.name}</Typography>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {
                item.programs.map((program, index) => (
                  <Tile 
                    item={program} 
                    key={index}
                    id={program.programId}
                    handleSubmit={handleSubmit}
                    image={calendar}
                    modelContent={
                    <>
                      <Select menuItem={batchYears} label='Batch Year' value={batchYear} handleChange={handleSelectedBatch}/>
                      <Box>
                        <Link onClick={handleClear}>Clear Filter</Link>
                      </Box>
                    </>
                  }
                  />
                ))
              }
            </Grid>
          </div>
         )
        )
      }
    </Box>
    </Container>
  )
}

export default PublicPrograms