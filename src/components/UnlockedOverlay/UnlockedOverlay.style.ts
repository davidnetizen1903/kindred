import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

/**
 * The styles which are used by the `UnlockedOverlay` component
 */
export default makeStyles({
  root: {
    backgroundColor: grey[900],
    // position: 'fixed',
    width: '100vw',
    // height: '100vh',
    top: 0,
    zIndex: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  wrapper: {
    animation: '$spin 3s ease-in-out infinite',
  },
  info: {
    textAlign: 'center',
    color: 'white',
  },
  '@keyframes spin': {
    '0%': {
      transform: 'rotateY(0)',
    },
    '100%': {
      transform: 'rotateY(359deg)',
    },
  },
});
