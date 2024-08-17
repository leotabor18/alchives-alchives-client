
import { Container } from '@material-ui/core'
import React from 'react'
import Title from '../../components/title'
import useStyles from './styles';

const Notification = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Title name='Notification'/>
    </Container>
  )
}

export default Notification