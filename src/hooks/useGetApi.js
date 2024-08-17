import { useEffect, useState } from 'react';
import { request } from '../service/request';
import { API_METHOD } from '../utility/constant';

const useGetApi = (props) => {
  const { api, keyword, columns, dataFormat, pageName, params = {} } = props;

  const [data, setData]               = useState([]);
  const [total, setTotal]   = useState(0);
  const [order, setOrder]             = useState('asc');
  const [orderBy, setOrderBy]         = useState(columns ? columns[0].id: 'asc');
  const [rowsPerPage, setRowsPerPage] = useState(params.size ? params.size : 10);
  const [page, setPage]               = useState(0);
  const [isLoading, setIsLoading]     = useState(false);
  const [queryParams, setQueryParams] = useState(params);
  const [queryApi, setQueryApi] = useState(api);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  
  const formatData = async (embedded) => {
    if (pageName === 'Alumni') {
      const alumniData = await Promise.all(embedded.alumnis.map(async (alumni) => {
        const { studentNumber, firstName, lastName, suffix, batchYear, _links } = alumni;
        const alumniId = _links.self.href.replace(`${api}/`, '');
        const name = `${lastName}, ${firstName} ${suffix ?? ''}`; 

        const secondResponse = await request({
            url: _links.program.href,
            method: API_METHOD.GET,
        });

        return dataFormat(alumniId, studentNumber, name, secondResponse.data.name, batchYear);
        }));
      return alumniData;
    } else if (pageName === 'Programs') {
      const programsData = await Promise.all(embedded.programs.map(async (program) => {
        const { name, _links } = program;
        const programId = _links.self.href.replace(`${api}/`, '');

        const secondResponse = await request({
            url: _links.institute.href,
            method: API_METHOD.GET,
        });

        return dataFormat(programId, name, secondResponse.data.name);
        }));
      return programsData;
      
    } else if (pageName === 'Institutes') {
      return embedded.institutes.map(institute => {
        const { name, _links } = institute;
        const instituteId = _links.self.href.replace(`${api}/`, '');
        return dataFormat(instituteId, name);
      });
    } else if (pageName === 'Personnels') {
      return embedded.personnels.map(institute => {
        const { name, title, department, _links } = institute;
        const personnelId = _links.self.href.replace(`${api}/`, '');
        return dataFormat(personnelId, name, title, department);
      });
    } else {
      
    }
  }

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await request({
        url     : queryApi,
        method  : API_METHOD.GET,
        params  : {
          ...queryParams,
          name: keyword,
          size: rowsPerPage,
          page: page,
          sort: `${orderBy},${order}`
        },
        headers: {
         'ngrok-skip-browser-warning': 'true'
        }
      })

      if (response.data?.page) {
        const { number, size, totalElements } = response.data?.page;

        const { _embedded } = response.data;
        const formattedData = await formatData(_embedded);
        console.log('formattedData', formattedData)
        if (formattedData.length || number === 0) {
          setPage(number);
        } else {
          setPage(number - 1);
        }
        setData(formattedData);
        setRowsPerPage(size);
        setTotal(totalElements);
      } else {
        setData(response.data)
      }

      console.log('response', response)
    } catch (e) {
      console.log('Error:', e);
    } finally {
      setIsLoading(false);
    }
  }

  const handleQueryParams = (values, newApi) => {
    setQueryParams(values);
    setQueryApi(newApi)
  }

  const handleUpdateData = async(ids) => {
    const newItems = data.filter(prev => {
      return !ids.includes(prev.id)
    });
    // setData(newItems);
    // setIsLoading(false);
    await getData();
  }

  useEffect(() => {
    getData();

    return () => {
      setData([])
    }
  }, [page, rowsPerPage, order, orderBy, queryParams, queryApi]);

  const state = {
    data,
    order,
    orderBy,
    page,
    rowsPerPage,
    total,
    isLoading
  }

  const handles = {
    handleChangePage, 
    handleChangeRowsPerPage, 
    handleRequestSort,
    handleUpdateData,
    handleQueryParams
  }

  return { state, handles }
}

export default useGetApi