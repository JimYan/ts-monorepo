import React from "react";
import ReactDOM from "react-dom/client";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline } from "@mui/material";
import "./global.css";
import Route from "./Route";
import { setPrefix, defaultFetch } from "@nighttrax/lib";

setPrefix(import.meta.env.VITE_API_PATH); // 设置请求的前缀
// 设置默认的queryFn函数。
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
