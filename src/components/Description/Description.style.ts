import { makeStyles } from '@material-ui/core';

/**
 * The styles which are used by the `Description` component
 */
export default makeStyles((theme) => ({
  title: {
    color: theme.palette.common.white,
    textAlign: 'center',
    wordWrap: 'break-word',
    marginBottom: theme.spacing(2),
  },
  content: {
    color: theme.palette.common.white,
    fontWeight: 300,
    fontSize: '1rem',
  },
}));
