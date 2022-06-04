import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5, 0),
  },
  subtitle: {
    color: grey[400],
    // fontSize: '2.2rem',
    textAlign: 'center',
  },
  title: {
    color: theme.palette.common.black,
    textAlign: 'center',
    wordWrap: 'break-word',
  },
  superStarFont: {
    fontFamily: 'Helvetica',
  },
}));
