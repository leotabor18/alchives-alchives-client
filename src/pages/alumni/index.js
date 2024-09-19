import { Box, Container, Grid } from '@material-ui/core';
import { FilterList } from '@mui/icons-material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Link, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import filterImage from '../../assets/images/filter.png';
import importImage from '../../assets/images/import.png';
import DropDownMenu from '../../components/drop-down-menu';
import IconButton from '../../components/icon-button';
import Modal from '../../components/modal';
import SearchBar from '../../components/search-bar';
import Select from '../../components/select';
import EnhancedTable from '../../components/table';
import Title from '../../components/title';
import useResponsive from '../../hooks/useResponsive';
import { createAlumniData, createHeadCells, createNavigationBarMenu, createProgramData, getBatchYear } from '../../utility';
import useStyles from './styles';
import useGetApi from '../../hooks/useGetApi';
import api from '../../service/api';
import Loading from '../../components/loading';
import { multipleRequest, request } from '../../service/request';
import { API_METHOD } from '../../utility/constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSVLink } from 'react-csv';
import Papa from "papaparse";

const CSV_HEADER = ['studentNumber',	'firstName',	'lastName',	'program',	'institute', 'batch'];


const ALUMNI_MENU = [
  createNavigationBarMenu('Import', 'import', <FileUploadIcon fontSize='medium' />),
  createNavigationBarMenu('Filter', 'filter', <FilterAltIcon fontSize='medium' />),
  createNavigationBarMenu('Add Alumni', '/portal/alumni/create', <AddBoxIcon fontSize='medium' />),
]

// const data = [ 
//   createAlumniData(1, '1-0001', 'Juan Pedro', 'BS Computer Science', '2024'),
//   createAlumniData(2, '1-0002', 'Maria Pedro', 'BS Computer Science', '2024'),
//   createAlumniData(3, '1-0003', 'John Peter', 'BS Computer Science', '2024'),
// ];

export const headCells = [
  createHeadCells('studentNumber', false, 'Student Number', true, true),
  createHeadCells('name', false, 'Name', false, false),
  createHeadCells('program', false, 'Program', false, false),
  createHeadCells('batchYear', false, 'Batch Year', false, false),
]

