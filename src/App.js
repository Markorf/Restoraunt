import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Layout from "./components/layout";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import "./App.css";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/about" component={AboutPage} />
              <Redirect to="/" />
            </Switch>
          </Layout>
        </Router>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
