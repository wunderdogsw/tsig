import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@material-ui/core";

import Header from "./components/Header/Header";
import { theme } from "./components/common/styles";
import MainRouter from "./components/MainRouter/MainRouter";
import rootReducer from "./ducks";

const store = createStore(rootReducer);

const App: React.FC = () => {
  const [title, setTitle] = React.useState("Ascents");
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header title={title} />
          <MainRouter setTitle={setTitle} />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
