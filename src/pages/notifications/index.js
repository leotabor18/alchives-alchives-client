
import { Container, Grid, Paper } from '@material-ui/core'
import React from 'react'
import Title from '../../components/title'
import useStyles from './styles';
import SearchBar from '../../components/search-bar';

const Notifications = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Title name='Notifications'/>
      <Grid container>
        <Grid item xl={6} lg={6}>
          <SearchBar />
        </Grid>
      </Grid>
      <Paper className={classes.paper}>
       Notifications
      </Paper>
    </Container>
  )
}

export default Notifications