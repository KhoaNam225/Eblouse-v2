import React from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import PrivateRoute from "./PrivateRoute";
import NotFoundPage from "../pages/NotFoundPage";
import AdminPage from "../pages/Admin/AdminPage";
import AdminNavBar from "../components/AdminNavBar";

const AdminLayout = () => {
  return (
    <>
      <AdminNavBar />
      <Container style={{ padding: 0 }} fluid>
        <Switch>
          <PrivateRoute path="/" component={AdminPage} />
          <Route exact component={NotFoundPage} />
        </Switch>
      </Container>
    </>
  );
};

export default AdminLayout;
