import type { ReactElement } from 'react';

import { Box, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { BasicView, StaticCardDisplay } from '../../components';
import { getRoute } from '../../router';

import useStyles from './Home.style';

/**
 * A view that serves as the home page
 *
 * @returns The `Home` view
 */
export function Home(): ReactElement {
  const classes = useStyles();
  const history = useHistory();

  /**
   * A function that redirects the user to the purchase screen
   */
  const redirectToPurchase = () => history.push(getRoute('purchase').path);

  return (
    <BasicView
      title="KindredSpirit COLLECTION"
      subtitle=""
      maxWidth="xl"
      otherFont
      mobileMultiLine={['Kindred Spirit', 'TICKET', 'COLLECTION']}
    >
      <StaticCardDisplay
        items={[
          {
            path: '/assets/cards/digital-human.jpg',
            width: '30vw',
          },
          {
            path: '/assets/cards/sun-goddess.jpg',
            width: '30vw',
          },
          {
            path: '/assets/cards/at-times-end.jpg',
            width: '30vw',
          },
        ]}
      />

      <div className={classes.wrapper}>
        <Box my={6}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            onClick={redirectToPurchase}
          >
            Get started minting.
          </Button>
        </Box>
        {/* <Description>
          It’s a MAD WORLD out there. Join MAD JOE and the MAD LADS in a
          never-seen-before adventure inside the MAD LAB. The first-ever crypto
          social hub, play-to-earn NFT game just arrived! Put on your safety
          goggles and lab robes, the Madness has just begun!
        </Description> */}
      </div>
    </BasicView>
  );
}
