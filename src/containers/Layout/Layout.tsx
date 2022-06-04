import type { ReactElement, ReactNode } from 'react';

import { CssBaseline, Hidden } from '@material-ui/core';
import Particles from 'react-tsparticles';

import { SocialLinks, Navbar, Sidebar } from '../../components';
import { PARTICLES_CONFIG } from '../../constants/particles';

import useStyles from './Layout.style';

/**
 * The property types which are used by the `Layout` container
 */
export interface LayoutProps {
  children: ReactNode;
}

/**
 * A container that handles the layout of the application
 *
 * @param children The children to display within the container
 *
 * @returns The `Layout` container
 */
export function Layout({ children }: LayoutProps): ReactElement {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <SocialLinks />
      <Navbar />
      <Hidden mdUp>
        <Sidebar />
      </Hidden>
      <main className={classes.root}>
        <Particles className={classes.particles} options={PARTICLES_CONFIG} />
        <section className={classes.content}>{children}</section>
      </main>
    </>
  );
}
