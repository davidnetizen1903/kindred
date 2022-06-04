import type { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import type { CreateCSSProperties } from '@material-ui/core/styles/withStyles';

/**
 * A function that generates the effect for a sidebar link
 *
 * @param theme The theme to use
 * @param enabled If the current navigation link is enabled or not
 *
 * @returns The CSS properties based on the given arguments
 */
const createNavLinkEffect = (
  theme: Theme,
  enabled = true,
): CreateCSSProperties => {
  if (enabled)
    return {
      // borderRight: `5px solid ${theme.palette.primary.main}`,
      // color: theme.palette.primary.main,
      borderRight: `5px solid #ccc`,
      color: '#ccc',
    };
  return {
    borderRight: '5px solid transparent',
    color: theme.palette.text.disabled,
  };
};

/**
 * The styles which are used by the `Sidebar` component
 */
export default makeStyles((theme) => ({
  drawerPaper: {
    width: 240,
  },
  link: {
    '&:hover': createNavLinkEffect(theme),
    borderRight: '5px solid transparent',
    color: theme.palette.text.primary,
    fontSize: '1.5rem',
    fontWeight: 'bold',
    padding: theme.spacing(0.8, 1.5),
    textDecoration: 'none',
    textTransform: 'uppercase',
    transition: theme.transitions.create(['border-right', 'color'], {
      duration: theme.transitions.duration.complex,
    }),
  },
  linkActive: createNavLinkEffect(theme),
  linkDisabled: {
    '&:hover': createNavLinkEffect(theme, false),
    color: theme.palette.text.disabled,
    cursor: 'not-allowed',
  },
}));
