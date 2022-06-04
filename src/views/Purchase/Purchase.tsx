import { ReactElement, useState } from 'react';

import {
  Box,
  Button,
  Divider,
  FormControl,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  Grid,
  Input,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import clsx from 'classnames';
import { ethers } from 'ethers';

import { BasicView, Description, UnlockedOverlay } from '../../components';
import { useContracts } from '../../hooks';

import useStyles from './Purchase.style';

// import {
//   CardPurchase,
//   getPurchaseOption,
//   getPurchaseOptions,
// } from 'constants/cards';
// import { MOST_EXPENSIVE_PACK } from 'hooks/useContracts';
// import { formatAbbreviated } from 'utils/formatting';

/** The id of the default pack selection */
// const DEFAULT_SELECTION = 99;

/**
 * A view that presents the user with a purchase screen
 *
 * @returns The `Purchase` view
 */
export function Purchase(): ReactElement {
  const classes = useStyles();
  const theme = useTheme();
  const {
    connected,
    rsunBalance,
    rsunApproved,
    packs,
    web3Provider,
    samurai,
    purchasing,
    price,
    prvPrice,
    successfullyPurchased,
  } = useContracts();

  const purchaseUpLimit = 15;

  const purchaseDownLimit = 1;
  /** A state that stores which pack the user has selected */
  const [selectedAmount, setSelectedAmount] = useState(purchaseDownLimit);
  const [projectId, setProjectId] = useState(0);
  const [minting, setMinting] = useState(false);

  /** If the screen is small */
  const isSmall = useMediaQuery(theme.breakpoints.down('xs'));

  /** If the user has selected a pack */
  const hasSelected = selectedAmount !== 0;

  /**
   * A function that handles the user change of the pack
   *
   * @param event The event to use for the changing
   */
  // const handlePackChange = (
  //   event: ChangeEvent<{
  //     name?: string | undefined;
  //     value: unknown;
  //   }>,
  // ) => {
  //   let val;
  //   if ((event.target.value as number) < 0) val = 0;
  //   else if ((event.target.value as number) > 30) val = 30;
  //   else val = event.target.value as number;
  //   setSelectedAmount(val);
  // };
  const evaluate = (value: number) => {
    let val;
    if (value < purchaseDownLimit) val = purchaseDownLimit;
    else if (value > purchaseUpLimit) val = purchaseUpLimit;
    else val = value;
    setSelectedAmount(val);
  };

  const decrease = () => {
    const val = selectedAmount - 1;
    evaluate(val);
  };

  const increase = () => {
    const val = selectedAmount + 1;
    evaluate(val);
  };

  const buy = async () => {
    const signer = samurai.connect(web3Provider.getSigner());
    try {
      setMinting(true);
      await signer
        .mint(projectId, {
          value: ethers.utils.parseEther(String(prvPrice / 1000.0)),
        })
        .then((res: any) => console.log(res));
    } catch (e) {
      console.log(e);
    }
    setMinting(false);
  };

  const buyPack = () => {
    alert(projectId);
  };

  const handleProjectIdChange = (event: any) => {
    let val;
    if ((event.target.value as number) < 0) val = 0;
    else if ((event.target.value as number) > 30) val = 30;
    else val = event.target.value as number;
    setProjectId(val);
  };

  const getBuyButtonText = () => {
    if (!connected || !packs) {
      return `NOT CONNECTED`;
    }

    if (!hasSelected) {
      return `PLEASE SELECT AN OPTION`;
    }

    if (packs && packs[selectedAmount] && !packs[selectedAmount].onSale) {
      return `PACK CURRENTLY NOT AVAILABLE`;
    }

    if (
      packs &&
      packs[selectedAmount] &&
      rsunBalance < packs[selectedAmount].cost
    ) {
      return `INSUFFICIENT BALANCE`;
    }

    if (purchasing) {
      return `PURCHASING...`;
    }

    return `BRING ME MY SAMURAI`;
  };

  return (
    <>
      {/* {successfullyPurchased && <UnlockedOverlay />} */}
      <BasicView
        title="Purchase"
        subtitle="Please mint your nft here"
        maxWidth="md"
        otherFont
      >
        <Paper className={classes.card}>
          <Box p="1.5rem" textAlign="center">
            <Typography
              className={clsx(classes.baseText, classes.letterSpacing)}
              variant="h4"
            >
              How does it work?
            </Typography>
            <Typography
              variant="h6"
              className={clsx(classes.baseTextBlack, classes.letterSpacing)}
            >
              The price follows a price curve, the price for private minting is{' '}
              {prvPrice / 1000.0} eth and one for public minting is{' '}
              {price / 1000.0} eth.
            </Typography>
            <Box my={1} />
            {/* <Typography variant="h5">Available: {USER_BALANCE} BNB</Typography> */}
          </Box>
          <Divider className={classes.divider} />
          <Box
            p="1.5rem"
            className={clsx(classes.alignCenter, classes.letterSpacing)}
          >
            <Typography variant="h4" className={classes.baseText}>
              Collection Id to mint in
            </Typography>
            <Box mt={2} mb={4}>
              <FormControl variant="outlined" className={classes.selector}>
                <Grid container spacing={0}>
                  <Grid item md={4} xs={12} />
                  <Grid item md={4} xs={12}>
                    <div className={classes.amount_wrapper}>
                      <Input
                        value={projectId}
                        className={classes.input}
                        onChange={handleProjectIdChange}
                      />
                    </div>
                    <br />
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      className={classes.buyButton}
                      onClick={() => buy()}
                      disabled={minting}
                    >
                      Mint
                    </Button>
                  </Grid>
                  <Grid item md={4} xs={12} />
                </Grid>
              </FormControl>
            </Box>
            <Button
              fullWidth
              size="large"
              variant="contained"
              color="primary"
              className={clsx({
                [classes.button]: !isSmall,
                hidden: !rsunApproved,
              })}
              disabled={
                !hasSelected ||
                !connected ||
                !packs[selectedAmount]?.onSale ||
                rsunBalance < packs[selectedAmount]?.cost ||
                purchasing
              }
              onClick={() => buyPack()}
            >
              {getBuyButtonText()}
            </Button>
          </Box>
        </Paper>
        <Box mt={8} />
        <Box mt={5} />
      </BasicView>
    </>
  );
}
