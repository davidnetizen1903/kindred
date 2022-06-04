import { makeStyles } from '@material-ui/core';

/**
 * The styles which are used by the `Purchase` view
 */
export default makeStyles((theme) => ({
  root: {
    padding: theme.spacing(10, 0),
  },
  card: {
    backdropFilter: 'blur(12px) saturate(200%)',
    backgroundColor: 'rgba(17, 25, 40, 0.5)',
    borderRadius: 12,
    border: '1px solid rgba(255, 255, 255, 0.125)',
  },
  divider: {
    backgroundColor: 'rgb(255,255,255, 0.5)',
    marginLeft: '1em',
    marginRight: '1em',
  },
  selector: {
    width: '100%',
  },
  button: {
    fontSize: '1.5rem',
  },
  alignCenter: {
    textAlign: 'center',
  },
  counter: {
    width: '45px',
    borderRadius: '0px !important',
    textAlign: 'center',
  },
  up_count: {
    position: 'absolute',
    right: '2.5rem',
    top: '1rem',
    color: 'black',
  },
  down_count: {
    position: 'absolute',
    left: '2.5rem',
    top: '1rem',
    color: 'black',
  },
  amount_wrapper: {
    padding: '1.1rem 1rem 1rem 1rem',
    backgroundColor: 'transparent',
    borderRadius: '999px',
    border: '1px solid black',
    position: 'relative',
    width: '100%',
    boxShadow:
      '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
  },
  amount: {
    width: '100%',
    color: 'black',
    fontSize: '1.5rem',
  },
  input: {
    // outline: 0,
    border: 0,
    textAlign: 'center',
    '& input': {
      textAlign: 'center',
    },
  },
  buyButton: {
    fontSize: '1.5em',
    backgroundColor: 'transparent',
    paddingLeft: '3rem',
    paddingRight: '3rem',
    border: '1px solid black',
    borderRadius: 20,
    color: 'black',
  },
  baseText: {
    color: 'white',
  },
  baseTextBlack: {
    color: 'black',
  },
  letterSpacing: {
    letterSpacing: '2px',
  },
}));
