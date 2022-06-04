import { makeStyles } from '@material-ui/core';

/**
 * The styles which are used by the `ConnectOverlay` component
 */
export default makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.secondary.main,
    // position: 'fixed',
    width: '100vw',
    // height: '100vh',
    top: 0,
    opacity: 0.9,
    zIndex: 19,
  },
  info: {
    color: theme.palette.common.white,
    textAlign: 'center',
    textTransform: 'uppercase',
    maxWidth: 120,
    fontSize: '1rem',
  },
  image: {
    width: 30,
    marginBottom: theme.spacing(1),
  },
  wrapper: {
    marginTop: theme.spacing(2),
  },
  offset: {
    transform: 'translateX(-30px)',
  },
}));
