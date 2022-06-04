import type {
  ReactNode,
  ReactElement,
  DetailedHTMLProps,
  HTMLAttributes,
} from 'react';

import { Box, Container, Typography } from '@material-ui/core';

import useStyles from './Description.style';

/**
 * The property types which are used by the `Description` component
 */
export interface DescriptionProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  title?: string;
  children: ReactNode;
}

/**
 * A component that makes it possible to display a description
 *
 * @param title The title of the description
 * @param children The text to put inside of the description
 *
 * @returns The `Description` component
 */
export function Description({
  title,
  children,
  ...rest
}: DescriptionProps): ReactElement {
  const classes = useStyles();

  return (
    <article {...rest}>
      <Container>
        <Box textAlign="center">
          {title && (
            <Typography variant="h3" className={classes.title}>
              {title}
            </Typography>
          )}
          <Typography variant="h6" className={classes.content}>
            {children}
          </Typography>
        </Box>
      </Container>
    </article>
  );
}

/**
 * The default property values which are used by the `Description` component
 */
Description.defaultProps = {
  title: undefined,
};
