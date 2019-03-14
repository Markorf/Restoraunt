import React, { Suspense, lazy } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Layout from "./components/layout";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import HomePage from "./pages/home";
import "./App.css";
const AboutPage = lazy(() => import("./pages/about"));

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
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/about" render={() => <AboutPage />} />
                <Redirect to="/" />
              </Switch>
            </Suspense>
          </Layout>
        </Router>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
