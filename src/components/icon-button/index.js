import { IconButton as IconBtn, Tooltip } from '@material-ui/core'
import React from 'react'
import useStyles from './styles';

const IconButton = (props) => {
  const { title, icon, handleClick } = props;

  const classes = useStyles();
  return (
    <Tooltip title={title}>
      <IconBtn
        size='medium'
        color="primary"
        onClick={handleClick}
        className={classes.icon}
      >
        { icon }
      </IconBtn>
    </Tooltip>
  )
}

export default IconButton