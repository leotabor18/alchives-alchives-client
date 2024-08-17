import { Container, Grid, Paper } from '@material-ui/core'
import React, { useState } from 'react'
import Title from '../../components/title'
import useStyles from './styles';
import SearchBar from '../../components/search-bar';
import { createHeadCells, createPersonnelData, createProgramData } from '../../utility';
import { useHistory } from 'react-router';
import EnhancedTable from '../../components/table';
import api from '../../service/api';
import useGetApi from '../../hooks/useGetApi';
import Loading from '../../components/loading';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from '../../components/icon-button';

const headCells = [
  createHeadCells('name', false, 'Name', false, true),
  createHeadCells('title', false, 'Title', false, false),
  createHeadCells('department', false, 'Department', false, false),
]

const Personnels = () => {
  const classes = useStyles();

  const history = useHistory();

  const getProps = {
    api: api.PERSONNELS_API,
    keyword: '',
    dataFormat: createPersonnelData,
    columns: headCells,
    pageName: 'Personnels',
  }

  const { state, handles } = useGetApi(getProps)
  const {  handleChangePage, handleChangeRowsPerPage, handleRequestSort, handleQueryParams } = handles;
  const { data, order, orderBy, page, rowsPerPage, isLoading, total } = state;

  const handleView = (id) => {
    history.push(`/portal/personnel/${id}`)
  }

  const handleAddAlumni = () => {
    history.push('/portal/personnel/create');
  }

  const handleSearchQuery = (values) => {
    handleQueryParams({ programName: values }, api.PROGRAM_SEARCH_API);
  }

  return (
    <Container className={classes.container}>
      <Title name='School Personnels'/>
      <Grid container>
        <Grid item xl={6} lg={6}>
          <SearchBar handleSearchQuery={handleSearchQuery}/>
        </Grid>
        <Grid className={classes.iconContainer} item xl={6} lg={6} md={6} xs={2} sm={6}>
          <IconButton title='Add Program' icon={<AddBoxIcon fontSize='large' />} handleClick={handleAddAlumni} />
        </Grid>
      </Grid>
      {
        isLoading ?
          <Loading />
        :
        <EnhancedTable
          isLoading={isLoading}
          rows={data}
          headCells={headCells}
          handleRequestSort={handleRequestSort}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleChangePage={handleChangePage}
          order={order}
          orderBy={orderBy}
          page={page}
          rowsPerPage={rowsPerPage}
          name='Personnels'
          handleView={handleView}
          totalItems={total}
        />
      }
    </Container>
  )
}

export default Personnels