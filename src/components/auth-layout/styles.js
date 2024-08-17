import { makeStyles } from "@material-ui/core/styles";
import backgroundImage from '../../assets/images/angeles-symbol.png';
import backgroundImageMobile from '../../assets/images/angeles-symbol-mobile.png';

export default makeStyles((theme) => ({
  root: {
    height: '100vh',
    overflow: 'hidden'
  },
  backdrop: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    right: '0px',
    bottom: '0px',
    background: 'rgb(141 141 141 / 25%)',
    filter: 'blur(200px)',
  },
  background: {
    height: '100%',
    width: '100%',
    zIndex: '-1',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  },
  container: {
    padding: theme.spacing(0),
    height: '100%',
    display: 'flex !important',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paper: {
		backgroundPosition: 'center', 
		backgroundSize	  : 'contain', 
		backgroundRepeat  : 'no-repeat',
    '& .MuiGrid-item': {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column'
    }
  },
  logoContainer: {
    minHeight: '82px',
    height: '82px',
    position: 'absolute',
    width: '100%',
    background: '#868484',
    opacity: '.3'
  },
  alumniBackgroundImage: {
    width: '100%',
    height: '460px'
  },
  logo: {
    position: 'absolute',
    marginTop: '8px',
    top: 0,
  },
  content: {
    display: 'flex !important',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiTypography-h4': {
      fontWeight: '600',
      fontSize: '30px',
      textAlign: 'center'
    }
  },
  lPaper: {
    width: '460px !important',
		backgroundImage	  : `url(${backgroundImage})`,
  },
  mPaper : {
    width: '90%',
    height: '475px',
    backgroundImage	  : `url(${backgroundImageMobile})`,
  },
  tPaper : {
    width: '400px',
    height: '485px',
    backgroundImage	  : `url(${backgroundImageMobile})`,
  },
  lContent: {
    display: 'flex !important',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiTypography-h4': {
      fontWeight: '600',
      fontSize: '38px'
    }
  },
  mContent: {
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
    '& .MuiTypography-h4': {
      marginTop: '110px'
    }
  },
  forgotPasswordContent: {
    '& .MuiTypography-h3': {
      marginTop: '0px'
    }
  },
  mLogoContainer: {
    left: 0,
    right: 0,
    top: 0
  }
}))


