import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect } from '@mui/material';
import React from 'react'

const Select = (props) => {
  const { menuItem, label, value, handleChange, error } = props;

  return (
    <FormControl fullWidth>
      <InputLabel id="MuiSelect-label">{label}</InputLabel>
      <MuiSelect
        labelId="MuiSelect-label"
        id="demo-simple-select"
        value={value}
        label={label}
        onChange={handleChange}
        fullWidth
        error={Boolean(error)}

      >
        {
          menuItem.map((item, index) => {
            return <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
          })
        }
      </MuiSelect>
      {
        error ?
          <FormHelperText error>{error}</FormHelperText>
        :
          <></>
      }
    </FormControl>
  )
}

export default Select