/**
 * Author:
 * File name: AdminPage.js
 * Last Date Modified:
 * Purpose: This is the AdminPage of the app, if the user is an admin of a clinic, he/she will be redirected
 *          immediately to this page after logging in.
 */
import React, { useState } from "react";

import BookingContent from "./content/booking/BookingContent";
import DashboardContent from "./content/dashboard/DashboardContent";
import TabPane from "./TabPane";

import "../../style/AdminPage.css";

// The display mode of the page
export const SHOW_BOOKING = 1; // Show the list of all bookings related to that clinic
export const SHOW_DASHBOARD = 3; // Show the dashboard with some charts and graphs related to sale data of that clinic

const AdminPage = () => {
  const [showMode, setShowMode] = useState(SHOW_DASHBOARD);

  return (
    <div className="admin-page-wrapper">
      {/* The page will consist of: 
          1. A Tab Pane where the user can select the display mode
          2. A Content Pane where the user can see the content according to the display mode
      */}
      <TabPane showMode={showMode} setShowMode={setShowMode} />
      <div className="content-wrapper">
        {showMode === SHOW_BOOKING ? <BookingContent /> : <DashboardContent />}
      </div>
    </div>
  );
};

export default AdminPage;
