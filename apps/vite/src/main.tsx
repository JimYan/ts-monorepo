import React from "react";
import ReactDOM from "react-dom/client";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material/styles";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { CssBaseline } from "@mui/material";
import Route from "./Route";
import { defaultFetch } from "./models/util";
import "./global.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultFetch,
    },
  },
});

const rootElement = document.getElementById("root") as HTMLElement;
const theme = createTheme({
  components: {
    MuiPopover: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement,
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Route />
      </QueryClientProvider>
    </ThemeProvider>
  </StyledEngineProvider>
);
