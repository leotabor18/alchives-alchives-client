import { Container, Grid, Paper } from '@material-ui/core'
import React, { useState } from 'react'
import Title from '../../components/title'
import useStyles from './styles';
import SearchBar from '../../components/search-bar';
import { createEventData, createHeadCells, createProgramData } from '../../utility';
import { useHistory } from 'react-router';
import EnhancedTable from '../../components/table';
import api from '../../service/api';
import useGetApi from '../../hooks/useGetApi';
import Loading from '../../components/loading';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from '../../components/icon-button';

const headCells = [
  createHeadCells('eventName', false, 'Event Name', false, false),
  createHeadCells('eventVenue', false, 'Event Venue', false, false),
  createHeadCells('eventDate', false, 'Event Date', false, false),
  createHeadCells('batchYear', false, 'Batch Year', false, false),
]

const Events = () => {
  const classes = useStyles();

  const history = useHistory();

  const getProps = {
    api: api.EVENTS,
    keyword: '',
    dataFormat: createEventData,
    columns: headCells,
    pageName: 'Events',
  }

  const { state, handles } = useGetApi(getProps)
  const {  handleChangePage, handleChangeRowsPerPage, handleRequestSort, handleQueryParams } = handles;
  const { data, order, orderBy, page, rowsPerPage, isLoading, total } = state;

  const handleView = (id) => {
    history.push(`/portal/events/${id}`)
  }

  const handleAddEvent = () => {
    history.push('/portal/events/create');
  }

  const handleSearchQuery = (values) => {
    // handleQueryParams({ programName: values }, api.PROGRAM_SEARCH_API);
  }

  return (
    <Container className={classes.container}>
      <Title name='Graduation Events'/>
      <Grid container>
        <Grid item xl={6} lg={6}>
          {/* <SearchBar handleSearchQuery={handleSearchQuery}/> */}
        </Grid>
        <Grid className={classes.iconContainer} item xl={6} lg={6} md={6} xs={2} sm={6}>
          <IconButton title='Add Event' icon={<AddBoxIcon fontSize='large' />} handleClick={handleAddEvent} />
        </Grid>
      </Grid>
      {/* <Loading />  */}
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
          name='Events'
          handleView={handleView}
          totalItems={total}
        />
      }
    </Container>
  )
}

export default Events