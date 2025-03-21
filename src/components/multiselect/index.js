import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import useGetApi from '../../hooks/useGetApi';
import api from '../../service/api';
import { createHeadCells, createProgramData } from '../../utility';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  minWidth: '700px',
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      minWidth: '700px',
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect(props) {
  const {setSelectedProgramName, selectedProgramName} = props;
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const headCells = [
    createHeadCells('name', false, 'Name', false)
  ]
  const getProgramProps = {
    api: api.PROGRAMS_API,
    keyword: '',
    dataFormat: createProgramData,
    columns: headCells,
    pageName: 'Programs',
    params: {
      size: 1000
    }
  }

  const { state: programState } = useGetApi(getProgramProps)
  const { data: programData, isLoading: programLoading } = programState;

  const handleChange = (event) => {

    setSelectedProgramName(event.target.value);
    console.log("velueee", event.target)
  };

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setPersonName(value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">Program</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={selectedProgramName}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {programData.map((programDatasingle) => (
            <MenuItem
            style={{
              '& .MuiPopover-paper': {
                minWidth: '1000px'
              }
            }}
            // PaperProps={{  
            //   style: {  
            //     minWidth: '1000px',  
            //   },  
           key={programDatasingle.name} value={programDatasingle.name}>
              <Checkbox checked={selectedProgramName?.indexOf(programDatasingle.name) > -1} />
              <ListItemText primary={programDatasingle.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
