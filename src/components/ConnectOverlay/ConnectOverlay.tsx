import type { ReactElement } from 'react';

import {
  Box,
  Container,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import clsx from 'classnames';

import useStyles from './ConnectOverlay.style';

/**
 * A component that displays an overlay that a user should connect their wallet
 *
 * @returns The `ConnectOverlay` component
 */
export function ConnectOverlay(): ReactElement {
  const classes = useStyles();
  const theme = useTheme();

  /** If the screen size is small or below */
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={classes.root}>
      <Toolbar />
      <Container>
        <Box display="flex" justifyContent="flex-end">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            className={clsx(classes.wrapper, {
              [classes.offset]: isSmall,
            })}
          >
            <img
              src={`${process.env.PUBLIC_URL}/assets/arrow_up.png`}
              alt="Arrow pointing to connect button"
              className={classes.image}
            />
            <span className={classes.info}>
              Connect your wallet to continue
            </span>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
