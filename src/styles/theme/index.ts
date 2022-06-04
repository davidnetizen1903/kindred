import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

/**
 * The default theme used throughout the application
 */
export const defaultTheme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: 'rgb(241, 41, 38)',
      },
      secondary: {
        main: 'rgb(51, 84, 103)',
      },
    },
    typography: {
      fontFamily: ['Helvetica'].join(','),
    },
    shape: {
      borderRadius: 16,
    },
    overrides: {
      MuiButton: {
        root: {
          borderRadius: 10,
        },
      },
    },
  }),
);
