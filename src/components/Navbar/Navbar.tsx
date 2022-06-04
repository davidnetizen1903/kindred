import { ReactElement } from 'react';

import {
  AppBar,
  Container,
  Grid,
  Hidden,
  IconButton,
  Toolbar,
  useTheme,
  useMediaQuery,
  Button,
  Typography,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import clsx from 'classnames';
import { NavLink } from 'react-router-dom';

import { openSidebar } from '../../features';
import { useAppDispatch, useContracts } from '../../hooks';
import { getRoute, getRoutes, handleLinkClick } from '../../router';
import { formatAbbreviated, truncate } from '../../utils/formatting';

import useStyles from './Navbar.style';

/**
 * A component that handles user navigation at the top of the screen
 *
 * @returns The `Navbar` component
 */
export function Navbar(): ReactElement {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const {
    connected,
    connect,
    disconnect,
    user,
    rsunBalance,
    connecting,
    isWrongNetwork,
  } = useContracts();

  /** If the navigation bar should enable shrink mode */
  const shouldShrink = useMediaQuery(theme.breakpoints.down('md'));

  /** A function that handles the opening of the sidebar */
  const handleSidebarOpen = () => dispatch(openSidebar());

  const getButtonText = () => {
    if (isWrongNetwork) {
      return `WRONG NETWORK`;
    }
    if (!connecting && user) {
      if (rsunBalance)
        return `${formatAbbreviated(rsunBalance, 2)} RSUN | ${truncate(
          user,
          6,
        )}`;
      return `${truncate(user, 6)}`;
    }
    if (connecting) {
      return `CONNECTING...`;
    }
    return `CONNECT`;
  };

  return (
    <AppBar position="absolute" className={classes.root}>
      <Toolbar>
        <Container className={clsx({ 'no-padding': shouldShrink })}>
          <Grid container alignItems="center">
            {/* <NavLink to="/">
              <div className={classes.icon} />
            </NavLink> */}
            {/* <Hidden only={['xs', 'md']}> */}
            <NavLink to="/" className={classes.logoTextWrapper}>
              <Typography
                className={clsx(classes.logoText, 'no-select')}
                variant="h5"
              >
                Kinder | Spirit
              </Typography>
            </NavLink>
            {/* </Hidden> */}
            <div className={classes.grow} />
            <Hidden smDown>
              {getRoutes().map((routeName) => {
                const route = getRoute(routeName);

                if (route?.hidden) return null;
                return route.path.includes('http') ? (
                  <a
                    href={route.path}
                    className={clsx(classes.navLink, {
                      [classes.navLinkDisabled]: route.disabled === true,
                    })}
                    target="_blank"
                    rel="noreferrer"
                    key={routeName}
                  >
                    {routeName}
                  </a>
                ) : (
                  <NavLink
                    key={routeName}
                    onClick={(event) => handleLinkClick(event, route.disabled)}
                    exact={route.exact}
                    activeClassName={
                      route.disabled ? undefined : classes.navLinkActive
                    }
                    className={clsx(classes.navLink, {
                      [classes.navLinkDisabled]: route.disabled === true,
                    })}
                    to={route.path}
                    title={
                      routeName === 'market!' || routeName === 'play'
                        ? 'Coming Soon'
                        : ''
                    }
                  >
                    {routeName}
                  </NavLink>
                );
              })}
            </Hidden>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              size={shouldShrink ? 'small' : 'medium'}
              disableElevation
              onClick={() => (!connected ? connect() : disconnect())}
            >
              {getButtonText()}
            </Button>
            <Hidden mdUp>
              <IconButton edge="end" onClick={handleSidebarOpen}>
                <MenuIcon
                  className={classes.menuIcon}
                  fontSize="large"
                  style={{ fill: 'black' }}
                />
              </IconButton>
            </Hidden>
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
