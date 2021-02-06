import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import authActions from "./redux/actions/auth.actions";
import AlertMsg from "./components/AlertMsg";
import PublicLayout from "./routers/PublicLayout";
import AdminLayout from "./routers/AdminLayout";
import PrivateRoute from "./routers/PrivateRoute";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && accessToken !== "undefined") {
      dispatch(authActions.getCurrentUser(accessToken));
    } else {
      dispatch(authActions.logout());
    }
  }, [dispatch]);

  if (isAuthenticated === null)
    return <LoadingSpinner color="red" animation="border" />;

  return (
    <Router>
      <AlertMsg />
      <Switch>
        <PrivateRoute path="/admin" component={AdminLayout} />
        <Route path="/" component={PublicLayout} />
      </Switch>
    </Router>
  );
}

export default App;
