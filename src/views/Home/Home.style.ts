import { makeStyles } from '@material-ui/core';

/**
 * The styles which are used by the `Home` view
 */
export default makeStyles({
  wrapper: {
    margin: 'auto',
    maxWidth: 800,
    textAlign: 'center',
  },
  button: {
    fontSize: '1.5em',
    backdropFilter: 'blur(12px) saturate(200%)',
    backgroundColor: 'rgba(17, 25, 40, 0.5)',
    borderRadius: 12,
    boxShadow:
      '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
  },
});
