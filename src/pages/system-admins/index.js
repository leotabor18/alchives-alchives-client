import { Container, Grid, Paper } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Title from '../../components/title'
import useStyles from './styles';
import SearchBar from '../../components/search-bar';
import { createHeadCells, createPersonnelData, createProgramData, createUserData } from '../../utility';
import { useHistory } from 'react-router';
import EnhancedTable from '../../components/table';
import api from '../../service/api';
import useGetApi from '../../hooks/useGetApi';
import Loading from '../../components/loading';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from '../../components/icon-button';

const headCells = [
  createHeadCells('fullName', false, 'Name', false, true),
  createHeadCells('email', false, 'Email Address', false, true),
  createHeadCells('role', false, 'Role', false, false),
]

const SystemAdmins = () => {
  const classes = useStyles();

  const history = useHistory();

  const getProps = {
    api: api.USER_API + '/search/findByRoleNot',
    keyword: '',
    dataFormat: createUserData,
    columns: headCells,
    pageName: 'SystemAdmins',
    params: {
      role: 'ALUMNI'
    }
  }

  const { state, handles } = useGetApi(getProps)
  const {  handleChangePage, handleChangeRowsPerPage, handleRequestSort, handleQueryParams } = handles;
  const { data, order, orderBy, page, rowsPerPage, isLoading, total } = state;

  const handleView = (id) => {
    history.push(`/portal/admins/${id}`)
  }

  const handleAddAlumni = () => {
    history.push('/portal/admins/create');
  }

  const handleSearchQuery = (values) => {
    handleQueryParams({ programName: values }, api.PROGRAM_SEARCH_API);
  }
  

  useEffect(() => {
    console.log('hereee', data);
  }, [])

  return (
    <Container className={classes.container}>
      <Title name='System Admins'/>
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
          name='SystemAdmins'
          handleView={handleView}
          totalItems={total}
        />
      }
    </Container>
  )
}

export default SystemAdmins