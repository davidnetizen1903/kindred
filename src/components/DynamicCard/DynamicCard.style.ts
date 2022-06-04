import { makeStyles } from '@material-ui/core';

import { CARD_ASPECT_RATIO } from '../../constants/variables';

/**
 * The accepted properties of the styles which are used by the `DynamicCard` component
 */
interface StyleProps {
  width: number | string;
}

/**
 * The styles which are used by the `DynamicCard` component
 */
export default makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1.5),
  },
  wrapper: {
    position: 'relative',
    height: (props: StyleProps) =>
      `calc(${props.width} * ${CARD_ASPECT_RATIO})`,
    [theme.breakpoints.down('xs')]: {
      height: (props: StyleProps) => `calc(${props.width} * 0.5)`,
    },
    width: (props: StyleProps) => props.width,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    width: 'inherit',
    height: 'inherit',
    pointerEvents: 'none',
  },
  specialty: {
    width: 20,
    height: 20,
    '&:not(:last-of-type)': {
      marginRight: theme.spacing(0.5),
    },
  },
  character: {
    position: 'absolute',
    width: 'inherit',
    height: '100%',
    zIndex: 2,
  },
  id: {
    textAlign: 'right',
  },
  currency: {
    width: 20,
    height: 20,
  },
  price: {
    textAlign: 'right',
    marginRight: theme.spacing(0.5),
  },
}));