const Alumni = () => {
  const classes = useStyles();
  
  const batchYears = getBatchYear(2016);
  
  const { isMobileView } = useResponsive();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [batchYear, setBatchYear] = useState('');
  const [deleteList, setDeleteList] = useState([]);
  const [deleteIdList, setDeleteIdList] = useState([]);
  const [importData, setImportData] = useState('');
  const csvInstance = useRef(null);
  const [csvFile, setCsvFile] = useState();
  const [csvData, setCsvData] = useState();
  const [isFilePresent, setIsFilePresent] = useState(false);

  const handleFileChange = (event) => {
    const csv       = event.target.files;
    const fileType  = csv[0].name.split('.').pop();
    let alumniData  = {};

    setCsvFile(csv[0].name);

    if (csv) {
      Papa.parse(csv[0], {
        complete: function (results) {
          let values = results.data[0].some((val) => val.charAt(0) === '#') ? results.data.slice(1) : results.data;
          values = values.filter(val => val[0].charAt(0) !== '#');
          let objects = values.map(array => {
            let object = {};
            CSV_HEADER.forEach((key, i) => object[key] = array[i]);
            return object;
          });

          results.data.shift();
          alumniData = { 
            "importUsers": objects.filter((object) => object.studentNumber !== '')
          };
          setIsFilePresent(true);
          setCsvData(alumniData);
        }
      })
    }
  }


  const getProps = {
    api: api.ALUMNIS_API,
    keyword: '',
    dataFormat: createAlumniData,
    columns: headCells,
    pageName: 'Alumni'
  }

  const getProgramProps = {
    api: api.PROGRAM_API,
    keyword: '',
    dataFormat: createProgramData,
    columns: headCells,
    pageName: 'Programs'
  }

  const { state, handles } = useGetApi(getProps)
  const { state: programState } = useGetApi(getProgramProps)

  const { handleUpdateData, handleChangePage, handleChangeRowsPerPage, handleRequestSort, getData, setIsLoading, handleQueryParams } = handles;
  const { data, order, orderBy, page, rowsPerPage, total, isLoading } = state;
  const { data: programData } = programState;
  
  const handleFileUpload = () => {
    setImportOpen(true);
  }

  const handleFilter = () => {
    setFilterOpen(true);
  }

  const handleAddAlumni = () => {
    history.push('/portal/alumni/create');
  }

  const handleOpenAlumniMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleItemClick = (path) => {
    setAnchorEl(null);
    if (path.includes('filter')) {
      setFilterOpen(true);
    } else if (path.includes('import')) {
      setImportOpen(true);
    } else {
      history.push(path)
    }
  }

  const handleCloseAlumniMenu = () => {
    setAnchorEl(null);
  };

  const handleFilterSubmit = (values) => {
    handleQueryParams({ batchYear: batchYear, programName: selectedProgram}, api.ALUMNI_QUERY_API);
    setFilterOpen(false);
  }

  const handleCloseFilter = () => {
    setFilterOpen(false);
  }

  const handleImportSubmit = async () => {
    console.log('first', csvData)

    await request({
      url: `${api.IMPORT_API}/`,
      method: API_METHOD.POST,
      data : csvData
    })

    getData();
    setImportOpen(false);
    setCsvFile('');
    setCsvData();
  }
  
  const handleCloseImport = () => {
    setImportOpen(false);
  }

  const handleView = (id) => {
    history.push(`/portal/alumni/${id}`)
  }

  const handleSelectedProgram = (item) => {
    setSelectedProgram(item.target.value)
  }

  const handleSelectedBatch = (item) => {
    setBatchYear(item.target.value)
  }

  const handleDelete = async () => {
    await multipleRequest(deleteIdList.map(async(value) =>
      await request({
        url: `${api.ALUMNIS_API}/${parseInt(value)}`,
        method: API_METHOD.DELETE
      })
    )) 
    handleCloseDeleteModal();
    handleUpdateData(deleteIdList);
  }

  const handleOpenDeleteModal = (values) => {
    setDeleteOpen(true);
    setDeleteIdList(values);
    let list = data.filter(val => values.includes(val.id))
    list = list.map(li => li.name);
    setDeleteList(list)
  }

  const handleCloseDeleteModal = () => {
    setDeleteOpen(false);
  }

  const handleSearchQuery = (values) => {
    handleQueryParams({ firstName: values, lastName: values }, api.ALUMNI_SEARCH_API);
  }

  return (
    <>
      <Modal 
        open={filterOpen} 
        handleClose={handleCloseFilter} 
        handleSubmit={handleFilterSubmit} 
        buttonName='Filter'
        image={filterImage}
        title='Filter List'
      >
        <Select menuItem={programData} label='Program' value={selectedProgram} handleChange={handleSelectedProgram}/>
        <Select menuItem={batchYears} label='Batch Year' value={batchYear} handleChange={handleSelectedBatch}/>
        <Box>
          <Link>Clear Filter</Link>
        </Box>
      </Modal>
      <Modal 
        open={importOpen} 
        handleClose={handleCloseImport} 
        handleSubmit={handleImportSubmit} 
        buttonName='Import'
        image={importImage}
        title='Import List'
      >
        <Box className={classes.filter}>
          <TextField
            fullWidth
            id="file"
            value={csvFile}
            label={'File*'}
          />
          <Button variant='contained' component='label'>
            Select
            <input
              id="file"
              name="file"
              variant="outlined"
              value={''}
              style={{ display: 'none' }}
              onChange={handleFileChange}
              type="file" accept=".csv"
            />
          </Button>
        </Box>
      </Modal>
      <Modal 
        open={deleteOpen} 
        handleClose={handleCloseDeleteModal} 
        handleSubmit={handleDelete} 
        buttonName='Delete'
        image={''}
        title='Delete Alumni'
      >
        <Box className={classes.deleteContent}>
          Are you sure you want to delete { deleteList.join(', ')}?
        </Box>
      </Modal>
      <Container className={classes.container}>
        <Title name='Alumni'/>
        <Grid container>
          <Grid item xl={6} lg={6} md={6} xs={10} sm={6}>
            <SearchBar handleSearchQuery={handleSearchQuery}/>
          </Grid>
          <Grid className={classes.iconContainer} item xl={6} lg={6} md={6} xs={2} sm={6}>
            {
              isMobileView?
              <IconButton title='Import' icon={<MoreVertIcon fontSize='large' />} handleClick={handleOpenAlumniMenu} />
              :
              <>
                  <IconButton title='Import' icon={<FileUploadIcon fontSize='large' />} handleClick={handleFileUpload} />
                  <IconButton title='Filter' icon={<FilterList fontSize='large' />} handleClick={handleFilter} />
                  <IconButton title='Add Alumni' icon={<AddBoxIcon fontSize='large' />} handleClick={handleAddAlumni} />
                </>
            }
          <DropDownMenu 
            menu={ALUMNI_MENU} 
            handleCloseMenu={handleCloseAlumniMenu} 
            handleItemClick={handleItemClick}
            anchorEl={anchorEl}
            />
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
            name='Alumni'
            handleView={handleView}
            handleDelete={handleOpenDeleteModal}
            totalItems={total}
          />
        }
      </Container>
    </>
  )
}

export default Alumni