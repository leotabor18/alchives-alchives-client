import { makeStyles } from "@material-ui/core/styles";
import { PAGES_STYLE } from "../../themes/common";

export default makeStyles((theme) => ({
  ...PAGES_STYLE,
  iconButton: {
    height: 'fit-content',
    marginBottom: '32px',
    /* position: absolute, */
    marginRight: '48px',
  },
}))


