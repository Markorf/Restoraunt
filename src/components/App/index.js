import React, { Suspense, lazy, useEffect } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { useObservable } from "mobx-react-lite";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Layout from "../ui/Layout";
import Spinner from "../ui/Spinner";
import HomePage from "../../pages/Home";
import optionsStore from "../../store/options";
import AuthRoute from "../utils/Routes/AuthRoute";
import GuestRoute from "../utils/Routes/GuestRoute";
import "./App.css";

const AboutPage = lazy(() => import("../../pages/About"));
const ItemPage = lazy(() => import("../../pages/Item"));
const AddPage = lazy(() => import("../../pages/Add"));
const RegisterPage = lazy(() => import("../../pages/Register"));
const LoginPage = lazy(() => import("../../pages/Login"));

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

function App() {
  const oStore = useObservable(optionsStore);
  useEffect(() => {
    const selectedType =
      localStorage.getItem("selectedType") || oStore.initialType;
    oStore.setType(selectedType);
  }, []);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Layout>
            <Suspense fallback={<Spinner />}>
              <Switch>
                <Route exact path="/" render={() => <HomePage />} />
                <Route path="/about" render={() => <AboutPage />} />
                <Route path="/item/:id" render={() => <ItemPage />} />
                <AuthRoute path="/add" render={() => <AddPage />} />
                <GuestRoute path="/register" render={() => <RegisterPage />} />
                <GuestRoute path="/login" render={() => <LoginPage />} />
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
