import type { ReactElement } from 'react';

import { Box, Button, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { DynamicCard } from '../DynamicCard/DynamicCard';

import useStyles from './UnlockedOverlay.style';

/**
 * A component that displays that one unlocked samurai
 *
 * @returns The `UnlockedOverlay` component
 */
export function UnlockedOverlay(): ReactElement {
  const classes = useStyles();
  const history = useHistory();

  const handleRedirect = () => history.push('/collection');

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.info}>
        You have successfully acquired samurai
      </Typography>
      <Box my={1} className={classes.wrapper}>
        <DynamicCard
          id={0}
          // characterPath={`${process.env.PUBLIC_URL}/assets/demo_overlay.png`}
          backgroundPath={`${process.env.PUBLIC_URL}/assets/demo_background.png`}
          cardOnly
        />
      </Box>
      <Button
        size="large"
        variant="contained"
        color="primary"
        onClick={handleRedirect}
      >
        TO MY COLLECTION
      </Button>
    </div>
  );
}
