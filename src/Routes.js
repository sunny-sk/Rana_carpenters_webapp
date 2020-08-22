import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import DesignDetail from "./pages/DesignDetail";
import Home from "./pages/Home";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";

const Routes = (props) => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            component={() => {
              return <Home {...props} />;
            }}
          />

          <Route path="/designs" exact component={DesignDetail} />
          <Route path="/policy" exact component={Policy} />
          <Route path="/designs/:designId" exact component={DesignDetail} />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Routes;
