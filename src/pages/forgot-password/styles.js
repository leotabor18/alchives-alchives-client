import { makeStyles } from "@material-ui/core/styles";


export default makeStyles((theme) => ({
  loginContainer: {
    width: theme.spacing(43.75),
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.5),
    '& .MuiFormControl-root' : {
      marginBottom: theme.spacing(1.5)
    }
  },
  buttonContainer: {
    display: 'flex',
    gap: theme.spacing(1.75)
  },
  button: {
    width: '100%',
    marginTop: theme.spacing(1.5),
  },
  link: {
    width : '100%',
    marginBottom: theme.spacing(1.5) + 'px !Important',
    marginTop: theme.spacing(1.5) + 'px !Important',
    '& a' : {
      cursor: 'pointer'
    },
    '& #forgotPassword': {
      alignSelf: 'flex-end'
    }
  },
  mLoginContainer: {
    marginTop: '0px',
    width: '100%',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.5),
    '& .MuiFormControl-root' : {
      marginBottom: theme.spacing(1.5)
    }
  }
}))