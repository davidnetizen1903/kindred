import { ReactElement, useState, useEffect } from 'react';

import { Box, Grid, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

import {
  BasicView,
  ConnectOverlay,
  DynamicCard,
  Loading,
} from '../../components';
import { useContracts, useApi } from '../../hooks';
import { SamuraiDetails } from '../../interfaces';

import useStyles from './Collection.style';

/**
 * The amount of samurais to load
 */
const AMOUNT_PER_PAGE = 12;

/**
 * A view that displays the Samurai collection owned by the user
 *
 * @returns The `Collection` view
 */
export function Collection(): ReactElement {
  const classes = useStyles();
  const api = useApi();
  const { connected, collection, fetchCollection, numCollPages } =
    useContracts();
  const [collectionItems, setCollectionItems] = useState<SamuraiDetails[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    console.log(collection);
    if (collection.length > 0) {
      const fetchData = async () => {
        const collectionData: SamuraiDetails[] = [];
        for (let i = 0; i < collection.length; i += 1) {
          // eslint-disable-next-line no-await-in-loop
          const { data } = await api.get(`/${collection[i]}`);
          collectionData.push(data);
        }
        const sorted = collectionData.sort(
          (a: SamuraiDetails, b: SamuraiDetails) => a.id - b.id,
        );
        setCollectionItems(sorted);
        console.log(sorted);
      };
      fetchData();
    }
  }, [collection]);

  const handlePageSwitch = (event: any, value: number) => {
    setCurrentPage(value);
    setCollectionItems([]);
  };

  useEffect(() => {
    fetchCollection(currentPage, AMOUNT_PER_PAGE);
  }, [currentPage]);

  return (
    <>
      {/* {!connected && <ConnectOverlay />} */}
      <BasicView
        title="My Tickets"
        subtitle=""
        maxWidth="lg"
        otherFont
        className={classes.fullScreen}
      >
        {collectionItems.length > 0 ? (
          <>
            <Grid container>
              {collectionItems.map((item) => (
                <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                  <DynamicCard
                    id={item.id}
                    width="100%"
                    // characterPath={item.image}
                    backgroundPath={item.image}
                    name="madlad"
                  />
                </Grid>
              ))}
            </Grid>
            <Box display="flex" justifyContent="center" color="white" mt={4}>
              <Paper>
                <Box p={2}>
                  <Pagination
                    onChange={handlePageSwitch}
                    count={numCollPages}
                    color="primary"
                    size="large"
                    page={currentPage}
                    disabled={numCollPages <= 1}
                  />
                </Box>
              </Paper>
            </Box>
          </>
        ) : (
          <Loading fullScreen={false} />
        )}
      </BasicView>
    </>
  );
}
