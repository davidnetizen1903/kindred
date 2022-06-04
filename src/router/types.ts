/**
 * An interface that defines the structure of a `Route`,
 * this will be used for routing in the application
 */
export interface Route {
  path: string;
  exact: boolean;
  view: any;
  hidden?: boolean;
  disabled?: boolean;
}

/**
 * An interface that defines the storage of multiple routes
 */
export interface RouteStore {
  [key: string]: Route;
}
