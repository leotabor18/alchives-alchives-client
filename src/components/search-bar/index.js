import { FormControl, IconButton, InputAdornment, OutlinedInput } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import useResponsive from '../../hooks/useResponsive';
import useStyles from './styles';

const SearchBar = (props) => {
  const classes = useStyles();
  const history  = useHistory();

  const { handleSearchQuery } = props;

  const { isMobileView, isTabletView } = useResponsive();
  const { search, pathname } = history.location;

  const params  = new URLSearchParams(search);
  const query  = params.get('q') ? params.get('q') : '';
  const [keyword, setKeyword] = useState(query);

  useEffect(() => {
    const keywordParam = keyword ? `q=${keyword}` : '';
    const location = {
      pathname: pathname,
      search  : `?${keywordParam}`
    };

    history.replace(location);
  }, [keyword]);

  const handleSearch = (value) => {
    value.stopPropagation();
    setKeyword(value.target.value);
    handleSearchQuery(value.target.value)
  }

  return (
    <FormControl 
      className={`${classes.searchContainer} 
        ${isMobileView ? classes.mSearchContainer: 
        isTabletView ? classes.tSearchContainer : classes.nSearchContainer}`}
      sx={{ m: 1, width: '25ch' }} variant="outlined"
    >
      <OutlinedInput
        id="search"
        type={'text'}
        fullWidth
        autoFocus
        onChange={handleSearch}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              // onClick={handleSearch}
              edge="end"
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        placeholder='Search'
      />
    </FormControl>
  );
}

export default SearchBar