import type { ReactElement } from 'react';

import { Box, IconButton, SwipeableDrawer } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import clsx from 'classnames';
import { NavLink } from 'react-router-dom';

import useStyles from './Sidebar.style';

import { closeSidebar, openSidebar } from 'features';
import { useAppDispatch, useAppSelector } from 'hooks';
import { getRoute, getRoutes, handleLinkClick } from 'router';

/**
 * A component that displays navigation at the side of the screen
 *
 * @returns The `Sidebar` component
 */
export function Sidebar(): ReactElement {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const { sidebarOpen: isOpen } = useAppSelector((state) => state.app);

  /** A function that handles the opening of the sidebar */
  const handleOpen = () => dispatch(openSidebar());

  /** A function that handles the closing of the sidebar */
  const handleClose = () => dispatch(closeSidebar());

  return (
    <SwipeableDrawer
      anchor="right"
      classes={{ paper: classes.drawerPaper }}
      open={isOpen}
      onOpen={handleOpen}
      onClose={handleClose}
    >
      <Box>
        <IconButton onClick={handleClose}>
          <CloseIcon
            fontSize="large"
            color="primary"
            style={{ fill: 'black' }}
          />
        </IconButton>
      </Box>
      {getRoutes().map((routeName) => {
        const route = getRoute(routeName);

        if (route?.hidden) return null;
        return (
          <NavLink
            key={routeName}
            exact={route.exact}
            onClick={(event) => {
              handleClose();
              handleLinkClick(event, route.disabled);
            }}
            to={route.path}
            activeClassName={route.disabled ? undefined : classes.linkActive}
            className={clsx(classes.link, {
              [classes.linkDisabled]: route.disabled === true,
            })}
          >
            {routeName}
          </NavLink>
        );
      })}
    </SwipeableDrawer>
  );
}
