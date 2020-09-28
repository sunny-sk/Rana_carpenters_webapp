import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import DesignDetail from "./pages/DesignDetail";
import Home from "./pages/Home";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Designs from "./pages/Designs";
import ManageFeedbacks from "./pages/Admin/ManageFeedbacks";
import ManageInventories from "./pages/Admin/ManageInventories";
import ManageDesigns from "./pages/Admin/ManageDesigns";
import ManageDetails from "./pages/Admin/ManageDetails";
import AdminMainPage from "./pages/Admin/AdminMainPage";
import ManageCategories from "./pages/Admin/ManageCategories";
import AdminRoute from "./helper/AuthGaurd/AdminRoute";
import AdminLogin from "./pages/Admin/AdminLogin";

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
          <Route path="/designs" exact component={Designs} />
          <Route path="/policy" exact component={Policy} />
          <Route path="/designs/:designId" exact component={DesignDetail} />
          <Route path="/login" exact component={AdminLogin} />
          <AdminRoute
            exact
            path="/dashboard/admin/feedbacks"
            component={ManageFeedbacks}
          />
          <AdminRoute exact path="/dashboard/admin" component={AdminMainPage} />
          <AdminRoute
            exact
            path="/dashboard/admin/inventories"
            component={ManageInventories}
          />
          <AdminRoute
            exact
            path="/dashboard/admin/details"
            component={ManageDetails}
          />
          <AdminRoute
            exact
            path="/dashboard/admin/categories"
            component={ManageCategories}
          />
          <AdminRoute
            path="/dashboard/admin/designs"
            exact
            component={ManageDesigns}
          />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Routes;
