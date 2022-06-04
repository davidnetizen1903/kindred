import { RouteStore, Route } from './types';

import {
  Catalog,
  Collection,
  Details,
  Home,
  InProgress,
  Purchase,
} from 'views';

/**
 * A collection of routes which are used for navigating throughout the application
 */
const ROUTES: RouteStore = {
  home: {
    path: '/',
    exact: true,
    view: <Home />,
  },
  purchase: {
    path: '/purchase',
    exact: true,
    view: <Purchase />,
  },
  // collection: {
  //   path: '/collection',
  //   exact: true,
  //   view: <Collection />,
  // },
  details: {
    path: '/details/:id',
    exact: true,
    view: <Details />,
    hidden: true,
  },
  // affiliates: {
  //   path: '/affiliates',
  //   exact: true,
  //   view: <Catalog />,
  // },
  affiliate: {
    path: '/affiliate/:id',
    exact: true,
    view: <Details />,
    hidden: true,
  },
  // 'market!': {
  //   path: '/marketplace',
  //   exact: true,
  //   view: <InProgress />,
  //   disabled: true,
  // },
  // play: {
  //   path: '/play',
  //   exact: true,
  //   view: <InProgress />,
  //   disabled: true,
  // },
};

/**
 * A function that retrieves the names of all available routes
 *
 * @example
 * const routeNames = getRoutes();
 * routeNames.forEach(routeName => {
 *  const route = getRoute(routeName);
 * });
 *
 * @returns A list of all the route names
 */
export const getRoutes = (): string[] => Object.keys(ROUTES);

/**
 * A function that retreives information about a specific route
 * @param routeName The name of the route to get information from
 * @returns Information about the selected route
 */
export const getRoute = (routeName: string): Route => ROUTES[routeName];
