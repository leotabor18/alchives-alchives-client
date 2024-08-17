import { Container, Grid, Paper } from '@material-ui/core'
import React, { useState } from 'react'
import Title from '../../components/title'
import useStyles from './styles';
import SearchBar from '../../components/search-bar';
import { createHeadCells, createProgramData } from '../../utility';
import { useHistory } from 'react-router';
import EnhancedTable from '../../components/table';
import api from '../../service/api';
import useGetApi from '../../hooks/useGetApi';
import Loading from '../../components/loading';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from '../../components/icon-button';

const headCells = [
  createHeadCells('name', false, 'Name', false, true),
  createHeadCells('institute', false, 'Institute', false, false),
]

const Programs = () => {
  const classes = useStyles();

  const history = useHistory();

  const getProps = {
    api: api.PROGRAMS_API,
    keyword: '',
    dataFormat: createProgramData,
    columns: headCells,
    pageName: 'Programs',
  }

  const { state, handles } = useGetApi(getProps)
  const {  handleChangePage, handleChangeRowsPerPage, handleRequestSort, handleQueryParams } = handles;
  const { data, order, orderBy, page, rowsPerPage, isLoading, total } = state;

  const handleView = (id) => {
    history.push(`/portal/programs/${id}`)
  }

  const handleAddAlumni = () => {
    history.push('/portal/programs/create');
  }

  const handleSearchQuery = (values) => {
    handleQueryParams({ programName: values }, api.PROGRAM_SEARCH_API);
  }

  console.log('data', data, isLoading)
  console.log('isLoading || (!data.length && page > 1)',isLoading || (!data.length && page > 1))

  return (
    <Container className={classes.container}>
      <Title name='Programs'/>
      <Grid container>
        <Grid item xl={6} lg={6}>
          <SearchBar handleSearchQuery={handleSearchQuery}/>
        </Grid>
        <Grid className={classes.iconContainer} item xl={6} lg={6} md={6} xs={2} sm={6}>
          <IconButton title='Add Program' icon={<AddBoxIcon fontSize='large' />} handleClick={handleAddAlumni} />
        </Grid>
      </Grid>
      {
        isLoading || (!data.length && page > 0) ?
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
          name='Program'
          handleView={handleView}
          totalItems={total}
        />
      }
    </Container>
  )
}

export default Programs