import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { store } from "./store";
import "normalize.css";

import Calendar from "./components/calendar";
import theme from "./theme";

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Calendar />
    </ThemeProvider>
  </Provider>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
