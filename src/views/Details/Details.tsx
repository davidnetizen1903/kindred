import type { ReactElement } from 'react';
import { useState, useEffect } from 'react';

import { Box, Grid, Paper, Typography } from '@material-ui/core';
// import clsx from 'classnames';
import { useParams } from 'react-router-dom';

import useStyles from './Details.style';

import { BasicView, DynamicCard, Loading } from 'components';
import { useApi } from 'hooks';
import { SamuraiDetails } from 'interfaces';
import { formatCardNumber } from 'utils/formatting';

/**
 * The property types which are used by the `Details` view routing parameters
 */
export interface DetailsRouteProps {
  id: string;
}

/**
 * A view that displays details about a Samurai
 *
 * @returns The `Details` view
 */
export function Details(): ReactElement {
  const classes = useStyles();
  const api = useApi();
  const params: DetailsRouteProps = useParams();

  const [samuraiData, setSamuraiData] = useState<SamuraiDetails>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(`/${params.id}`);
        setSamuraiData(data);
      } catch {
        // eslint-disable-next-line no-console
        console.error('No data found!');
      }
    };
    fetchData();
  }, []);

  const getCardAttributes = (): Array<{
    traitType: string;
    value: string | number;
  }> => {
    if (samuraiData) {
      // const {
      //   rare_tier: rareTier,
      //   power,
      //   element,
      // } = samuraiData.attributes;

      // return [
      //   { category: 'rarity', value: rareTier },
      //   { category: 'power', value: power },
      //   { category: 'element', value: element },
      // ];
      const arr = samuraiData.attributes.map((attr) => {
        console.log('');
        return { traitType: attr.trait_type, value: attr.value };
      });
      return arr;
    }
    return [];
  };

  if (!samuraiData) {
    return <Loading />;
  }

  return (
    <BasicView title={samuraiData.name} subtitle={samuraiData.name}>
      <Paper>
        <Box p={2}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <DynamicCard
                id={samuraiData.id}
                width="100%"
                // characterPath={samuraiData.image}
                backgroundPath={samuraiData.image}
                cardOnly
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                mb={5}
                // display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <div>
                  {/* {getCardAttributes().length > 0
                    ? getCardAttributes().map((cardAttribute) => (
                        <img
                          key={cardAttribute.category}
                          className={classes.attributeIcon}
                          src={`${process.env.PUBLIC_URL}/assets/static/${cardAttribute.category}/${cardAttribute.category}_${cardAttribute.value}.png`}
                          alt="Card power icon"
                        />
                      ))
                    : [1, 2, 3].map((num) => (
                        <img
                          key={num}
                          className={classes.attributeIcon}
                          src={`${process.env.PUBLIC_URL}/assets/icons/blank_item.png`}
                          alt="Card power icon"
                        />
                      ))} */}
                  {getCardAttributes().length > 0 ? (
                    getCardAttributes().map((cardAttribute) => (
                      <Box py={2}>
                        <Grid
                          container
                          // justifyContent="space-around"
                          alignItems="center"
                        >
                          <Grid item xs={6}>
                            <Typography variant="h6">
                              {cardAttribute.traitType}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="h6">
                              {cardAttribute.value}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
                <span className={classes.number}>
                  {formatCardNumber(samuraiData.id)}
                </span>
              </Box>
              {/* {samuraiData.image_properties.metadata.map((attribute) => (
                <Box
                  key={attribute.category}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  className={classes.attributesItem}
                >
                  <span className={classes.attributeTitle}>
                    {attribute.category.replace(/_/g, ' ')}
                  </span>
                  <span
                    className={clsx(classes.attributeDescription, {
                      [classes.attributeRare]: attribute.rare,
                      [classes.attributeUnavailable]:
                        attribute.item.toLowerCase() === 'none',
                    })}
                  >
                    {attribute.item.replace(/_/g, ' ')}
                  </span>
                </Box>
              ))} */}
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </BasicView>
  );
}
