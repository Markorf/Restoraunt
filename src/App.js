import React, { Suspense, lazy } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Layout from "./components/layout";
import Spinner from "./components/spinner";
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
      <ThemeProvider theme={theme}>
        <Router>
          <Layout>
            <Suspense fallback={<Spinner />}>
              <Switch>
                <Route exact path="/" render={() => <HomePage />} />
                <Route path="/about" render={() => <AboutPage />} />
                <Redirect to="/" />
              </Switch>
            </Suspense>
          </Layout>
        </Router>
      </ThemeProvider>
    </div>
  );
}
export default App;
