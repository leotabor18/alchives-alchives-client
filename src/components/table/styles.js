import { makeStyles } from '@material-ui/core/styles';
import colors from '../../themes/colors';

export default makeStyles((theme) => ({
  primaryHeader:{
    paddingLeft: 0 + ' !important'
  },
  paper: {
    marginTop: '16px',
    padding: '16px',
    backgroundColor: '#ffffffc2 !important'
  },
  link: {
    color: colors.PRIMARY
  },
  tableSortLabel: {
    fontWeight: '600',
  color: colors.PRIMARY+ ' !important'
  },
  empty: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px',
    height: '150px'
  }
}))


