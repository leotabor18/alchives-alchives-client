import { makeStyles } from "@material-ui/core/styles";
import colors from "../../themes/colors";

export default makeStyles((theme) => ({
  appBarContainer: {
    margin: theme.spacing(1),
    maxWidth: '100% !Important',
    '& .MuiToolbar-root' : {
      justifyContent: 'space-between',
      position: 'relative',
      textAlign: 'center'
    }
  },
  notificationIcon: {
    color: colors.PRIMARY,
  },
  mNotificationIcon: {
    display: 'none'
  },
  mLogo: {
    fontSize: theme.spacing(31.25)
  },
  buttonIcon: {
    color: colors.PRIMARY,
  },
  hidden: {
    display: 'none'
  },
  headerTitle: {
    mr: 2,
    display: { xs: 'none', md: 'flex' },
    fontWeight: '700 !important',
    letterSpacing: '.3rem',
    color: colors.PRIMARY,
    textDecoration: 'none',
    position: 'absolute',
    fontSize: '2.5rem !important',
    left: 0,
    right:0,
    top: theme.spacing(1.5),
    bottom: 0
  },
  menuContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '30%'
  }
}))


