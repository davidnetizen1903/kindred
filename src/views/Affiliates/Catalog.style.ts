import { makeStyles } from '@material-ui/core';

/**
 * The styles which are used by the `Details` view
 */
export default makeStyles(() => ({
  content: {
    textAlign: 'center',
    color: '#000',
    width: '100%',
    fontFamily: 'SuperStar',
    fontSize: 40,
  },
  card: {
    backdropFilter: 'blur(12px) saturate(200%)',
    backgroundColor: 'rgba(17, 25, 40, 0.5)',
    borderRadius: 12,
    border: '1px solid rgba(255, 255, 255, 0.125)',
  },
  baseText: {
    color: 'white',
  },
  baseTextBlack: {
    color: 'black',
  },
  divider: {
    backgroundColor: 'rgb(0, 0, 0, 0.5)',
    marginLeft: '1em',
    marginRight: '1em',
  },
  alignCenter: {
    textAlign: 'center',
  },
  affiliateLink: {
    color: 'white',
    display: 'inline',
  },
  letterSpacing: {
    letterSpacing: '2px',
  },
}));
