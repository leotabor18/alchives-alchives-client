import { makeStyles } from "@material-ui/core/styles";
import { PAGES_STYLE } from "../../themes/common";
import colors from "../../themes/colors";

export default makeStyles((theme) => ({
  container: {
    display: 'flex !important',
    justifyContent: 'center',
    padding: theme.spacing(3)
  },
  bookContent: {
    backgroundColor: '#FFFAF0',
    border: '2px solid #a5a5a5',
    boxShadow: 'inset 0 0 24px rgba(0, 0, 0, 0.5)',
    textAlign: 'center'
  },
  bookContentStudents: {
    backgroundColor: '#FFFAF0',
    border: '2px solid #a5a5a5',
    boxShadow: 'inset 0 0 24px rgba(0, 0, 0, 0.5)',
  },
  firstPage: {
    visibility: 'hidden'
  },
  cover: {
    backgroundColor: colors.PRIMARY,
    border: '5px solid ' + colors.PRIMARY,
  },
  coverContent: {
    overflow: 'hidden'
  },
  alumniBackgroundImage: {
    width: '100%'
  },
  bookContainer: {
    display: 'flex !important',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: theme.spacing(3),
    height:'100%'
  },
  gradPic: {
    width: '45%',
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  textBox: {
    textAlign: 'left',
  },
  parentContainer: {
    maxWidth: '100% !important',
    display: 'flex !important',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '0px !important',
  },
  iconButton: {
    height: 'fit-content',
    marginBottom: '32px',
    /* position: absolute, */
    marginRight: '48px',
  },
  alumniHeader: {
    gap: '8px',
    display: 'flex !important',
    alignItems: 'center !important',
    marginBottom: theme.spacing(4)
  },
  programPic: {
    width: '150px',
    marginBottom: theme.spacing(1)
  },
  programPicSlide: {
    width: '250px',
    marginBottom: theme.spacing(1)
  },
  studentPic: {
    width: '350px',
    marginBottom: theme.spacing(1)
  },
  tile: {
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    minHeight: '280px',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(1),
    '& a': {
      cursor: 'pointer'
    }
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: 'center'
  },
  modalContent: {
    display: 'flex',
    padding: theme.spacing(2)
  },
  studentContent: {
    textAlign: 'center',
    color: colors.PRIMARY,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '12px'
  },
  quotes: {
    fontStyle: 'italic'
  },
  modal: {
    '& .MuiPaper-root' : {
      maxWidth: '900px'
    }
  },
  studentName: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: colors.PRIMARY
  }
}))


