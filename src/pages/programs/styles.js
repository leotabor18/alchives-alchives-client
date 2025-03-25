import { makeStyles } from "@material-ui/core/styles";
import { PAGES_STYLE } from "../../themes/common";

export default makeStyles((theme) => ({
  container: {
    padding: '16px',
    paddingTop: '32px',
    width: '100%',
    maxWidth: '100% !important',
    margin: '0 !important',
    height: '90vh !important',
    '& .MuiGrid-container': {
      marginTop: '16px'
    }
  },
  iconContainer: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'flex-end'
  },
  paper: {
    marginTop: '16px',
    padding: '16px',
    backgroundColor: '#ffffff69'
  },
  iconButton: {
    height: 'fit-content',
    marginBottom: '32px',
    /* position: absolute, */
    marginRight: '48px',
  },
}))


