import { MantineThemeOverride } from "@mantine/core";

export const theme: MantineThemeOverride = {
    colorScheme: 'light',
    primaryColor: 'tblue',
    colors: {
        // Add your color
        tblue: ["#E2E5EF", "#C4CAE4", "#A4B0DD", "#8194DD", "#7183CA", "#6475B7", "#062343", "#58638E", "#545C7B", "#062343"],
        oceanBlue: ['#7AD1DD', '#5FCCDB', '#44CADC', '#2AC9DE', '#1AC2D9', '#11B7CD', '#09ADC3', '#0E99AC', '#128797', '#147885'],
    },
    shadows: {
        md: '1px 1px 3px rgba(0, 0, 0, .25)',
        xl: '5px 5px 3px rgba(0, 0, 0, .25)',
    },

    headings: {
        fontFamily: 'Roboto, sans-serif',
        sizes: {
            h1: { fontSize: 30 },
        },
    },
};