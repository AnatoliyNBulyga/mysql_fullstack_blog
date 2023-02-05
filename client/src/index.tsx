import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import { store } from "./store/store";
import { MantineProvider } from '@mantine/core';
import { theme } from "./utils/theme";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
            <Provider store={store}>
                <App />
            </Provider>
        </MantineProvider>
    </React.StrictMode>
);
