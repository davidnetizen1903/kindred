import { ReactElement } from 'react';

import { Box, Divider, Paper, Typography } from '@material-ui/core';
// import { Pagination } from '@material-ui/lab';
import clsx from 'classnames';

import { BasicView } from '../../components';

import useStyles from './Catalog.style';

// import { useApi, useContracts } from 'hooks';
// import { SamuraiDetails } from 'interfaces';

// const AMOUNT_PER_PAGE = 12;

export function Catalog(): ReactElement {
  const classes = useStyles();
  // const api = useApi();
  // const { catalog, fetchCatalog, numCatalogPages } = useContracts();
  // const [catalogItems, setCatalogItems] = useState<SamuraiDetails[]>([]);
  // const [currentPage, setCurrentPage] = useState<number>(1);

  // useEffect(() => {
  //   if (catalog.length > 0) {
  //     const fetchData = async () => {
  //       const { data } = await api.get(
  //         `?min=${catalog[catalog.length - 1]}&max=${catalog[0] + 1}`,
  //       );
  //       const sorted = data.sort(
  //         (a: SamuraiDetails, b: SamuraiDetails) => b.id - a.id,
  //       );
  //       setCatalogItems(sorted);
  //     };
  //     fetchData();
  //   }
  // }, [catalog]);

  // useEffect(() => {
  //   fetchCatalog(currentPage, AMOUNT_PER_PAGE);
  // }, [currentPage]);

  // const handlePageSwitch = (event: any, value: number) => {
  //   setCurrentPage(value);
  //   setCatalogItems([]);
  // };

  const linkData = [
    {
      text: 'CLICK HERE TO CHECK OUT ALL TICKETS',
      link: 'https://google.com',
    },
    {
      text: 'WANNA KNOW THE EXACT ODDS? CHECK OUT TICKETS LIST',
      link: 'https://github.com',
    },
  ];
  return (
    <>
      {/* {successfullyPurchased && <UnlockedOverlay />} */}
      <BasicView
        title="Affiliates"
        subtitle="Become an Affiliate and Earn ETH"
        maxWidth="md"
        otherFont
      >
        <Paper className={classes.card}>
          <Box p="1.5rem" textAlign="center">
            <Typography
              className={clsx(classes.baseText, classes.letterSpacing)}
              variant="h4"
            >
              Earn 10% of the ticket sales when someone uses ViceToken Lotto
              using your link!
            </Typography>
            <Box my={1} />
            {/* <Typography variant="h5">Available: {USER_BALANCE} BNB</Typography> */}
          </Box>
          <Divider className={classes.divider} />
          <Box p="1.5rem" className={classes.alignCenter}>
            <Typography
              variant="h6"
              className={clsx(classes.affiliateLink, classes.letterSpacing)}
            >
              Simply add your ETH address to the url like this:
              https://lottery.vicetoken.io/?affiliate=
              <span className={classes.baseTextBlack}>YOURETHADDRESS</span>
            </Typography>
          </Box>
        </Paper>
      </BasicView>
    </>
  );
}
