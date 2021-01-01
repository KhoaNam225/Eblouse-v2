import React from "react";
import { Switch, Route } from "react-router-dom";
import PublicNavBar from "../components/PublicNavBar";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import InformationPage from "../pages/InformationPage";
import NotFoundPage from "../pages/NotFoundPage";
import ClinicDetailPage from "../pages/ClinicDetailPage";
import BookingDetailPage from "../pages/BookingDetailPage";
import BookingConfirm from "../pages/BookingConfirm";
import PrivateRoute from "./PrivateRoute";
import SearchListPage from "../pages/SearchListPage";

import "../style/main.css";

const PublicLayout = () => {
  return (
    <>
      <PublicNavBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exac path="/info" component={InformationPage} />
        <Route exac path="/clinic/:id" component={ClinicDetailPage} />
        <Route exac path="/search" component={SearchListPage} />

        <PrivateRoute exac path="/booking/:id" component={BookingDetailPage} />
        <PrivateRoute
          exac
          path="/booking/confirm/:id"
          component={BookingConfirm}
        />
        <Route exac component={NotFoundPage} />
      </Switch>
    </>
  );
};

export default PublicLayout;
