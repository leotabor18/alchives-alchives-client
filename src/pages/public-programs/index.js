import { Box, Container, Grid, Link, Paper, Typography } from '@mui/material';
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
  const [selectedProgram, setselectedProgram] = useState('');
  const [selectedProgramId, setselectedProgramId] = useState('');

  const handleSelectedBatch = (item) => {
    setBatchYear(item.target.value);
  }

  const handleSelectedProgram = (item, group) => {
    console.log("item", item)
    console.log("item", data)
    console.log("item", group)
    setselectedProgram(item.target.value);
    const selectedProgramId2 = group.find(data => {
      if (data.name === item.target.value) {
        return data.programId;
      }
    })
    setselectedProgramId(selectedProgramId2.programId);
    console.log("item2", selectedProgramId2.programId)
  }

  const handleSubmit = (id) => {
    if (!batchYear) return;
    
    history.push(`/alumni?batch=${batchYear}&programId=${selectedProgramId}`)
  }

  const handleClear = () => {
    setBatchYear('');
    setselectedProgram('');
    setselectedProgramId('');
  }

  return (
    <Container>
     <Paper sx={{ flexGrow: 1, borderRadius: '8px', padding: '52px' }}>
      {
        data.map((item, index) =>  (
          <Box key={index} >     
                <Tile 
                  item={item} 
                  key={index}
                  id={item.instituteId}
                  handleSubmit={handleSubmit}
                  image={calendar}
                  modelContent={
                  <>
                    <Select menuItem={item.programs} label='Programs' value={selectedProgram} handleChange={(e) => handleSelectedProgram(e, item.programs)}/>
                    <Select menuItem={batchYears} label='Batch Year' value={batchYear} handleChange={handleSelectedBatch}/>
                    <Box>
                      <Link onClick={handleClear}>Clear Filter</Link>
                    </Box>
                  </>
                }
                />
          </Box>
         )
        )
      }
     </Paper>
    </Container>
  )
}

export default PublicPrograms