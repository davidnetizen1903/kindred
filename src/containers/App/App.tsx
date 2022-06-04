import type { ReactElement } from 'react';

import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { getRoute, getRoutes } from '../../router';
import { defaultTheme } from '../../styles/theme';
import { NotFound } from '../../views';
import { Layout } from '../Layout/Layout';

/**
 * A container that handles the top-level logic and routing for the application
 *
 * @returns The `App` container
 */
export function App(): ReactElement {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Router>
        <Layout>
          <Switch>
            {getRoutes().map((routeName) => {
              const route = getRoute(routeName);

              return (
                <Route key={routeName} path={route.path} exact={route.exact}>
                  {route.view}
                </Route>
              );
            })}
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}
