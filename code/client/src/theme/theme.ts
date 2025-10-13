import { createTheme, ThemeOptions } from '@mui/material/styles';

const baseThemeOptions: ThemeOptions = {
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 8,
                },
            },
        },
    },
};

export const getAppTheme = (mode: 'light' | 'dark') => {
    return createTheme({
        ...baseThemeOptions,
        palette: {
            mode,
            ...(mode === 'light'
                ? {
                    primary: {
                        main: '#0087d7', 
                    },
                    secondary: {
                        main: '#e04848', 
                    },
                    background: {
                        default: '#f4f4f4', 
                        paper: '#ffffff', 
                    },
                    text: {
                        primary: '#121212', 
                        secondary: '#555555',
                    },
                }
                : {
                
                    primary: {
                        main: '#66c9ff', 
                    },
                    secondary: {
                        main: '#ff6666', 
                    },
                    background: {
                        default: '#121212', 
                        paper: '#272727', 
                    },
                    text: {
                        primary: '#ffffff',
                        secondary: '#b0b0b0',
                    },
                }),
        },
    });
};

export const theme = getAppTheme('light');